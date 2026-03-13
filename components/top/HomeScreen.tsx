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
            <div style={heroCatchStyle}>
              LINEで簡単　無料でお見積もり
            </div>

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
                すっきりんが
                <br />
                選ばれる理由
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
  padding: "10px 16px",
  boxSizing: "border-box",
  fontFamily,
  display: "flex",
  alignItems: "center",
};

const wrapStyle: React.CSSProperties = {
  maxWidth: 480,
  width: "100%",
  margin: "0 auto",
};

const panelStyle: React.CSSProperties = {
  background: "#fbf1f4",
  borderRadius: 32,
  padding: "14px 16px 14px",
  boxSizing: "border-box",
  border: "2px solid rgba(251,155,204,0.22)",
};

const heroSectionStyle: React.CSSProperties = {
  marginBottom: 12,
};

const heroCatchStyle: React.CSSProperties = {
  textAlign: "center",
  fontSize: 13,
  lineHeight: 1.4,
  fontWeight: 700,
  color: "var(--pink-strong)",
  marginBottom: 10,
  letterSpacing: "0.02em",
  fontFamily,
};

const heroLogoStyle: React.CSSProperties = {
  width: "100%",
  height: "auto",
  display: "block",
  marginBottom: 10,
};

const introStyle: React.CSSProperties = {
  textAlign: "center",
  padding: "0 8px",
};

const introTitleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: 17,
  lineHeight: 1.35,
  fontWeight: 800,
  color: "var(--text-main)",
  letterSpacing: "0.01em",
  fontFamily,
};

const menuSectionStyle: React.CSSProperties = {
  marginTop: 4,
};

const primaryListStyle: React.CSSProperties = {
  display: "grid",
  gap: 10,
  marginBottom: 12,
};

const primaryButtonStyle: React.CSSProperties = {
  width: "100%",
  border: "3px solid var(--pink-logo)",
  borderRadius: 26,
  background: "#fff9fb",
  color: "var(--text-main)",
  padding: "14px 18px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  textAlign: "left",
  boxShadow: "0 6px 14px rgba(233,30,99,0.06)",
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
  color: "var(--pink-strong)",
  marginBottom: 6,
  fontFamily,
};

const primaryButtonTitleStyle: React.CSSProperties = {
  fontSize: 26,
  lineHeight: 1.1,
  fontWeight: 700,
  color: "var(--text-main)",
  marginBottom: 6,
  letterSpacing: 0,
  wordBreak: "keep-all",
  overflowWrap: "normal",
  fontFamily,
};

const primaryButtonDescStyle: React.CSSProperties = {
  fontSize: 13,
  lineHeight: 1.45,
  fontWeight: 500,
  color: "var(--text-sub)",
  wordBreak: "keep-all",
  fontFamily,
};

const primaryArrowStyle: React.CSSProperties = {
  flexShrink: 0,
  width: 42,
  height: 42,
  borderRadius: "50%",
  background: "var(--pink-logo)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 30,
  lineHeight: 1,
  fontWeight: 400,
  color: "#fff",
};

const subGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 10,
};

const subButtonStyle: React.CSSProperties = {
  border: "2px solid rgba(251,155,204,0.55)",
  borderRadius: 999,
  background: "#fdf4f7",
  color: "var(--text-main)",
  fontSize: 14,
  lineHeight: 1.35,
  fontWeight: 700,
  padding: "13px 12px",
  cursor: "pointer",
  appearance: "none",
  WebkitAppearance: "none",
  fontFamily,
  minHeight: 66,
  textAlign: "center",
};

const subButtonWideStyle: React.CSSProperties = {
  gridColumn: "1 / -1",
  border: "2px solid rgba(251,155,204,0.55)",
  borderRadius: 999,
  background: "#fdf4f7",
  color: "var(--text-main)",
  fontSize: 14,
  lineHeight: 1.35,
  fontWeight: 700,
  padding: "14px 12px",
  cursor: "pointer",
  appearance: "none",
  WebkitAppearance: "none",
  fontFamily,
  textAlign: "center",
};