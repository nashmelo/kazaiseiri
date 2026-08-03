"use client";

import React, { useEffect, useState } from "react";

/**
 * 選択した画像を、サムネイルで並べて見せる。
 *
 * ## なぜ要るか
 *
 * これまでは「3件の画像を選択中」という文字だけだった。
 * **何を選んだのかが本人にも分からない。**
 *
 * - 同じ写真を二度選んでも気づかない
 * - 撮り損ねた写真が混じっていても気づかない
 * - 上限の10枚を超えたとき、**どれを外すか選べない**（全部選び直すしかなかった）
 *
 * 見えるようにして、1枚ずつ外せるようにする。
 *
 * ## HEIC について
 *
 * iPhoneのHEICは、iOSのSafariやLINEアプリ内ブラウザなら表示できる。
 * だがAndroidやPCのChromeでは表示できず、壊れた画像の記号が出る。
 *
 * **壊れた表示は「アップロードに失敗した」と誤解させる。**
 * 読み込みに失敗したときは、ファイル名を出す枠に差し替える。
 * 送信そのものには影響しない（変換はこの後で行われる）。
 */

type Props = {
  files: File[];
  onRemove: (index: number) => void;
};

export default function ImageThumbnailGrid({ files, onRemove }: Props) {
  const [urls, setUrls] = useState<string[]>([]);
  const [broken, setBroken] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const created = files.map((file) => URL.createObjectURL(file));
    setUrls(created);
    setBroken({});

    // **必ず解放する。** スマートフォンでは10枚分を抱えたままだと重くなる
    return () => {
      created.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [files]);

  if (files.length === 0) {
    return null;
  }

  return (
    <div style={gridStyle}>
      {files.map((file, index) => (
        <div key={`${file.name}-${index}`} style={tileStyle}>
          {broken[index] || !urls[index] ? (
            <div style={fallbackStyle}>
              <div style={fallbackLabelStyle}>写真</div>
              <div style={fallbackNameStyle}>{file.name}</div>
            </div>
          ) : (
            <img
              src={urls[index]}
              alt=""
              style={thumbStyle}
              onError={() =>
                setBroken((prev) => ({ ...prev, [index]: true }))
              }
            />
          )}

          <button
            type="button"
            onClick={() => onRemove(index)}
            style={removeButtonStyle}
            aria-label={`${index + 1}枚目の写真を取り消す`}
          >
            ×
          </button>

          <div style={indexBadgeStyle}>{index + 1}</div>
        </div>
      ))}
    </div>
  );
}

/**
 * 指の当たる大きさを確保するため、3列にしている。
 * 4列にすると1枚あたりが小さくなり、削除ボタンが押しにくい。
 */
const gridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: 8,
  marginTop: 12,
};

const tileStyle: React.CSSProperties = {
  position: "relative",
  width: "100%",
  paddingTop: "100%",
  borderRadius: 8,
  overflow: "hidden",
  background: "#f2f2f2",
  border: "1px solid #e0e0e0",
};

const thumbStyle: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
};

const fallbackStyle: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: 6,
  textAlign: "center",
};

const fallbackLabelStyle: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 600,
  color: "#666",
  marginBottom: 2,
};

const fallbackNameStyle: React.CSSProperties = {
  fontSize: 9,
  color: "#999",
  lineHeight: 1.3,
  wordBreak: "break-all",
  overflow: "hidden",
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
};

/** 44px は指で押せる最小の目安。これより小さくしない */
const removeButtonStyle: React.CSSProperties = {
  position: "absolute",
  top: 0,
  right: 0,
  width: 32,
  height: 32,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "none",
  borderRadius: "0 8px 0 8px",
  background: "rgba(0, 0, 0, 0.55)",
  color: "#fff",
  fontSize: 18,
  lineHeight: 1,
  cursor: "pointer",
  padding: 0,
};

const indexBadgeStyle: React.CSSProperties = {
  position: "absolute",
  left: 4,
  bottom: 4,
  minWidth: 18,
  height: 18,
  padding: "0 5px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 9,
  background: "rgba(0, 0, 0, 0.55)",
  color: "#fff",
  fontSize: 11,
  fontWeight: 600,
};
