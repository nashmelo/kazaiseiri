"use client";

import React, { useState } from "react";
import StepIndicator from "@/components/form/StepIndicator";
import type { FormData } from "@/types/form";
import { lookupAddressByPostalCode } from "@/lib/postal";

type Step1LocationProps = {
  form: FormData;
  setForm: React.Dispatch<React.SetStateAction<FormData>>;
  onNext: () => void;
  onBackToTop: () => void;
};

export default function Step1Location({
  form,
  setForm,
  onNext,
  onBackToTop,
}: Step1LocationProps) {
  const [postalStatus, setPostalStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "postalCode") {
      const normalized = value.replace(/\D/g, "");
      setForm((prev) => ({
        ...prev,
        postalCode: normalized,
      }));
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePostalLookup = async () => {
    setError(null);

    if (!/^\d{7}$/.test(form.postalCode)) {
      setError("郵便番号は7桁で入力してください。");
      return;
    }

    try {
      setPostalStatus("住所を検索しています…");

      const result = await lookupAddressByPostalCode(form.postalCode);

      setForm((prev) => ({
        ...prev,
        prefecture: result.prefecture,
        city: result.city,
      }));

      setPostalStatus(null);
    } catch (err) {
      setPostalStatus(null);
      setError(err instanceof Error ? err.message : "住所検索に失敗しました。");
    }
  };

  const handleNext = () => {
    setError(null);

    if (!form.postalCode) {
      setError("郵便番号を入力してください。");
      return;
    }

    if (!/^\d{7}$/.test(form.postalCode)) {
      setError("郵便番号は7桁で入力してください。");
      return;
    }

    if (!form.prefecture) {
      setError("都道府県を入力してください。");
      return;
    }

    if (!form.city) {
      setError("市町村を入力してください。");
      return;
    }

    if (!form.address) {
      setError("住所を入力してください。");
      return;
    }

    if (!form.buildingType) {
      setError("建物の種類を選択してください。");
      return;
    }

    if (!form.parking) {
      setError("駐車場の有無を選択してください。");
      return;
    }

    if (!form.elevator) {
      setError("エレベーターの有無を選択してください。");
      return;
    }

    if (!form.disposalMethod) {
      setError("ゴミの排出方法を選択してください。");
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

        <StepIndicator step={1} />

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
            Step 1 回収場所をご指定ください
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

          <Field label="郵便番号" required>
            <div style={{ display: "flex", gap: 8 }}>
              <input
                name="postalCode"
                value={form.postalCode}
                onChange={handleChange}
                type="text"
                inputMode="numeric"
                placeholder="3210123"
                style={{ ...inputStyle, flex: 1 }}
              />
              <button
                type="button"
                onClick={handlePostalLookup}
                style={smallButtonStyle}
              >
                検索
              </button>
            </div>
            {postalStatus && (
              <div style={{ marginTop: 6, fontSize: 12, color: "#666" }}>
                {postalStatus}
              </div>
            )}
          </Field>

          <Field label="都道府県" required>
            <input
              name="prefecture"
              value={form.prefecture}
              onChange={handleChange}
              type="text"
              style={inputStyle}
            />
          </Field>

          <Field label="市町村" required>
            <input
              name="city"
              value={form.city}
              onChange={handleChange}
              type="text"
              style={inputStyle}
            />
          </Field>

          <Field label="住所" required>
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              type="text"
              placeholder="番地・建物名など"
              style={inputStyle}
            />
          </Field>

          <Field label="建物の種類" required>
            <select
              name="buildingType"
              value={form.buildingType}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="">選択してください</option>
              <option value="戸建て">戸建て</option>
              <option value="マンション・アパート">マンション・アパート</option>
              <option value="倉庫">倉庫</option>
              <option value="オフィス">オフィス</option>
              <option value="その他">その他</option>
            </select>
          </Field>

          <Field label="駐車場の有無" required>
            <select
              name="parking"
              value={form.parking}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="">選択してください</option>
              <option value="あり">あり</option>
              <option value="なし">なし</option>
            </select>
          </Field>

          <Field label="エレベーターの有無" required>
            <select
              name="elevator"
              value={form.elevator}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="">選択してください</option>
              <option value="あり">あり</option>
              <option value="なし">なし</option>
            </select>
          </Field>

          <Field label="ゴミの排出方法" required>
            <select
              name="disposalMethod"
              value={form.disposalMethod}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="">選択してください</option>
              <option value="自分で排出">自分で排出</option>
              <option value="排出を希望する">排出を希望する</option>
            </select>
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
              依頼内容に進む
            </button>

            <button
              type="button"
              onClick={onBackToTop}
              style={secondaryButtonStyle}
            >
              トップに戻る
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

const smallButtonStyle: React.CSSProperties = {
  border: "none",
  borderRadius: 8,
  background: "#095db6",
  color: "#ffffff",
  fontSize: 14,
  fontWeight: 800,
  padding: "0 14px",
  cursor: "pointer",
  whiteSpace: "nowrap",
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