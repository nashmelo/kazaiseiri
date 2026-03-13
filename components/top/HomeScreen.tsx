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

            <div style={trustBoxStyle}>
              <p style={trustTitleStyle}>許可業者限定だから安心</p>
              <p style={trustTextStyle}>まずは内容を選んでご相談ください</p>
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
                <div style={primaryCardInnerStyle}>
                  <div style={cardKickerStyle}>HOUSEHOLD</div>
                  <div style={primaryCardTitleStyle}>家庭ゴミ</div>
                  <div style={primaryCardTextStyle}>
                    お家の片付け・粗大ゴミなど
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={onOpenBusinessWaste}
                style={primaryCardStyle}
              >
                <div style={primaryCardInnerStyle}>
                  <div style={cardKickerStyle}>BUSINESS</div>
                  <div style={primaryCardTitleStyle}>事業ゴミ</div>
                  <div style={primaryCardTextStyle}>
                    店舗・事務所・法人回収
                  </div>
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
                style={wideSubButtonStyle}
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

const commonFontFamily =
  '"Noto Sans JP","Hiragino Sans","Yu Gothic","Meiryo",sans-serif';

const mainStyle: React.CSSProperties = {
  minHeight: "100vh",
  background:
    "linear-gradient(180deg, var(--bg-main) 0%, #f8e8ee 46%, #f7ebf0 100%)",
  padding: "18px 16px 32px",
  boxSizing: "border-box",
  fontFamily: commonFontFamily,
};

const wrapStyle: React.CSSProperties = {
  maxWidth: 480,
  margin: "0 auto",
};

const panelStyle: React.CSSProperties = {
  background: "linear-gradient(180deg, #fbeef3 0%, #f9edf2 100%)",
  borderRadius: 34,
  padding: "18px 14px 20px",
  boxSizing: "border-box",
  border: "1px solid rgba(233,30,99,0.08)",
  boxShadow: "0 20px 44px rgba(140, 86, 110, 0.10)",
};

const heroSectionStyle: React.CSSProperties = {
  marginBottom: 20,
};

const heroLogoWrapStyle: React.CSSProperties = {
  background:
    "linear-gradient(135deg, #f4bdd0 0%, var(--pink-main) 42%, var(--pink-soft) 100%)",
  borderRadius: 30,
  padding: "14px",
  marginBottom: 18,
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.45)",
};

const heroLogoStyle: React.CSSProperties = {
  width: "100%",
  height: "auto",
  display: "block",
  borderRadius: 22,
};

const trustBoxStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.72)",
  border: "2px solid rgba(233,30,99,0.10)",
  borderRadius: 26,
  padding: "18px 18px 16px",
  textAlign: "center",
  boxShadow: "0 10px 24px rgba(165, 108, 132, 0.07)",
};

const trustTitleStyle: React.CSSProperties = {
  margin: "0 0 6px",
  fontSize: 18,
  lineHeight: 1.35,
  fontWeight: 800,
  color: "var(--text-main)",
  letterSpacing: "0.01em",
  fontFamily: commonFontFamily,
};

const trustTextStyle: React.CSSProperties = {
  margin: 0,
  fontSize: 14,
  lineHeight: 1.6,
  fontWeight: 500,
  color: "var(--text-sub)",
  fontFamily: commonFontFamily,
};

const menuLeadWrapStyle: React.CSSProperties = {
  textAlign: "center",
  marginBottom: 16,
};

const menuLeadStyle: React.CSSProperties = {
  display: "inline-block",
  padding: "8px 18px",
  borderRadius: 999,
  background: "rgba(255,255,255,0.82)",
  border: "1px solid rgba(233,30,99,0.10)",
  color: "var(--pink-strong)",
  fontSize: 15,
  lineHeight: 1.4,
  fontWeight: 700,
  letterSpacing: "0.01em",
  boxShadow: "0 6px 16px rgba(190, 121, 148, 0.06)",
  fontFamily: commonFontFamily,
};

const primaryGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 14,
  marginBottom: 16,
};

const primaryCardStyle: React.CSSProperties = {
  border: "none",
  padding: 0,
  borderRadius: 28,
  cursor: "pointer",
  background:
    "linear-gradient(180deg, var(--pink-strong) 0%, #d81b60 58%, #c51658 100%)",
  boxShadow:
    "0 18px 28px rgba(201, 46, 104, 0.24), inset 0 1px 0 rgba(255,255,255,0.22)",
  appearance: "none",
  WebkitAppearance: "none",
  textAlign: "left",
  overflow: "hidden",
  minHeight: 176,
};

const primaryCardInnerStyle: React.CSSProperties = {
  height: "100%",
  padding: "18px 18px 20px",
  background:
    "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.00) 100%)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};

const cardKickerStyle: React.CSSProperties = {
  fontSize: 11,
  lineHeight: 1.2,
  fontWeight: 700,
  letterSpacing: "0.16em",
  color: "rgba(255,255,255,0.76)",
  marginBottom: 14,
  fontFamily: commonFontFamily,
};

const primaryCardTitleStyle: React.CSSProperties = {
  fontSize: 29,
  lineHeight: 1.04,
  fontWeight: 900,
  color: "#ffffff",
  marginBottom: 12,
  letterSpacing: "0.01em",
  fontFamily: commonFontFamily,
};

const primaryCardTextStyle: React.CSSProperties = {
  fontSize: 14,
  lineHeight: 1.65,
  fontWeight: 500,
  color: "rgba(255,255,255,0.92)",
  fontFamily: commonFontFamily,
};

const subGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 12,
};

const subButtonStyle: React.CSSProperties = {
  border: "1px solid rgba(233,30,99,0.10)",
  borderRadius: 999,
  background:
    "linear-gradient(180deg, #f9dfe8 0%, #f6d6e1 100%)",
  color: "var(--text-main)",
  fontSize: 15,
  lineHeight: 1.35,
  fontWeight: 700,
  padding: "17px 14px",
  cursor: "pointer",
  boxShadow: "0 8px 18px rgba(180, 111, 138, 0.08)",
  appearance: "none",
  WebkitAppearance: "none",
  fontFamily: commonFontFamily,
};

const wideSubButtonStyle: React.CSSProperties = {
  gridColumn: "1 / -1",
  border: "1px solid rgba(233,30,99,0.10)",
  borderRadius: 999,
  background:
    "linear-gradient(180deg, #f9dfe8 0%, #f6d6e1 100%)",
  color: "var(--text-main)",
  fontSize: 15,
  lineHeight: 1.35,
  fontWeight: 700,
  padding: "18px 14px",
  cursor: "pointer",
  boxShadow: "0 8px 18px rgba(180, 111, 138, 0.08)",
  appearance: "none",
  WebkitAppearance: "none",
  fontFamily: commonFontFamily,
};