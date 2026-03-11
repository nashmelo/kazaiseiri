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
        <div
          style={{
            textAlign: "center",
            marginBottom: 18,
          }}
        >
          <h1 style={topCatchStyle}>
            片付け・不要品回収ならすっきりん
          </h1>
        </div>

        <div
          style={{
            background: "#ffffff",
            borderRadius: 32,
            padding: "32px 22px 26px",
            boxSizing: "border-box",
            boxShadow: "0 12px 28px rgba(0,0,0,0.08)",
          }}
        >
          <div
            style={{
              textAlign: "center",
              marginBottom: 24,
            }}
          >
            <div
              style={{
                width: 124,
                height: 124,
                margin: "0 auto 20px",
                borderRadius: 26,
                background: "linear-gradient(135deg,#ff6fa9,#ff2d75)",
              }}
            />

            <div style={logoStyle}>
              SUKKIRIN
            </div>

            <div style={leadMiniStyle}>
              最短30秒
            </div>

            <p style={leadTextStyle}>
              片付け・不要品回収を
              <br />
              LINEでカンタン見積り
            </p>
          </div>

          {/* 見積り導線グループ */}
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
                gap: 14,
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
                  家の片付け・粗大ゴミなど
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
  fontSize: 20,
  lineHeight: 1.45,
  fontWeight: 900,
  color: "#1c2b4a",
  letterSpacing: "0.01em",
};

const logoStyle: React.CSSProperties = {
  fontSize: 58,
  lineHeight: 1,
  fontWeight: 900,
  color: "#1c2b4a",
  letterSpacing: "0.04em",
  marginBottom: 18,
  fontFamily:
    '"Arial Rounded MT Bold","Rounded Mplus 1c","Hiragino Maru Gothic ProN","Yu Gothic",sans-serif',
};

const leadMiniStyle: React.CSSProperties = {
  textAlign: "center",
  fontSize: 22,
  lineHeight: 1.3,
  fontWeight: 900,
  color: "#1c2b4a",
  marginBottom: 10,
};

const leadTextStyle: React.CSSProperties = {
  margin: 0,
  textAlign: "center",
  fontSize: 24,
  lineHeight: 1.55,
  fontWeight: 900,
  color: "#1c2b4a",
  letterSpacing: "0.01em",
};

const estimateGroupStyle: React.CSSProperties = {
  background: "#fff6fa",
  border: "3px solid #f4bdd2",
  borderRadius: 28,
  padding: "18px 14px 14px",
  marginBottom: 18,
};

const estimateTitleStyle: React.CSSProperties = {
  textAlign: "center",
  fontSize: 28,
  lineHeight: 1.2,
  fontWeight: 900,
  color: "var(--pink-strong)",
  marginBottom: 8,
};

const estimateSubTextStyle: React.CSSProperties = {
  textAlign: "center",
  fontSize: 14,
  lineHeight: 1.5,
  fontWeight: 800,
  color: "#7a4660",
  marginBottom: 14,
};

const cardButtonStyle: React.CSSProperties = {
  border: "none",
  padding: 0,
  borderRadius: 22,
  overflow: "hidden",
  background: "#ffffff",
  cursor: "pointer",
  boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
};

const cardTopStyle: React.CSSProperties = {
  background: "#f7cf00",
  height: 94,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const iconBoxStyle: React.CSSProperties = {
  fontSize: 40,
  lineHeight: 1,
};

const cardMiddleStyle: React.CSSProperties = {
  background: "#ede5b9",
  padding: "14px 10px 10px",
  fontSize: 22,
  lineHeight: 1.2,
  fontWeight: 900,
  textAlign: "center",
  color: "#1565d8",
};

const cardBottomStyle: React.CSSProperties = {
  background: "#fffdf4",
  padding: "10px 10px 14px",
  fontSize: 12,
  lineHeight: 1.45,
  fontWeight: 800,
  textAlign: "center",
  color: "#4b5563",
};

const yellowButtonStyle: React.CSSProperties = {
  width: "100%",
  border: "none",
  borderRadius: 999,
  background: "#f7cf00",
  color: "#10284d",
  fontSize: 18,
  fontWeight: 900,
  padding: "18px 16px",
  cursor: "pointer",
  marginBottom: 14,
  boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
};

const pinkButtonStyle: React.CSSProperties = {
  width: "100%",
  border: "none",
  borderRadius: 999,
  background: "var(--pink-strong)",
  color: "#fff",
  fontSize: 18,
  fontWeight: 900,
  padding: "18px 16px",
  cursor: "pointer",
  marginBottom: 14,
  boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
};

const whiteButtonStyle: React.CSSProperties = {
  width: "100%",
  borderRadius: 999,
  background: "#fff",
  color: "var(--pink-strong)",
  fontSize: 18,
  fontWeight: 900,
  padding: "18px 16px",
  cursor: "pointer",
  border: "3px solid var(--pink-strong)",
};