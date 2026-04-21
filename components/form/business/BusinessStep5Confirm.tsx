"use client";

import React, { useState } from "react";
import StepIndicator from "@/components/form/common/StepIndicator";
import StepSectionHeader from "@/components/form/common/StepSectionHeader";
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

type TenantKey = "default" | "ezurin" | "client-a";

type BusinessStep5ConfirmProps = {
  tenantKey?: TenantKey;
  form: FormData;
  onSubmit: () => Promise<void> | void;
  onPrev: () => void;
};

export default function BusinessStep5Confirm({
  tenantKey = "default",
  form,
  onSubmit,
  onPrev,
}: BusinessStep5ConfirmProps) {
  const [submitting, setSubmitting] = useState(false);

  const contactName =
    `${form.contactLastName || ""} ${form.contactFirstName || ""}`.trim();
  const contactKana =
    `${form.contactLastNameKana || ""} ${form.contactFirstNameKana || ""}`.trim();
  const representativeName =
    `${form.representativeLastName || ""} ${form.representativeFirstName || ""}`.trim();
  const representativeKana =
    `${form.representativeLastNameKana || ""} ${form.representativeFirstNameKana || ""}`.trim();

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
          <h1 style={pageTitleStyle}>
            片付け・不用品回収 |{" "}
            {tenantKey === "ezurin" ? "エヅリン" : "すっきりん"}
          </h1>
        </div>

        <StepIndicator step={5} />

        <div style={panelStyle}>
          <StepSectionHeader step={5} title="内容をご確認ください" />

          <Section title="回収場所">
            <ConfirmRow label="郵便番号" value={form.postalCode} />
            <ConfirmRow label="都道府県" value={form.prefecture} />
            <ConfirmRow label="市町村" value={form.city} />
            <ConfirmRow label="住所" value={form.address} />
            <ConfirmRow label="建物の種類" value={form.buildingType} />
            <ConfirmRow label="回収場所の階数" value={form.floor} />
            <ConfirmRow label="駐車場の有無" value={form.parking} />
            <ConfirmRow label="エレベーターの有無" value={form.elevator} />
            <ConfirmRow label="ゴミの排出方法" value={form.disposalMethod} />
          </Section>

          <Section title="依頼内容">
            <ConfirmRow label="依頼内容" value={form.service} />
            <ConfirmRow
              label="回収ゴミの品目・個数"
              value={form.items}
              multiline
            />
            <ConfirmRow label="備考" value={form.notes} multiline />
            <ConfirmRow
              label="添付画像"
              value={form.images.length > 0 ? `${form.images.length}件` : "なし"}
            />
          </Section>

          <Section title="希望日">
          <ConfirmRow
            label="第一希望回収日"
            value={formatPickupDateAndSlot(form.pickupDate1, form.pickupDate1Slot)}
          />
          <ConfirmRow
            label="第二希望回収日"
            value={formatPickupDateAndSlot(form.pickupDate2, form.pickupDate2Slot)}
          />
          <ConfirmRow
            label="第三希望回収日"
            value={formatPickupDateAndSlot(form.pickupDate3, form.pickupDate3Slot)}
          />
          </Section>

          <Section title="申込者情報">
            <ConfirmRow label="事業形態" value={form.businessFormType} />
            <ConfirmRow label="屋号 / 法人名" value={form.businessName} />
            <ConfirmRow label="担当者名" value={contactName} />
            <ConfirmRow label="担当者名（かな）" value={contactKana} />
            <ConfirmRow label="担当者電話番号" value={form.contactPhone} />
            <ConfirmRow
              label="担当者メールアドレス"
              value={form.contactEmail}
            />
          </Section>

          {form.receiptDifferent && (
            <Section title="領収書情報">
              <ConfirmRow label="領収書の宛名" value={form.receiptName} />
              <ConfirmRow label="代表者名" value={representativeName} />
              <ConfirmRow label="代表者名（かな）" value={representativeKana} />
              <ConfirmRow
                label="代表者電話番号"
                value={form.representativePhone}
              />
              <ConfirmRow
                label="代表者メールアドレス"
                value={form.representativeEmail}
              />
            </Section>
          )}

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

function formatPickupDateAndSlot(date: string, slot: string) {
  if (!date && !slot) return "未入力";
  if (!date) return slot || "未入力";
  if (!slot) return date;

const d = new Date(date);
  if (isNaN(d.getTime())) return `${date} ${slot}`;

  const y = d.getFullYear();
  const m = d.getMonth() + 1;
  const day = d.getDate();

  return `${y}年${m}月${day}日 ${slot}`;
}

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