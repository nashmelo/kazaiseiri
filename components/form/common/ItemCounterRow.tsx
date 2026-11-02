// components/form/common/ItemCounterRow.tsx

"use client";

import React from "react";

type ItemCounterRowProps = {
  label: string;
  /** ラベルの下に小さく出す補足（検索結果のカテゴリ名など） */
  sub?: string;
  count: number;
  onDecrease: () => void;
  onIncrease: () => void;
};

export default function ItemCounterRow({
  label,
  sub,
  count,
  onDecrease,
  onIncrease,
}: ItemCounterRowProps) {
  return (
    <div style={rowStyle}>
      <div style={labelStyle}>
        {label}
        {sub && <div style={subStyle}>{sub}</div>}
      </div>

      <div style={controlStyle}>
        <button
          type="button"
          onClick={onDecrease}
          style={buttonStyle}
          aria-label={`${label}を1つ減らす`}
        >
          −
        </button>

        <div style={countStyle}>{count}</div>

        <button
          type="button"
          onClick={onIncrease}
          style={buttonStyle}
          aria-label={`${label}を1つ増やす`}
        >
          ＋
        </button>
      </div>
    </div>
  );
}

const rowStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 12,
  padding: "12px 0",
  borderBottom: "1px solid #f3d9e6",
};

const labelStyle: React.CSSProperties = {
  flex: 1,
  fontSize: 14,
  fontWeight: 600,
  color: "var(--text-main)",
  lineHeight: 1.5,
};

const controlStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  flexShrink: 0,
};

const buttonStyle: React.CSSProperties = {
  width: 32,
  height: 32,
  border: "1px solid #e7b7cf",
  borderRadius: 9999,
  background: "#fff",
  color: "#e85d98",
  fontSize: 18,
  fontWeight: 700,
  lineHeight: 1,
  cursor: "pointer",
};

const countStyle: React.CSSProperties = {
  minWidth: 24,
  textAlign: "center",
  fontSize: 15,
  fontWeight: 700,
  color: "var(--text-main)",
};
const subStyle: React.CSSProperties = {
  marginTop: 2,
  fontSize: 12,
  fontWeight: 500,
  color: "var(--text-sub)",
};
