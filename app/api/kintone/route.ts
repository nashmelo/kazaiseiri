import { NextRequest, NextResponse } from "next/server";
import { isValidRequestId } from "@/lib/requestId";
import { createInquiry } from "@/lib/crm";

type ItemLike = {
  name?: string;
  quantity?: string | number;
};

function stringifyItems(value: unknown): string {
  if (!value) return "";

  if (typeof value === "string") return value;

  if (Array.isArray(value)) {
    return value
      .map((item: ItemLike) => {
        const name = item?.name ?? "";
        const quantity = item?.quantity ?? "";
        if (!name && !quantity) return "";
        if (!name) return `${quantity}`;
        if (!quantity) return `${name}`;
        return `${name} × ${quantity}`;
      })
      .filter(Boolean)
      .join("、");
  }

  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

function normalizeAppBaseUrl(url?: string): string {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url.replace(/\/$/, "");
  }
  return `https://${url.replace(/\/$/, "")}`;
}

const s = (v: unknown) => (v == null ? "" : String(v)).trim();
const line = (label: string, v: unknown) => (s(v) ? `${label}：${s(v)}` : "");


/** 最後の受け皿：以前の受付アプリ（KINTONE_APP_ID＝64）へ、最低限の項目だけで入れる */
async function saveToLegacyApp(x: { name: string; phone: string; requestId: string; detail: string }) {
  const domain = process.env.KINTONE_DOMAIN;
  const app = process.env.KINTONE_APP_ID;
  const token = process.env.KINTONE_API_TOKEN;
  if (!domain || !app || !token) throw new Error("退避先（アプリ64）の設定がありません");
  const base = domain.startsWith("http") ? domain : `https://${domain}`;
  const res = await fetch(`${base}/k/v1/record.json`, {
    method: "POST",
    headers: { "X-Cybozu-API-Token": token, "Content-Type": "application/json" },
    body: JSON.stringify({
      app: Number(app),
      record: {
        name: { value: x.name },
        phone: { value: x.phone },
        request_id: { value: x.requestId },
        notes: { value: `※商談管理への自動登録に失敗したため、こちらに退避しました。商談管理へ手で登録してください。\n\n${x.detail}` },
      },
    }),
    signal: AbortSignal.timeout(10000),
  });
  const j = await res.json();
  if (!res.ok) throw new Error(`app64 ${res.status} ${JSON.stringify(j).slice(0, 300)}`);
  return { ok: true, fallback: "app64", id: j.id };
}

/**
 * LINEの見積もり受付。
 * 2026-11-02 から、kintone の「取引先（アプリ4）」と「商談管理（アプリ10）」に直接入れる（以前はアプリ64）。
 * 中身は lib/crm.ts。ホームページの相談フォームも同じ流れ。
 */
/**
 * 送ってきたのが「このLINEの見積もり（LIFF）でログインした人」かを LINE に照会する（2026-11-09 技術点検）。
 * 以前は誰でもこの窓口に送れて、商談管理・取引先に偽の依頼を入れられた。
 * - 鍵（LIFFのアクセストークン）が無い・偽物・別のアプリのもの → 断る
 * - LINE側が落ちているときだけは、お客様を止めないよう通す（ログに残す）
 */
async function verifyLineCaller(req: NextRequest): Promise<{ ok: true } | { ok: false; status: number; message: string }> {
  const auth = req.headers.get("authorization") || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7).trim() : "";
  if (!token) return { ok: false, status: 401, message: "LINEでログインしてからお送りください" };
  const channelId = process.env.LINE_LOGIN_CHANNEL_ID || (process.env.NEXT_PUBLIC_LIFF_ID || "").split("-")[0];
  try {
    const res = await fetch(`https://api.line.me/oauth2/v2.1/verify?access_token=${encodeURIComponent(token)}`, {
      signal: AbortSignal.timeout(5000),
    });
    if (res.status >= 500) {
      console.warn("line verify unavailable:", res.status);
      return { ok: true };
    }
    const j = (await res.json().catch(() => ({}))) as { client_id?: string; expires_in?: number };
    if (!res.ok || !j.client_id || (channelId && j.client_id !== channelId) || !(Number(j.expires_in) > 0)) {
      console.warn("line verify rejected:", res.status, j.client_id ? "client mismatch or expired" : "invalid");
      return { ok: false, status: 401, message: "LINEのログインが確認できませんでした。LINEから開き直してお送りください" };
    }
    return { ok: true };
  } catch (e) {
    console.warn("line verify error:", e instanceof Error ? e.message : e);
    return { ok: true };
  }
}

