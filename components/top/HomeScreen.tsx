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
            </div>
          </section>

          <section style={menuSectionStyle}>
            <div style={primaryListStyle}>
              <button
                type="button"
                onClick={onOpenGarbageEntry}
                style={primaryButtonStyle}
              >
                <div style={primaryButtonGlowStyle} />
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
                <div style={primaryButtonGlowStyle} />
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
  background:
    "linear-gradient(180deg, var(--bg-main) 0%, #f8e8ee 52%, #f8edf1 100%)",
  padding: "18px 16px 32px",
  boxSizing: "border-box",
  fontFamily,
};

const wrapStyle: React.CSSProperties = {
  maxWidth: 480,
  margin: "0 auto",
};

const panelStyle: React.CSSProperties = {
  background: "linear-gradient(180deg, #fbf1f4 0%, #f9edf2 100%)",
  borderRadius: 34,
  padding: "18px 16px 22px",
  boxSizing: "border-box",
  border: "1px solid rgba(251,155,204,0.22)",
  boxShadow: "0 14px 34px rgba(176, 119, 145, 0.08)",
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
  margin: 0,
  fontSize: 18,
  lineHeight: 1.4,
  fontWeight: 800,
  color: "var(--text-main)",
  letterSpacing: "0.01em",
  fontFamily,
};

const menuSectionStyle: React.CSSProperties = {
  marginTop: 10,
};

const primaryListStyle: React.CSSProperties = {
  display: "grid",
  gap: 14,
  marginBottom: 18,
};

const primaryButtonStyle: React.CSSProperties = {
  position: "relative",
  width: "100%",
  border: "2px solid rgba(233,30,99,0.78)",
  borderRadius: 26,
  background:
    "linear-gradient(180deg, #fffdfd 0%, var(--pink-soft) 100%)",
  color: "var(--text-main)",
  padding: "18px 18px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  textAlign: "left",
  boxShadow:
    "0 10px 24px rgba(233,30,99,0.08), inset 0 1px 0 rgba(255,255,255,0.7)",
  appearance: "none",
  WebkitAppearance: "none",
  overflow: "hidden",
};

const primaryButtonGlowStyle: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  background:
    "radial-gradient(circle at 18% 20%, rgba(251,155,204,0.18) 0%, rgba(251,155,204,0.10) 20%, rgba(251,155,204,0) 42%), radial-gradient(circle at 82% 82%, rgba(247,214,226,0.45) 0%, rgba(247,214,226,0.16) 26%, rgba(247,214,226,0) 48%)",
  pointerEvents: "none",
};

const primaryButtonTextWrapStyle: React.CSSProperties = {
  position: "relative",
  zIndex: 1,
  minWidth: 0,
  flex: 1,
  paddingRight: 12,
};

const primaryButtonKickerStyle: React.CSSProperties = {
  fontSize: 11,
  lineHeight: 1.2,
  fontWeight: 700,
  letterSpacing: "0.14em",
  color: "var(--pink-strong)",
  marginBottom: 8,
  fontFamily,
};

const primaryButtonTitleStyle: React.CSSProperties = {
  fontSize: 28,
  lineHeight: 1.1,
  fontWeight: 800,
  color: "var(--text-main)",
  marginBottom: 8,
  letterSpacing: "0.01em",
  wordBreak: "keep-all",
  overflowWrap: "normal",
  fontFamily,
};

const primaryButtonDescStyle: React.CSSProperties = {
  fontSize: 14,
  lineHeight: 1.6,
  fontWeight: 500,
  color: "var(--text-sub)",
  wordBreak: "keep-all",
  fontFamily,
};

const primaryArrowStyle: React.CSSProperties = {
  position: "relative",
  zIndex: 1,
  flexShrink: 0,
  width: 38,
  height: 38,
  borderRadius: "50%",
  background:
    "linear-gradient(180deg, var(--pink-logo) 0%, var(--pink-strong) 100%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 30,
  lineHeight: 1,
  fontWeight: 400,
  color: "#fff",
  boxShadow: "0 6px 16px rgba(233,30,99,0.16)",
};

const subGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 12,
};

const subButtonStyle: React.CSSProperties = {
  border: "1px solid rgba(251,155,204,0.45)",
  borderRadius: 999,
  background:
    "linear-gradient(180deg, #fff8fb 0%, var(--pink-soft) 100%)",
  color: "var(--text-main)",
  fontSize: 15,
  lineHeight: 1.45,
  fontWeight: 700,
  padding: "16px 14px",
  cursor: "pointer",
  boxShadow: "0 6px 14px rgba(189, 128, 154, 0.06)",
  appearance: "none",
  WebkitAppearance: "none",
  fontFamily,
};

const subButtonWideStyle: React.CSSProperties = {
  gridColumn: "1 / -1",
  border: "1px solid rgba(251,155,204,0.45)",
  borderRadius: 999,
  background:
    "linear-gradient(180deg, #fff8fb 0%, var(--pink-soft) 100%)",
  color: "var(--text-main)",
  fontSize: 15,
  lineHeight: 1.45,
  fontWeight: 700,
  padding: "17px 14px",
  cursor: "pointer",
  boxShadow: "0 6px 14px rgba(189, 128, 154, 0.06)",
  appearance: "none",
  WebkitAppearance: "none",
  fontFamily,
};