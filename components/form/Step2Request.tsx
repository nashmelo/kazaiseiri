"use client";

import React, { useMemo } from "react";
import StepIndicator from "@/components/form/StepIndicator";
import type { FormData } from "@/types/form";

type Step2RequestProps = {
  form: FormData;
  setForm: React.Dispatch<React.SetStateAction<FormData>>;
  onNext: () => void;
  onPrev: () => void;
};

export default function Step2Request({
  form,
  setForm,
  onNext,
  onPrev,
}: Step2RequestProps) {
  const error = useMemo(() => {
    return "";
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      images: Array.from(e.target.files || []),
    }));
  };

  const handleNext = () => {
    if (!form.service) {
      alert("依頼内容を選択してください。");
      return;
    }

    if (!form.items.trim()) {
      alert("回収ゴミの品目・個数を入力してください。");
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

        <StepIndicator step={2} />

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
            Step 2 依頼内容をご入力ください
          </div>

          {error && (
            <div
              style={{
                background: "#ffe5e5",
                color: "#b00020",
                padding: "10px 12px",
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 700,
                marginBottom: 16,
              }}
            >
              {error}
            </div>
          )}

          <Field label="依頼内容" required>
            <select
              name="service"
              value={form.service}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="">選択してください</option>
              <option value="不用品回収">不用品回収</option>
              <option value="部屋を丸ごと片付け">部屋を丸ごと片付け</option>
            </select>
          </Field>

          <Field label="回収ゴミの品目・個数" required>
            <textarea
              name="items"
              value={form.items}
              onChange={handleChange}
              rows={5}
              placeholder="例：冷蔵庫1台、洗濯機1台、タンス2棹"
              style={{ ...inputStyle, resize: "vertical" }}
            />
          </Field>

          <Field label="備考">
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows={4}
              placeholder="補足事項があればご入力ください"
              style={{ ...inputStyle, resize: "vertical" }}
            />
          </Field>

          <Field label="添付画像">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              style={fileInputStyle}
            />
            {form.images.length > 0 && (
              <div
                style={{
                  marginTop: 8,
                  fontSize: 12,
                  color: "#555",
                  fontWeight: 700,
                }}
              >
                {form.images.length}件の画像を選択中
              </div>
            )}
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
              希望日に進む
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

const fileInputStyle: React.CSSProperties = {
  width: "100%",
  fontSize: 14,
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