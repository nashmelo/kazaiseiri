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
              <p style={trustTextStyle}>
                片付け・不要品回収を安心してご相談いただけます
              </p>
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
                <div style={cardAccentStyle} />
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
                <div style={cardAccentStyle} />
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
                style={subButtonStrongStyle}
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
  background:
    "linear-gradient(180deg, var(--bg-main) 0%, #f6e8ee 42%, #f9edf2 100%)",
  padding: "18px 16px 32px",
  boxSizing: "border-box",
};

const wrapStyle: React.CSSProperties = {
  maxWidth: 480,
  margin: "0 auto",
};

const panelStyle: React.CSSProperties = {
  background:
    "linear-gradient(180deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.18) 100%)",
  borderRadius: 32,
  padding: "18px 14px 20px",
  boxSizing: "border-box",
  border: "1px solid rgba(233,30,99,0.10)",
  boxShadow: "0 14px 34px rgba(130, 81, 102, 0.08)",
  backdropFilter: "blur(3px)",
};

const heroSectionStyle: React.CSSProperties = {
  marginBottom: 18,
};

const heroLogoWrapStyle: React.CSSProperties = {
  background:
    "linear-gradient(135deg, var(--pink-main) 0%, #f4bfd1 50%, var(--pink-soft) 100%)",
  borderRadius: 28,
  padding: "14px",
  marginBottom: 16,
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.42)",
};

const heroLogoStyle: React.CSSProperties = {
  width: "100%",
  height: "auto",
  display: "block",
  borderRadius: 20,
};

const trustBoxStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.38)",
  border: "2px solid rgba(233,30,99,0.12)",
  borderRadius: 26,
  padding: "18px 16px 16px",
  textAlign: "center",
  boxShadow: "0 8px 20px rgba(167, 107, 133, 0.06)",
};

const trustTitleStyle: React.CSSProperties = {
  margin: "0 0 8px",
  fontSize: 18,
  lineHeight: 1.35,
  fontWeight: 900,
  color: "var(--text-main)",
  letterSpacing: "0.01em",
};

const trustTextStyle: React.CSSProperties = {
  margin: 0,
  fontSize: 14,
  lineHeight: 1.65,
  fontWeight: 700,
  color: "var(--text-sub)",
};

const menuLeadWrapStyle: React.CSSProperties = {
  textAlign: "center",
  marginBottom: 14,
};

const menuLeadStyle: React.CSSProperties = {
  display: "inline-block",
  background: "rgba(255,255,255,0.62)",
  color: "var(--pink-strong)",
  fontWeight: 900,
  fontSize: 15,
  lineHeight: 1.4,
  padding: "9px 18px",
  borderRadius: 999,
  border: "1px solid rgba(233,30,99,0.10)",
  boxShadow: "0 4px 12px rgba(188, 120, 146, 0.06)",
};

const primaryGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 12,
  marginBottom: 14,
};

const primaryCardStyle: React.CSSProperties = {
  position: "relative",
  border: "1px solid rgba(28,43,74,0.08)",
  borderRadius: 24,
  padding: "18px 16px 18px",
  cursor: "pointer",
  textAlign: "left",
  minHeight: 156,
  background:
    "linear-gradient(180deg, rgba(255,255,255,0.72) 0%, rgba(255,255,255,0.48) 100%)",
  boxShadow: "0 10px 20px rgba(128, 82, 101, 0.06)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  appearance: "none",
  WebkitAppearance: "none",
  overflow: "hidden",
};

const cardAccentStyle: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  height: 6,
  background:
    "linear-gradient(90deg, var(--pink-strong) 0%, #f36b98 45%, #f7b9cf 100%)",
};

const cardLabelStyle: React.CSSProperties = {
  fontSize: 10,
  lineHeight: 1.2,
  fontWeight: 800,
  letterSpacing: "0.14em",
  color: "rgba(233,30,99,0.82)",
  marginBottom: 12,
  marginTop: 6,
};

const primaryCardTitleStyle: React.CSSProperties = {
  fontSize: 30,
  lineHeight: 1.05,
  fontWeight: 900,
  color: "var(--text-main)",
  marginBottom: 10,
  letterSpacing: "0.01em",
};

const primaryCardTextStyle: React.CSSProperties = {
  fontSize: 13,
  lineHeight: 1.65,
  fontWeight: 700,
  color: "var(--text-sub)",
};

const subGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 12,
};

const subButtonStyle: React.CSSProperties = {
  border: "1px solid rgba(28,43,74,0.08)",
  borderRadius: 999,
  background:
    "linear-gradient(180deg, rgba(255,255,255,0.74) 0%, rgba(255,255,255,0.50) 100%)",
  color: "var(--text-main)",
  fontSize: 16,
  fontWeight: 900,
  padding: "16px 14px",
  cursor: "pointer",
  boxShadow: "0 8px 18px rgba(128, 82, 101, 0.05)",
  appearance: "none",
  WebkitAppearance: "none",
};

const subButtonStrongStyle: React.CSSProperties = {
  border: "1px solid rgba(233,30,99,0.14)",
  borderRadius: 999,
  background:
    "linear-gradient(180deg, rgba(233,30,99,0.92) 0%, rgba(214,29,91,0.88) 100%)",
  color: "#fff",
  fontSize: 16,
  fontWeight: 900,
  padding: "16px 14px",
  cursor: "pointer",
  boxShadow: "0 10px 20px rgba(201, 56, 109, 0.16)",
  appearance: "none",
  WebkitAppearance: "none",
};

const wideButtonStyle: React.CSSProperties = {
  gridColumn: "1 / -1",
  border: "1px solid rgba(28,43,74,0.08)",
  borderRadius: 999,
  background:
    "linear-gradient(180deg, rgba(255,255,255,0.70) 0%, rgba(255,255,255,0.46) 100%)",
  color: "var(--text-main)",
  fontSize: 16,
  fontWeight: 900,
  padding: "16px 14px",
  cursor: "pointer",
  boxShadow: "0 8px 18px rgba(128, 82, 101, 0.05)",
  appearance: "none",
  WebkitAppearance: "none",
};