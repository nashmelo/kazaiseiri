"use client";

import React from "react";

type TenantKey = "default" | "ezurin" | "client-a";

type HomeScreenProps = {
  tenantKey?: TenantKey;
  onOpenGarbageEntry: () => void;
  onOpenBusinessWaste: () => void;
  onOpenFaq: () => void;
  onOpenReason: () => void;
  onOpenRegion: () => void;
  showMoving?: boolean;
  onOpenMovingEntry?: () => void;
};

export default function HomeScreen({
  tenantKey = "default",
  onOpenGarbageEntry,
  onOpenBusinessWaste,
  onOpenFaq,
  onOpenReason,
  onOpenRegion,
  showMoving = false,
  onOpenMovingEntry,
}: HomeScreenProps) {
  const logoSrc =
    tenantKey === "ezurin" ? "/ezurin.svg" : "/sukkirinlogo.svg";

  const reasonPrefix = tenantKey === "ezurin" ? "エヅリンが" : "すっきりんが";

  return (
    <main style={mainStyle}>
      <div style={wrapStyle}>
        <div style={outerCatchStyle}>LINEで簡単　無料でお見積もり</div>

        <div style={panelStyle}>
          <section style={heroSectionStyle}>
            <img src={logoSrc} alt="すっきりん" style={heroLogoStyle} />

            <div style={introStyle}>
              <p style={introTitleStyle}>県内16市町の許可業者だから安心</p>
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
                  <div style={primaryButtonTitleStyle}>家庭ごみ回収</div>
                  <div style={primaryButtonDescStyle}>
                    お家の片付け・粗大ごみなど
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
                  <div style={primaryButtonTitleStyle}>事業ごみ回収</div>
                  <div style={primaryButtonDescStyle}>
                    店舗・事務所・法人回収
                  </div>
                </div>
                <div style={primaryArrowStyle}>›</div>
              </button>
            </div>

            {showMoving && onOpenMovingEntry && (
              <div style={movingButtonWrapStyle}>
                <button
                  type="button"
                  onClick={onOpenMovingEntry}
                  style={movingButtonStyle}
                >
                  <div style={movingButtonInnerStyle}>
                    <div style={movingButtonTitleStyle}>
                      引越しのご相談はこちら
                    </div>
                    <div style={movingButtonNoteStyle}>
                      同時に家財処分も可能です
                    </div>
                  </div>
                </button>
              </div>
            )}

            <div style={subGridStyle}>
              <button type="button" onClick={onOpenFaq} style={subButtonStyle}>
                よくある質問
              </button>

              <button
                type="button"
                onClick={onOpenReason}
                style={subButtonStyle}
              >
                {reasonPrefix}
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

const outerCatchStyle: React.CSSProperties = {
  textAlign: "center",
  fontSize: 13,
  lineHeight: 1.4,
  fontWeight: 700,
  color: "var(--pink-strong)",
  marginBottom: 10,
  letterSpacing: "0.02em",
  fontFamily,
};

const panelStyle: React.CSSProperties = {
  background: "#fbf1f4",
  borderRadius: 32,
  padding: "12px 16px 14px",
  boxSizing: "border-box",
  border: "2px solid rgba(251,155,204,0.22)",
};

const heroSectionStyle: React.CSSProperties = {
  marginBottom: 12,
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
  borderRadius: 24,
  background: "#fff9fb",
  color: "var(--text-main)",
  padding: "12px 16px",
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
  paddingRight: 10,
};

const primaryButtonKickerStyle: React.CSSProperties = {
  fontSize: 10,
  lineHeight: 1.2,
  fontWeight: 700,
  letterSpacing: "0.14em",
  color: "var(--pink-strong)",
  marginBottom: 5,
  fontFamily,
};

const primaryButtonTitleStyle: React.CSSProperties = {
  fontSize: 22,
  lineHeight: 1.15,
  fontWeight: 700,
  color: "var(--text-main)",
  marginBottom: 5,
  letterSpacing: 0,
  wordBreak: "keep-all",
  overflowWrap: "normal",
  fontFamily,
};

const primaryButtonDescStyle: React.CSSProperties = {
  fontSize: 12,
  lineHeight: 1.4,
  fontWeight: 500,
  color: "var(--text-sub)",
  wordBreak: "keep-all",
  fontFamily,
};

const primaryArrowStyle: React.CSSProperties = {
  flexShrink: 0,
  width: 38,
  height: 38,
  borderRadius: "50%",
  background: "var(--pink-logo)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 28,
  lineHeight: 1,
  fontWeight: 400,
  color: "#fff",
};

const movingButtonWrapStyle: React.CSSProperties = {
  marginBottom: 12,
};

const movingButtonStyle: React.CSSProperties = {
  width: "100%",
  border: "2px solid var(--pink-logo)",
  borderRadius: 22,
  background: "var(--pink-logo)",
  color: "#ffffff",
  padding: "12px 16px",
  cursor: "pointer",
  appearance: "none",
  WebkitAppearance: "none",
  fontFamily,
  textAlign: "center",
  boxShadow: "0 6px 14px rgba(251,155,204,0.18)",
};

const movingButtonInnerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 3,
};

const movingButtonTitleStyle: React.CSSProperties = {
  fontSize: 16,
  lineHeight: 1.35,
  fontWeight: 800,
  color: "#ffffff",
  fontFamily,
};

const movingButtonNoteStyle: React.CSSProperties = {
  fontSize: 11,
  lineHeight: 1.4,
  fontWeight: 600,
  color: "rgba(255,255,255,0.92)",
  fontFamily,
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