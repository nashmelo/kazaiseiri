"use client";

import React from "react";
import { serviceAreas } from "@/lib/serviceAreas";

type ServiceAreaModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function ServiceAreaModal({
  open,
  onClose,
}: ServiceAreaModalProps) {
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
          background: "#fff",
          borderRadius: 28,
          padding: "28px 22px 24px",
          boxSizing: "border-box",
          boxShadow: "0 12px 30px rgba(0,0,0,0.2)",
        }}
      >
        <div
          style={{
            textAlign: "center",
            fontSize: 18,
            fontWeight: 900,
            color: "#0f5ca8",
            marginBottom: 20,
          }}
        >
          サービス展開地域
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
          現在、以下の地域でご利用いただけます。
          <br />
          サービス展開地域は順次拡大予定です。
        </div>

        {serviceAreas.map((area) => (
          <div key={area.prefecture} style={{ marginBottom: 24 }}>
            <div
              style={{
                fontSize: 16,
                fontWeight: 900,
                color: "var(--text-main)",
                marginBottom: 10,
              }}
            >
              {area.prefecture}
            </div>

            <div
              style={{
                fontSize: 15,
                lineHeight: 1.9,
                color: "var(--text-main)",
                fontWeight: 700,
              }}
            >
              {area.cities.join("、")}
            </div>
          </div>
        ))}

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
            marginTop: 8,
          }}
        >
          トップへ戻る
        </button>
      </div>
    </div>
  );
}