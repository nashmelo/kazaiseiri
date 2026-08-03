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

/**
 * ブラウザに次の描画の機会を与える。
 *
 * heic2any は Web Worker を使わずメインスレッドで動くため、
 * 連続で回すと画面が固まったように見える。
 * 1枚ごとに制御を返して、進捗の表示が更新されるようにする。
 */
function yieldToBrowser(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 0));
}

export type PrepareProgress = {
  /** 処理が終わった枚数 */
  done: number;
  /** 全体の枚数 */
  total: number;
  /** いま処理しているファイル名 */
  current: string;
};

export type PrepareResult = {
  /** 変換・圧縮に成功したファイル */
  files: File[];
  /** 失敗したファイル名。**1枚失敗しても全体は止めない** */
  failed: string[];
};

/**
 * 添付画像を変換・圧縮する。
 *
 * ## 逐次で処理する理由
 *
 * 並列にするとスマートフォンのメモリを食い潰してタブごと落ちる。
 * HEIC変換は特に重いため、1枚ずつ順に処理する。
 *
 * ## 1枚失敗しても止めない理由
 *
 * これは見積もりの申し込みフォームであり、**画像は補助情報**にすぎない。
 * 1枚の変換失敗で申し込み全体を諦めさせるのは損失が大きい。
 * 失敗したファイル名を返すので、呼び出し側で扱いを決めること。
 */
export async function prepareUploadImages(
  files: File[],
  onProgress?: (progress: PrepareProgress) => void
): Promise<PrepareResult> {
  const prepared: File[] = [];
  const failed: string[] = [];

  for (let index = 0; index < files.length; index += 1) {
    const original = files[index];

    onProgress?.({
      done: index,
      total: files.length,
      current: original.name,
    });

    // 進捗の表示を描画させてから重い処理に入る
    await yieldToBrowser();

    try {
      let file = original;

      if (isHeic(file)) {
        file = await convertHeicToJpeg(file);
      }

      file = await compressImage(file);
      prepared.push(file);
    } catch (error) {
      console.error("prepareUploadImages: failed", original.name, error);
      failed.push(original.name);
    }
  }

  onProgress?.({
    done: files.length,
    total: files.length,
    current: "",
  });

  return { files: prepared, failed };
}
