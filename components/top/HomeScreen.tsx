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
        padding: "18px 16px 28px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: 480,
          margin: "0 auto",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: 12,
          }}
        >
          <h1 style={topCatchStyle}>
            片付け・不要品回収ならすっきりん
          </h1>
        </div>

        <div
          style={{
            background: "#f8f8f8",
            borderRadius: 30,
            padding: "22px 18px 20px",
            boxSizing: "border-box",
            boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
          }}
        >
          <div
            style={{
              textAlign: "center",
              marginBottom: 16,
            }}
          >
            <div
              style={{
                width: 104,
                height: 104,
                margin: "0 auto 14px",
                borderRadius: 22,
                background: "linear-gradient(135deg,#ff6fa9,#ff2d75)",
              }}
            />

            <div style={logoStyle}>
              SUKKIRIN
            </div>

            <div style={leadMiniStyle}>
              許可業者限定だから安心
            </div>

            <p style={leadTextStyle}>
              片付け・不要品回収を
              <br />
              LINEでカンタン見積り
            </p>
          </div>

          <section style={estimateGroupStyle}>
            <div style={estimateTitleStyle}>
              無料見積りする
            </div>

            <div style={estimateSubTextStyle}>
              ご希望の内容をお選びください
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
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

                <div style={cardBottomStyle}>
                  家の片付け・粗大ゴミ等
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

                <div style={cardBottomStyle}>
                  店舗・事務所・法人回収
                </div>
              </button>
            </div>
          </section>

          <button
            type="button"
            onClick={onOpenReuse}
            style={yellowButtonStyle}
          >
            家電リユース（無償引取）
          </button>

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

const topCatchStyle: React.CSSProperties = {
  margin: 0,
  textAlign: "center",
  fontSize: 17,
  lineHeight: 1.4,
  fontWeight: 900,
  color: "#1c2b4a",
  letterSpacing: "0.01em",
};

const logoStyle: React.CSSProperties = {
  fontSize: 42,
  lineHeight: 1,
  fontWeight: 900,
  color: "#1c2b4a",
  letterSpacing: "0.06em",
  marginBottom: 10,
  fontFamily:
    '"Arial Rounded MT Bold","Rounded Mplus 1c","Hiragino Maru Gothic ProN","Yu Gothic",sans-serif',
};

const leadMiniStyle: React.CSSProperties = {
  textAlign: "center",
  fontSize: 16,
  lineHeight: 1.3,
  fontWeight: 900,
  color: "#1c2b4a",
  marginBottom: 6,
};

const leadTextStyle: React.CSSProperties = {
  margin: 0,
  textAlign: "center",
  fontSize: 17,
  lineHeight: 1.5,
  fontWeight: 900,
  color: "#1c2b4a",
  letterSpacing: "0.01em",
};

const estimateGroupStyle: React.CSSProperties = {
  background: "#fff7fb",
  border: "2px solid #efbfd2",
  borderRadius: 24,
  padding: "14px 12px 12px",
  marginBottom: 14,
};

const estimateTitleStyle: React.CSSProperties = {
  textAlign: "center",
  fontSize: 18,
  lineHeight: 1.2,
  fontWeight: 900,
  color: "var(--pink-strong)",
  marginBottom: 4,
};

const estimateSubTextStyle: React.CSSProperties = {
  textAlign: "center",
  fontSize: 12,
  lineHeight: 1.4,
  fontWeight: 700,
  color: "#8a6070",
  marginBottom: 10,
};

const cardButtonStyle: React.CSSProperties = {
  border: "none",
  padding: 0,
  borderRadius: 20,
  overflow: "hidden",
  background: "#f7cf00",
  cursor: "pointer",
  boxShadow: "0 4px 10px rgba(0,0,0,0.06)",
  display: "block",
  width: "100%",
  appearance: "none",
  WebkitAppearance: "none",
};

const cardTopStyle: React.CSSProperties = {
  background: "#f7cf00",
  height: 78,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const iconBoxStyle: React.CSSProperties = {
  fontSize: 34,
  lineHeight: 1,
};

const cardMiddleStyle: React.CSSProperties = {
  background: "#ede5b9",
  padding: "10px 8px 8px",
  fontSize: 18,
  lineHeight: 1.2,
  fontWeight: 900,
  textAlign: "center",
  color: "#1c2b4a",
};

const cardBottomStyle: React.CSSProperties = {
  background: "#fffdf4",
  padding: "8px 8px 10px",
  fontSize: 11,
  lineHeight: 1.35,
  fontWeight: 700,
  textAlign: "center",
  color: "#4b5563",
};

const yellowButtonStyle: React.CSSProperties = {
  width: "100%",
  border: "none",
  borderRadius: 999,
  background: "#f7cf00",
  color: "#10284d",
  fontSize: 17,
  fontWeight: 900,
  padding: "16px 14px",
  cursor: "pointer",
  marginBottom: 12,
};

const pinkButtonStyle: React.CSSProperties = {
  width: "100%",
  border: "none",
  borderRadius: 999,
  background: "var(--pink-strong)",
  color: "#fff",
  fontSize: 17,
  fontWeight: 900,
  padding: "16px 14px",
  cursor: "pointer",
  marginBottom: 12,
};

const whiteButtonStyle: React.CSSProperties = {
  width: "100%",
  borderRadius: 999,
  background: "#fff",
  color: "var(--pink-strong)",
  fontSize: 17,
  fontWeight: 900,
  padding: "16px 14px",
  cursor: "pointer",
  border: "2px solid var(--pink-strong)",
};