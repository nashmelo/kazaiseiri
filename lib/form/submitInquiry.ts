import type { FormData, RequestFlow } from "@/types/form";
import type { TenantKey } from "@/lib/tenant/tenantConfig";
import { prepareUploadImages } from "@/lib/images/prepareUploadImages";
import { uploadImagesDirect } from "@/lib/images/uploadImagesDirect";

type ActiveRequestFlow = Exclude<RequestFlow, "">;

type SubmitInquiryArgs = {
  form: FormData;
  requestFlow: ActiveRequestFlow;
  enableImageUpload: boolean;
  tenant: TenantKey;
};

type SubmitInquiryResult = {
  ok?: boolean;
  data?: unknown;
  requestId?: string;
  summaryUrl?: string;
};

type UploadedFile = {
  path: string;
  fileName: string;
  publicUrl: string;
  contentType: string;
  size: number;
};

const MAX_FILES = 10;

function toKintoneDateTime(value: string) {
  if (!value) return "";
  const d = new Date(value);
  if (isNaN(d.getTime())) return "";
  return d.toISOString();
}

function extractErrorMessage(data: any): string {
  if (!data) return "不明なエラー";
  if (typeof data === "string") return data;

  if (data.detail) {
    if (typeof data.detail === "string") return data.detail;
    if (data.detail.message) return data.detail.message;
    if (data.detail.messages) {
      try {
        return JSON.stringify(data.detail.messages, null, 2);
      } catch {
        return String(data.detail.messages);
      }
    }
    try {
      return JSON.stringify(data.detail, null, 2);
    } catch {
      return String(data.detail);
    }
  }

  if (data.message) return data.message;
  if (data.error) return data.error;

  try {
    return JSON.stringify(data, null, 2);
  } catch {
    return String(data);
  }
}

export async function submitInquiry({
  form,
  requestFlow,
  enableImageUpload,
  tenant,
}: SubmitInquiryArgs): Promise<SubmitInquiryResult> {
  const requestId = `REQ-${Date.now()}`;

  let storageFolderPath = "";
  let thumbnailUrl = "";
  let imageCount = 0;
  let imagePathsJson = "[]";
  let allImageUrls = "";

  if (enableImageUpload && form.images && form.images.length > 0) {
    if (form.images.length > MAX_FILES) {
      throw new Error(
        `画像は${MAX_FILES}枚まで添付できます。枚数を減らして再度お試しください。`
      );
    }

    let preparedFiles: File[];

    try {
      preparedFiles = await prepareUploadImages(form.images);

      console.log(
        "prepared images",
        preparedFiles.map((file) => ({
          name: file.name,
          type: file.type,
          size: file.size,
        }))
      );
    } catch (error) {
      console.error("prepareUploadImages error:", error);
      throw new Error(
        "画像の変換に失敗しました。別の画像を選ぶか、もう一度お試しください。"
      );
    }

    if (preparedFiles.length > MAX_FILES) {
      throw new Error(
        `画像は${MAX_FILES}枚まで添付できます。枚数を減らして再度お試しください。`
      );
    }

    let uploadedFiles: UploadedFile[];

    try {
      uploadedFiles = await uploadImagesDirect(requestId, preparedFiles);
    } catch (error) {
      console.error("uploadImagesDirect error:", error);

      const message =
        error instanceof Error
          ? error.message
          : "画像アップロードに失敗しました。枚数を減らして再度お試しください。";

      throw new Error(message);
    }

    if (preparedFiles.length > 0 && uploadedFiles.length === 0) {
      throw new Error(
        "画像のアップロードに失敗しました。枚数を減らして再度お試しください。"
      );
    }

    storageFolderPath =
      uploadedFiles.length > 0
        ? uploadedFiles[0].path.split("/").slice(0, 3).join("/")
        : "";

    thumbnailUrl = uploadedFiles.length > 0 ? uploadedFiles[0].publicUrl : "";
    imageCount = uploadedFiles.length;
    imagePathsJson = JSON.stringify(uploadedFiles);
    allImageUrls = uploadedFiles.map((file) => file.publicUrl).join("\n");
  }

  const isBusiness = requestFlow === "business";
  const isMoving = requestFlow === "moving";

  const payload = {
    tenant,
    name: isBusiness
      ? `${form.contactLastName} ${form.contactFirstName}`.trim()
      : form.name,
    phone: isBusiness ? form.contactPhone : form.phone,
    contactMethod: "LINE",
    inquiryType: isBusiness ? "事業ゴミ" : isMoving ? "引越し" : "家庭ゴミ",
    service: isBusiness
      ? form.service || "事業ゴミ回収"
      : isMoving
      ? form.service || "引越し"
      : form.service,
    roomSize: form.roomSize,

    postalCode: form.postalCode,
    prefecture: form.prefecture,
    city: form.city,
    address1: form.address,

    movingPostalCode: form.movingPostalCode,
    movingPrefecture: form.movingPrefecture,
    movingCity: form.movingCity,
    movingAddress: form.movingAddress,

    buildingType: form.buildingType,
    floor: form.floor,
    parking: form.parking,
    elevator: form.elevator,
    disposalMethod: isMoving ? "" : form.disposalMethod,

    movingBuildingType: form.movingBuildingType,
    movingFloor: form.movingFloor,
    movingParking: form.movingParking,
    movingElevator: form.movingElevator,

    items: form.items,
    movingItems: form.movingItems,
    disposalItems: form.disposalItems,
    notes: form.notes,
    movingNotes: form.movingNotes,
    disposalNotes: form.disposalNotes,

    airconRemoval: "ない",

    pickupDate1: form.pickupDate1,
    pickupDate2: form.pickupDate2,
    pickupDate3: form.pickupDate3,

    pickupDate1Slot: form.pickupDate1Slot,
    pickupDate2Slot: form.pickupDate2Slot,
    pickupDate3Slot: form.pickupDate3Slot,

    businessType: form.businessFormType,
    businessName: form.businessName,

    contactLastName: form.contactLastName,
    contactFirstName: form.contactFirstName,
    contactLastNameKana: form.contactLastNameKana,
    contactFirstNameKana: form.contactFirstNameKana,
    contactPhone: form.contactPhone,
    contactEmail: form.contactEmail,

    receiptDifferent: form.receiptDifferent,
    receiptName: form.receiptName,

    representativeLastName: form.representativeLastName,
    representativeFirstName: form.representativeFirstName,
    representativeLastNameKana: form.representativeLastNameKana,
    representativeFirstNameKana: form.representativeFirstNameKana,
    representativePhone: form.representativePhone,
    representativeEmail: form.representativeEmail,

    requestId,
    storageFolderPath,
    thumbnailUrl,
    imageCount,
    imagePathsJson,
    allImageUrls,
  };

  const response = await fetch("/api/kintone", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(extractErrorMessage(data));
  }

  return {
    ok: true,
    data,
    requestId,
    summaryUrl: data?.summaryUrl || data?.summary_url || undefined,
  };
}