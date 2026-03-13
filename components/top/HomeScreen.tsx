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
              <p style={trustTextStyle}>片付け・不要品回収ならすっきりん</p>
            </div>
          </section>

          <section style={menuSectionStyle}>
            <div style={menuLeadWrapStyle}>
              <span style={menuLeadStyle}>ご希望の内容をお選びください</span>
            </div>

            <div style={primaryGridStyle}>
              <button
                type="button"
                onClick={onOpenGarbageEntry}
                style={{
                  ...primaryCardStyle,
                  ...homeCardStyle,
                }}
              >
                <div style={primaryCardIconStyle}>🏠</div>
                <div style={primaryCardBodyStyle}>
                  <div style={primaryCardTitleStyle}>家庭ゴミ</div>
                  <div style={primaryCardTextStyle}>
                    お家の片付けや粗大ゴミ
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={onOpenBusinessWaste}
                style={{
                  ...primaryCardStyle,
                  ...businessCardStyle,
                }}
              >
                <div style={primaryCardIconStyle}>🏢</div>
                <div style={primaryCardBodyStyle}>
                  <div style={businessCardTitleStyle}>事業ゴミ</div>
                  <div style={businessCardTextStyle}>
                    店舗・オフィスの不用品回収
                  </div>
                </div>
              </button>
            </div>

            <div style={subGridStyle}>
              <button
                type="button"
                onClick={onOpenFaq}
                style={faqButtonStyle}
              >
                <span style={subButtonIconStyle}>？</span>
                <span>よくある質問</span>
              </button>

              <button
                type="button"
                onClick={onOpenReason}
                style={reasonButtonStyle}
              >
                <span style={subButtonIconStyle}>☺</span>
                <span>すっきりんが選ばれる理由</span>
              </button>

              <button
                type="button"
                onClick={onOpenRegion}
                style={regionButtonStyle}
              >
                <span style={subButtonIconStyle}>📍</span>
                <span>サービス展開地域</span>
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
    "radial-gradient(circle at top left, #f9dce8 0%, #f7edf3 38%, #f6f1f6 100%)",
  padding: "18px 16px 32px",
  boxSizing: "border-box",
};

const wrapStyle: React.CSSProperties = {
  maxWidth: 480,
  margin: "0 auto",
};

const panelStyle: React.CSSProperties = {
  background: "linear-gradient(180deg, #f9e8f1 0%, #f8edf3 100%)",
  borderRadius: 32,
  padding: "18px 14px 20px",
  boxSizing: "border-box",
  boxShadow: "0 14px 34px rgba(191, 124, 150, 0.14)",
  overflow: "hidden",
};

const heroSectionStyle: React.CSSProperties = {
  marginBottom: 18,
};

const heroLogoWrapStyle: React.CSSProperties = {
  background: "linear-gradient(135deg, #f9b7d2 0%, #f692c3 48%, #f8c6da 100%)",
  borderRadius: 28,
  padding: "14px 14px 10px",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.35)",
  marginBottom: 16,
};

const heroLogoStyle: React.CSSProperties = {
  width: "100%",
  height: "auto",
  display: "block",
  borderRadius: 22,
};

const topCatchStyle: React.CSSProperties = {
  margin: "0 0 16px",
  textAlign: "center",
  fontSize: 17,
  lineHeight: 1.45,
  fontWeight: 900,
  color: "#202a61",
  letterSpacing: "0.01em",
};

const trustBoxStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.62)",
  border: "2px solid #f1c8d8",
  borderRadius: 26,
  padding: "18px 16px 16px",
  textAlign: "center",
  boxShadow: "0 6px 18px rgba(208, 154, 177, 0.10)",
};

const trustTitleStyle: React.CSSProperties = {
  margin: "0 0 8px",
  fontSize: 17,
  lineHeight: 1.35,
  fontWeight: 900,
  color: "#202a61",
};

