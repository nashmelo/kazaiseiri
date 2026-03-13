"use client";

import React from "react";

type HomeScreenProps = {
  onOpenGarbageEntry: () => void;
  onOpenBusinessWaste: () => void;
  onOpenFaq: () => void;
  onOpenReason: () => void;
  onOpenRegion: () => void;
};

export default function HomeScreen({
  onOpenGarbageEntry,
  onOpenBusinessWaste,
  onOpenFaq,
  onOpenReason,
  onOpenRegion,
}: HomeScreenProps) {
  return (
    <main style={mainStyle}>
      <div style={wrapStyle}>
        <div style={panelStyle}>
          <section style={heroSectionStyle}>
            <div style={heroLogoWrapStyle}>
              <img
                src="/sukkirinlogo.svg"
                alt="すっきりん"
                style={heroLogoStyle}
              />
            </div>

            <h1 style={topCatchStyle}>片付け・不要品回収ならすっきりん</h1>

            <div style={trustBoxStyle}>
              <p style={trustTitleStyle}>許可業者限定だから安心</p>
              <p style={trustTextStyle}>片付け・不要品回収を安心してご相談いただけます</p>
            </div>
          </section>

          <section>
            <div style={menuLeadWrapStyle}>
              <span style={menuLeadStyle}>ご希望の内容をお選びください</span>
            </div>

            <div style={primaryGridStyle}>
              <button
                type="button"
                onClick={onOpenGarbageEntry}
                style={primaryCardStyle}
              >
                <div style={cardLabelStyle}>HOUSEHOLD</div>
                <div style={primaryCardTitleStyle}>家庭ゴミ</div>
                <div style={primaryCardTextStyle}>
                  お家の片付け・粗大ゴミなど
                </div>
              </button>

              <button
                type="button"
                onClick={onOpenBusinessWaste}
                style={primaryCardStyle}
              >
                <div style={cardLabelStyle}>BUSINESS</div>
                <div style={primaryCardTitleStyle}>事業ゴミ</div>
                <div style={primaryCardTextStyle}>
                  店舗・事務所・法人回収
                </div>
              </button>
            </div>

            <div style={subGridStyle}>
              <button type="button" onClick={onOpenFaq} style={subButtonStyle}>
                よくある質問
              </button>

              <button
                type="button"
                onClick={onOpenReason}
                style={subButtonStyle}
              >
                すっきりんが選ばれる理由
              </button>

              <button
                type="button"
                onClick={onOpenRegion}
                style={wideButtonStyle}
              >
                サービス展開地域
              </button>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

const mainStyle: React.CSSProperties = {
  minHeight: "100vh",
  background: "#f7f4f5",
  padding: "18px 16px 32px",
  boxSizing: "border-box",
};

const wrapStyle: React.CSSProperties = {
  maxWidth: 480,
  margin: "0 auto",
};

const panelStyle: React.CSSProperties = {
  background: "#fcfafb",
  borderRadius: 30,
  padding: "18px 14px 20px",
  boxSizing: "border-box",
  boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
  border: "1px solid #f0e5ea",
};

const heroSectionStyle: React.CSSProperties = {
  marginBottom: 18,
};

const heroLogoWrapStyle: React.CSSProperties = {
  background: "#f8d9e6",
  borderRadius: 26,
  padding: "12px",
  marginBottom: 16,
};

const heroLogoStyle: React.CSSProperties = {
  width: "100%",
  height: "auto",
  display: "block",
  borderRadius: 18,
};

const topCatchStyle: React.CSSProperties = {
  margin: "0 0 16px",
  textAlign: "center",
  fontSize: 17,
  lineHeight: 1.45,
  fontWeight: 900,
  color: "#1f2d4f",
  letterSpacing: "0.01em",
};

const trustBoxStyle: React.CSSProperties = {
  background: "#ffffff",
  border: "1.5px solid #eed6df",
  borderRadius: 24,
  padding: "18px 16px",
  textAlign: "center",
};

const trustTitleStyle: React.CSSProperties = {
  margin: "0 0 8px",
  fontSize: 17,
  lineHeight: 1.35,
  fontWeight: 900,
  color: "#1f2d4f",
};

const trustTextStyle: React.CSSProperties = {
  margin: 0,
  fontSize: 14,
  lineHeight: 1.6,
  fontWeight: 700,
  color: "#44506b",
};

const menuLeadWrapStyle: React.CSSProperties = {
  textAlign: "center",
  marginBottom: 14,
};

const menuLeadStyle: React.CSSProperties = {
  display: "inline-block",
  background: "#fff",
  color: "#dd5d93",
  fontWeight: 900,
  fontSize: 15,
  lineHeight: 1.4,
  padding: "8px 16px",
  borderRadius: 999,
  border: "1px solid #f1d8e2",
};

const primaryGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 12,
  marginBottom: 14,
};

const primaryCardStyle: React.CSSProperties = {
  border: "1px solid #dfe4ee",
  borderRadius: 22,
  padding: "18px 14px",
  cursor: "pointer",
  textAlign: "left",
  minHeight: 150,
  background: "#ffffff",
  boxShadow: "0 6px 16px rgba(0,0,0,0.04)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  appearance: "none",
  WebkitAppearance: "none",
};

const cardLabelStyle: React.CSSProperties = {
  fontSize: 10,
  lineHeight: 1.2,
  fontWeight: 800,
  letterSpacing: "0.12em",
  color: "#d46f98",
  marginBottom: 10,
};

const primaryCardTitleStyle: React.CSSProperties = {
  fontSize: 28,
  lineHeight: 1.1,
  fontWeight: 900,
  color: "#1f2d4f",
  marginBottom: 10,
};

const primaryCardTextStyle: React.CSSProperties = {
  fontSize: 13,
  lineHeight: 1.6,
  fontWeight: 700,
  color: "#5c667d",
};

const subGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 12,
};

const subButtonStyle: React.CSSProperties = {
  border: "1px solid #dfe4ee",
  borderRadius: 999,
  background: "#ffffff",
  color: "#1f2d4f",
  fontSize: 16,
  fontWeight: 900,
  padding: "16px 14px",
  cursor: "pointer",
  boxShadow: "0 6px 16px rgba(0,0,0,0.04)",
};

const wideButtonStyle: React.CSSProperties = {
  gridColumn: "1 / -1",
  border: "1px solid #dfe4ee",
  borderRadius: 999,
  background: "#ffffff",
  color: "#1f2d4f",
  fontSize: 16,
  fontWeight: 900,
  padding: "16px 14px",
  cursor: "pointer",
  boxShadow: "0 6px 16px rgba(0,0,0,0.04)",
};