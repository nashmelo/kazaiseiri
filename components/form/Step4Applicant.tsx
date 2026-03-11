"use client";

import React from "react";
import StepIndicator from "@/components/form/StepIndicator";
import type { FormData } from "@/types/form";

type Step4ApplicantProps = {
  form: FormData;
  setForm: React.Dispatch<React.SetStateAction<FormData>>;
  onNext: () => void;
  onPrev: () => void;
};

export default function Step4Applicant({
  form,
  setForm,
  onNext,
  onPrev,
}: Step4ApplicantProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = () => {
    if (!form.name.trim()) {
      alert("お名前を入力してください。");
      return;
    }

    if (!form.furigana.trim()) {
      alert("ふりがなを入力してください。");
      return;
    }

    if (!form.phone.trim()) {
      alert("電話番号を入力してください。");
      return;
    }

    onNext();
  };

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

          <Field label="お名前" required>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="例：山田 太郎"
              style={inputStyle}
            />
          </Field>

          <Field label="ふりがな" required>
            <input
              type="text"
              name="furigana"
              value={form.furigana}
              onChange={handleChange}
              placeholder="例：やまだ たろう"
              style={inputStyle}
            />
          </Field>

          <Field label="電話番号" required>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="例：09012345678"
              inputMode="numeric"
              style={inputStyle}
            />
          </Field>

          <div
            style={{
              display: "flex",
              gap: 12,
              flexDirection: "column",
              marginTop: 20,
            }}
          >
            <button
              type="button"
              onClick={handleNext}
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

type FieldProps = {
  label: string;
  required?: boolean;
  children: React.ReactNode;
};

function Field({ label, required, children }: FieldProps) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label
        style={{
          display: "block",
          fontSize: 13,
          fontWeight: 800,
          color: "#222",
          marginBottom: 6,
        }}
      >
        {label}
        {required && <span style={{ color: "#d00", marginLeft: 4 }}>＊</span>}
      </label>
      {children}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 8,
  border: "1px solid #d8d8d8",
  fontSize: 14,
  boxSizing: "border-box",
  background: "#ffffff",
  color: "#111",
};

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