const trustTextStyle: React.CSSProperties = {
  margin: 0,
  fontSize: 16,
  lineHeight: 1.45,
  fontWeight: 800,
  color: "#202a61",
};

const menuSectionStyle: React.CSSProperties = {
  marginTop: 8,
};

const menuLeadWrapStyle: React.CSSProperties = {
  textAlign: "center",
  marginBottom: 14,
};

const menuLeadStyle: React.CSSProperties = {
  display: "inline-block",
  background: "rgba(255,248,251,0.95)",
  color: "#ef4c92",
  fontWeight: 900,
  fontSize: 15,
  lineHeight: 1.4,
  padding: "8px 16px",
  borderRadius: 999,
  boxShadow: "0 4px 10px rgba(232, 179, 200, 0.16)",
};

const primaryGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 12,
  marginBottom: 14,
};

const primaryCardStyle: React.CSSProperties = {
  border: "none",
  borderRadius: 22,
  padding: "16px 14px 14px",
  cursor: "pointer",
  textAlign: "left",
  minHeight: 124,
  boxShadow: "0 8px 16px rgba(0,0,0,0.08)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  appearance: "none",
  WebkitAppearance: "none",
};

const homeCardStyle: React.CSSProperties = {
  background: "linear-gradient(180deg, #eef5ff 0%, #dceafc 100%)",
  border: "1px solid #cddff8",
};

const businessCardStyle: React.CSSProperties = {
  background: "linear-gradient(180deg, #73cf5e 0%, #41b54a 100%)",
  border: "1px solid #3ea54a",
};

const primaryCardIconStyle: React.CSSProperties = {
  fontSize: 30,
  lineHeight: 1,
  marginBottom: 10,
};

const primaryCardBodyStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 6,
};

const primaryCardTitleStyle: React.CSSProperties = {
  fontSize: 18,
  lineHeight: 1.2,
  fontWeight: 900,
  color: "#2351b8",
};

const businessCardTitleStyle: React.CSSProperties = {
  fontSize: 18,
  lineHeight: 1.2,
  fontWeight: 900,
  color: "#ffffff",
};

const primaryCardTextStyle: React.CSSProperties = {
  fontSize: 12,
  lineHeight: 1.45,
  fontWeight: 800,
  color: "#1d376e",
};

const businessCardTextStyle: React.CSSProperties = {
  fontSize: 12,
  lineHeight: 1.45,
  fontWeight: 800,
  color: "#f7fff7",
};

const subGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 12,
};

const faqButtonStyle: React.CSSProperties = {
  border: "none",
  borderRadius: 999,
  background: "linear-gradient(180deg, #ffd836 0%, #f3c400 100%)",
  color: "#2b2b2b",
  fontSize: 16,
  fontWeight: 900,
  padding: "15px 14px",
  cursor: "pointer",
  boxShadow: "0 6px 14px rgba(199, 158, 17, 0.16)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
};

const reasonButtonStyle: React.CSSProperties = {
  border: "none",
  borderRadius: 999,
  background: "linear-gradient(180deg, #ff6ea9 0%, #f1468a 100%)",
  color: "#fff",
  fontSize: 14,
  fontWeight: 900,
  padding: "15px 12px",
  cursor: "pointer",
  boxShadow: "0 6px 14px rgba(219, 78, 137, 0.18)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
};

const regionButtonStyle: React.CSSProperties = {
  gridColumn: "1 / -1",
  borderRadius: 999,
  background: "linear-gradient(180deg, #f5f8ff 0%, #e7eefb 100%)",
  color: "#405a94",
  fontSize: 16,
  fontWeight: 900,
  padding: "15px 14px",
  cursor: "pointer",
  border: "1px solid #d4def5",
  boxShadow: "0 6px 14px rgba(170, 184, 220, 0.16)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
};

const subButtonIconStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 24,
  height: 24,
  borderRadius: "50%",
  background: "rgba(255,255,255,0.72)",
  fontSize: 14,
  lineHeight: 1,
  fontWeight: 900,
};