import React from "react";

export const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "13px 12px",
  borderRadius: 12,
  border: "1.5px solid rgba(251,155,204,0.32)",
  fontSize: 16,
  lineHeight: 1.4,
  boxSizing: "border-box",
  background: "#ffffff",
  color: "var(--text-main)",
  outline: "none",
  WebkitAppearance: "none",
};

export const smallButtonStyle: React.CSSProperties = {
  border: "none",
  borderRadius: 12,
  background: "var(--pink-logo)",
  color: "#ffffff",
  fontSize: 14,
  fontWeight: 800,
  padding: "0 15px",
  cursor: "pointer",
  whiteSpace: "nowrap",
  boxShadow: "0 4px 10px rgba(233,30,99,0.08)",
};

export const textareaStyle: React.CSSProperties = {
  ...inputStyle,
  resize: "vertical",
  minHeight: 120,
};