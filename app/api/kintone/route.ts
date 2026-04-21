import { NextRequest, NextResponse } from "next/server";

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

function normalizeDomain(domain: string): string {
  if (domain.startsWith("http://") || domain.startsWith("https://")) {
    return domain;
  }
  return `https://${domain}`;
}

function normalizeAppBaseUrl(url?: string): string {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url.replace(/\/$/, "");
  }
  return `https://${url.replace(/\/$/, "")}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const domain = process.env.KINTONE_DOMAIN;
    const app = process.env.KINTONE_APP_ID;
    const token = process.env.KINTONE_API_TOKEN;
    const appBaseUrl = normalizeAppBaseUrl(process.env.NEXT_PUBLIC_APP_URL);

    if (!domain || !app || !token) {
      return NextResponse.json(
        { error: "kintone環境変数が未設定です" },
        { status: 500 }
      );
    }

    const baseUrl = normalizeDomain(domain);

    const itemsText = stringifyItems(body.items);
    const movingItemsText = stringifyItems(body.movingItems);
    const disposalItemsText = stringifyItems(body.disposalItems);

    const tenant = body.tenant || "default";
    const requestId = body.requestId || "";

    const summaryUrl =
      appBaseUrl && requestId
        ? `${appBaseUrl}/summary/${requestId}?tenant=${encodeURIComponent(
            tenant
          )}`
        : "";

    console.log("appBaseUrl:", appBaseUrl);
    console.log("tenant:", tenant);
    console.log("requestId:", requestId);
    console.log("summaryUrl:", summaryUrl);

    const record = {
      name: { value: body.name || "" },
      phone: { value: body.phone || "" },
      contactMethod: { value: body.contactMethod || "" },
      service: { value: body.service || "" },

      postalCode: { value: body.postalCode || "" },
      prefecture: { value: body.prefecture || "" },
      city: { value: body.city || "" },
      address: { value: body.address1 || "" },

      house: { value: body.buildingType || "" },
      floor: { value: body.floor || "" },
      park: { value: body.parking || "" },
      elevator: { value: body.elevator || "" },

      detail: { value: itemsText },
      room_size: { value: body.roomSize || "" },
      airConditioner: { value: body.airconRemoval || "" },

      pickupDate1: { value: body.pickupDate1 || "" },
      pickupDate2: { value: body.pickupDate2 || "" },
      pickupDate3: { value: body.pickupDate3 || "" },

      pickupDate1Slot: { value: body.pickupDate1Slot || "" },
      pickupDate2Slot: { value: body.pickupDate2Slot || "" },
      pickupDate3Slot: { value: body.pickupDate3Slot || "" },

      inquiry_type: { value: body.inquiryType || "" },
      disposal_method: { value: body.disposalMethod || "" },
      notes: { value: body.notes || "" },
      furigana: { value: body.furigana || "" },

      business_type: { value: body.businessType || "" },
      business_name: { value: body.businessName || "" },

      contact_last_name: { value: body.contactLastName || "" },
      contact_first_name: { value: body.contactFirstName || "" },
      contact_last_name_kana: { value: body.contactLastNameKana || "" },
      contact_first_name_kana: { value: body.contactFirstNameKana || "" },
      contact_phone: { value: body.contactPhone || "" },
      contact_email: { value: body.contactEmail || "" },

      receipt_different: {
        value: body.receiptDifferent ? ["あり"] : [],
      },

      receipt_name: { value: body.receiptName || "" },

      representative_last_name: {
        value: body.representativeLastName || "",
      },
      representative_first_name: {
        value: body.representativeFirstName || "",
      },
      representative_last_name_kana: {
        value: body.representativeLastNameKana || "",
      },
      representative_first_name_kana: {
        value: body.representativeFirstNameKana || "",
      },
      representative_phone: { value: body.representativePhone || "" },
      representative_email: { value: body.representativeEmail || "" },

      moving_postal_code: { value: body.movingPostalCode || "" },
      moving_prefecture: { value: body.movingPrefecture || "" },
      moving_city: { value: body.movingCity || "" },
      moving_address: { value: body.movingAddress || "" },

      moving_building_type: { value: body.movingBuildingType || "" },
      moving_floor: { value: body.movingFloor || "" },
      moving_parking: { value: body.movingParking || "" },
      moving_elevator: { value: body.movingElevator || "" },

      moving_items: { value: movingItemsText },
      moving_notes: { value: body.movingNotes || "" },

      disposal_items: { value: disposalItemsText },
      disposal_notes: { value: body.disposalNotes || "" },

      request_id: { value: requestId },
      storage_folder_path: { value: body.storageFolderPath || "" },
      thumbnail_url: { value: body.thumbnailUrl || "" },
      image_count: { value: Number(body.imageCount || 0) },
      image_paths_json: { value: body.imagePathsJson || "" },
      all_image_urls: { value: body.allImageUrls || "" },

      summary_url: { value: summaryUrl },
    };

    console.log("kintone request body:", body);
    console.log("kintone record:", record);

    const res = await fetch(`${baseUrl}/k/v1/record.json`, {
      method: "POST",
      headers: {
        "X-Cybozu-API-Token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        app: Number(app),
        record,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("kintone error response:", data);
      return NextResponse.json(
        { error: "kintone登録失敗", detail: data },
        { status: res.status }
      );
    }

    return NextResponse.json({
      ok: true,
      data,
      requestId,
      summaryUrl,
    });
  } catch (err) {
    console.error("server error:", err);
    return NextResponse.json(
      { error: "server error", detail: String(err) },
      { status: 500 }
    );
  }
}