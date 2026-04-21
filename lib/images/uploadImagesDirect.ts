import { supabaseBrowser } from "@/lib/supabase/client";

type UploadedFile = {
  path: string;
  fileName: string;
  publicUrl: string;
  contentType: string;
  size: number;
};

const BUCKET = process.env.NEXT_PUBLIC_SUPABASE_BUCKET || "estimate-images";
const MAX_FILES = 10;

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

export async function uploadImagesDirect(
  requestId: string,
  files: File[]
): Promise<UploadedFile[]> {
  if (files.length > MAX_FILES) {
    throw new Error(
      `画像は${MAX_FILES}枚まで添付できます。枚数を減らして再度お試しください。`
    );
  }

  const uploadedFiles: UploadedFile[] = [];

  for (const file of files) {
    const path = buildPath(requestId, file.name);

    const { error } = await supabaseBrowser.storage
      .from(BUCKET)
      .upload(path, file, {
        cacheControl: "3600",
        contentType: file.type || "application/octet-stream",
        upsert: false,
      });

    if (error) {
      throw new Error(
        `画像アップロードに失敗しました: ${file.name} / ${error.message}`
      );
    }

    const { data } = supabaseBrowser.storage.from(BUCKET).getPublicUrl(path);

    uploadedFiles.push({
      path,
      fileName: file.name,
      publicUrl: data.publicUrl,
      contentType: file.type || "",
      size: file.size,
    });
  }

  return uploadedFiles;
}