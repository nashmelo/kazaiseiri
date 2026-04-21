"use client";

import React, { useEffect, useState } from "react";
import StepIndicator from "@/components/form/common/StepIndicator";
import Field from "@/components/form/common/Field";
import RadioCardGroup from "@/components/form/common/RadioCardGroup";
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
  buttonGroupStyle,
  primaryButtonStyle,
  secondaryButtonStyle,
} from "@/styles/formStepStyles";

type MovingStep1LocationProps = {
  form: FormData;
  setForm: React.Dispatch<React.SetStateAction<FormData>>;
  onNext: () => void;
  onBackToTop: () => void;
};

export default function MovingStep1Location({
  form,
  setForm,
  onNext,
  onBackToTop,
}: MovingStep1LocationProps) {
  const [postalStatus, setPostalStatus] = useState<string | null>(null);
  const [movingPostalStatus, setMovingPostalStatus] = useState<string | null>(
    null
  );
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

      movingBuildingType: prev.movingBuildingType || "戸建て",
      movingFloor: prev.movingFloor || "1階",
      movingParking: prev.movingParking || "あり",
      movingElevator: prev.movingElevator || "あり",

      movingPostalCode:
        typeof prev.movingPostalCode === "string" ? prev.movingPostalCode : "",
      movingPrefecture:
        typeof prev.movingPrefecture === "string" ? prev.movingPrefecture : "",
      movingCity: typeof prev.movingCity === "string" ? prev.movingCity : "",
      movingAddress:
        typeof prev.movingAddress === "string" ? prev.movingAddress : "",
    }));
  }, [setForm]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "postalCode" || name === "movingPostalCode") {
      const normalized = value.replace(/\D/g, "");
      setForm((prev) => ({
        ...prev,
        [name]: normalized,
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
      setErrorAndScroll("搬出元の郵便番号は7桁で入力してください。");
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
        err instanceof Error ? err.message : "搬出元住所の検索に失敗しました。"
      );
    }
  };

  const handleMovingPostalLookup = async () => {
    setError(null);

    if (!/^\d{7}$/.test(form.movingPostalCode)) {
      setErrorAndScroll("運び先の郵便番号は7桁で入力してください。");
      return;
    }

    try {
      setMovingPostalStatus("住所を検索しています…");

      const result = await lookupAddressByPostalCode(form.movingPostalCode);

      setForm((prev) => ({
        ...prev,
        movingPrefecture: result.prefecture,
        movingCity: result.city,
      }));

      setMovingPostalStatus(null);
    } catch (err) {
      setMovingPostalStatus(null);
      setErrorAndScroll(
        err instanceof Error ? err.message : "運び先住所の検索に失敗しました。"
      );
    }
  };

  const handleNext = () => {
    setError(null);

    if (!form.postalCode) {
      setErrorAndScroll("搬出元の郵便番号を入力してください。");
      return;
    }

    if (!/^\d{7}$/.test(form.postalCode)) {
      setErrorAndScroll("搬出元の郵便番号は7桁で入力してください。");
      return;
    }

    if (!form.prefecture) {
      setErrorAndScroll("搬出元の都道府県を入力してください。");
      return;
    }

    if (!form.city) {
      setErrorAndScroll("搬出元の市町村を入力してください。");
      return;
    }

    if (!form.address) {
      setErrorAndScroll("搬出元の住所を入力してください。");
      return;
    }

    if (!form.buildingType) {
      setErrorAndScroll("搬出元の建物の種類を選択してください。");
      return;
    }

    if (!form.floor) {
      setErrorAndScroll("搬出元の階数を選択してください。");
      return;
    }

    if (!form.parking) {
      setErrorAndScroll("搬出元の駐車場の有無を選択してください。");
      return;
    }

    if (!form.elevator) {
      setErrorAndScroll("搬出元のエレベーターの有無を選択してください。");
      return;
    }

    if (!form.movingPostalCode) {
      setErrorAndScroll("運び先の郵便番号を入力してください。");
      return;
    }

    if (!/^\d{7}$/.test(form.movingPostalCode)) {
      setErrorAndScroll("運び先の郵便番号は7桁で入力してください。");
      return;
    }

    if (!form.movingPrefecture) {
      setErrorAndScroll("運び先の都道府県を入力してください。");
      return;
    }

    if (!form.movingCity) {
      setErrorAndScroll("運び先の市町村を入力してください。");
      return;
    }

    if (!form.movingAddress) {
      setErrorAndScroll("運び先の住所を入力してください。");
      return;
    }

    if (!form.movingBuildingType) {
      setErrorAndScroll("運び先の建物の種類を選択してください。");
      return;
    }

    if (!form.movingFloor) {
      setErrorAndScroll("運び先の階数を選択してください。");
      return;
    }

    if (!form.movingParking) {
      setErrorAndScroll("運び先の駐車場の有無を選択してください。");
      return;
    }

    if (!form.movingElevator) {
      setErrorAndScroll("運び先のエレベーターの有無を選択してください。");
      return;
    }

    onNext();
  };

  return (
    <main style={mainStyle}>
      <div style={wrapStyle}>
        <div style={pageTitleWrapStyle}>
          <h1 style={pageTitleStyle}>引越し | エヅリン</h1>
        </div>

        <StepIndicator step={1} />

        <div style={panelStyle}>
          <div style={headerWrapStyle}>
            <div style={headerStepStyle}>STEP 1</div>
            <h2 style={headerTitleStyle}>
              搬出元・運び先を
              <br />
              ご指定ください
            </h2>
          </div>

          {error && <div style={errorStyle}>{error}</div>}

          <div style={groupCardStyle}>
            <div style={groupHeaderStyle}>
              <span style={groupBadgeStyle}>FROM</span>
              <span style={groupTitleStyle}>搬出元</span>
            </div>

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
                搬出元がマンション・アパートの方は、住所欄に建物名・部屋番号をご記入ください
              </div>
            )}

            <Field label="搬出元の階数" required>
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
          </div>

          <div style={groupCardStyle}>
            <div style={groupHeaderStyle}>
              <span style={groupBadgeStyle}>TO</span>
              <span style={groupTitleStyle}>運び先</span>
            </div>

            <Field label="郵便番号" required>
              <div style={postalRowStyle}>
                <input
                  name="movingPostalCode"
                  value={form.movingPostalCode}
                  onChange={handleChange}
                  type="text"
                  inputMode="numeric"
                  placeholder="3210123"
                  style={{ ...inputStyle, flex: 1 }}
                />
                <button
                  type="button"
                  onClick={handleMovingPostalLookup}
                  style={smallButtonStyle}
                >
                  検索
                </button>
              </div>
              {movingPostalStatus && (
                <div style={statusTextStyle}>{movingPostalStatus}</div>
              )}
            </Field>

            <Field label="都道府県" required>
              <input
                name="movingPrefecture"
                value={form.movingPrefecture}
                onChange={handleChange}
                type="text"
                style={inputStyle}
              />
            </Field>

            <Field label="市町村" required>
              <input
                name="movingCity"
                value={form.movingCity}
                onChange={handleChange}
                type="text"
                style={inputStyle}
              />
            </Field>

            <Field label="住所" required>
              <input
                name="movingAddress"
                value={form.movingAddress}
                onChange={handleChange}
                type="text"
                placeholder="1-2-3 キリンビル101"
                style={inputStyle}
              />
            </Field>

            <Field label="建物の種類" required>
              <RadioCardGroup
                name="movingBuildingType"
                value={form.movingBuildingType}
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

            {form.movingBuildingType === "マンション・アパート" && (
              <div style={subNoticeStyle}>
                運び先がマンション・アパートの方は、住所欄に建物名・部屋番号をご記入ください
              </div>
            )}

            <Field label="運び先の階数" required>
              <RadioCardGroup
                name="movingFloor"
                value={form.movingFloor}
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
                name="movingParking"
                value={form.movingParking}
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
                name="movingElevator"
                value={form.movingElevator}
                onChange={handleRadioChange}
                options={[
                  { value: "あり", label: "あり" },
                  { value: "なし", label: "なし" },
                ]}
                columns={2}
              />
            </Field>
          </div>

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
  minWidth: 44,
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

const groupTitleStyle: React.CSSProperties = {
  fontSize: 18,
  lineHeight: 1.4,
  fontWeight: 800,
  color: "var(--text-main)",
};