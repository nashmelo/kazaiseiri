"use client";

import React, { useState } from "react";
import StepIndicator from "@/components/form/common/StepIndicator";
import Field from "@/components/form/common/Field";
import StepSectionHeader from "@/components/form/common/StepSectionHeader";
import type { FormData, TimeSlot } from "@/types/form";
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

type Step3ScheduleProps = {
  form: FormData;
  setForm: React.Dispatch<React.SetStateAction<FormData>>;
  onNext: () => void;
  onPrev: () => void;
  pageTitle?: string;
};

const timeSlotOptions: { value: TimeSlot; label: string }[] = [
  { value: "9〜12時", label: "9〜12時" },
  { value: "12〜15時", label: "12〜15時" },
  { value: "15〜18時", label: "15〜18時" },
  { value: "希望なし", label: "希望なし" },
];

export default function Step3Schedule({
  form,
  setForm,
  onNext,
  onPrev,
  pageTitle = "引越し | エヅリン",
}: Step3ScheduleProps) {
  const [error, setError] = useState<string | null>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const setErrorAndScroll = (message: string) => {
    setError(message);
    scrollToTop();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = () => {
    setError(null);

    if (!form.pickupDate1) {
      setErrorAndScroll("第一希望日を入力してください。");
      return;
    }

    if (!form.pickupDate1Slot) {
      setErrorAndScroll("第一希望の時間帯を選択してください。");
      return;
    }

    onNext();
  };

  return (
    <main style={mainStyle}>
      <div style={wrapStyle}>
        <div style={pageTitleWrapStyle}>
          <h1 style={pageTitleStyle}>{pageTitle}</h1>
        </div>

        <StepIndicator step={3} />

        <div style={panelStyle}>
          <StepSectionHeader step={3} title="希望日をご入力ください" />

          {error && <div style={errorStyle}>{error}</div>}

          <Field label="第一希望日" required>
            <input
              type="date"
              name="pickupDate1"
              value={form.pickupDate1}
              onChange={handleChange}
              style={inputStyle}
            />
          </Field>

          <Field label="第一希望時間帯" required>
            <select
              name="pickupDate1Slot"
              value={form.pickupDate1Slot}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="">選択してください</option>
              {timeSlotOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </Field>

          <Field label="第二希望日">
            <input
              type="date"
              name="pickupDate2"
              value={form.pickupDate2}
              onChange={handleChange}
              style={inputStyle}
            />
          </Field>

          <Field label="第二希望時間帯">
            <select
              name="pickupDate2Slot"
              value={form.pickupDate2Slot}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="">選択してください</option>
              {timeSlotOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </Field>

          <Field label="第三希望日">
            <input
              type="date"
              name="pickupDate3"
              value={form.pickupDate3}
              onChange={handleChange}
              style={inputStyle}
            />
          </Field>

          <Field label="第三希望時間帯">
            <select
              name="pickupDate3Slot"
              value={form.pickupDate3Slot}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="">選択してください</option>
              {timeSlotOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
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