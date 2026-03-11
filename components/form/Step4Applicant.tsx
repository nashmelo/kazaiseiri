"use client";

import React from "react";
import StepIndicator from "@/components/form/StepIndicator";

type Step4ApplicantProps = {
  onNext: () => void;
  onPrev: () => void;
};

export default function Step4Applicant({
  onNext,
  onPrev,
}: Step4ApplicantProps) {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#8ed0f4",
        padding: "24px 16px 40px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: 480,
          margin: "0 auto",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: 16,
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: 18,
              fontWeight: 900,
              color: "#ffffff",
            }}
          >
            粗大ゴミ回収 | すっきりん
          </h1>
        </div>

        <StepIndicator step={4} />

        <div
          style={{
            background: "#f7f7f7",
            borderRadius: 28,
            padding: "22px 18px 24px",
            boxSizing: "border-box",
            boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
          }}
        >
          <div
            style={{
              background: "#8ed0f4",
              color: "#ffffff",
              textAlign: "center",
              fontSize: 18,
              fontWeight: 900,
              padding: "18px 12px",
              borderRadius: 10,
              marginBottom: 24,
            }}
          >
            Step 4 申込者情報をご入力ください
          </div>

          <div
            style={{
              color: "#222",
              fontSize: 16,
              fontWeight: 700,
              lineHeight: 1.8,
              marginBottom: 24,
            }}
          >
            ここに申込者情報の入力項目を入れていきます。
            <br />
            まずは画面遷移の確認用ダミーです。
          </div>

          <div
            style={{
              display: "flex",
              gap: 12,
              flexDirection: "column",
            }}
          >
            <button
              type="button"
              onClick={onNext}
              style={primaryButtonStyle}
            >
              内容確認に進む
            </button>

            <button
              type="button"
              onClick={onPrev}
              style={secondaryButtonStyle}
            >
              前に戻る
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

const primaryButtonStyle: React.CSSProperties = {
  width: "100%",
  border: "none",
  borderRadius: 999,
  background: "#095db6",
  color: "#ffffff",
  fontSize: 18,
  fontWeight: 900,
  padding: "18px 16px",
  cursor: "pointer",
};

const secondaryButtonStyle: React.CSSProperties = {
  width: "100%",
  borderRadius: 999,
  background: "#ffffff",
  color: "#095db6",
  fontSize: 18,
  fontWeight: 900,
  padding: "18px 16px",
  cursor: "pointer",
  border: "3px solid #095db6",
};