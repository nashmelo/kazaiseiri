"use client";

import React from "react";
import StepIndicator from "@/components/form/StepIndicator";
import type { FormData } from "@/types/form";

type Step5ConfirmProps = {
  form: FormData;
  onSubmit: () => void;
  onPrev: () => void;
};

export default function Step5Confirm({
  form,
  onSubmit,
  onPrev,
}: Step5ConfirmProps) {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#8ed0f4",
        padding: "24px 16px 40px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: 480,
          margin: "0 auto",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: 16,
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: 18,
              fontWeight: 900,
              color: "#ffffff",
            }}
          >
            粗大ゴミ回収 | すっきりん
          </h1>
        </div>

        <StepIndicator step={5} />

        <div
          style={{
            background: "#f7f7f7",
            borderRadius: 28,
            padding: "22px 18px 24px",
            boxSizing: "border-box",
            boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
          }}
        >
          <div
            style={{
              background: "#8ed0f4",
              color: "#ffffff",
              textAlign: "center",
              fontSize: 18,
              fontWeight: 900,
              padding: "18px 12px",
              borderRadius: 10,
              marginBottom: 24,
            }}
          >
            Step 5 内容をご確認ください
          </div>

          <Section title="回収場所">
            <ConfirmRow label="郵便番号" value={form.postalCode} />
            <ConfirmRow label="都道府県" value={form.prefecture} />
            <ConfirmRow label="市町村" value={form.city} />
            <ConfirmRow label="住所" value={form.address} />
            <ConfirmRow label="建物の種類" value={form.buildingType} />
            <ConfirmRow label="駐車場の有無" value={form.parking} />
            <ConfirmRow label="エレベーターの有無" value={form.elevator} />
            <ConfirmRow label="ゴミの排出方法" value={form.disposalMethod} />
          </Section>

          <Section title="依頼内容">
            <ConfirmRow label="依頼内容" value={form.service} />
            <ConfirmRow label="回収ゴミの品目・個数" value={form.items} multiline />
            <ConfirmRow label="備考" value={form.notes} multiline />
            <ConfirmRow
              label="添付画像"
              value={form.images.length > 0 ? `${form.images.length}件` : ""}
            />
          </Section>

          <Section title="希望日">
            <ConfirmRow
              label="第一希望回収日"
              value={formatDateTimeJP(form.pickupDate1)}
            />
            <ConfirmRow
              label="第二希望回収日"
              value={formatDateTimeJP(form.pickupDate2)}
            />
            <ConfirmRow
              label="第三希望回収日"
              value={formatDateTimeJP(form.pickupDate3)}
            />
          </Section>

          <Section title="申込者情報">
            <ConfirmRow label="お名前" value={form.name} />
            <ConfirmRow label="ふりがな" value={form.furigana} />
            <ConfirmRow label="電話番号" value={form.phone} />
          </Section>

          <div
            style={{
              display: "flex",
              gap: 12,
              flexDirection: "column",
              marginTop: 20,
            }}
          >
            <button
              type="button"
              onClick={onSubmit}
              style={primaryButtonStyle}
            >
              この内容で送信する
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

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: 22 }}>
      <div
        style={{
          fontSize: 16,
          fontWeight: 900,
          color: "#095db6",
          marginBottom: 10,
          paddingBottom: 6,
          borderBottom: "2px solid #d9ecfb",
        }}
      >
        {title}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        {children}
      </div>
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
    <div
      style={{
        background: "#ffffff",
        borderRadius: 10,
        padding: "12px 14px",
        border: "1px solid #e3e3e3",
      }}
    >
      <div
        style={{
          fontSize: 12,
          fontWeight: 800,
          color: "#666",
          marginBottom: 6,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: 14,
          fontWeight: 700,
          color: "#111",
          lineHeight: multiline ? 1.7 : 1.5,
          whiteSpace: multiline ? "pre-wrap" : "normal",
          wordBreak: "break-word",
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

const primaryButtonStyle: React.CSSProperties = {
  width: "100%",
  border: "none",
  borderRadius: 999,
  background: "#095db6",
  color: "#ffffff",
  fontSize: 18,
  fontWeight: 900,
  padding: "18px 16px",
  cursor: "pointer",
};

const secondaryButtonStyle: React.CSSProperties = {
  width: "100%",
  borderRadius: 999,
  background: "#ffffff",
  color: "#095db6",
  fontSize: 18,
  fontWeight: 900,
  padding: "18px 16px",
  cursor: "pointer",
  border: "3px solid #095db6",
};