"use client";

import React from "react";

type StepIndicatorProps = {
  step: 1 | 2 | 3 | 4 | 5;
};

const steps = [
  { id: 1, label: "回収場所" },
  { id: 2, label: "依頼内容" },
  { id: 3, label: "希望日" },
  { id: 4, label: "申込者情報" },
  { id: 5, label: "内容確認" },
] as const;

export default function StepIndicator({ step }: StepIndicatorProps) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: 8,
        marginBottom: 18,
      }}
    >
      {steps.map((item) => {
        const isActive = item.id === step;
        const isDone = item.id < step;

        return (
          <div
            key={item.id}
            style={{
              flex: 1,
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                margin: "0 auto 8px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
                fontWeight: 900,
                background: isDone
                  ? "var(--pink-strong)"
                  : isActive
                  ? "#ffffff"
                  : "var(--pink-soft)",
                color: isDone
                  ? "#ffffff"
                  : isActive
                  ? "var(--pink-strong)"
                  : "#b97a93",
                border: isActive
                  ? "3px solid var(--pink-strong)"
                  : isDone
                  ? "3px solid var(--pink-strong)"
                  : "2px solid var(--pink-main)",
                boxSizing: "border-box",
                boxShadow: isActive ? "0 4px 10px rgba(233,30,99,0.12)" : "none",
              }}
            >
              {isDone ? "✓" : item.id}
            </div>

            <div
              style={{
                fontSize: 11,
                fontWeight: 800,
                color: isActive || isDone ? "var(--pink-strong)" : "var(--text-sub)",
                lineHeight: 1.35,
                letterSpacing: "0.01em",
              }}
            >
              {item.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}