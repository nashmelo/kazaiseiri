"use client";

import React from "react";

type StepSectionHeaderProps = {
  step: number;
  title: string;
};

const stepHeaderStyle: React.CSSProperties = {
  background: "var(--pink-soft)",
  border: "2px solid rgba(251,155,204,0.55)",
  borderRadius: 18,
  padding: "16px 14px 15px",
  marginBottom: 22,
  textAlign: "center",
};

const stepBadgeStyle: React.CSSProperties = {
  display: "inline-block",
  padding: "5px 10px",
  borderRadius: 999,
  background: "var(--pink-logo)",
  color: "#ffffff",
  fontSize: 11,
  lineHeight: 1,
  fontWeight: 800,
  letterSpacing: "0.08em",
  marginBottom: 8,
};

const stepTitleStyle: React.CSSProperties = {
  fontSize: 20,
  lineHeight: 1.45,
  fontWeight: 800,
  color: "var(--pink-strong)",
};

export default function StepSectionHeader({
  step,
  title,
}: StepSectionHeaderProps) {
  return (
    <div style={stepHeaderStyle}>
      <div style={stepBadgeStyle}>STEP {step}</div>
      <div style={stepTitleStyle}>{title}</div>
    </div>
  );
}