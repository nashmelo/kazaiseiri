"use client";

import React from "react";

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
        padding: 16,
        zIndex: 9999,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 560,
          background: "#ffffff",
          borderRadius: 12,
          overflow: "hidden",
          boxShadow: "0 12px 30px rgba(0,0,0,0.18)",
        }}
      >
        <div
          style={{
            padding: "28px 24px 24px",
            borderBottom: "1px solid #e5e7eb",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 18,
              lineHeight: 1.6,
              fontWeight: 900,
              color: "#0f5ca8",
            }}
          >
            排出事業者責任をご存じですか？
            <br />
            下記内容をご一読いただき依頼ください。
          </div>
        </div>

        <div
          style={{
            padding: "28px 28px 20px",
            color: "#222222",
            fontSize: 15,
            lineHeight: 1.9,
            fontWeight: 700,
          }}
        >
          <p style={{ margin: "0 0 24px" }}>
            事業者は、事業活動に伴って生じた廃棄物を
            <span style={{ color: "#ff2d55", fontWeight: 900 }}>
              自らの責任において適正に処理
            </span>
            する必要があります。
            また、事業活動に伴って生じた廃棄物の再生利用（リサイクル）等を行うことに努める必要があります。
          </p>

          <p
            style={{
              margin: "0 0 24px",
              fontSize: 13,
              lineHeight: 1.7,
              color: "#444444",
              fontWeight: 700,
            }}
          >
            廃棄物の処理及び清掃に関する法律　第一章第三条 より抜粋
          </p>

          <p style={{ margin: "0 0 24px" }}>
            万が一上記法令等に違反した場合は、5年以下の懲役もしくは1,000万円以下の罰金などにあたる可能性があります。
          </p>

          <p
            style={{
              margin: "0 0 16px",
              fontSize: 13,
              lineHeight: 1.7,
              color: "#444444",
              fontWeight: 700,
            }}
          >
            廃棄物の処理及び清掃に関する法律　第四章第三十二条 より抜粋
          </p>

          <p
            style={{
              margin: 0,
              fontSize: 13,
              lineHeight: 1.7,
              color: "#444444",
              fontWeight: 700,
            }}
          >
            ※違反内容により扱いは異なります。
          </p>
        </div>

        <div
          style={{
            padding: "20px 24px 28px",
            borderTop: "1px solid #e5e7eb",
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          <button
            type="button"
            onClick={onProceed}
            style={{
              width: "100%",
              border: "none",
              borderRadius: 999,
              background: "#0f5ca8",
              color: "#ffffff",
              fontSize: 18,
              fontWeight: 900,
              padding: "18px 16px",
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
              color: "#0f5ca8",
              fontSize: 18,
              fontWeight: 900,
              padding: "18px 16px",
              cursor: "pointer",
              border: "3px solid #0f5ca8",
            }}
          >
            戻る
          </button>
        </div>
      </div>
    </div>
  );
}