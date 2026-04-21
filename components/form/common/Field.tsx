"use client";

import React from "react";

type FieldProps = {
  label: string;
  required?: boolean;
  children: React.ReactNode;
};

const fieldStyle: React.CSSProperties = {
  marginBottom: 18,
};

const fieldLabelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 14,
  lineHeight: 1.4,
  fontWeight: 800,
  color: "var(--text-main)",
  marginBottom: 8,
};

const requiredStyle: React.CSSProperties = {
  color: "var(--pink-strong)",
  marginLeft: 4,
};

export default function Field({ label, required, children }: FieldProps) {
  return (
    <div style={fieldStyle}>
      <label style={fieldLabelStyle}>
        {label}
        {required && <span style={requiredStyle}>＊</span>}
      </label>
      {children}
    </div>
  );
}