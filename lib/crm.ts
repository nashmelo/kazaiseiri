// 問い合わせを kintone の「取引先（アプリ4）」と「商談管理（アプリ10）」に入れる。
// LINE受付（app/api/kintone/route.ts）から呼ぶ。ホームページの相談フォームにも同じ中身の api/_crm.js がある（~/dev/ezurin-site）。直すときは両方。
// 環境変数：KINTONE_CRM_TOKENS … 「取引先のAPIトークン,商談のAPIトークン」
//           KINTONE_BASE … 省略時 https://jo9ti.cybozu.com

const BASE = process.env.KINTONE_BASE || "https://jo9ti.cybozu.com";
const APP_CLIENT = 4;
const APP_DEAL = 10;

const S = "　";
// 商談管理「ドロップダウン」（サービス）の選択肢。数字1桁のものは「数字＋半角空白＋全角空白」
const SV = {
  move: `6 ${S}引っ越し`,
  junk: `1 ${S}不要品回収`,
  tidy: `2 ${S}片付け・家財整理`,
  special: `9 ${S}特殊清掃`,
  grave: `15${S}お墓掃除`,
  waste: `3 ${S}ごみ回収（一般廃・産廃）`,
  other: `99${S}その他`,
  deodor: `10${S}脱臭・除菌サービス`,
};
const KIND_TO_SV: [string, string][] = [
  ["特殊清掃", SV.special], ["孤独死", SV.special], ["遺品整理", SV.tidy], ["家財整理", SV.tidy], ["空き家", SV.tidy],
  ["残置物撤去", SV.tidy], ["ゴミ屋敷", SV.tidy], ["部屋を丸ごと片付け", SV.tidy], ["不用品回収", SV.junk],
  ["引越し", SV.move], ["お墓", SV.grave], ["事業ゴミ", SV.waste], ["法人", SV.waste], ["除菌", SV.deodor],
];
const AREA_OPTS = "関東：東京都/高根沢町/那珂川町/さくら市/下野市/矢板市/東北：岩手県/市貝町/栃木市/野木町/塩谷町/芳賀町/上三川町/関東：埼玉県/中部：愛知県/那須烏山市/関東：群馬県/那須塩原市/那須町/国外：フィリピン/大田原市/小山市/鹿沼市/関東：千葉県/真岡市/宇都宮市/茂木町/関東：神奈川県/足利市/関西：大阪府/関西：兵庫県/中部：長野県/中部：新潟県/日光市/東北：福島県/壬生町/関東：茨城県/東北：山形県/益子町/その他/佐野市/東北：秋田県".split("/");

const digits = (s: unknown) => String(s ?? "").normalize("NFKC").replace(/\D/g, "");
const jstDate = (addDays = 0) => new Date(Date.now() + 9 * 3600e3 + addDays * 86400e3).toISOString().slice(0, 10);

export function pickService(kinds: string[]): string {
  const ks = kinds.filter(Boolean).join(" ");
  for (const [k, v] of KIND_TO_SV) if (ks.includes(k)) return v;
  return SV.other;
}

export function pickArea(city?: string, pref?: string): string {
  const c = String(city || "");
  const hit = AREA_OPTS.find((o) => o === c || (c && c.startsWith(o)) || (c && o.endsWith("：" + c)));
  if (hit) return hit;
  const p = String(pref || "");
  return AREA_OPTS.find((o) => p && o.endsWith("：" + p)) || "その他";
}

async function api(method: "GET" | "POST", path: string, body: Record<string, unknown>) {
  const tokens = process.env.KINTONE_CRM_TOKENS || "";
  const url = `${BASE}/k/v1/${path}`;
  const headers: Record<string, string> = { "X-Cybozu-API-Token": tokens };
  let res: Response;
  if (method === "GET") {
    const q = new URLSearchParams();
    Object.entries(body).forEach(([k, v]) =>
      Array.isArray(v) ? v.forEach((x, i) => q.append(`${k}[${i}]`, String(x))) : q.append(k, String(v))
    );
    res = await fetch(`${url}?${q}`, { method, headers, cache: "no-store", signal: AbortSignal.timeout(10000) });
  } else {
    headers["Content-Type"] = "application/json";
    res = await fetch(url, { method, headers, body: JSON.stringify(body), signal: AbortSignal.timeout(10000) });
  }
  const j = await res.json();
  if (!res.ok) throw new Error(`kintone ${path} ${res.status} ${JSON.stringify(j).slice(0, 300)}`);
  return j;
}

// 電話番号で取引先を探す。登録の書き方（ハイフンの有無）がまちまちなので、下4桁で候補を取って数字だけで比べる
async function findClient(tel: string): Promise<string | null> {
  const d = digits(tel);
  if (d.length < 10) return null;
  const last4 = d.slice(-4);
  const j = await api("GET", "records.json", {
    app: APP_CLIENT,
    query: `tel like "${last4}" or mobile like "${last4}" order by $id desc limit 100`,
    fields: ["record_no", "tel", "mobile"],
  });
  const r = j.records.find((x: any) => digits(x.tel.value) === d || digits(x.mobile.value) === d);
  return r ? r.record_no.value : null;
}

export type Inquiry = {
  source: "HP" | "LINE";
  name: string;
  kana?: string;
  tel: string;
  email?: string;
  zip?: string;
  pref?: string;
  city?: string;
  addr?: string;
  company?: string;
  companyKana?: string;
  kinds: string[];
  firstDate?: string;
  detail: string;
};

