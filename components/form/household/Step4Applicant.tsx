"use client";

import React, { useState } from "react";
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

type Step4ApplicantProps = {
  tenantKey?: TenantKey;
  form: FormData;
  setForm: React.Dispatch<React.SetStateAction<FormData>>;
  onNext: () => void;
  onPrev: () => void;
};

export default function Step4Applicant({
  tenantKey = "default",
  form,
  setForm,
  onNext,
  onPrev,
}: Step4ApplicantProps) {
  const [error, setError] = useState<string | null>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const setErrorAndScroll = (message: string) => {
    setError(message);
    scrollToTop();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = () => {
    setError(null);

    if (!form.name.trim()) {
      setErrorAndScroll("お名前を入力してください。");
      return;
    }

    if (!form.furigana.trim()) {
      setErrorAndScroll("ふりがなを入力してください。");
      return;
    }

    if (!form.phone.trim()) {
      setErrorAndScroll("電話番号を入力してください。");
      return;
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