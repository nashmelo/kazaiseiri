"use client";

import React from "react";
import StepIndicator from "@/components/form/StepIndicator";
import type { FormData } from "@/types/form";

type Step3ScheduleProps = {
  form: FormData;
  setForm: React.Dispatch<React.SetStateAction<FormData>>;
  onNext: () => void;
  onPrev: () => void;
};

export default function Step3Schedule({
  form,
  setForm,
  onNext,
  onPrev,
}: Step3ScheduleProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = () => {
    if (!form.pickupDate1) {
      alert("第一希望回収日を入力してください。");
      return;
    }

    onNext();
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "var(--bg-main)",
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
              color: "var(--text-main)",
            }}
          >
            粗大ゴミ回収 | すっきりん
          </h1>
        </div>

        <StepIndicator step={3} />

        <div
          style={{
            background: "#fffafb",
            borderRadius: 28,
            padding: "22px 18px 24px",
            boxSizing: "border-box",
            boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
          }}
        >
          <div
            style={{
              background: "var(--pink-soft)",
              color: "var(--pink-strong)",
              textAlign: "center",
              fontSize: 18,
              fontWeight: 900,
              padding: "18px 12px",
              borderRadius: 12,
              marginBottom: 24,
              border: "2px solid var(--pink-main)",
            }}
          >
            Step 3 希望日をご入力ください
          </div>

          <Field label="第一希望回収日" required>
            <input
              type="datetime-local"
              name="pickupDate1"
              value={form.pickupDate1}
              onChange={handleChange}
              style={inputStyle}
            />
          </Field>

          <Field label="第二希望回収日">
            <input
              type="datetime-local"
              name="pickupDate2"
              value={form.pickupDate2}
              onChange={handleChange}
              style={inputStyle}
            />
          </Field>

          <Field label="第三希望回収日">
            <input
              type="datetime-local"
              name="pickupDate3"
              value={form.pickupDate3}
              onChange={handleChange}
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
              申込者情報に進む
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
          color: "var(--text-main)",
          marginBottom: 6,
        }}
      >
        {label}
        {required && (
          <span style={{ color: "var(--pink-strong)", marginLeft: 4 }}>＊</span>
        )}
      </label>
      {children}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 12px",
  borderRadius: 10,
  border: "1px solid #e6d7de",
  fontSize: 14,
  boxSizing: "border-box",
  background: "#ffffff",
  color: "var(--text-main)",
  outline: "none",
};

const primaryButtonStyle: React.CSSProperties = {
  width: "100%",
  border: "none",
  borderRadius: 999,
  background: "var(--pink-strong)",
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
  color: "var(--pink-strong)",
  fontSize: 18,
  fontWeight: 900,
  padding: "18px 16px",
  cursor: "pointer",
  border: "3px solid var(--pink-strong)",
};