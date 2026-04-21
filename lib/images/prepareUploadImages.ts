import imageCompression from "browser-image-compression";

type Heic2Any = (options: {
  blob: Blob;
  toType?: string;
  quality?: number;
}) => Promise<Blob | Blob[]>;

const HEIC_TYPES = ["image/heic", "image/heif"];

function isHeic(file: File) {
  const type = (file.type || "").toLowerCase();
  const name = file.name.toLowerCase();

  return (
    HEIC_TYPES.includes(type) ||
    name.endsWith(".heic") ||
    name.endsWith(".heif")
  );
}

function replaceExtension(fileName: string, nextExt: string) {
  const idx = fileName.lastIndexOf(".");
  const base = idx >= 0 ? fileName.slice(0, idx) : fileName;
  return `${base}.${nextExt}`;
}

async function convertHeicToJpeg(file: File): Promise<File> {
  const mod = await import("heic2any");
  const heic2any = mod.default as Heic2Any;

  const result = await heic2any({
    blob: file,
    toType: "image/jpeg",
    quality: 0.9,
  });

  const jpegBlob = Array.isArray(result) ? result[0] : result;

  return new File([jpegBlob], replaceExtension(file.name, "jpg"), {
    type: "image/jpeg",
    lastModified: Date.now(),
  });
}

async function compressImage(file: File): Promise<File> {
  return imageCompression(file, {
    maxSizeMB: 1.2,
    maxWidthOrHeight: 2000,
    useWebWorker: true,
    initialQuality: 0.8,
  });
}

export async function prepareUploadImages(files: File[]): Promise<File[]> {
  const prepared: File[] = [];

  for (const original of files) {
    let file = original;

    if (isHeic(file)) {
      file = await convertHeicToJpeg(file);
    }

    file = await compressImage(file);

    prepared.push(file);
  }

  return prepared;
}