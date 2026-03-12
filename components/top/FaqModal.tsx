"use client";

import React from "react";
import { faqs } from "@/lib/faqs";

type FaqModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function FaqModal({ open, onClose }: FaqModalProps) {
  if (!open) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        zIndex: 9999,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 520,
          maxHeight: "85vh",
          overflowY: "auto",
          background: "#fffafb",
          borderRadius: 28,
          padding: "28px 22px 24px",
          boxSizing: "border-box",
          boxShadow: "0 12px 30px rgba(0,0,0,0.2)",
          border: "2px solid var(--pink-main)",
        }}
      >
        <div
          style={{
            textAlign: "center",
            fontSize: 24,
            fontWeight: 900,
            color: "var(--pink-strong)",
            marginBottom: 20,
          }}
        >
          よくある質問
        </div>

        <div
          style={{
            textAlign: "center",
            fontSize: 14,
            lineHeight: 1.8,
            color: "var(--text-main)",
            fontWeight: 700,
            marginBottom: 24,
          }}
        >
          ご利用前によくいただくご質問を
          <br />
          まとめてご案内しています。
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {faqs.map((faq, index) => (
            <div
              key={faq.question}
              style={{
                background: "#ffffff",
                border: "2px solid #f3c7d6",
                borderRadius: 20,
                padding: "18px 16px",
                boxSizing: "border-box",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minWidth: 42,
                  height: 32,
                  padding: "0 12px",
                  borderRadius: 999,
                  background: "var(--pink-soft)",
                  color: "var(--pink-strong)",
                  fontSize: 13,
                  fontWeight: 900,
                  marginBottom: 10,
                }}
              >
                Q{index + 1}
              </div>

              <div
                style={{
                  fontSize: 18,
                  fontWeight: 900,
                  color: "var(--text-main)",
                  lineHeight: 1.5,
                  marginBottom: 8,
                }}
              >
                {faq.question}
              </div>

              <div
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: "var(--text-sub)",
                  lineHeight: 1.8,
                  whiteSpace: "pre-wrap",
                }}
              >
                {faq.answer}
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={onClose}
          style={{
            width: "100%",
            borderRadius: 999,
            background: "#ffffff",
            color: "var(--pink-strong)",
            fontSize: 18,
            fontWeight: 900,
            padding: "18px 16px",
            cursor: "pointer",
            border: "3px solid var(--pink-strong)",
            marginTop: 20,
          }}
        >
          トップへ戻る
        </button>
      </div>
    </div>
  );
}