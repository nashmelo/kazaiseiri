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
            <img
              src="/sukkirinlogo.svg"
              alt="すっきりん"
              style={heroLogoStyle}
            />

            <div style={introStyle}>
              <p style={introTitleStyle}>許可業者限定だから安心</p>
              <p style={introTextStyle}>
                ご希望の内容を選んで、まずはお気軽にご相談ください
              </p>
            </div>
          </section>

          <section style={menuSectionStyle}>
            <div style={menuLeadStyle}>ご希望の内容をお選びください</div>

            <div style={primaryListStyle}>
              <button
                type="button"
                onClick={onOpenGarbageEntry}
                style={primaryButtonStyle}
              >
                <div style={primaryButtonTextWrapStyle}>
                  <div style={primaryButtonKickerStyle}>HOUSEHOLD</div>
                  <div style={primaryButtonTitleStyle}>家庭ゴミ</div>
                  <div style={primaryButtonDescStyle}>
                    お家の片付け・粗大ゴミなど
                  </div>
                </div>
                <div style={primaryArrowStyle}>›</div>
              </button>

              <button
                type="button"
                onClick={onOpenBusinessWaste}
                style={primaryButtonStyle}
              >
                <div style={primaryButtonTextWrapStyle}>
                  <div style={primaryButtonKickerStyle}>BUSINESS</div>
                  <div style={primaryButtonTitleStyle}>事業ゴミ</div>
                  <div style={primaryButtonDescStyle}>
                    店舗・事務所・法人回収
                  </div>
                </div>
                <div style={primaryArrowStyle}>›</div>
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
                style={subButtonWideStyle}
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

const fontFamily =
  '"Noto Sans JP","Hiragino Sans","Yu Gothic","Meiryo",sans-serif';

const mainStyle: React.CSSProperties = {
  minHeight: "100vh",
  background: "var(--bg-main)",
  padding: "18px 16px 32px",
  boxSizing: "border-box",
  fontFamily,
};

const wrapStyle: React.CSSProperties = {
  maxWidth: 480,
  margin: "0 auto",
};

const panelStyle: React.CSSProperties = {
  background: "linear-gradient(180deg, #fbeff3 0%, #f9edf2 100%)",
  borderRadius: 32,
  padding: "18px 16px 20px",
  boxSizing: "border-box",
  border: "1px solid rgba(233,30,99,0.08)",
};

const heroSectionStyle: React.CSSProperties = {
  marginBottom: 20,
};

const heroLogoStyle: React.CSSProperties = {
  width: "100%",
  height: "auto",
  display: "block",
  marginBottom: 18,
};

const introStyle: React.CSSProperties = {
  textAlign: "center",
  padding: "0 8px",
};

const introTitleStyle: React.CSSProperties = {
  margin: "0 0 6px",
  fontSize: 18,
  lineHeight: 1.4,
  fontWeight: 900,
  color: "var(--text-main)",
};

const introTextStyle: React.CSSProperties = {
  margin: 0,
  fontSize: 14,
  lineHeight: 1.7,
  fontWeight: 500,
  color: "var(--text-sub)",
};

const menuSectionStyle: React.CSSProperties = {
  marginTop: 16,
};

const menuLeadStyle: React.CSSProperties = {
  textAlign: "center",
  fontSize: 15,
  lineHeight: 1.5,
  fontWeight: 800,
  color: "var(--pink-strong)",
  marginBottom: 14,
};

const primaryListStyle: React.CSSProperties = {
  display: "grid",
  gap: 12,
  marginBottom: 16,
};

const primaryButtonStyle: React.CSSProperties = {
  width: "100%",
  border: "none",
  borderRadius: 24,
  background:
    "linear-gradient(180deg, #f02f78 0%, var(--pink-strong) 62%, #cf1656 100%)",
  color: "#fff",
  padding: "18px 18px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  textAlign: "left",
  boxShadow: "0 12px 24px rgba(233,30,99,0.22)",
  appearance: "none",
  WebkitAppearance: "none",
};

const primaryButtonTextWrapStyle: React.CSSProperties = {
  minWidth: 0,
  flex: 1,
  paddingRight: 12,
};

const primaryButtonKickerStyle: React.CSSProperties = {
  fontSize: 11,
  lineHeight: 1.2,
  fontWeight: 700,
  letterSpacing: "0.14em",
  color: "rgba(255,255,255,0.78)",
  marginBottom: 8,
};

const primaryButtonTitleStyle: React.CSSProperties = {
  fontSize: 32,
  lineHeight: 1.08,
  fontWeight: 900,
  color: "#fff",
  marginBottom: 8,
  letterSpacing: 0,
  wordBreak: "keep-all",
  overflowWrap: "normal",
};

const primaryButtonDescStyle: React.CSSProperties = {
  fontSize: 14,
  lineHeight: 1.6,
  fontWeight: 500,
  color: "rgba(255,255,255,0.94)",
  wordBreak: "keep-all",
};

const primaryArrowStyle: React.CSSProperties = {
  flexShrink: 0,
  width: 34,
  height: 34,
  borderRadius: "50%",
  background: "rgba(255,255,255,0.16)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 28,
  lineHeight: 1,
  fontWeight: 400,
  color: "#fff",
};

const subGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 12,
};

const subButtonStyle: React.CSSProperties = {
  border: "1px solid rgba(233,30,99,0.12)",
  borderRadius: 999,
  background: "var(--pink-soft)",
  color: "var(--text-main)",
  fontSize: 15,
  lineHeight: 1.4,
  fontWeight: 700,
  padding: "16px 12px",
  cursor: "pointer",
  appearance: "none",
  WebkitAppearance: "none",
};

const subButtonWideStyle: React.CSSProperties = {
  gridColumn: "1 / -1",
  border: "1px solid rgba(233,30,99,0.12)",
  borderRadius: 999,
  background: "var(--pink-soft)",
  color: "var(--text-main)",
  fontSize: 15,
  lineHeight: 1.4,
  fontWeight: 700,
  padding: "16px 12px",
  cursor: "pointer",
  appearance: "none",
  WebkitAppearance: "none",
};