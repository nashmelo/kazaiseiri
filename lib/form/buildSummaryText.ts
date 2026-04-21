// lib/form/buildSummaryText.ts

import type { FormData, RequestFlow } from "@/types/form";

type ActiveRequestFlow = Exclude<RequestFlow, "">;

type BuildSummaryTextArgs = {
  form: FormData;
  requestFlow: ActiveRequestFlow;
  enableImageUpload: boolean;
};

function formatDateTimeJP(value: string) {
  if (!value) return "未入力";

  const d = new Date(value);
  if (isNaN(d.getTime())) return value;

  const y = d.getFullYear();
  const m = d.getMonth() + 1;
  const day = d.getDate();
  const h = d.getHours();
  const min = d.getMinutes().toString().padStart(2, "0");

  return `${y}年${m}月${day}日 ${h}時${min}分`;
}

export function buildSummaryText({
  form,
  requestFlow,
  enableImageUpload,
}: BuildSummaryTextArgs) {
  const isBusiness = requestFlow === "business";
  const isMoving = requestFlow === "moving";
  const isWholeRoom =
    requestFlow === "household" && form.service === "部屋を丸ごと片付け";

  const serviceLabel = isBusiness
    ? form.service || "事業ゴミ回収"
    : form.service || "未入力";

  const inquiryTitle = isBusiness
    ? "事業ゴミ回収"
    : isMoving
      ? "引越し"
      : "粗大ゴミ回収";

  const dateLabel1 = isMoving ? "第一希望日" : "第一希望回収日";
  const dateLabel2 = isMoving ? "第二希望日" : "第二希望回収日";
  const dateLabel3 = isMoving ? "第三希望日" : "第三希望回収日";

  const baseLines = [
    `📩 ${inquiryTitle}のお問い合わせを受け付けました`,
    "",
    "以下の内容で承りました。",
    "内容を確認のうえ、担当者よりご連絡いたします。",
    enableImageUpload ? "" : "※画像はこのトークにそのままお送りください。",
    "",
    "———",
    `■ ${isMoving ? "搬出元" : "回収場所"}`,
    `【郵便番号】${form.postalCode || "未入力"}`,
    `【都道府県】${form.prefecture || "未入力"}`,
    `【市町村】${form.city || "未入力"}`,
    `【住所】${form.address || "未入力"}`,
    `【建物の種類】${form.buildingType || "未入力"}`,
    `【階数】${form.floor || "未入力"}`,
    `【駐車場の有無】${form.parking || "未入力"}`,
    `【エレベーターの有無】${form.elevator || "未入力"}`,
    ...(isBusiness || isMoving
      ? []
      : [`【ゴミの排出方法】${form.disposalMethod || "未入力"}`]),
    ...(isMoving
      ? [
          "",
          "■ 運び先",
          `【郵便番号】${form.movingPostalCode || "未入力"}`,
          `【都道府県】${form.movingPrefecture || "未入力"}`,
          `【市町村】${form.movingCity || "未入力"}`,
          `【住所】${form.movingAddress || "未入力"}`,
          `【建物の種類】${form.movingBuildingType || "未入力"}`,
          `【階数】${form.movingFloor || "未入力"}`,
          `【駐車場の有無】${form.movingParking || "未入力"}`,
          `【エレベーターの有無】${form.movingElevator || "未入力"}`,
        ]
      : []),
    "",
    "■ 依頼内容",
    `【依頼内容】${serviceLabel}`,
    ...(isWholeRoom ? [`【部屋の大きさ】${form.roomSize || "未入力"}`] : []),
    ...(isMoving
      ? [
          `【運ぶ物・個数】${form.movingItems || "未入力"}`,
          `【運ぶ物の補足事項】${form.movingNotes || "未入力"}`,
          `【処分する物・個数】${form.disposalItems || "未入力"}`,
          `【処分する物の補足事項】${form.disposalNotes || "未入力"}`,
        ]
      : [
          `【${
            isWholeRoom ? "片付けする主な家財" : "回収ゴミの品目・個数"
          }】${form.items || "未入力"}`,
          `【その他の物・補足事項】${form.notes || "未入力"}`,
        ]),
    `【添付画像】${
      enableImageUpload
        ? form.images.length > 0
          ? `${form.images.length}件`
          : "なし"
        : "トーク画面へ送付"
    }`,
    "",
    "■ 希望日",
    `【${dateLabel1}】${formatDateTimeJP(form.pickupDate1)}`,
    `【${dateLabel2}】${formatDateTimeJP(form.pickupDate2)}`,
    `【${dateLabel3}】${formatDateTimeJP(form.pickupDate3)}`,
    "",
  ];

  if (isBusiness) {
    const contactName =
      `${form.contactLastName || ""} ${form.contactFirstName || ""}`.trim() ||
      "未入力";
    const contactKana =
      `${form.contactLastNameKana || ""} ${form.contactFirstNameKana || ""}`.trim() ||
      "未入力";
    const representativeName =
      `${form.representativeLastName || ""} ${form.representativeFirstName || ""}`.trim() ||
      "未入力";
    const representativeKana =
      `${form.representativeLastNameKana || ""} ${form.representativeFirstNameKana || ""}`.trim() ||
      "未入力";

    return [
      ...baseLines,
      "■ 申込者情報",
      `【事業形態】${form.businessFormType || "未入力"}`,
      `【屋号 / 法人名】${form.businessName || "未入力"}`,
      `【担当者名】${contactName}`,
      `【担当者名（かな）】${contactKana}`,
      `【担当者電話番号】${form.contactPhone || "未入力"}`,
      `【担当者メールアドレス】${form.contactEmail || "未入力"}`,
      ...(form.receiptDifferent
        ? [
            "",
            "■ 領収書情報",
            `【領収書の宛名】${form.receiptName || "未入力"}`,
            `【代表者名】${representativeName}`,
            `【代表者名（かな）】${representativeKana}`,
            `【代表者電話番号】${form.representativePhone || "未入力"}`,
            `【代表者メールアドレス】${form.representativeEmail || "未入力"}`,
          ]
        : []),
      "",
      "———",
      "",
      "※ このトークでそのままやり取りできます。",
    ].join("\n");
  }

  return [
    ...baseLines,
    "■ 申込者情報",
    `【お名前】${form.name || "未入力"}`,
    `【ふりがな】${form.furigana || "未入力"}`,
    `【電話番号】${form.phone || "未入力"}`,
    "",
    "———",
    "",
    "※ このトークでそのままやり取りできます。",
  ].join("\n");
}