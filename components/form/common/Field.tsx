"use client";

import React, { useEffect, useId, useRef } from "react";

type FieldProps = {
  label: string;
  required?: boolean;
  children: React.ReactNode;
};

const fieldStyle: React.CSSProperties = {
  marginBottom: 18,
  border: 0,
  padding: 0,
  minWidth: 0,
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

/**
 * 項目名と入力欄を結びつける（2026-11-09 技術点検）。
 * 以前は <label> が入力欄と結ばれておらず、項目名を押しても入力欄に移らず、
 * 読み上げでも何の欄か伝わらなかった。
 * - 中の文字入力（input / textarea / select。ラジオ・チェックは各自の名札がある）に aria-labelledby を付ける
 * - 項目名を押すと最初の文字入力に移る
 * - 全体を名前つきのまとまり（role="group"）にする。ラジオの選択肢もこの名前で読まれる
 */
export default function Field({ label, required, children }: FieldProps) {
  const labelId = useId();
  const boxRef = useRef<HTMLDivElement>(null);

  const textInputs = () =>
    Array.from(boxRef.current?.querySelectorAll<HTMLElement>("input, textarea, select") ?? []).filter((el) => {
      const t = (el as HTMLInputElement).type;
      return t !== "radio" && t !== "checkbox" && t !== "hidden" && t !== "file";
    });

  useEffect(() => {
    textInputs().forEach((el) => {
      if (!el.getAttribute("aria-label") && !el.getAttribute("aria-labelledby")) el.setAttribute("aria-labelledby", labelId);
      if (required) el.setAttribute("aria-required", "true");
    });
  });

  return (
    <div ref={boxRef} style={fieldStyle} role="group" aria-labelledby={labelId}>
      <label
        id={labelId}
        style={fieldLabelStyle}
        onClick={() => textInputs()[0]?.focus()}
      >
        {label}
        {required && <span style={requiredStyle} aria-label="必須">＊</span>}
      </label>
      {children}
    </div>
  );
}
