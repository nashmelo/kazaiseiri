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

type Step3ScheduleProps = {
  tenantKey?: TenantKey;
  form: FormData;
  setForm: React.Dispatch<React.SetStateAction<FormData>>;
  onNext: () => void;
  onPrev: () => void;
};

export default function Step3Schedule({
  tenantKey = "default",
  form,
  setForm,
  onNext,
  onPrev,
}: Step3ScheduleProps) {
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

    if (!form.pickupDate1) {
      setErrorAndScroll("第一希望回収日を入力してください。");
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

        <StepIndicator step={3} />

        <div style={panelStyle}>
          <StepSectionHeader step={3} title="希望日をご入力ください" />

          {error && <div style={errorStyle}>{error}</div>}

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

          <div style={buttonGroupStyle}>
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