export async function POST(req: NextRequest) {
  try {
    const caller = await verifyLineCaller(req);
    if (!caller.ok) {
      return NextResponse.json({ error: caller.message }, { status: caller.status });
    }
    const body = await req.json();
    const appBaseUrl = normalizeAppBaseUrl(process.env.NEXT_PUBLIC_APP_URL);

    const tenant = body.tenant || "default";

    // 依頼IDは summary ページのURLに入る。形式を満たさない値はここで弾く
    const requestId = isValidRequestId(body.requestId) ? body.requestId : "";
    if (!requestId) {
      return NextResponse.json({ error: "依頼IDが正しくありません" }, { status: 400 });
    }

    // **画像が一枚もないときは、確認用のURLを作らない。**
    // 作ると「お写真の確認はこちら」というリンクが届き、開いても何も無い。
    const imageCount = Number(body.imageCount || 0);
    const summaryUrl =
      appBaseUrl && imageCount > 0
        ? `${appBaseUrl}/summary/${requestId}?tenant=${encodeURIComponent(tenant)}`
        : "";

    // **氏名・電話番号・住所・メールをログへ出さないこと。** 追跡に要るのは依頼IDだけ
    console.log("crm submit:", { tenant, requestId, inquiryType: body.inquiryType });

    const isBusiness = body.inquiryType === "事業ゴミ";
    const isMoving = body.inquiryType === "引越し";
    const dates = [1, 2, 3]
      .map((n) => ({ d: s(body[`pickupDate${n}`]), t: s(body[`pickupDate${n}Slot`]) }))
      .filter((x) => x.d);

    const detail = [
      `LINEの見積もりから（依頼ID：${requestId}）`,
      line("区分", body.inquiryType),
      line("サービス", body.service),
      line("事業者の種類", body.businessType),
      line("会社名・屋号", body.businessName),
      line("ご担当者のメール", body.contactEmail),
      line("ご連絡の方法", body.contactMethod),
      line("お部屋の広さ", body.roomSize),
      line("建物", body.buildingType),
      line("階", body.floor),
      line("エレベーター", body.elevator),
      line("駐車場", body.parking),
      line("搬出", body.disposalMethod),
      line("エアコンの取り外し", body.airconRemoval),
      line(isMoving ? "運ぶ物" : "回収する物", stringifyItems(body.items)),
      isMoving
        ? [
            line("引越し先", [body.movingPostalCode && `〒${body.movingPostalCode}`, body.movingPrefecture, body.movingCity, body.movingAddress].filter(Boolean).join(" ")),
            line("引越し先の建物", [body.movingBuildingType, body.movingFloor, body.movingElevator && `EV${body.movingElevator}`, body.movingParking && `駐車場${body.movingParking}`].filter(Boolean).join("／")),
            line("運ぶ物", stringifyItems(body.movingItems)),
            line("引越しの補足", body.movingNotes),
            line("処分する物", stringifyItems(body.disposalItems)),
            line("処分の補足", body.disposalNotes),
          ].filter(Boolean).join("\n")
        : "",
      ...dates.map((x, i) => `第${i + 1}希望：${x.d} ${x.t}`.trim()),
      body.receiptDifferent ? line("領収書の宛名", body.receiptName) : "",
      line("代表者", [body.representativeLastName, body.representativeFirstName].filter(Boolean).join(" ")),
      line("代表者の電話", body.representativePhone),
      imageCount > 0 ? `写真：${imageCount}枚\n${summaryUrl}` : "写真：なし",
      body.notes ? `\n【補足】\n${s(body.notes)}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const name = isBusiness
      ? s(`${s(body.contactLastName)} ${s(body.contactFirstName)}`)
      : s(body.name);
    const kana = isBusiness
      ? s(`${s(body.contactLastNameKana)} ${s(body.contactFirstNameKana)}`)
      : s(body.furigana);

    let result: unknown;
    try {
      result = await createInquiry({
      source: "LINE",
      name,
      kana,
      tel: s(isBusiness ? body.contactPhone || body.phone : body.phone),
      email: s(body.contactEmail),
      zip: s(body.postalCode),
      pref: s(body.prefecture),
      city: s(body.city),
      addr: s(body.address1),
      company: isBusiness ? s(body.businessName) : "",
      kinds: [s(body.inquiryType), s(body.service)],
      firstDate: dates[0]?.d || "",
      detail,
    });
      if ((result as { skipped?: boolean })?.skipped) throw new Error("KINTONE_CRM_TOKENS 未設定");
    } catch (e) {
      // **商談管理に入らなくても、お客様には失敗を見せない。** 以前の受付アプリ（64）に退避する
      console.error("crm failed, fallback to app64:", String(e).slice(0, 300));
      result = await saveToLegacyApp({ name, phone: s(isBusiness ? body.contactPhone || body.phone : body.phone), requestId, detail });
    }

    return NextResponse.json({ ok: true, data: result, requestId, summaryUrl });
  } catch (err) {
    console.error("server error:", String(err).slice(0, 500));
    return NextResponse.json({ error: "kintone登録失敗", detail: String(err) }, { status: 500 });
  }
}
