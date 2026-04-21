"use client";

import React, { useEffect } from "react";
import type { TenantKey } from "@/lib/tenant/tenantConfig";

type BusinessWasteModalProps = {
  open: boolean;
  onClose: () => void;
  onProceed: () => void;
  tenantKey: TenantKey;
};

export default function BusinessWasteModal({
  open,
  onClose,
  onProceed,
  tenantKey,
}: BusinessWasteModalProps) {
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

  const brandName = tenantKey === "ezurin" ? "エヅリン" : "すっきりん";

  return (
    <div onClick={onClose} style={overlayStyle}>
      <div onClick={(e) => e.stopPropagation()} style={modalStyle}>
        <div style={headerStyle}>
          <div style={badgeStyle}>POINT</div>
          <h2 style={titleStyle}>
            事業ゴミのご依頼前に
            <br />
            ご確認ください
          </h2>
          <p style={leadStyle}>
            事業活動で出たゴミは、
            <span style={accentStyle}>事業者さまご自身の責任</span>
            で適正に処理する必要があります。
          </p>
        </div>

        <div style={bodyStyle}>
          <section style={cardStyle}>
            <div style={cardHeadStyle}>
              <span style={iconStyle}>1</span>
              <span style={cardTitleStyle}>
                事業ゴミは適正な処理が必要です
              </span>
            </div>
            <p style={cardTextStyle}>
              店舗・事務所・法人などから出る廃棄物は、家庭ゴミとは異なり、
              事業者さまご自身の責任で適正に処理する必要があります。
              処理方法によっては法令違反となり、
              <span style={accentStyle}>懲役や罰金の対象になる可能性</span>
              があります。
            </p>
          </section>

          <section style={cardStyle}>
            <div style={cardHeadStyle}>
              <span style={iconStyle}>2</span>
              <span style={cardTitleStyle}>{brandName}なら安心</span>
            </div>
            <p style={cardTextStyle}>
              {brandName}では、行政発行の許可を持つ業者のみが
              回収対応を行いますので、安心してご依頼いただけます。
            </p>
          </section>

          <div style={noteBoxStyle}>
            <p style={noteTextStyle}>
              内容をご確認のうえ、事業ゴミ回収のご依頼へお進みください。
            </p>
          </div>
        </div>

        <div style={footerStyle}>
          <button type="button" onClick={onProceed} style={primaryButtonStyle}>
            内容を確認して依頼する
          </button>

          <button type="button" onClick={onClose} style={secondaryButtonStyle}>
            戻る
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

const accentStyle: React.CSSProperties = {
  color: "var(--pink-strong)",
  fontWeight: 900,
};

const bodyStyle: React.CSSProperties = {
  flex: 1,
  overflowY: "auto",
  WebkitOverflowScrolling: "touch",
  overscrollBehavior: "contain",
  padding: "18px 18px 14px",
  background: "#fffdfd",
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
  alignItems: "center",
  gap: 8,
  marginBottom: 8,
};

const iconStyle: React.CSSProperties = {
  width: 24,
  height: 24,
  borderRadius: "50%",
  background: "var(--pink-logo)",
  color: "#ffffff",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  fontSize: 12,
  lineHeight: 1,
  fontWeight: 900,
};

const cardTitleStyle: React.CSSProperties = {
  fontSize: 14,
  lineHeight: 1.4,
  fontWeight: 900,
  color: "var(--pink-strong)",
};

const cardTextStyle: React.CSSProperties = {
  margin: 0,
  fontSize: 14,
  lineHeight: 1.85,
  fontWeight: 700,
  color: "var(--text-main)",
};

const sourceStyle: React.CSSProperties = {
  margin: "8px 0 0",
  fontSize: 12,
  lineHeight: 1.7,
  fontWeight: 700,
  color: "var(--text-sub)",
};

const noteBoxStyle: React.CSSProperties = {
  marginTop: 4,
  padding: "11px 12px",
  borderRadius: 14,
  background: "var(--pink-soft)",
  border: "1px solid rgba(251,155,204,0.5)",
};

const noteTextStyle: React.CSSProperties = {
  margin: 0,
  fontSize: 12,
  lineHeight: 1.7,
  fontWeight: 700,
  color: "var(--text-sub)",
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

const primaryButtonStyle: React.CSSProperties = {
  width: "100%",
  border: "none",
  borderRadius: 999,
  background: "var(--pink-strong)",
  color: "#ffffff",
  fontSize: 16,
  lineHeight: 1.2,
  fontWeight: 900,
  padding: "15px 16px",
  cursor: "pointer",
  boxShadow: "0 8px 18px rgba(233,30,99,0.18)",
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