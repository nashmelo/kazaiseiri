/**
 * 見積もり依頼を識別する ID。
 *
 * ## これまでの問題
 *
 * `REQ-${Date.now()}` で生成していた。つまり **時刻さえ分かれば推測できる。**
 *
 * `/summary/[requestId]` には認証がなく、この ID を知っていれば
 * 誰でも依頼者の部屋の写真を見られる。ミリ秒とはいえ、
 * 「◯月◯日の午前中に申し込んだ人」の範囲を総当たりすれば到達しうる。
 *
 * 部屋の中の写真は、住所と生活の様子がそのまま写る。
 * 推測できる ID で保護したことにしてはいけない。
 *
 * ## いまの形
 *
 * `REQ-<時刻>-<ランダム12桁>`
 *
 * 先頭に時刻を残しているのは、kintone 上で並べ替えたときに
 * 時系列が保たれるようにするため。既存のレコードとも同じ接頭辞でそろう。
 * 推測を防ぐのは後半のランダム部分である。
 */

/** 依頼IDの形式。旧形式（ランダム部なし）も読み取りだけは許す */
const REQUEST_ID_PATTERN = /^REQ-\d{10,16}(-[0-9a-f]{12})?$/;

/** 新しい依頼IDを作る */
export function createRequestId(): string {
  const random = crypto
    .randomUUID()
    .replace(/-/g, "")
    .slice(0, 12);

  return `REQ-${Date.now()}-${random}`;
}

/**
 * 依頼IDとして受け入れてよい形かを確かめる。
 *
 * **外部から渡された値は、必ずこれを通してから使うこと。**
 * kintone のクエリ文字列へ組み立てる際、検証せずに埋め込むと
 * 引用符を含む値でクエリを改変され、他人のレコードを引ける。
 */
export function isValidRequestId(value: unknown): value is string {
  return typeof value === "string" && REQUEST_ID_PATTERN.test(value);
}
