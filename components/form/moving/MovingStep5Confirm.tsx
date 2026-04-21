"use client";

import React, { useState } from "react";
import StepIndicator from "@/components/form/common/StepIndicator";
import type { FormData } from "@/types/form";
import {
  mainStyle,
  wrapStyle,
  pageTitleWrapStyle,
  pageTitleStyle,
  panelStyle,
  buttonGroupStyle,
  primaryButtonStyle,
  secondaryButtonStyle,
} from "@/styles/formStepStyles";

type MovingStep5ConfirmProps = {
  form: FormData;
  onSubmit: () => Promise<void> | void;
  onPrev: () => void;
};

export default function MovingStep5Confirm({
  form,
  onSubmit,
  onPrev,
}: MovingStep5ConfirmProps) {
  const [submitting, setSubmitting] = useState(false);

  const handleSubmitClick = async () => {
    if (submitting) return;

    try {
      setSubmitting(true);
      await onSubmit();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main style={mainStyle}>
      <div style={wrapStyle}>
        <div style={pageTitleWrapStyle}>
          <h1 style={pageTitleStyle}>引越し | エヅリン</h1>
        </div>

        <StepIndicator step={5} />

        <div style={panelStyle}>
          <div style={headerWrapStyle}>
            <div style={headerStepStyle}>STEP 5</div>
            <h2 style={headerTitleStyle}>内容をご確認ください</h2>
          </div>

          <Section title="搬出元">
            <ConfirmRow label="郵便番号" value={form.postalCode} />
            <ConfirmRow label="都道府県" value={form.prefecture} />
            <ConfirmRow label="市町村" value={form.city} />
            <ConfirmRow label="住所" value={form.address} />
            <ConfirmRow label="建物の種類" value={form.buildingType} />
            <ConfirmRow label="搬出元の階数" value={form.floor} />
            <ConfirmRow label="駐車場の有無" value={form.parking} />
            <ConfirmRow label="エレベーターの有無" value={form.elevator} />
          </Section>

          <Section title="運び先">
            <ConfirmRow label="郵便番号" value={form.movingPostalCode} />
            <ConfirmRow label="都道府県" value={form.movingPrefecture} />
            <ConfirmRow label="市町村" value={form.movingCity} />
            <ConfirmRow label="住所" value={form.movingAddress} />
            <ConfirmRow label="建物の種類" value={form.movingBuildingType} />
            <ConfirmRow label="運び先の階数" value={form.movingFloor} />
            <ConfirmRow label="駐車場の有無" value={form.movingParking} />
            <ConfirmRow
              label="エレベーターの有無"
              value={form.movingElevator}
            />
          </Section>

          <Section title="依頼内容">
            <ConfirmRow label="依頼内容" value={form.service} />
            <ConfirmRow label="運ぶ物・個数" value={form.movingItems} multiline />
            <ConfirmRow
              label="運ぶ物の補足事項"
              value={form.movingNotes}
              multiline
            />
            <ConfirmRow
              label="処分する物・個数"
              value={form.disposalItems}
              multiline
            />
            <ConfirmRow
              label="処分する物の補足事項"
              value={form.disposalNotes}
              multiline
            />
            <ConfirmRow
              label="添付画像"
              value={form.images.length > 0 ? `${form.images.length}件` : "なし"}
            />
          </Section>

          <Section title="希望日">
            <ConfirmRow
              label="第一希望日"
              value={formatDateTimeJP(form.pickupDate1)}
            />
            <ConfirmRow
              label="第二希望日"
              value={formatDateTimeJP(form.pickupDate2)}
            />
            <ConfirmRow
              label="第三希望日"
              value={formatDateTimeJP(form.pickupDate3)}
            />
          </Section>

          <Section title="申込者情報">
            <ConfirmRow label="お名前" value={form.name} />
            <ConfirmRow label="ふりがな" value={form.furigana} />
            <ConfirmRow label="電話番号" value={form.phone} />
          </Section>

          <div style={buttonGroupStyle}>
            <button
              type="button"
              onClick={handleSubmitClick}
              disabled={submitting}
              style={{
                ...primaryButtonStyle,
                opacity: submitting ? 0.7 : 1,
                cursor: submitting ? "not-allowed" : "pointer",
              }}
            >
              {submitting ? "送信中..." : "この内容で送信する"}
            </button>

            <button
              type="button"
              onClick={onPrev}
              disabled={submitting}
              style={{
                ...secondaryButtonStyle,
                opacity: submitting ? 0.7 : 1,
                cursor: submitting ? "not-allowed" : "pointer",
              }}
            >
              前に戻る
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div style={sectionStyle}>
      <div style={sectionTitleStyle}>{title}</div>
      <div style={sectionBodyStyle}>{children}</div>
    </div>
  );
}

function ConfirmRow({
  label,
  value,
  multiline = false,
}: {
  label: string;
  value: string;
  multiline?: boolean;
}) {
  const displayValue = value && value.trim() ? value : "未入力";

  return (
    <div style={confirmRowStyle}>
      <div style={confirmLabelStyle}>{label}</div>
      <div
        style={{
          ...confirmValueStyle,
          lineHeight: multiline ? 1.7 : 1.5,
          whiteSpace: multiline ? "pre-wrap" : "normal",
        }}
      >
        {displayValue}
      </div>
    </div>
  );
}

function formatDateTimeJP(value: string) {
  if (!value) return "未入力";

  const d = new Date(value);
  if (isNaN(d.getTime())) return value;

  const y = d.getFullYear();
  const m = d.getMonth() + 1;
  const day = d.getDate();
  const h = d.getHours();
  const min = d.getMinutes().toString().padStart(2, "0");

  return `${y}年${m}月${day}日 ${h}時${min}分`;
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

const sectionStyle: React.CSSProperties = {
  marginBottom: 22,
};

const sectionTitleStyle: React.CSSProperties = {
  fontSize: 16,
  fontWeight: 900,
  color: "var(--pink-strong)",
  marginBottom: 10,
  paddingBottom: 6,
  borderBottom: "2px solid var(--pink-main)",
};

const sectionBodyStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 10,
};

const confirmRowStyle: React.CSSProperties = {
  background: "#ffffff",
  borderRadius: 12,
  padding: "12px 14px",
  border: "1px solid #ead8e0",
};

const confirmLabelStyle: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 800,
  color: "var(--text-sub)",
  marginBottom: 6,
};

const confirmValueStyle: React.CSSProperties = {
  fontSize: 14,
  fontWeight: 700,
  color: "var(--text-main)",
  wordBreak: "break-word",
};