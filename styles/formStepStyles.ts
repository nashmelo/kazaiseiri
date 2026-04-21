import React from "react";

export const mainStyle: React.CSSProperties = {
  minHeight: "100vh",
  background: "var(--bg-main)",
  padding: "22px 16px 40px",
  boxSizing: "border-box",
};

export const wrapStyle: React.CSSProperties = {
  maxWidth: 480,
  margin: "0 auto",
};

export const pageTitleWrapStyle: React.CSSProperties = {
  textAlign: "center",
  marginBottom: 16,
};

export const pageTitleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: 18,
  lineHeight: 1.4,
  fontWeight: 700,
  color: "var(--pink-strong)",
};

export const panelStyle: React.CSSProperties = {
  background: "#fffdfd",
  borderRadius: 28,
  padding: "20px 18px 24px",
  boxSizing: "border-box",
  boxShadow: "0 10px 24px rgba(0,0,0,0.07)",
  border: "2px solid rgba(251,155,204,0.22)",
};

export const errorStyle: React.CSSProperties = {
  background: "#fff1f4",
  color: "var(--pink-strong)",
  padding: "11px 12px",
  borderRadius: 12,
  fontSize: 13,
  lineHeight: 1.6,
  fontWeight: 700,
  marginBottom: 16,
  border: "1px solid rgba(251,155,204,0.42)",
};

export const postalRowStyle: React.CSSProperties = {
  display: "flex",
  gap: 8,
};

export const statusTextStyle: React.CSSProperties = {
  marginTop: 7,
  fontSize: 12,
  lineHeight: 1.5,
  color: "var(--text-sub)",
  fontWeight: 700,
};

export const subNoticeStyle: React.CSSProperties = {
  marginTop: -6,
  marginBottom: 14,
  padding: "10px 12px",
  borderRadius: 12,
  background: "rgba(251,155,204,0.12)",
  color: "var(--pink-strong)",
  fontSize: 12,
  lineHeight: 1.6,
  fontWeight: 700,
  border: "1px solid rgba(251,155,204,0.35)",
};

export const helpBoxStyle: React.CSSProperties = {
  marginBottom: 8,
  padding: "10px 12px",
  borderRadius: 12,
  background: "#fff6f9",
  border: "1px solid rgba(251,155,204,0.35)",
  fontSize: 12,
  lineHeight: 1.65,
  color: "var(--text-sub)",
  fontWeight: 700,
};

export const buttonGroupStyle: React.CSSProperties = {
  display: "flex",
  gap: 12,
  flexDirection: "column",
  marginTop: 22,
};

export const primaryButtonStyle: React.CSSProperties = {
  width: "100%",
  border: "none",
  borderRadius: 999,
  background: "var(--pink-strong)",
  color: "#ffffff",
  fontSize: 17,
  lineHeight: 1.2,
  fontWeight: 900,
  padding: "17px 16px",
  cursor: "pointer",
  boxShadow: "0 8px 18px rgba(233,30,99,0.14)",
};

export const secondaryButtonStyle: React.CSSProperties = {
  width: "100%",
  borderRadius: 999,
  background: "#ffffff",
  color: "var(--pink-strong)",
  fontSize: 17,
  lineHeight: 1.2,
  fontWeight: 900,
  padding: "17px 16px",
  cursor: "pointer",
  border: "2px solid var(--pink-logo)",
};