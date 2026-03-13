import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const domain = process.env.KINTONE_DOMAIN;
    const app = process.env.KINTONE_APP_ID;
    const token = process.env.KINTONE_API_TOKEN;

    if (!domain || !app || !token) {
      return NextResponse.json(
        { error: "kintone環境変数が未設定です" },
        { status: 500 }
      );
    }

    const record = {
      // 既存
      name: { value: body.name || "" },
      phone: { value: body.phone || "" },
      contactMethod: { value: body.contactMethod || "" },
      service: { value: body.service || "" },

      postalCode: { value: body.postalCode || "" },
      prefecture: { value: body.prefecture || "" },
      city: { value: body.city || "" },
      address: { value: body.address1 || "" },

      house: { value: body.buildingType || "" },
      park: { value: body.parking || "" },
      elevator: { value: body.elevator || "" },

      detail: { value: body.items || "" },
      airConditioner: { value: body.airconRemoval || "" },

      pickupDate1: { value: body.pickupDate1 || "" },
      pickupDate2: { value: body.pickupDate2 || "" },
      pickupDate3: { value: body.pickupDate3 || "" },

      // 追加
      inquiry_type: { value: body.inquiryType || "" },
      disposal_method: { value: body.disposalMethod || "" },
      notes: { value: body.notes || "" },

      business_type: { value: body.businessType || "" },
      business_name: { value: body.businessName || "" },

      contact_last_name: { value: body.contactLastName || "" },
      contact_first_name: { value: body.contactFirstName || "" },
      contact_last_name_kana: { value: body.contactLastNameKana || "" },
      contact_first_name_kana: { value: body.contactFirstNameKana || "" },
      contact_phone: { value: body.contactPhone || "" },
      contact_email: { value: body.contactEmail || "" },

      receipt_different: {
      value: body.receiptDifferent ? ["あり"] : []
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
    };

    console.log("kintone record:", record);

    const res = await fetch(`${domain}/k/v1/record.json`, {
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
      return NextResponse.json(
        { error: "kintone登録失敗", detail: data },
        { status: res.status }
      );
    }

    return NextResponse.json({ ok: true, data });
  } catch (err) {
    return NextResponse.json(
      { error: "server error", detail: String(err) },
      { status: 500 }
    );
  }
}