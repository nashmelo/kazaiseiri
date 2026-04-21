import type { FormData, RequestFlow } from "@/types/form";

type ActiveRequestFlow = Exclude<RequestFlow, "">;

type BuildSummaryTextArgs = {
  form: FormData;
  requestFlow: ActiveRequestFlow;
  enableImageUpload: boolean;
};

function formatPickupDateAndSlot(date: string, slot: string) {
  if (!date && !slot) return "未入力";
  if (!date) return slot || "未入力";
  if (!slot) return date;

  const d = new Date(date);
  if (isNaN(d.getTime())) return `${date} ${slot}`;

  const y = d.getFullYear();
  const m = d.getMonth() + 1;
  const day = d.getDate();

  return `${y}年${m}月${day}日 ${slot}`;
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
    : isMoving
    ? "引越し"
    : form.service || "不用品回収";

  const baseLines = [
    `📩 ${
      isBusiness
        ? "事業ゴミ回収"
        : isMoving
        ? "引越し"
        : "片付け・不用品回収"
    }のお問い合わせを受け付けました`,
    "",
    "以下の内容で承りました。",
    "内容を確認のうえ、担当者よりご連絡いたします。",
    enableImageUpload
      ? "※ 追加画像がある場合は、このトークにそのままお送りください。"
      : "※ このトークでそのままやり取りできます。",
    "",
    "———",
    "■ 回収場所",
    `【郵便番号】${form.postalCode || "未入力"}`,
    `【都道府県】${form.prefecture || "未入力"}`,
    `【市町村】${form.city || "未入力"}`,
    `【住所】${form.address || "未入力"}`,
    `【建物の種類】${form.buildingType || "未入力"}`,
    `【階数】${form.floor || "未入力"}`,
    `【駐車場の有無】${form.parking || "未入力"}`,
    `【エレベーターの有無】${form.elevator || "未入力"}`,
    isMoving
      ? ""
      : `【ゴミの排出方法】${form.disposalMethod || "未入力"}`,
    "",
    "■ 依頼内容",
    `【依頼内容】${serviceLabel}`,
    isWholeRoom ? `【間取り】${form.roomSize || "未入力"}` : "",
    isMoving
      ? `【引越しする荷物】${form.movingItems || "未入力"}`
      : isBusiness
      ? `【回収ゴミの内容】${form.items || "未入力"}`
      : `【回収ゴミの品目・個数】${form.items || "未入力"}`,
    isMoving
      ? `【引越しに関する備考】${form.movingNotes || "未入力"}`
      : isBusiness
      ? `【備考】${form.notes || "未入力"}`
      : `【備考】${form.notes || "未入力"}`,
    `【添付画像】${
      form.images.length > 0 ? `${form.images.length}件` : "なし"
    }`,
    "",
    "■ 希望日",
    `【第一希望回収日】${formatPickupDateAndSlot(
      form.pickupDate1,
      form.pickupDate1Slot
    )}`,
    `【第二希望回収日】${formatPickupDateAndSlot(
      form.pickupDate2,
      form.pickupDate2Slot
    )}`,
    `【第三希望回収日】${formatPickupDateAndSlot(
      form.pickupDate3,
      form.pickupDate3Slot
    )}`,
  ].filter(Boolean);

  if (isMoving) {
    return [
      ...baseLines,
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
      "",
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

  if (isBusiness) {
    const contactName =
      `${form.contactLastName || ""} ${form.contactFirstName || ""}`.trim() ||
      "未入力";
    const contactKana =
      `${
        form.contactLastNameKana || ""
      } ${form.contactFirstNameKana || ""}`.trim() || "未入力";
    const representativeName =
      `${
        form.representativeLastName || ""
      } ${form.representativeFirstName || ""}`.trim() || "未入力";
    const representativeKana =
      `${
        form.representativeLastNameKana || ""
      } ${form.representativeFirstNameKana || ""}`.trim() || "未入力";

    return [
      ...baseLines,
      "",
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
            `【代表者メールアドレス】${
              form.representativeEmail || "未入力"
            }`,
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
    "",
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