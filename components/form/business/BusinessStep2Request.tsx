"use client";

import React, { useEffect, useState } from "react";
import StepIndicator from "@/components/form/common/StepIndicator";
import Field from "@/components/form/common/Field";
import RadioCardGroup from "@/components/form/common/RadioCardGroup";
import StepSectionHeader from "@/components/form/common/StepSectionHeader";
import type { FormData } from "@/types/form";
import { textareaStyle } from "@/styles/formStyles";
import {
  MAX_FILES,
  isAllowedImage,
  isWithinSizeLimit,
  IMAGE_TYPE_ERROR,
  IMAGE_SIZE_ERROR,
  IMAGE_COUNT_ERROR,
} from "@/lib/images/imageRules";
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

type Step2RequestProps = {
  tenantKey?: TenantKey;
  form: FormData;
  setForm: React.Dispatch<React.SetStateAction<FormData>>;
  onNext: () => void;
  onPrev: () => void;
  enableImageUpload: boolean;
};


export default function Step2Request({
  tenantKey = "default",
  form,
  setForm,
  onNext,
  onPrev,
  enableImageUpload,
}: Step2RequestProps) {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      service: prev.service || "事業ゴミスポット回収",
      images: Array.isArray(prev.images) ? prev.images : [],
    }));
  }, [setForm]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const setErrorAndScroll = (message: string) => {
    setError(message);
    scrollToTop();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);

    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    for (const file of files) {
      if (!isAllowedImage(file)) {
        setErrorAndScroll(IMAGE_TYPE_ERROR);
        e.target.value = "";
        return;
      }

      if (!isWithinSizeLimit(file)) {
        setErrorAndScroll(IMAGE_SIZE_ERROR);
        e.target.value = "";
        return;
      }
    }

    let limitError = false;

    setForm((prev) => {
      const prevImages = Array.isArray(prev.images) ? prev.images : [];
      const mergedFiles = [...prevImages, ...files];

      if (mergedFiles.length > MAX_FILES) {
        limitError = true;
        return prev;
      }

      return {
        ...prev,
        images: mergedFiles,
      };
    });

    if (limitError) {
      setErrorAndScroll(IMAGE_COUNT_ERROR);
    }

    e.target.value = "";
  };

  const handleNext = () => {
    setError(null);

    if (!form.service) {
      setErrorAndScroll("依頼内容を選択してください。");
      return;
    }

    if (!form.items.trim()) {
      setErrorAndScroll("回収ゴミの品目・個数を入力してください。");
      return;
    }

    onNext();
  };

  const imageCount = Array.isArray(form.images) ? form.images.length : 0;

  return (
    <main style={mainStyle}>
      <div style={wrapStyle}>
        <div style={pageTitleWrapStyle}>
          <h1 style={pageTitleStyle}>
            片付け・不用品回収 |{" "}
            {tenantKey === "ezurin" ? "エヅリン" : "すっきりん"}
          </h1>
        </div>

        <StepIndicator step={2} />

        <div style={panelStyle}>
          <StepSectionHeader step={2} title="依頼内容をご入力ください" />

          {error && <div style={errorStyle}>{error}</div>}

          <Field label="依頼内容" required>
            <RadioCardGroup
              name="service"
              value={form.service}
              onChange={handleRadioChange}
              options={[
                { value: "事業ゴミスポット回収", label: "事業ゴミスポット回収" },
                { value: "事業ゴミ定期回収", label: "事業ゴミ定期回収" },
              ]}
              columns={1}
            />
          </Field>

          <Field label="回収ゴミの品目・個数" required>
            <textarea
              name="items"
              value={form.items}
              onChange={handleChange}
              rows={5}
              placeholder="例：可燃ごみ4袋、金属ラック1台、机2台"
              style={textareaStyle}
            />
          </Field>

          <Field label="備考">
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows={4}
              placeholder="補足事項があればご入力ください"
              style={textareaStyle}
            />
          </Field>

          {enableImageUpload && (
            <Field label="添付画像" required>
              <input
                id="business-image-upload"
                type="file"
                multiple
                accept="image/*,.heic,.heif"
                onChange={handleFileChange}
                style={hiddenFileInputStyle}
              />

              <label htmlFor="business-image-upload" style={uploadBoxStyle}>
                <div style={uploadInnerStyle}>
                  {imageCount > 0 && (
                    <div style={uploadStatusBadgeStyle}>
                      {imageCount}枚の画像を追加しました
                    </div>
                  )}

                  <img
                    src="/camera.svg"
                    alt=""
                    aria-hidden="true"
                    style={uploadIconStyle}
                  />

                  <div style={uploadTitleStyle}>
                    タップして写真をアップロード
                  </div>

                  <div style={uploadSubTextStyle}>
                    対象となる事業ゴミや回収物の画像を
                    <br />
                    お選びください（複数可）
                  </div>

                  {imageCount > 0 && (
                    <div style={uploadAddedHelpStyle}>
                      追加する場合はもう一度タップしてください
                    </div>
                  )}
                </div>
              </label>

              <div style={fileHelpTextStyle}>
                {`画像は${MAX_FILES}枚まで、1枚10MB以下`}
              </div>
            </Field>
          )}

          <div style={buttonGroupStyle}>
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

const hiddenFileInputStyle: React.CSSProperties = {
  position: "absolute",
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  border: 0,
};

const uploadBoxStyle: React.CSSProperties = {
  display: "block",
  width: "100%",
  border: "2px dashed #e78ab6",
  borderRadius: 28,
  background: "#fff7fb",
  padding: "28px 20px",
  boxSizing: "border-box",
  cursor: "pointer",
};

const uploadInnerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  gap: 10,
  minHeight: 180,
};

const uploadStatusBadgeStyle: React.CSSProperties = {
  display: "inline-block",
  padding: "8px 14px",
  borderRadius: 999,
  background: "#e85d98",
  color: "#fff",
  fontSize: 14,
  fontWeight: 800,
  lineHeight: 1.4,
  marginBottom: 4,
};

const uploadIconStyle: React.CSSProperties = {
  width: 88,
  height: 88,
  objectFit: "contain",
  display: "block",
};

const uploadTitleStyle: React.CSSProperties = {
  fontSize: 18,
  fontWeight: 800,
  color: "#e85d98",
  lineHeight: 1.4,
};

const uploadSubTextStyle: React.CSSProperties = {
  fontSize: 13,
  color: "var(--text-sub)",
  lineHeight: 1.6,
};

const uploadAddedHelpStyle: React.CSSProperties = {
  fontSize: 12,
  color: "#b84d7a",
  lineHeight: 1.5,
  marginTop: 2,
};

const fileHelpTextStyle: React.CSSProperties = {
  marginTop: 6,
  fontSize: 11,
  color: "var(--text-sub)",
  lineHeight: 1.5,
};