async function createClient(c: Inquiry): Promise<string> {
  const d = digits(c.tel);
  const isMobile = /^0[789]0/.test(d);
  const corp = !!c.company;
  const rec: Record<string, { value: string }> = {
    取引先レコードタイプ: { value: corp ? "法人取引先" : "個人取引先" },
    name: { value: corp ? c.company! : c.name },
    name_read: { value: corp ? c.companyKana || c.company! : c.kana || c.name },
    業種: { value: corp ? "その他" : "一般・個人" },
    契約書: { value: "無し" },
    [isMobile ? "mobile" : "tel"]: { value: c.tel },
    email: { value: c.email || "" },
    郵便番号_請求先_: { value: c.zip || "" },
    都道府県_請求先_: { value: c.pref || "" },
    市区郡_請求先_: { value: c.city || "" },
    address1: { value: [c.pref, c.city, c.addr].filter(Boolean).join("") },
    担当者名_法人の場合: { value: corp ? c.name : "" },
    備考: { value: `${c.source === "LINE" ? "LINE" : "ホームページ"}の問い合わせから自動登録（${jstDate()}）` },
  };
  const j = await api("POST", "record.json", { app: APP_CLIENT, record: rec });
  const g = await api("GET", "record.json", { app: APP_CLIENT, id: j.id });
  return g.record.record_no.value;
}

/**
 * **お客様の送信を、項目の不備で失敗させない。**
 * 1回目：全部の項目で登録 → だめなら 2回目：選択肢・ルックアップ以外を落とした最小の形で登録
 * → それもだめなら 3回目：取引先とのひも付けもやめて、名前と電話番号を本文に書いて登録。
 * どこで落としたかは商談内容詳細の先頭に書く（担当があとで直せるように）。
 */
export async function createInquiry(c: Inquiry) {
  if (!process.env.KINTONE_CRM_TOKENS) return { skipped: true as const };
  const isHP = c.source !== "LINE";
  const notes: string[] = [];

  let recNo: string | null = null;
  let isNew = false;
  try {
    recNo = await findClient(c.tel);
    if (!recNo) { recNo = await createClient(c); isNew = true; }
  } catch (e) {
    console.error("crm client failed:", String(e).slice(0, 300));
    notes.push("取引先の自動登録に失敗（手で取引先をひも付けてください）");
    recNo = null;
  }

  const sv = pickService(c.kinds);
  const svName = sv.replace(/^\d+\s*\u3000?/, "");
  const title = `【${isHP ? "HP" : "LINE"}】${c.company || c.name || "（お名前なし）"}様 ${svName}`.slice(0, 120);
  const who = `お名前：${c.company ? c.company + " " : ""}${c.name}${c.kana ? "（" + c.kana + "）" : ""}\n電話：${c.tel}${c.email ? "\nメール：" + c.email : ""}`;
  const base = (extra: string[]) => (extra.length ? `※${extra.join("／")}\n\n` : "") + (c.detail || "");

  const full: Record<string, { value: string }> = {
    商談名: { value: title },
    受付日: { value: jstDate() },
    完成予定日: { value: /^\d{4}-\d{2}-\d{2}$/.test(c.firstDate || "") ? c.firstDate! : jstDate(30) },
    売上部門: { value: "サービス課" },
    ドロップダウン: { value: sv },
    area: { value: pickArea(c.city, c.pref) },
    現調実施済: { value: "未実施" },
    利用きっかけ_0: { value: isHP ? "ホームページ" : "未確認" },
    受理方法: { value: isHP ? "HPから" : "ＬＩＮＥ＠" },
    ALLフェーズ: { value: "受付" },
    作業場所: { value: [c.pref, c.city, c.addr].filter(Boolean).join("").slice(0, 200) },
    商談内容詳細: { value: base(notes) },
  };
  if (recNo) full["record_number１"] = { value: String(recNo) };
  else full["商談内容詳細"] = { value: base(notes) + "\n\n" + who };
  if (isHP) full["広告媒体"] = { value: "ホームページ・検索" };

  const attempts: Record<string, { value: string }>[] = [full];
  // 2回目：選択肢の値を「必ずある値」に寄せ、任意の項目を落とす
  const lite = { ...full };
  delete lite["広告媒体"];
  delete lite["作業場所"];
  lite["area"] = { value: "その他" };
  lite["ドロップダウン"] = { value: SV.other };
  lite["完成予定日"] = { value: jstDate(30) };
  lite["商談内容詳細"] = { value: base([...notes, "一部の項目を自動登録できなかったため本文にまとめました"]) + "\n\n" + who };
  attempts.push(lite);
  // 3回目：取引先のひも付けもやめる
  const bare = { ...lite };
  delete bare["record_number１"];
  bare["商談内容詳細"] = { value: base([...notes, "取引先のひも付けと一部の項目を自動登録できませんでした"]) + "\n\n" + who };
  attempts.push(bare);

  let lastErr: unknown = null;
  for (let i = 0; i < attempts.length; i++) {
    try {
      const j = await api("POST", "record.json", { app: APP_DEAL, record: attempts[i] });
      if (i > 0) console.error("crm deal saved with fallback level", i);
      return { ok: true as const, dealId: j.id as string, clientNo: recNo, newClient: isNew, level: i };
    } catch (e) {
      lastErr = e;
      console.error(`crm deal attempt ${i} failed:`, String(e).slice(0, 300));
    }
  }
  throw lastErr;
}
