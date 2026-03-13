"use client";

import React from "react";
import StepIndicator from "@/components/form/common/StepIndicator";
import type { FormData } from "@/types/form";

type BusinessStep4ApplicantProps = {
  form: FormData;
  setForm: React.Dispatch<React.SetStateAction<FormData>>;
  onNext: () => void;
  onPrev: () => void;
};

export default function BusinessStep4Applicant({
  form,
  setForm,
  onNext,
  onPrev,
}: BusinessStep4ApplicantProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSelectBusinessType = (
  value: FormData["businessFormType"]
) => {
  setForm((prev) => ({
    ...prev,
    businessFormType: value,
  }));
};

  const handleNext = () => {
    if (!form.businessFormType) {
      alert("事業形態を選択してください。");
      return;
    }

    if (!form.businessName.trim()) {
      alert("屋号または法人名を入力してください。");
      return;
    }

    if (!form.contactLastName.trim()) {
      alert("担当者の姓を入力してください。");
      return;
    }

    if (!form.contactFirstName.trim()) {
      alert("担当者の名を入力してください。");
      return;
    }

    if (!form.contactLastNameKana.trim()) {
      alert("担当者の姓（かな）を入力してください。");
      return;
    }

    if (!form.contactFirstNameKana.trim()) {
      alert("担当者の名（かな）を入力してください。");
      return;
    }

    if (!form.contactPhone.trim()) {
      alert("担当者の電話番号を入力してください。");
      return;
    }

    if (!form.contactEmail.trim()) {
      alert("担当者のメールアドレスを入力してください。");
      return;
    }

    if (form.receiptDifferent) {
      if (!form.receiptName.trim()) {
        alert("領収書の宛名を入力してください。");
        return;
      }

      if (!form.representativeLastName.trim()) {
        alert("代表の姓を入力してください。");
        return;
      }

      if (!form.representativeFirstName.trim()) {
        alert("代表の名を入力してください。");
        return;
      }

      if (!form.representativeLastNameKana.trim()) {
        alert("代表の姓（かな）を入力してください。");
        return;
      }

      if (!form.representativeFirstNameKana.trim()) {
        alert("代表の名（かな）を入力してください。");
        return;
      }

      if (!form.representativePhone.trim()) {
        alert("代表の電話番号を入力してください。");
        return;
      }

      if (!form.representativeEmail.trim()) {
        alert("代表のメールアドレスを入力してください。");
        return;
      }
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
            事業ゴミ回収 | すっきりん
          </h1>
        </div>

        <StepIndicator step={4} />

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
            Step 4 申込者情報をご入力ください
          </div>

          <Field label="事業形態" required>
            <SegmentButtonRow>
              <SelectCard
                label="法人"
                checked={form.businessFormType === "法人"}
                onClick={() => handleSelectBusinessType("法人")}
              />
              <SelectCard
                label="個人事業主"
                checked={form.businessFormType === "個人事業主"}
                onClick={() => handleSelectBusinessType("個人事業主")}
              />
            </SegmentButtonRow>
          </Field>

          <Field
            label={form.businessFormType === "法人" ? "法人名" : "屋号"}
            required
          >
            <input
              type="text"
              name="businessName"
              value={form.businessName}
              onChange={handleChange}
              placeholder={
                form.businessFormType === "法人"
                  ? "例：株式会社エヅリン"
                  : "例：すっきり商店"
              }
              style={inputStyle}
            />
          </Field>

          <HalfFieldRow>
            <Field label="担当者の姓" required>
              <input
                type="text"
                name="contactLastName"
                value={form.contactLastName}
                onChange={handleChange}
                placeholder="例：山田"
                style={inputStyle}
              />
            </Field>

            <Field label="担当者の名" required>
              <input
                type="text"
                name="contactFirstName"
                value={form.contactFirstName}
                onChange={handleChange}
                placeholder="例：太郎"
                style={inputStyle}
              />
            </Field>
          </HalfFieldRow>

          <HalfFieldRow>
            <Field label="担当者の姓（かな）" required>
              <input
                type="text"
                name="contactLastNameKana"
                value={form.contactLastNameKana}
                onChange={handleChange}
                placeholder="例：やまだ"
                style={inputStyle}
              />
              <HintText>全角ひらがなのみ</HintText>
            </Field>

            <Field label="担当者の名（かな）" required>
              <input
                type="text"
                name="contactFirstNameKana"
                value={form.contactFirstNameKana}
                onChange={handleChange}
                placeholder="例：たろう"
                style={inputStyle}
              />
              <HintText>全角ひらがなのみ</HintText>
            </Field>
          </HalfFieldRow>

          <Field label="担当者の電話番号" required>
            <input
              type="tel"
              name="contactPhone"
              value={form.contactPhone}
              onChange={handleChange}
              placeholder="例：09012345678"
              inputMode="numeric"
              style={inputStyle}
            />
            <HintText>半角数字のみ、ハイフンなし</HintText>
          </Field>

          <Field label="担当者のメールアドレス" required>
            <input
              type="email"
              name="contactEmail"
              value={form.contactEmail}
              onChange={handleChange}
              placeholder="例：sample@sample.com"
              style={inputStyle}
            />
            <HintText>契約書や領収書の送付に利用されます</HintText>
          </Field>

          <div style={{ marginTop: 18, marginBottom: 20 }}>
            <label style={checkCardStyle}>
              <input
                type="checkbox"
                name="receiptDifferent"
                checked={form.receiptDifferent}
                onChange={handleChange}
                style={checkboxStyle}
              />
              <span>領収書の宛名は異なります</span>
            </label>
          </div>

          {form.receiptDifferent && (
            <>
              <div
                style={{
                  marginBottom: 14,
                  color: "var(--pink-strong)",
                  fontSize: 14,
                  fontWeight: 800,
                  lineHeight: 1.6,
                }}
              >
                以下の情報は、領収書の宛名記載時にのみ利用されます。
                <br />
                送付や連絡には、上記の担当者情報が利用されます。
              </div>

              <Field label="領収書の宛名" required>
                <input
                  type="text"
                  name="receiptName"
                  value={form.receiptName}
                  onChange={handleChange}
                  placeholder="例：株式会社エヅリン"
                  style={inputStyle}
                />
              </Field>

              <HalfFieldRow>
                <Field label="代表の姓" required>
                  <input
                    type="text"
                    name="representativeLastName"
                    value={form.representativeLastName}
                    onChange={handleChange}
                    placeholder="例：山田"
                    style={inputStyle}
                  />
                </Field>

                <Field label="代表の名" required>
                  <input
                    type="text"
                    name="representativeFirstName"
                    value={form.representativeFirstName}
                    onChange={handleChange}
                    placeholder="例：太郎"
                    style={inputStyle}
                  />
                </Field>
              </HalfFieldRow>

              <HalfFieldRow>
                <Field label="代表の姓（かな）" required>
                  <input
                    type="text"
                    name="representativeLastNameKana"
                    value={form.representativeLastNameKana}
                    onChange={handleChange}
                    placeholder="例：やまだ"
                    style={inputStyle}
                  />
                  <HintText>全角ひらがなのみ</HintText>
                </Field>

                <Field label="代表の名（かな）" required>
                  <input
                    type="text"
                    name="representativeFirstNameKana"
                    value={form.representativeFirstNameKana}
                    onChange={handleChange}
                    placeholder="例：たろう"
                    style={inputStyle}
                  />
                  <HintText>全角ひらがなのみ</HintText>
                </Field>
              </HalfFieldRow>

              <Field label="代表の電話番号" required>
                <input
                  type="tel"
                  name="representativePhone"
                  value={form.representativePhone}
                  onChange={handleChange}
                  placeholder="例：09012345678"
                  inputMode="numeric"
                  style={inputStyle}
                />
                <HintText>半角数字のみ、ハイフンなし</HintText>
              </Field>

              <Field label="代表のメールアドレス" required>
                <input
                  type="email"
                  name="representativeEmail"
                  value={form.representativeEmail}
                  onChange={handleChange}
                  placeholder="例：sample@sample.com"
                  style={inputStyle}
                />
              </Field>
            </>
          )}

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
    <div style={{ marginBottom: 16, flex: 1 }}>
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

function HintText({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        marginTop: 6,
        fontSize: 12,
        fontWeight: 700,
        color: "var(--pink-strong)",
        lineHeight: 1.4,
      }}
    >
      {children}
    </div>
  );
}

function HalfFieldRow({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 12,
      }}
    >
      {children}
    </div>
  );
}

function SegmentButtonRow({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 12,
      }}
    >
      {children}
    </div>
  );
}

function SelectCard({
  label,
  checked,
  onClick,
}: {
  label: string;
  checked: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        minHeight: 56,
        borderRadius: 16,
        border: checked
          ? "2px solid var(--pink-strong)"
          : "2px solid #e6d7de",
        background: checked ? "#fff1f6" : "#ffffff",
        color: checked ? "var(--pink-strong)" : "var(--text-main)",
        fontSize: 16,
        fontWeight: 900,
        cursor: "pointer",
      }}
    >
      {label}
    </button>
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

const checkCardStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 12,
  minHeight: 58,
  padding: "16px 14px",
  borderRadius: 16,
  border: "2px solid #efd7df",
  background: "#ffffff",
  color: "var(--text-main)",
  fontSize: 16,
  fontWeight: 800,
  cursor: "pointer",
  boxSizing: "border-box",
};

const checkboxStyle: React.CSSProperties = {
  width: 20,
  height: 20,
  accentColor: "var(--pink-strong)",
  flexShrink: 0,
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