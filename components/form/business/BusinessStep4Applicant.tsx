"use client";

import React, { useEffect, useState } from "react";
import StepIndicator from "@/components/form/common/StepIndicator";
import Field from "@/components/form/common/Field";
import StepSectionHeader from "@/components/form/common/StepSectionHeader";
import type { FormData } from "@/types/form";
import { inputStyle } from "@/styles/formStyles";
import {
  mainStyle,
  wrapStyle,
  pageTitleWrapStyle,
  pageTitleStyle,
  panelStyle,
  errorStyle,
  buttonGroupStyle,
  primaryButtonStyle,
  secondaryButtonStyle,
} from "@/styles/formStepStyles";

type TenantKey = "default" | "ezurin" | "client-a";

type BusinessStep4ApplicantProps = {
  tenantKey?: TenantKey;
  form: FormData;
  setForm: React.Dispatch<React.SetStateAction<FormData>>;
  onNext: () => void;
  onPrev: () => void;
};

export default function BusinessStep4Applicant({
  tenantKey = "default",
  form,
  setForm,
  onNext,
  onPrev,
}: BusinessStep4ApplicantProps) {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      businessFormType: prev.businessFormType || "法人",
    }));
  }, [setForm]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const setErrorAndScroll = (message: string) => {
    setError(message);
    scrollToTop();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSelectBusinessType = (value: FormData["businessFormType"]) => {
    setForm((prev) => ({
      ...prev,
      businessFormType: value,
    }));
  };

  const handleNext = () => {
    setError(null);

    if (!form.businessFormType) {
      setErrorAndScroll("事業形態を選択してください。");
      return;
    }

    if (!form.businessName.trim()) {
      setErrorAndScroll("屋号または法人名を入力してください。");
      return;
    }

    if (!form.contactLastName.trim()) {
      setErrorAndScroll("担当者の姓を入力してください。");
      return;
    }

    if (!form.contactFirstName.trim()) {
      setErrorAndScroll("担当者の名を入力してください。");
      return;
    }

    if (!form.contactLastNameKana.trim()) {
      setErrorAndScroll("担当者の姓（かな）を入力してください。");
      return;
    }

    if (!form.contactFirstNameKana.trim()) {
      setErrorAndScroll("担当者の名（かな）を入力してください。");
      return;
    }

    if (!form.contactPhone.trim()) {
      setErrorAndScroll("担当者の電話番号を入力してください。");
      return;
    }

    if (form.receiptDifferent) {
      if (!form.receiptName.trim()) {
        setErrorAndScroll("領収書の宛名を入力してください。");
        return;
      }

      if (!form.representativeLastName.trim()) {
        setErrorAndScroll("代表の姓を入力してください。");
        return;
      }

      if (!form.representativeFirstName.trim()) {
        setErrorAndScroll("代表の名を入力してください。");
        return;
      }

      if (!form.representativeLastNameKana.trim()) {
        setErrorAndScroll("代表の姓（かな）を入力してください。");
        return;
      }

      if (!form.representativeFirstNameKana.trim()) {
        setErrorAndScroll("代表の名（かな）を入力してください。");
        return;
      }

      if (!form.representativePhone.trim()) {
        setErrorAndScroll("代表の電話番号を入力してください。");
        return;
      }
    }

    onNext();
  };

  return (
    <main style={mainStyle}>
      <div style={wrapStyle}>
        <div style={pageTitleWrapStyle}>
          <h1 style={pageTitleStyle}>
            片付け・不用品回収 |{" "}
            {tenantKey === "ezurin" ? "エヅリン" : "すっきりん"}
          </h1>
        </div>

        <StepIndicator step={4} />

        <div style={panelStyle}>
          <StepSectionHeader step={4} title="申込者情報をご入力ください" />

          {error && <div style={errorStyle}>{error}</div>}

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

          <Field label="担当者のメールアドレス">
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

          <div style={receiptToggleWrapStyle}>
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
              <div style={receiptNoticeStyle}>
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

              <Field label="代表のメールアドレス">
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

          <div style={buttonGroupStyle}>
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

function HintText({ children }: { children: React.ReactNode }) {
  return <div style={hintTextStyle}>{children}</div>;
}

function HalfFieldRow({ children }: { children: React.ReactNode }) {
  return <div style={halfFieldRowStyle}>{children}</div>;
}

function SegmentButtonRow({ children }: { children: React.ReactNode }) {
  return <div style={segmentButtonRowStyle}>{children}</div>;
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
    <button type="button" onClick={onClick} style={getSelectCardStyle(checked)}>
      {label}
    </button>
  );
}

const hintTextStyle: React.CSSProperties = {
  marginTop: 6,
  fontSize: 12,
  fontWeight: 700,
  color: "var(--pink-strong)",
  lineHeight: 1.4,
};

const halfFieldRowStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 12,
};

const segmentButtonRowStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 12,
};

const getSelectCardStyle = (checked: boolean): React.CSSProperties => ({
  minHeight: 56,
  borderRadius: 16,
  border: checked ? "2px solid var(--pink-logo)" : "2px solid #e6d7de",
  background: checked ? "rgba(251,155,204,0.16)" : "#ffffff",
  color: checked ? "var(--pink-strong)" : "var(--text-main)",
  fontSize: 16,
  fontWeight: 900,
  cursor: "pointer",
});

const receiptToggleWrapStyle: React.CSSProperties = {
  marginTop: 18,
  marginBottom: 20,
};

const receiptNoticeStyle: React.CSSProperties = {
  marginBottom: 14,
  color: "var(--pink-strong)",
  fontSize: 14,
  fontWeight: 800,
  lineHeight: 1.6,
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