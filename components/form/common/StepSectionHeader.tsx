"use client";

import React from "react";

type StepSectionHeaderProps = {
  step: number;
  title: string;
};

const stepHeaderStyle: React.CSSProperties = {
  paddingBottom: 12,
  marginBottom: 20,
  borderBottom: "2px solid var(--pink-main)",
};

const stepBadgeStyle: React.CSSProperties = {
  display: "block",
  color: "var(--pink-strong)",
  fontSize: 11,
  lineHeight: 1.4,
  fontWeight: 800,
  letterSpacing: "0.08em",
  marginBottom: 2,
};

const stepTitleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: 20,
  lineHeight: 1.45,
  fontWeight: 800,
  color: "var(--text-main)",
};

export default function StepSectionHeader({
  step,
  title,
}: StepSectionHeaderProps) {
  return (
    <div style={stepHeaderStyle}>
      <h2 style={stepTitleStyle}>
        <span style={stepBadgeStyle}>STEP {step}/5</span>
        {title}
      </h2>
    </div>
  );
}