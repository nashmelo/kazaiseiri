"use client";

import React from "react";

type HomeScreenProps = {
  onOpenGarbageEntry: () => void;
  onOpenBusinessWaste: () => void;
  onOpenReuse: () => void;
  onOpenReason: () => void;
  onOpenRegion: () => void;
};

export default function HomeScreen({
  onOpenGarbageEntry,
  onOpenBusinessWaste,
  onOpenReuse,
  onOpenReason,
  onOpenRegion,
}: HomeScreenProps) {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "var(--bg-main)",
        padding: "24px 16px 40px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: 480,
          margin: "0 auto",
        }}
      >
        {/* キャッチコピー */}
        <div
          style={{
            textAlign: "center",
            marginBottom: 18,
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: 20,
              fontWeight: 900,
              color: "#1c2b4a",
            }}
          >
            片付け・不用品回収ならすっきりん
          </h1>
        </div>

        <div
          style={{
            background: "#ffffff",
            borderRadius: 28,
            padding: "30px 22px 26px",
            boxSizing: "border-box",
            boxShadow: "0 10px 24px rgba(0,0,0,0.08)",
          }}
        >
          {/* ロゴ */}
          <div
            style={{
              textAlign: "center",
              marginBottom: 22,
            }}
          >
            <div
              style={{
                width: 120,
                height: 120,
                margin: "0 auto 18px",
                borderRadius: 22,
                background: "linear-gradient(135deg,#ff6fa9,#ff2d75)",
              }}
            />

            <div
              style={{
                fontSize: 40,
                fontWeight: 900,
                color: "#1c2b4a",
                letterSpacing: "0.06em",
                marginBottom: 12,
              }}
            >
              SUKKIRIN
            </div>

            <div
              style={{
                fontSize: 18,
                fontWeight: 800,
                marginBottom: 8,
              }}
            >
              最短30秒
            </div>

            <p
              style={{
                margin: 0,
                fontSize: 16,
                lineHeight: 1.7,
                color: "#333",
              }}
            >
              粗大ゴミ回収を
              <br />
              LINEでカンタン見積り
            </p>
          </div>

          {/* 見出し（ボタンではない） */}
          <div style={estimateTitleStyle}>
            無料見積りする
          </div>

          {/* カテゴリ選択 */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 14,
              marginBottom: 18,
            }}
          >
            <button
              type="button"
              onClick={onOpenGarbageEntry}
              style={cardButtonStyle}
            >
              <div style={cardTopStyle}>
                <div style={iconBoxStyle}>🏠</div>
              </div>

              <div style={cardMiddleStyle}>
                家庭のゴミ
              </div>
            </button>

            <button
              type="button"
              onClick={onOpenBusinessWaste}
              style={cardButtonStyle}
            >
              <div style={cardTopStyle}>
                <div style={iconBoxStyle}>🏢</div>
              </div>

              <div style={cardMiddleStyle}>
                事業ゴミ
              </div>
            </button>
          </div>

          {/* 家電リユース */}
          <button
            type="button"
            onClick={onOpenReuse}
            style={yellowButtonStyle}
          >
            家電リユース（無償引取）
          </button>

          {/* その他 */}
          <button
            type="button"
            onClick={onOpenReason}
            style={pinkButtonStyle}
          >
            すっきりんが選ばれる理由
          </button>

          <button
            type="button"
            onClick={onOpenRegion}
            style={whiteButtonStyle}
          >
            サービス展開地域
          </button>
        </div>
      </div>
    </main>
  );
}

const estimateTitleStyle: React.CSSProperties = {
  width: "100%",
  textAlign: "center",
  fontSize: 20,
  fontWeight: 900,
  color: "var(--pink-strong)",
  marginBottom: 14,
};

const cardButtonStyle: React.CSSProperties = {
  border: "none",
  padding: 0,
  borderRadius: 22,
  overflow: "hidden",
  background: "#f7cf00",
  cursor: "pointer",
};

const cardTopStyle: React.CSSProperties = {
  background: "#f7cf00",
  height: 90,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const iconBoxStyle: React.CSSProperties = {
  fontSize: 38,
};

const cardMiddleStyle: React.CSSProperties = {
  background: "#ede5b9",
  padding: "14px",
  fontSize: 18,
  fontWeight: 900,
  textAlign: "center",
};

const yellowButtonStyle: React.CSSProperties = {
  width: "100%",
  border: "none",
  borderRadius: 999,
  background: "#f7cf00",
  color: "#10284d",
  fontSize: 18,
  fontWeight: 900,
  padding: "18px",
  cursor: "pointer",
  marginBottom: 14,
};

const pinkButtonStyle: React.CSSProperties = {
  width: "100%",
  border: "none",
  borderRadius: 999,
  background: "var(--pink-strong)",
  color: "#fff",
  fontSize: 18,
  fontWeight: 900,
  padding: "18px",
  cursor: "pointer",
  marginBottom: 14,
};

const whiteButtonStyle: React.CSSProperties = {
  width: "100%",
  borderRadius: 999,
  background: "#fff",
  color: "var(--pink-strong)",
  fontSize: 18,
  fontWeight: 900,
  padding: "18px",
  cursor: "pointer",
  border: "3px solid var(--pink-strong)",
};