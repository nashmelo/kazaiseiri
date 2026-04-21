"use client";

import React, { useEffect } from "react";
import { serviceAreas } from "@/lib/serviceAreas";

type ServiceAreaModalProps = {
  open: boolean;
  onClose: () => void;
  showMoving?: boolean;
};

export default function ServiceAreaModal({
  open,
  onClose,
  showMoving = false,
}: ServiceAreaModalProps) {
  useEffect(() => {
    if (!open) return;

    const originalBodyOverflow = document.body.style.overflow;
    const originalBodyTouchAction = document.body.style.touchAction;

    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.body.style.touchAction = originalBodyTouchAction;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div onClick={onClose} style={overlayStyle}>
      <div onClick={(e) => e.stopPropagation()} style={modalStyle}>
        <div style={headerStyle}>
          <div style={badgeStyle}>AREA</div>
          <h2 style={titleStyle}>サービス展開地域</h2>
          <p style={leadStyle}>
            現在、以下の地域でご利用いただけます。
            <br />
            サービス展開地域は順次拡大予定です。
          </p>
        </div>

        <div style={bodyStyle}>
          {serviceAreas.map((area) => (
            <section key={area.prefecture} style={cardStyle}>
              <div style={cardHeadStyle}>
                <span style={iconStyle}>対応地域</span>
                <span style={cardTitleStyle}>{area.prefecture}</span>
              </div>

              {area.note && <p style={noteTextStyle}>{area.note}</p>}

              {area.cities.length > 0 && (
                <p style={cardTextStyle}>{area.cities.join("、")}</p>
              )}
            </section>
          ))}

          {showMoving && (
            <div style={movingNoticeStyle}>
              <div style={movingNoticeTitleStyle}>引越しサービスについて</div>
              <p style={movingNoticeTextStyle}>
                引越しサービスは、下記のサービス展開地域に限らず全国対応です。
              </p>
            </div>
          )}
        </div>

        <div style={footerStyle}>
          <button type="button" onClick={onClose} style={secondaryButtonStyle}>
            トップへ戻る
          </button>
        </div>
      </div>
    </div>
  );
}

const overlayStyle: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.45)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 12,
  zIndex: 9999,
  overscrollBehavior: "contain",
};

const modalStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: 520,
  maxHeight: "88vh",
  background: "#ffffff",
  borderRadius: 24,
  overflow: "hidden",
  boxShadow: "0 16px 36px rgba(0,0,0,0.18)",
  border: "2px solid var(--pink-logo)",
  display: "flex",
  flexDirection: "column",
};

const headerStyle: React.CSSProperties = {
  flexShrink: 0,
  padding: "22px 20px 18px",
  textAlign: "center",
  background:
    "linear-gradient(180deg, var(--pink-soft) 0%, rgba(251,155,204,0.18) 100%)",
  borderBottom: "1px solid rgba(251,155,204,0.35)",
};

const badgeStyle: React.CSSProperties = {
  display: "inline-block",
  marginBottom: 12,
  padding: "6px 12px",
  borderRadius: 999,
  background: "var(--pink-logo)",
  color: "#ffffff",
  fontSize: 11,
  lineHeight: 1,
  fontWeight: 800,
  letterSpacing: "0.12em",
};

const titleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: 22,
  lineHeight: 1.45,
  fontWeight: 900,
  color: "var(--text-main)",
  letterSpacing: "0.01em",
};

const leadStyle: React.CSSProperties = {
  margin: "10px 0 0",
  fontSize: 14,
  lineHeight: 1.8,
  fontWeight: 700,
  color: "var(--text-sub)",
};

const bodyStyle: React.CSSProperties = {
  flex: 1,
  overflowY: "auto",
  WebkitOverflowScrolling: "touch",
  overscrollBehavior: "contain",
  padding: "18px 18px 14px",
  background: "#fffdfd",
};

const movingNoticeStyle: React.CSSProperties = {
  background: "#fff7fb",
  border: "2px solid rgba(251,155,204,0.5)",
  borderRadius: 18,
  padding: "14px 14px 12px",
  marginBottom: 12,
  boxShadow: "0 6px 16px rgba(233,30,99,0.05)",
};

const movingNoticeTitleStyle: React.CSSProperties = {
  fontSize: 15,
  lineHeight: 1.4,
  fontWeight: 900,
  color: "var(--pink-strong)",
  marginBottom: 6,
};

const movingNoticeTextStyle: React.CSSProperties = {
  margin: 0,
  fontSize: 14,
  lineHeight: 1.8,
  fontWeight: 700,
  color: "var(--text-main)",
};

const cardStyle: React.CSSProperties = {
  background: "#ffffff",
  border: "2px solid rgba(251,155,204,0.45)",
  borderRadius: 18,
  padding: "14px 14px 12px",
  marginBottom: 12,
  boxShadow: "0 6px 16px rgba(233,30,99,0.05)",
};

const cardHeadStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "flex-start",
  gap: 8,
  marginBottom: 8,
};

const iconStyle: React.CSSProperties = {
  minWidth: 58,
  height: 28,
  padding: "0 10px",
  borderRadius: 999,
  background: "var(--pink-soft)",
  color: "var(--pink-strong)",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  fontSize: 12,
  lineHeight: 1,
  fontWeight: 900,
};

const cardTitleStyle: React.CSSProperties = {
  fontSize: 15,
  lineHeight: 1.5,
  fontWeight: 900,
  color: "var(--pink-strong)",
};

const noteTextStyle: React.CSSProperties = {
  margin: "0 0 8px",
  fontSize: 13,
  lineHeight: 1.8,
  fontWeight: 700,
  color: "var(--text-sub)",
};

const cardTextStyle: React.CSSProperties = {
  margin: 0,
  fontSize: 14,
  lineHeight: 1.85,
  fontWeight: 700,
  color: "var(--text-main)",
  whiteSpace: "pre-wrap",
};

const footerStyle: React.CSSProperties = {
  flexShrink: 0,
  padding: "14px 18px 18px",
  borderTop: "1px solid rgba(251,155,204,0.3)",
  display: "flex",
  flexDirection: "column",
  gap: 10,
  background: "#ffffff",
};

const secondaryButtonStyle: React.CSSProperties = {
  width: "100%",
  borderRadius: 999,
  background: "#ffffff",
  color: "var(--pink-strong)",
  fontSize: 16,
  lineHeight: 1.2,
  fontWeight: 900,
  padding: "15px 16px",
  cursor: "pointer",
  border: "2px solid var(--pink-logo)",
};