"use client";

import React, { useEffect, useState } from "react";
import StepIndicator from "@/components/form/common/StepIndicator";
import Field from "@/components/form/common/Field";
import RadioCardGroup from "@/components/form/common/RadioCardGroup";
import StepSectionHeader from "@/components/form/common/StepSectionHeader";
import type { FormData } from "@/types/form";
import { lookupAddressByPostalCode } from "@/lib/postal";
import { inputStyle, smallButtonStyle } from "@/styles/formStyles";
import {
  mainStyle,
  wrapStyle,
  pageTitleWrapStyle,
  pageTitleStyle,
  panelStyle,
  errorStyle,
  postalRowStyle,
  statusTextStyle,
  subNoticeStyle,
  helpBoxStyle,
  buttonGroupStyle,
  primaryButtonStyle,
  secondaryButtonStyle,
} from "@/styles/formStepStyles";

type TenantKey = "default" | "ezurin" | "client-a";

type Step1LocationProps = {
  tenantKey?: TenantKey;
  form: FormData;
  setForm: React.Dispatch<React.SetStateAction<FormData>>;
  onNext: () => void;
  onBackToTop: () => void;
};

export default function Step1Location({
  tenantKey = "default",
  form,
  setForm,
  onNext,
  onBackToTop,
}: Step1LocationProps) {
  const [postalStatus, setPostalStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const setErrorAndScroll = (message: string) => {
    setError(message);
    scrollToTop();
  };

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      buildingType: prev.buildingType || "戸建て",
      floor: prev.floor || "1階",
      parking: prev.parking || "あり",
      elevator: prev.elevator || "あり",
      disposalMethod: prev.disposalMethod || "排出を希望する",
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
      setErrorAndScroll("郵便番号は7桁で入力してください。");
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
      setErrorAndScroll(
        err instanceof Error ? err.message : "住所検索に失敗しました。"
      );
    }
  };

  const handleNext = () => {
    setError(null);

    if (!form.postalCode) {
      setErrorAndScroll("郵便番号を入力してください。");
      return;
    }

    if (!/^\d{7}$/.test(form.postalCode)) {
      setErrorAndScroll("郵便番号は7桁で入力してください。");
      return;
    }

    if (!form.prefecture) {
      setErrorAndScroll("都道府県を入力してください。");
      return;
    }

    if (!form.city) {
      setErrorAndScroll("市町村を入力してください。");
      return;
    }

    if (!form.address) {
      setErrorAndScroll("住所を入力してください。");
      return;
    }

    if (!form.buildingType) {
      setErrorAndScroll("建物の種類を選択してください。");
      return;
    }

    if (!form.floor) {
      setErrorAndScroll("回収場所の階数を選択してください。");
      return;
    }

    if (!form.parking) {
      setErrorAndScroll("駐車場の有無を選択してください。");
      return;
    }

    if (!form.elevator) {
      setErrorAndScroll("エレベーターの有無を選択してください。");
      return;
    }

    if (!form.disposalMethod) {
      setErrorAndScroll("ゴミの排出方法を選択してください。");
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

        <StepIndicator step={1} />

        <div style={panelStyle}>
          <StepSectionHeader step={1} title="回収場所をご指定ください" />

          {error && <div style={errorStyle}>{error}</div>}

          <Field label="郵便番号" required>
            <div style={postalRowStyle}>
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
            {postalStatus && <div style={statusTextStyle}>{postalStatus}</div>}
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
              placeholder="1-2-3 キリンビル101"
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
                { value: "オフィス・店舗", label: "オフィス・店舗" },
                { value: "倉庫", label: "倉庫" },
                { value: "その他", label: "その他" },
              ]}
              columns={2}
            />
          </Field>

          {form.buildingType === "マンション・アパート" && (
            <div style={subNoticeStyle}>
              マンション・アパートを選択した方は、住所欄に建物名・部屋番号をご記入ください
            </div>
          )}

          <Field label="回収場所の階数" required>
            <RadioCardGroup
              name="floor"
              value={form.floor}
              onChange={handleRadioChange}
              options={[
                { value: "1階", label: "1階" },
                { value: "2階", label: "2階" },
                { value: "3階以上", label: "3階以上" },
              ]}
              columns={2}
            />
          </Field>

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
            <div style={helpBoxStyle}>
              ご自身で家の外に出す場合は「自分で排出」を、排出から依頼する場合は「排出を希望する」を選択してください。
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

          <div style={buttonGroupStyle}>
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