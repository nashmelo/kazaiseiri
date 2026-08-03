/**
 * 添付画像の受け入れ条件。
 *
 * ここに集約する理由：
 * これまで household / business / moving の3フローがそれぞれ定数と判定を持っており、
 * **household だけ拡張子のフォールバックが抜けていた。**
 * その結果、iOSが `file.type` を空文字で返すケース（HEIC、LINEアプリ内ブラウザ等）で
 * 正常な写真が「画像ファイルのみ添付できます」で弾かれていた。
 *
 * 枚数の上限も画面側20枚・送信側10枚とずれており、
 * 11枚以上選ぶと最後の送信で落ちていた。
 *
 * 同じ規則を3か所で書くと必ずずれる。判定はこのファイルだけを見ること。
 */

/** 一度に添付できる枚数。**画面・送信の両方でこの値を使う** */
export const MAX_FILES = 10;

/** 1枚あたりの上限（変換前） */
export const MAX_FILE_SIZE = 10 * 1024 * 1024;

export const ALLOWED_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
];

const ALLOWED_EXTENSIONS = [
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".heic",
  ".heif",
];

/**
 * 画像として受け入れてよいか。
 *
 * **MIMEタイプだけで判定してはいけない。**
 * iOSはHEICや、アプリ内ブラウザ経由の選択で `file.type` を空文字にすることがある。
 * 同じ端末でも撮り方・選び方で入ったり入らなかったりするため、
 * MIMEだけで弾くと「たまに失敗する」という症状になる。
 */
export function isAllowedImage(file: File): boolean {
  const type = (file.type || "").toLowerCase();
  const name = (file.name || "").toLowerCase();

  if (ALLOWED_TYPES.includes(type)) return true;
  if (ALLOWED_EXTENSIONS.some((ext) => name.endsWith(ext))) return true;

  // 拡張子もMIMEも取れないが image/ で始まるものは通す
  return type.startsWith("image/");
}

/** サイズが上限に収まっているか */
export function isWithinSizeLimit(file: File): boolean {
  return file.size <= MAX_FILE_SIZE;
}

export const IMAGE_TYPE_ERROR = "画像ファイルのみ添付できます。";
export const IMAGE_SIZE_ERROR = "1枚あたり10MB以下の画像を選択してください。";
export const IMAGE_COUNT_ERROR = `画像は最大${MAX_FILES}枚までです。`;
