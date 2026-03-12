"use client";

import React, { useEffect } from "react";

type BusinessWasteModalProps = {
  open: boolean;
  onClose: () => void;
  onProceed: () => void;
};

export default function BusinessWasteModal({
  open,
  onClose,
  onProceed,
}: BusinessWasteModalProps) {
  useEffect(() => {
    if (!open) return;

    const originalBodyOverflow = document.body.style.overflow;
    const originalBodyTouchAction = document.body.style.touchAction;

    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.body.style.touchAction = originalBodyTouchAction;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.45)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 12,
        zIndex: 9999,
        overscrollBehavior: "contain",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 560,
          maxHeight: "88vh",
          background: "#ffffff",
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "0 12px 30px rgba(0,0,0,0.18)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            flexShrink: 0,
            padding: "22px 20px 18px",
            borderBottom: "1px solid #e5e7eb",
            textAlign: "center",
            background: "#ffffff",
          }}
        >
          <div
            style={{
              fontSize: 17,
              lineHeight: 1.5,
              fontWeight: 900,
              color: "var(--pink-strong)",
            }}
          >
            排出事業者責任をご存じですか？
            <br />
            下記内容をご一読いただき依頼ください。
          </div>
        </div>

        <div
          style={{
            flex: 1,
            overflowY: "auto",
            WebkitOverflowScrolling: "touch",
            overscrollBehavior: "contain",
            padding: "20px 20px 16px",
            color: "#222222",
            background: "#ffffff",
          }}
        >
          <section style={{ marginBottom: 20 }}>
            <div
              style={{
                fontSize: 13,
                fontWeight: 900,
                color: "var(--pink-strong)",
                marginBottom: 8,
              }}
            >
              排出事業者責任について
            </div>

            <p
              style={{
                margin: 0,
                fontSize: 14,
                lineHeight: 1.9,
                fontWeight: 700,
                color: "#222222",
              }}
            >
              事業者は、事業活動に伴って生じた廃棄物を
              <span style={{ color: "#ff2d55", fontWeight: 900 }}>
                自らの責任において適正に処理
              </span>
              する必要があります。また、事業活動に伴って生じた廃棄物の再生利用（リサイクル）等を行うことに努める必要があります。
            </p>

            <p
              style={{
                margin: "10px 0 0",
                fontSize: 12,
                lineHeight: 1.7,
                color: "#666666",
                fontWeight: 700,
              }}
            >
              廃棄物の処理及び清掃に関する法律　第一章第三条 より抜粋
            </p>
          </section>

          <section style={{ marginBottom: 20 }}>
            <div
              style={{
                fontSize: 13,
                fontWeight: 900,
                color: "var(--pink-strong)",
                marginBottom: 8,
              }}
            >
              違反時のリスク
            </div>

            <p
              style={{
                margin: 0,
                fontSize: 14,
                lineHeight: 1.9,
                fontWeight: 700,
                color: "#222222",
              }}
            >
              万が一上記法令等に違反した場合は、5年以下の懲役もしくは1,000万円以下の罰金などにあたる可能性があります。
            </p>

            <p
              style={{
                margin: "10px 0 0",
                fontSize: 12,
                lineHeight: 1.7,
                color: "#666666",
                fontWeight: 700,
              }}
            >
              廃棄物の処理及び清掃に関する法律　第四章第三十二条 より抜粋
            </p>
          </section>

          <section
            style={{
              background: "#f8fafc",
              border: "1px solid #e5e7eb",
              borderRadius: 12,
              padding: "12px 14px",
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: 12,
                lineHeight: 1.7,
                color: "#444444",
                fontWeight: 700,
              }}
            >
              ※違反内容により扱いは異なります。
            </p>
          </section>
        </div>

        <div
          style={{
            flexShrink: 0,
            padding: "16px 20px 20px",
            borderTop: "1px solid #e5e7eb",
            display: "flex",
            flexDirection: "column",
            gap: 12,
            background: "#ffffff",
          }}
        >
          <button
            type="button"
            onClick={onProceed}
            style={{
              width: "100%",
              border: "none",
              borderRadius: 999,
              background: "var(--pink-strong)",
              color: "#ffffff",
              fontSize: 17,
              fontWeight: 900,
              padding: "16px 16px",
              cursor: "pointer",
            }}
          >
            上記内容を確認し、依頼を行う
          </button>

          <button
            type="button"
            onClick={onClose}
            style={{
              width: "100%",
              borderRadius: 999,
              background: "#ffffff",
              color: "var(--pink-strong)",
              fontSize: 17,
              fontWeight: 900,
              padding: "16px 16px",
              cursor: "pointer",
              border: "3px solid var(--pink-strong)",
            }}
          >
            戻る
          </button>
        </div>
      </div>
    </div>
  );
}