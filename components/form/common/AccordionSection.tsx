// components/form/common/AccordionSection.tsx

"use client";

import React from "react";

type AccordionSectionProps = {
  title: string;
  isOpen: boolean;
  selectedCount?: number;
  onToggle: () => void;
  children: React.ReactNode;
};

export default function AccordionSection({
  title,
  isOpen,
  selectedCount = 0,
  onToggle,
  children,
}: AccordionSectionProps) {
  return (
    <div style={sectionStyle}>
      <button
        type="button"
        onClick={onToggle}
        style={headerButtonStyle}
        aria-expanded={isOpen}
      >
        <div style={headerLeftStyle}>
          <div style={titleStyle}>{title}</div>
          {selectedCount > 0 && (
            <div style={countBadgeStyle}>{selectedCount}点選択中</div>
          )}
        </div>

        <div style={iconStyle}>{isOpen ? "−" : "＋"}</div>
      </button>

      {isOpen && <div style={contentStyle}>{children}</div>}
    </div>
  );
}

const sectionStyle: React.CSSProperties = {
  border: "1px solid var(--line)",
  borderRadius: 20,
  background: "var(--surface)",
  overflow: "hidden",
};

const headerButtonStyle: React.CSSProperties = {
  width: "100%",
  border: "none",
  background: "var(--surface-pink)",
  padding: "16px 18px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 12,
  cursor: "pointer",
  textAlign: "left",
};

const headerLeftStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 6,
};

const titleStyle: React.CSSProperties = {
  fontSize: 15,
  fontWeight: 800,
  color: "var(--text-main)",
  lineHeight: 1.4,
};

const countBadgeStyle: React.CSSProperties = {
  display: "inline-block",
  fontSize: 12,
  fontWeight: 700,
  color: "var(--pink-accent)",
};

const iconStyle: React.CSSProperties = {
  flexShrink: 0,
  width: 28,
  height: 28,
  borderRadius: 9999,
  border: "1px solid var(--line-strong)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "var(--pink-accent)",
  fontSize: 18,
  fontWeight: 700,
  background: "var(--surface)",
};

const contentStyle: React.CSSProperties = {
  padding: "0 18px 6px",
};