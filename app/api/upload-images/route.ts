import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";

export const runtime = "nodejs";

const BUCKET = process.env.SUPABASE_BUCKET || "estimate-images";

function sanitizeFileName(fileName: string) {
  const dotIndex = fileName.lastIndexOf(".");
  const base = dotIndex >= 0 ? fileName.slice(0, dotIndex) : fileName;
  const ext = dotIndex >= 0 ? fileName.slice(dotIndex).toLowerCase() : "";

  const safeBase = base
    .normalize("NFKC")
    .replace(/[^\w\-]+/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 50);

  return `${safeBase || "image"}${ext}`;
}

function buildPath(requestId: string, fileName: string) {
  const now = new Date();
  const year = String(now.getFullYear());
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const safeName = sanitizeFileName(fileName);
  const unique = crypto.randomUUID();

  return `${year}/${month}/${requestId}/${unique}_${safeName}`;
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const requestId = String(formData.get("requestId") || "").trim();
    const files = formData
      .getAll("images")
      .filter((v): v is File => v instanceof File && v.size > 0);

    if (!requestId) {
      return NextResponse.json(
        { message: "requestId がありません。" },
        { status: 400 }
      );
    }

    if (files.length === 0) {
      return NextResponse.json(
        { message: "画像が選択されていません。" },
        { status: 400 }
      );
    }

    const uploaded: {
      path: string;
      fileName: string;
      publicUrl: string;
      contentType: string;
      size: number;
    }[] = [];

    for (const file of files) {
      const path = buildPath(requestId, file.name);
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const { error } = await supabaseAdmin.storage
        .from(BUCKET)
        .upload(path, buffer, {
          contentType: file.type || "application/octet-stream",
          upsert: false,
        });

      if (error) {
        console.error("Supabase upload error:", error);
        return NextResponse.json(
          {
            message: `画像アップロードに失敗しました: ${file.name}`,
            detail: error.message,
          },
          { status: 500 }
        );
      }

      const { data: publicData } = supabaseAdmin.storage
        .from(BUCKET)
        .getPublicUrl(path);

      uploaded.push({
        path,
        fileName: file.name,
        publicUrl: publicData.publicUrl,
        contentType: file.type || "",
        size: file.size,
      });
    }

    return NextResponse.json({
      ok: true,
      requestId,
      bucket: BUCKET,
      files: uploaded,
    });
  } catch (error) {
    console.error("upload-images route error:", error);
    return NextResponse.json(
      { message: "サーバーエラーが発生しました。" },
      { status: 500 }
    );
  }
}