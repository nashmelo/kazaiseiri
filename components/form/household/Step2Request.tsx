"use client";

import React, { useEffect, useState } from "react";
import StepIndicator from "@/components/form/common/StepIndicator";
import Field from "@/components/form/common/Field";
import RadioCardGroup from "@/components/form/common/RadioCardGroup";
import StepSectionHeader from "@/components/form/common/StepSectionHeader";
import ItemSelector from "@/components/form/household/ItemSelector";
import ImageThumbnailGrid from "@/components/form/common/ImageThumbnailGrid";
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

  const isMovingService = form.service === "引越し";
  const isWholeRoomService = form.service === "部屋を丸ごと片付け";

  const itemsLabel = isMovingService
    ? "運ぶ物・個数"
    : isWholeRoomService
      ? "片付けする主な家財"
      : "回収ゴミの品目・個数";

  const itemsAutoLabel = isMovingService
    ? "運搬内容（自動入力）"
    : "回収内容（自動入力）";

  const itemsPlaceholder = "選択した品目が自動で表示されます";

  const notesLabel = isMovingService ? "補足事項" : "その他の物・補足事項";

  const notesPlaceholder = isMovingService
    ? "大型家具、搬出入条件、補足事項があればご入力ください"
    : "上記以外の物、補足事項があればご入力ください";

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      service: prev.service || "不用品回収",
      roomSize: typeof prev.roomSize === "string" ? prev.roomSize : "",
      images: Array.isArray(prev.images) ? prev.images : [],
      items: typeof prev.items === "string" ? prev.items : "",
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

  const handleItemsChange = (value: string) => {
    setForm((prev) => ({
      ...prev,
      items: value,
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

  /**
   * 選んだ写真を1枚だけ取り消す。
   *
   * 上限を超えたときに全部選び直させないための逃げ道であり、
   * 撮り損ねた写真を外すためのものでもある。
   */
  const handleRemoveImage = (index: number) => {
    setError(null);

    setForm((prev) => {
      const prevImages = Array.isArray(prev.images) ? prev.images : [];
      return {
        ...prev,
        images: prevImages.filter((_, i) => i !== index),
      };
    });
  };

  const handleNext = () => {
    setError(null);

    if (!form.service) {
      setErrorAndScroll("依頼内容を選択してください。");
      return;
    }

    if (isWholeRoomService && !form.roomSize) {
      setErrorAndScroll("部屋の大きさを選択してください。");
      return;
    }

    if (!form.items.trim()) {
      setErrorAndScroll(
        isMovingService
          ? "運ぶ物・個数を入力してください。"
          : isWholeRoomService
            ? "片付けする主な家財を入力してください。"
            : "回収ゴミの品目・個数を入力してください。"
      );
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

          {isMovingService ? (
            <Field label="依頼内容" required>
              <div style={fixedServiceBoxStyle}>引越し</div>
            </Field>
          ) : (
            <Field label="依頼内容" required>
              <RadioCardGroup
                name="service"
                value={form.service}
                onChange={handleRadioChange}
                options={[
                  { value: "不用品回収", label: "不用品回収" },
                  { value: "部屋を丸ごと片付け", label: "部屋を丸ごと片付け" },
                ]}
                columns={1}
              />
            </Field>
          )}

          {isWholeRoomService && (
            <Field label="部屋の大きさ" required>
              <RadioCardGroup
                name="roomSize"
                value={form.roomSize}
                onChange={handleRadioChange}
                options={[
                  { value: "1K", label: "1K" },
                  { value: "1DK", label: "1DK" },
                  { value: "1LDK", label: "1LDK" },
                  { value: "2LDK", label: "2LDK" },
                  { value: "3LDK", label: "3LDK" },
                  { value: "その他", label: "その他" },
                ]}
                columns={2}
              />
            </Field>
          )}

          <Field label={itemsLabel} required>
            <ItemSelector value={form.items} onChange={handleItemsChange} />
          </Field>

          <Field label={itemsAutoLabel}>
            <textarea
              name="items"
              value={form.items}
              onChange={handleChange}
              rows={5}
              placeholder={itemsPlaceholder}
              style={textareaStyle}
            />
          </Field>

          <Field label={notesLabel}>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows={4}
              placeholder={notesPlaceholder}
              style={textareaStyle}
            />
          </Field>

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

              <ImageThumbnailGrid
                files={Array.isArray(form.images) ? form.images : []}
                onRemove={handleRemoveImage}
              />

              <div style={fileHelpTextStyle}>
                {`画像は${MAX_FILES}枚まで、1枚10MB以下`}
                {imageCount > 0 && "（×で1枚ずつ取り消せます）"}
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