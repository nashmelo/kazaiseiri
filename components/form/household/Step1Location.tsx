"use client";

import React, { useEffect, useState } from "react";
import StepIndicator from "@/components/form/common/StepIndicator";
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

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      buildingType: prev.buildingType || "戸建て",
      parking: prev.parking || "あり",
      elevator: prev.elevator || "あり",
      disposalMethod: prev.disposalMethod || "自分で排出",
    }));
  }, [setForm]);

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

  const handleRadioChange = (name: keyof FormData, value: string) => {
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

        <StepIndicator step={1} />

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
            Step 1 回収場所をご指定ください
          </div>

          {error && (
            <div
              style={{
                background: "#fff1f4",
                color: "var(--pink-strong)",
                padding: "10px 12px",
                borderRadius: 10,
                fontSize: 13,
                fontWeight: 700,
                marginBottom: 16,
                border: "1px solid #f5bfd0",
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
              <div
                style={{
                  marginTop: 6,
                  fontSize: 12,
                  color: "var(--text-sub)",
                  fontWeight: 700,
                }}
              >
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
            <RadioCardGroup
              name="buildingType"
              value={form.buildingType}
              onChange={handleRadioChange}
              options={[
                { value: "戸建て", label: "戸建て" },
                { value: "マンション・アパート", label: "マンション・アパート" },
                { value: "倉庫", label: "倉庫" },
                { value: "オフィス", label: "オフィス" },
                { value: "その他", label: "その他" },
              ]}
              columns={2}
            />
          </Field>

          {form.buildingType === "マンション・アパート" && (
            <div
              style={{
                marginTop: -6,
                marginBottom: 14,
                color: "var(--pink-strong)",
                fontSize: 12,
                fontWeight: 800,
              }}
            >
              マンション・アパートを選択した方は、住所欄に建物名・部屋番号をご記入ください
            </div>
          )}

          <Field label="駐車場の有無" required>
            <RadioCardGroup
              name="parking"
              value={form.parking}
              onChange={handleRadioChange}
              options={[
                { value: "あり", label: "あり" },
                { value: "なし", label: "なし" },
              ]}
              columns={2}
            />
          </Field>

          <Field label="エレベーターの有無" required>
            <RadioCardGroup
              name="elevator"
              value={form.elevator}
              onChange={handleRadioChange}
              options={[
                { value: "あり", label: "あり" },
                { value: "なし", label: "なし" },
              ]}
              columns={2}
            />
          </Field>

          <Field label="ゴミの排出方法" required>
            <div
              style={{
                marginBottom: 8,
                fontSize: 12,
                color: "var(--text-sub)",
                fontWeight: 700,
                lineHeight: 1.5,
              }}
            >
              ご自身で家の外に出す場合は「自分で排出」を、排出から依頼する場合は「排出を希望する」を選択してください
            </div>

            <RadioCardGroup
              name="disposalMethod"
              value={form.disposalMethod}
              onChange={handleRadioChange}
              options={[
                { value: "自分で排出", label: "自分で排出" },
                { value: "排出を希望する", label: "排出を希望する" },
              ]}
              columns={2}
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
    <div style={{ marginBottom: 18 }}>
      <label
        style={{
          display: "block",
          fontSize: 13,
          fontWeight: 800,
          color: "var(--text-main)",
          marginBottom: 8,
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

type RadioOption = {
  value: string;
  label: string;
};

type RadioCardGroupProps = {
  name: keyof FormData;
  value: string;
  onChange: (name: keyof FormData, value: string) => void;
  options: RadioOption[];
  columns?: 1 | 2;
};

function RadioCardGroup({
  name,
  value,
  onChange,
  options,
  columns = 2,
}: RadioCardGroupProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: columns === 2 ? "1fr 1fr" : "1fr",
        gap: 10,
      }}
    >
      {options.map((option) => {
        const checked = value === option.value;

        return (
          <label
            key={option.value}
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              gap: 10,
              minHeight: 58,
              padding: "14px 16px",
              borderRadius: 16,
              border: checked
                ? "2px solid var(--pink-strong)"
                : "2px solid #efd7df",
              background: checked ? "#fff1f6" : "#ffffff",
              color: checked ? "var(--pink-strong)" : "var(--text-main)",
              fontWeight: 900,
              fontSize: 16,
              cursor: "pointer",
              boxSizing: "border-box",
              transition: "all 0.2s ease",
            }}
          >
            <input
              type="radio"
              name={String(name)}
              value={option.value}
              checked={checked}
              onChange={() => onChange(name, option.value)}
              style={radioInputHiddenStyle}
            />

            <span
              style={{
                width: 22,
                height: 22,
                borderRadius: "50%",
                border: checked
                  ? "2px solid var(--pink-strong)"
                  : "2px solid #c9b7be",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                background: "#fff",
              }}
            >
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: checked ? "var(--pink-strong)" : "transparent",
                }}
              />
            </span>

            <span style={{ lineHeight: 1.3 }}>{option.label}</span>
          </label>
        );
      })}
    </div>
  );
}

const radioInputHiddenStyle: React.CSSProperties = {
  position: "absolute",
  opacity: 0,
  pointerEvents: "none",
};

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

const smallButtonStyle: React.CSSProperties = {
  border: "none",
  borderRadius: 10,
  background: "var(--pink-strong)",
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