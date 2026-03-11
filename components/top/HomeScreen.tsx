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
        background: "#8ed0f4",
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
            marginBottom: 20,
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: 18,
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "0.04em",
            }}
          >
            片付け・不用品回収ならすっきりん
          </h1>
        </div>

        <div
          style={{
            background: "#f7f7f7",
            borderRadius: 28,
            padding: "28px 20px 24px",
            boxSizing: "border-box",
            boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
          }}
        >
          <div
            style={{
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            <div
              style={{
                width: 120,
                height: 120,
                margin: "0 auto 16px",
                borderRadius: 20,
                background: "linear-gradient(135deg, #7fcaf2, #0f58a8)",
              }}
            />
            <div
              style={{
                fontSize: 38,
                fontWeight: 900,
                color: "#0d2e6e",
                lineHeight: 1,
                marginBottom: 14,
              }}
            >
              すっきりん
            </div>
            <p
              style={{
                margin: 0,
                fontSize: 15,
                lineHeight: 1.7,
                color: "#222",
                fontWeight: 600,
              }}
            >
              すっきりんは
              <br />
              回収業者の見積もりをカンタン比較
              <br />
              行政許認可業者だから安心
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 14,
              marginBottom: 16,
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
                <div style={cardTitleStyle}>粗大ゴミ回収</div>
                <div style={cardSubTitleStyle}>（市民向け）</div>
              </div>
              <div style={cardBottomStyle}>
                家庭から出てくる不要となった
                <br />
                ゴミの回収の見積り
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
                <div style={cardTitleStyle}>事業ゴミ回収</div>
                <div style={cardSubTitleStyle}>（事業者向け）</div>
              </div>
              <div style={cardBottomStyle}>
                事業所などから出るスポット
                <br />
                定期回収の依頼
              </div>
            </button>
          </div>

          <button
            type="button"
            onClick={onOpenReuse}
            style={yellowButtonStyle}
          >
            家電リユース（無償引取）はこちら
          </button>

          <button
            type="button"
            onClick={onOpenReason}
            style={blueButtonStyle}
          >
            すっきりん が選ばれる理由
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

const cardButtonStyle: React.CSSProperties = {
  border: "none",
  padding: 0,
  borderRadius: 22,
  overflow: "hidden",
  background: "#f7cf00",
  cursor: "pointer",
  boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
};

const cardTopStyle: React.CSSProperties = {
  background: "#f7cf00",
  height: 88,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const iconBoxStyle: React.CSSProperties = {
  fontSize: 36,
  lineHeight: 1,
};

const cardMiddleStyle: React.CSSProperties = {
  background: "#ede5b9",
  padding: "14px 10px 12px",
  textAlign: "center",
};

const cardTitleStyle: React.CSSProperties = {
  fontSize: 22,
  fontWeight: 900,
  color: "#202020",
  lineHeight: 1.2,
};

const cardSubTitleStyle: React.CSSProperties = {
  fontSize: 14,
  fontWeight: 800,
  color: "#202020",
  marginTop: 2,
};

const cardBottomStyle: React.CSSProperties = {
  background: "#f7cf00",
  padding: "14px 10px 18px",
  fontSize: 12,
  lineHeight: 1.45,
  fontWeight: 700,
  textAlign: "center",
  color: "#202020",
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
};

const blueButtonStyle: React.CSSProperties = {
  width: "100%",
  border: "none",
  borderRadius: 999,
  background: "var(--pink-strong)",
  color: "#ffffff",
  fontSize: 18,
  fontWeight: 900,
  padding: "18px 16px",
  cursor: "pointer",
  marginBottom: 14,
};

const whiteButtonStyle: React.CSSProperties = {
  width: "100%",
  borderRadius: 999,
  background: "#ffffff",
  color: "var(--pink-strong)",
  fontSize: 18,
  fontWeight: 900,
  padding: "18px 16px",
  cursor: "pointer",
  border: "3px solid var(--pink-strong)",
};