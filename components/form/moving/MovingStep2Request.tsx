"use client";

import React, { useEffect, useState } from "react";
import StepIndicator from "@/components/form/common/StepIndicator";
import Field from "@/components/form/common/Field";
import ItemSelector from "@/components/form/household/ItemSelector";
import type { FormData } from "@/types/form";
import { textareaStyle } from "@/styles/formStyles";
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

type MovingStep2RequestProps = {
  form: FormData;
  setForm: React.Dispatch<React.SetStateAction<FormData>>;
  onNext: () => void;
  onPrev: () => void;
  enableImageUpload: boolean;
};

const MAX_FILES = 20;
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
];

function isAllowedImage(file: File) {
  const type = (file.type || "").toLowerCase();
  const name = file.name.toLowerCase();

  return (
    ALLOWED_TYPES.includes(type) ||
    name.endsWith(".jpg") ||
    name.endsWith(".jpeg") ||
    name.endsWith(".png") ||
    name.endsWith(".webp") ||
    name.endsWith(".heic") ||
    name.endsWith(".heif")
  );
}

export default function MovingStep2Request({
  form,
  setForm,
  onNext,
  onPrev,
  enableImageUpload,
}: MovingStep2RequestProps) {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      service: "引越し",
      movingItems:
        typeof prev.movingItems === "string" ? prev.movingItems : "",
      disposalItems:
        typeof prev.disposalItems === "string" ? prev.disposalItems : "",
      movingNotes:
        typeof prev.movingNotes === "string" ? prev.movingNotes : "",
      disposalNotes:
        typeof prev.disposalNotes === "string" ? prev.disposalNotes : "",
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

  const handleMovingItemsChange = (value: string) => {
    setForm((prev) => ({
      ...prev,
      movingItems: value,
    }));
  };

  const handleDisposalItemsChange = (value: string) => {
    setForm((prev) => ({
      ...prev,
      disposalItems: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);

    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    for (const file of files) {
      if (!isAllowedImage(file)) {
        setErrorAndScroll("画像ファイルのみ添付できます。");
        e.target.value = "";
        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        setErrorAndScroll("1枚あたり10MB以下の画像を選択してください。");
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
      setErrorAndScroll(`画像は最大${MAX_FILES}枚までです。`);
    }

    e.target.value = "";
  };

  const handleNext = () => {
    setError(null);

    if (!form.movingItems.trim()) {
      setErrorAndScroll("運ぶ物・個数を入力してください。");
      return;
    }

    onNext();
  };

  const imageCount = Array.isArray(form.images) ? form.images.length : 0;

  return (
    <main style={mainStyle}>
      <div style={wrapStyle}>
        <div style={pageTitleWrapStyle}>
          <h1 style={pageTitleStyle}>引越し | エヅリン</h1>
        </div>

        <StepIndicator step={2} />

        <div style={panelStyle}>
          <div style={headerWrapStyle}>
            <div style={headerStepStyle}>STEP 2</div>
            <h2 style={headerTitleStyle}>依頼内容をご入力ください</h2>
          </div>

          {error && <div style={errorStyle}>{error}</div>}

          <Field label="依頼内容" required>
            <div style={fixedServiceBoxStyle}>引越し</div>
          </Field>

          <div style={groupCardStyle}>
            <div style={groupHeaderStyle}>
              <span style={groupBadgeStyle}>MOVE</span>
              <span style={groupTitleStyle}>運ぶ物・個数</span>
            </div>

            <Field label="運ぶ物・個数" required>
              <ItemSelector
                value={form.movingItems}
                onChange={handleMovingItemsChange}
              />
            </Field>

            <Field label="運搬内容（自動入力）">
              <textarea
                name="movingItems"
                value={form.movingItems}
                onChange={handleChange}
                rows={5}
                placeholder="選択した品目が自動で表示されます"
                style={textareaStyle}
              />
            </Field>

            <Field label="運ぶ物の補足事項">
              <textarea
                name="movingNotes"
                value={form.movingNotes}
                onChange={handleChange}
                rows={4}
                placeholder="大型家具、搬出入条件、運搬に関する補足事項があればご入力ください"
                style={textareaStyle}
              />
            </Field>
          </div>

          <div style={groupCardStyle}>
            <div style={groupHeaderStyle}>
              <span style={groupBadgeSubStyle}>DISPOSAL</span>
              <span style={groupTitleStyle}>処分する物・個数</span>
            </div>

            <div style={subGuideStyle}>
              処分する物がある場合は、タップして数量を選択してください
            </div>

            <Field label="処分する物・個数">
              <ItemSelector
                value={form.disposalItems}
                onChange={handleDisposalItemsChange}
              />
            </Field>

            <Field label="処分内容（自動入力）">
              <textarea
                name="disposalItems"
                value={form.disposalItems}
                onChange={handleChange}
                rows={5}
                placeholder="処分する物がある場合は自動で表示されます"
                style={textareaStyle}
              />
            </Field>

            <Field label="処分する物の補足事項">
              <textarea
                name="disposalNotes"
                value={form.disposalNotes}
                onChange={handleChange}
                rows={4}
                placeholder="処分品に関する補足事項があればご入力ください"
                style={textareaStyle}
              />
            </Field>
          </div>

          {enableImageUpload && (
            <Field label="添付画像">
              <input
                id="image-upload"
                type="file"
                multiple
                accept="image/*,.heic,.heif"
                onChange={handleFileChange}
                style={hiddenFileInputStyle}
              />

              <label htmlFor="image-upload" style={uploadBoxStyle}>
                <div style={uploadInnerStyle}>
                  {imageCount > 0 && (
                    <div style={uploadStatusBadgeStyle}>
                      {imageCount}件の画像を選択中
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
                    対象となるお部屋やモノの画像を
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
                画像は10枚まで、1枚10MB以下
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

const headerWrapStyle: React.CSSProperties = {
  marginBottom: 14,
  textAlign: "center",
};

const headerStepStyle: React.CSSProperties = {
  fontSize: 12,
  lineHeight: 1.2,
  fontWeight: 800,
  letterSpacing: "0.08em",
  color: "var(--pink-strong)",
  marginBottom: 8,
};

const headerTitleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: 24,
  lineHeight: 1.5,
  fontWeight: 900,
  color: "var(--text-main)",
};

const fixedServiceBoxStyle: React.CSSProperties = {
  width: "100%",
  padding: "16px 18px",
  borderRadius: 18,
  background: "#fff7fb",
  border: "2px solid rgba(251,155,204,0.55)",
  color: "var(--text-main)",
  fontSize: 16,
  lineHeight: 1.4,
  fontWeight: 800,
  boxSizing: "border-box",
};

const groupCardStyle: React.CSSProperties = {
  marginTop: 14,
  padding: "16px 14px 14px",
  borderRadius: 20,
  background: "#fff7fb",
  border: "2px solid rgba(251,155,204,0.35)",
};

const groupHeaderStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  marginBottom: 12,
};

const groupBadgeStyle: React.CSSProperties = {
  minWidth: 48,
  height: 24,
  padding: "0 8px",
  borderRadius: 999,
  background: "var(--pink-logo)",
  color: "#fff",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 11,
  lineHeight: 1,
  fontWeight: 800,
  letterSpacing: "0.08em",
};

const groupBadgeSubStyle: React.CSSProperties = {
  minWidth: 68,
  height: 24,
  padding: "0 8px",
  borderRadius: 999,
  background: "rgba(251,155,204,0.22)",
  color: "var(--pink-strong)",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 11,
  lineHeight: 1,
  fontWeight: 800,
  letterSpacing: "0.04em",
};

const groupTitleStyle: React.CSSProperties = {
  fontSize: 18,
  lineHeight: 1.4,
  fontWeight: 800,
  color: "var(--text-main)",
};

const subGuideStyle: React.CSSProperties = {
  marginBottom: 10,
  fontSize: 13,
  lineHeight: 1.7,
  fontWeight: 700,
  color: "var(--text-sub)",
};

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