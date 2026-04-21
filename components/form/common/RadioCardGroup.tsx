"use client";

import React from "react";
import type { FormData } from "@/types/form";

type RadioOption = {
  value: string;
  label: string;
};

type RadioCardGroupProps = {
  name: keyof FormData;
  value: string;
  onChange: (name: keyof FormData, value: string) => void;
  options: RadioOption[];
  columns?: 1 | 2;
};

const radioInputHiddenStyle: React.CSSProperties = {
  position: "absolute",
  opacity: 0,
  pointerEvents: "none",
};

export default function RadioCardGroup({
  name,
  value,
  onChange,
  options,
  columns = 2,
}: RadioCardGroupProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: columns === 2 ? "1fr 1fr" : "1fr",
        gap: 10,
      }}
    >
      {options.map((option) => {
        const checked = value === option.value;
        const isLongLabel = option.label === "マンション・アパート";

        return (
          <label
            key={option.value}
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              gap: 10,
              minHeight: 54,
              padding: "12px 13px",
              borderRadius: 16,
              border: checked
                ? "2px solid var(--pink-logo)"
                : "2px solid rgba(251,155,204,0.28)",
              background: checked ? "rgba(251,155,204,0.16)" : "#ffffff",
              color: checked ? "var(--pink-strong)" : "var(--text-main)",
              fontWeight: checked ? 800 : 700,
              fontSize: 14,
              cursor: "pointer",
              boxSizing: "border-box",
              boxShadow: checked
                ? "0 2px 8px rgba(233,30,99,0.05)"
                : "0 1px 3px rgba(0,0,0,0.02)",
              transition: "all 0.18s ease",
            }}
          >
            <input
              type="radio"
              name={String(name)}
              value={option.value}
              checked={checked}
              onChange={() => onChange(name, option.value)}
              style={radioInputHiddenStyle}
            />

            <span
              style={{
                width: 20,
                height: 20,
                borderRadius: "50%",
                border: checked
                  ? "2px solid var(--pink-logo)"
                  : "2px solid #d8c7cf",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                background: "#fff",
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: checked ? "var(--pink-strong)" : "transparent",
                }}
              />
            </span>

            <span
              style={{
                lineHeight: 1.3,
                overflowWrap: "anywhere",
                wordBreak: "break-word",
                fontSize: isLongLabel ? 12.5 : 14,
                letterSpacing: isLongLabel ? "-0.01em" : 0,
              }}
            >
              {option.label}
            </span>
          </label>
        );
      })}
    </div>
  );
}