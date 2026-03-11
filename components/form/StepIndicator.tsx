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
                width: 42,
                height: 42,
                margin: "0 auto 8px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
                fontWeight: 900,
                background: isDone ? "#095db6" : isActive ? "#ffffff" : "#f1f1f1",
                color: isDone ? "#ffffff" : isActive ? "#095db6" : "#999999",
                border: isActive ? "4px solid #095db6" : "1px solid #d9d9d9",
                boxSizing: "border-box",
              }}
            >
              {isDone ? "✓" : item.id}
            </div>

            <div
              style={{
                fontSize: 12,
                fontWeight: 800,
                color: isActive || isDone ? "#095db6" : "#999999",
                lineHeight: 1.4,
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