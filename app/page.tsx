"use client";

import { useEffect, useState } from "react";
import liff from "@line/liff";
import HomeScreen from "@/components/top/HomeScreen";
import EntryModal from "@/components/top/EntryModal";
import ServiceAreaModal from "@/components/top/ServiceAreaModal";
import ReasonModal from "@/components/top/ReasonModal";
import FaqModal from "@/components/top/FaqModal";
import BusinessWasteModal from "@/components/top/BusinessWasteModal";
import Step1Location from "@/components/form/household/Step1Location";
import Step2Request from "@/components/form/household/Step2Request";
import Step3Schedule from "@/components/form/household/Step3Schedule";
import Step4Applicant from "@/components/form/household/Step4Applicant";
import Step5Confirm from "@/components/form/household/Step5Confirm";
import BusinessStep1Location from "@/components/form/business/BusinessStep1Location";
import BusinessStep2Request from "@/components/form/business/BusinessStep2Request";
import BusinessStep3Schedule from "@/components/form/business/BusinessStep3Schedule";
import BusinessStep4Applicant from "@/components/form/business/BusinessStep4Applicant";
import BusinessStep5Confirm from "@/components/form/business/BusinessStep5Confirm";
import {
  initialFormData,
  type FormData,
  type Screen,
  type Step,
} from "@/types/form";

const LIFF_ID = "2009412342-JGZ5KiR6";

type RequestFlow = "household" | "business";

export default function Page() {
  const [screen, setScreen] = useState<Screen>("home");
  const [step, setStep] = useState<Step>(1);
  const [requestFlow, setRequestFlow] = useState<RequestFlow>("household");
  const [form, setForm] = useState<FormData>(initialFormData);
  const [isEntryModalOpen, setIsEntryModalOpen] = useState(false);
  const [isServiceAreaOpen, setIsServiceAreaOpen] = useState(false);
  const [isReasonOpen, setIsReasonOpen] = useState(false);
  const [isFaqOpen, setIsFaqOpen] = useState(false);
  const [isBusinessWasteOpen, setIsBusinessWasteOpen] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      try {
        await liff.init({ liffId: LIFF_ID });
      } catch (err) {
        console.error("LIFF init error:", err);
        setError("LINE初期化に失敗しました。");
      }
    };

    init();
  }, []);

  const handleStartGarbageFlow = () => {
    setError(null);
    setIsEntryModalOpen(false);
    setRequestFlow("household");
    setScreen("household");
    setStep(1);
  };

  const handleStartBusinessFlow = () => {
    setError(null);
    setIsBusinessWasteOpen(false);
    setRequestFlow("business");
    setScreen("business");
    setStep(1);
  };

  const handleBackHome = () => {
    setError(null);
    setScreen("home");
    setStep(1);
    setRequestFlow("household");
    setForm(initialFormData);
  };

  const formatDateTimeJP = (value: string) => {
    if (!value) return "未入力";

    const d = new Date(value);
    if (isNaN(d.getTime())) return value;

    const y = d.getFullYear();
    const m = d.getMonth() + 1;
    const day = d.getDate();
    const h = d.getHours();
    const min = d.getMinutes().toString().padStart(2, "0");

    return `${y}年${m}月${day}日 ${h}時${min}分`;
  };

  const buildSummaryText = () => {
    const serviceLabel =
      requestFlow === "business"
        ? form.service || "事業ゴミ回収"
        : form.service || "未入力";

    const baseLines = [
      `📩 ${
        requestFlow === "business" ? "事業ゴミ回収" : "粗大ゴミ回収"
      }のお問い合わせを受け付けました`,
      "",
      "以下の内容で承りました。",
      "内容を確認のうえ、担当者よりご連絡いたします。",
      "※画像をトーク画面にお貼りいただくと、より正確なお見積もりが可能です。",
      "",
      "———",
      "■ 回収場所",
      `【郵便番号】${form.postalCode || "未入力"}`,
      `【都道府県】${form.prefecture || "未入力"}`,
      `【市町村】${form.city || "未入力"}`,
      `【住所】${form.address || "未入力"}`,
      `【建物の種類】${form.buildingType || "未入力"}`,
      `【駐車場の有無】${form.parking || "未入力"}`,
      `【エレベーターの有無】${form.elevator || "未入力"}`,
      `【ゴミの排出方法】${form.disposalMethod || "未入力"}`,
      "",
      "■ 依頼内容",
      `【依頼内容】${serviceLabel}`,
      `【回収ゴミの品目・個数】${form.items || "未入力"}`,
      `【備考】${form.notes || "未入力"}`,
      `【添付画像】${form.images.length > 0 ? `${form.images.length}件` : "なし"}`,
      "",
      "■ 希望日",
      `【第一希望回収日】${formatDateTimeJP(form.pickupDate1)}`,
      `【第二希望回収日】${formatDateTimeJP(form.pickupDate2)}`,
      `【第三希望回収日】${formatDateTimeJP(form.pickupDate3)}`,
      "",
    ];

    if (requestFlow === "business") {
      const contactName =
        `${form.contactLastName || ""} ${form.contactFirstName || ""}`.trim() ||
        "未入力";
      const contactKana =
        `${form.contactLastNameKana || ""} ${form.contactFirstNameKana || ""}`.trim() ||
        "未入力";
      const representativeName =
        `${form.representativeLastName || ""} ${form.representativeFirstName || ""}`.trim() ||
        "未入力";
      const representativeKana =
        `${form.representativeLastNameKana || ""} ${form.representativeFirstNameKana || ""}`.trim() ||
        "未入力";

      return [
        ...baseLines,
        "■ 申込者情報",
        `【事業形態】${form.businessFormType || "未入力"}`,
        `【屋号 / 法人名】${form.businessName || "未入力"}`,
        `【担当者名】${contactName}`,
        `【担当者名（かな）】${contactKana}`,
        `【担当者電話番号】${form.contactPhone || "未入力"}`,
        `【担当者メールアドレス】${form.contactEmail || "未入力"}`,
        ...(form.receiptDifferent
          ? [
              "",
              "■ 領収書情報",
              `【領収書の宛名】${form.receiptName || "未入力"}`,
              `【代表者名】${representativeName}`,
              `【代表者名（かな）】${representativeKana}`,
              `【代表者電話番号】${form.representativePhone || "未入力"}`,
              `【代表者メールアドレス】${form.representativeEmail || "未入力"}`,
            ]
          : []),
        "",
        "———",
        "",
        "※ このトークでそのままやり取りできます。",
      ].join("\n");
    }

    return [
      ...baseLines,
      "■ 申込者情報",
      `【お名前】${form.name || "未入力"}`,
      `【ふりがな】${form.furigana || "未入力"}`,
      `【電話番号】${form.phone || "未入力"}`,
      "",
      "———",
      "",
      "※ このトークでそのままやり取りできます。",
    ].join("\n");
  };

  const handleSubmit = async () => {
    setError(null);
    setSubmitting(true);

    const toKintoneDateTime = (value: string) => {
      if (!value) return "";
      const d = new Date(value);
      if (isNaN(d.getTime())) return "";
      return d.toISOString();
    };

    try {
      const payload = {
        name:
          requestFlow === "business"
            ? `${form.contactLastName} ${form.contactFirstName}`.trim()
            : form.name,
        phone: requestFlow === "business" ? form.contactPhone : form.phone,
        contactMethod: "LINE",
        inquiryType: requestFlow === "business" ? "事業ゴミ" : "家庭ゴミ",
        service:
          requestFlow === "business"
            ? form.service || "事業ゴミ回収"
            : form.service,

        postalCode: form.postalCode,
        prefecture: form.prefecture,
        city: form.city,
        address1: form.address,

        buildingType: form.buildingType,
        parking: form.parking,
        elevator: form.elevator,
        disposalMethod: form.disposalMethod,

        items: `${form.items}${form.notes ? `\n\n【備考】\n${form.notes}` : ""}`,
        notes: form.notes,
        airconRemoval: "ない",

        pickupDate1: toKintoneDateTime(form.pickupDate1),
        pickupDate2: toKintoneDateTime(form.pickupDate2),
        pickupDate3: toKintoneDateTime(form.pickupDate3),

        businessType: form.businessFormType,
        businessName: form.businessName,
        contactLastName: form.contactLastName,
        contactFirstName: form.contactFirstName,
        contactLastNameKana: form.contactLastNameKana,
        contactFirstNameKana: form.contactFirstNameKana,
        contactPhone: form.contactPhone,
        contactEmail: form.contactEmail,
        receiptDifferent: form.receiptDifferent ? "あり" : "",
        receiptName: form.receiptName,
        representativeLastName: form.representativeLastName,
        representativeFirstName: form.representativeFirstName,
        representativeLastNameKana: form.representativeLastNameKana,
        representativeFirstNameKana: form.representativeFirstNameKana,
        representativePhone: form.representativePhone,
        representativeEmail: form.representativeEmail,
      };

      const kintoneRes = await fetch("/api/kintone", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const kintoneData = await kintoneRes.json();

      if (!kintoneRes.ok) {
        throw new Error(JSON.stringify(kintoneData));
      }

      if (!liff.isInClient()) {
        throw new Error("LINEアプリ内で開かれていません");
      }

      const summaryText = buildSummaryText();
      await liff.sendMessages([{ type: "text", text: summaryText }]);

      alert("送信が完了しました。");

      setForm(initialFormData);
      setScreen("home");
      setStep(1);
      setRequestFlow("household");
    } catch (err) {
      console.error("submit error:", err);
      setError(
        err instanceof Error ? err.message : "送信中にエラーが発生しました。"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {screen === "home" && (
        <>
          <HomeScreen
            onOpenGarbageEntry={() => setIsEntryModalOpen(true)}
            onOpenBusinessWaste={() => setIsBusinessWasteOpen(true)}
            onOpenFaq={() => setIsFaqOpen(true)}
            onOpenReason={() => setIsReasonOpen(true)}
            onOpenRegion={() => setIsServiceAreaOpen(true)}
          />

          <EntryModal
            open={isEntryModalOpen}
            onStart={handleStartGarbageFlow}
            onClose={() => setIsEntryModalOpen(false)}
          />

          <BusinessWasteModal
            open={isBusinessWasteOpen}
            onClose={() => setIsBusinessWasteOpen(false)}
            onProceed={handleStartBusinessFlow}
          />

          <ServiceAreaModal
            open={isServiceAreaOpen}
            onClose={() => setIsServiceAreaOpen(false)}
          />

          <ReasonModal
            open={isReasonOpen}
            onClose={() => setIsReasonOpen(false)}
          />

          <FaqModal open={isFaqOpen} onClose={() => setIsFaqOpen(false)} />
        </>
      )}

      {screen === "household" && step === 1 && (
        <Step1Location
          form={form}
          setForm={setForm}
          onNext={() => setStep(2)}
          onBackToTop={handleBackHome}
        />
      )}

      {screen === "business" && step === 1 && (
        <BusinessStep1Location
          form={form}
          setForm={setForm}
          onNext={() => setStep(2)}
          onBackToTop={handleBackHome}
        />
      )}

      {screen === "household" && step === 2 && (
        <Step2Request
          form={form}
          setForm={setForm}
          onNext={() => setStep(3)}
          onPrev={() => setStep(1)}
        />
      )}

      {screen === "business" && step === 2 && (
        <BusinessStep2Request
          form={form}
          setForm={setForm}
          onNext={() => setStep(3)}
          onPrev={() => setStep(1)}
        />
      )}

      {screen === "household" && step === 3 && (
        <Step3Schedule
          form={form}
          setForm={setForm}
          onNext={() => setStep(4)}
          onPrev={() => setStep(2)}
        />
      )}

      {screen === "business" && step === 3 && (
        <BusinessStep3Schedule
          form={form}
          setForm={setForm}
          onNext={() => setStep(4)}
          onPrev={() => setStep(2)}
        />
      )}

      {screen === "household" && step === 4 && (
        <Step4Applicant
          form={form}
          setForm={setForm}
          onNext={() => setStep(5)}
          onPrev={() => setStep(3)}
        />
      )}

      {screen === "business" && step === 4 && (
        <BusinessStep4Applicant
          form={form}
          setForm={setForm}
          onNext={() => setStep(5)}
          onPrev={() => setStep(3)}
        />
      )}

      {screen === "household" && step === 5 && (
        <>
          {error && (
            <div
              style={{
                position: "sticky",
                top: 0,
                zIndex: 1000,
                background: "#ffe5e5",
                color: "#b00020",
                padding: "12px 16px",
                fontSize: 13,
                fontWeight: 700,
                textAlign: "center",
              }}
            >
              {error}
            </div>
          )}

          <Step5Confirm
            form={form}
            onSubmit={handleSubmit}
            onPrev={() => setStep(4)}
          />

          {submitting && (
            <div
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.35)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 2000,
              }}
            >
              <div
                style={{
                  background: "#fff",
                  borderRadius: 16,
                  padding: "18px 22px",
                  fontSize: 15,
                  fontWeight: 800,
                  color: "#095db6",
                }}
              >
                送信中です...
              </div>
            </div>
          )}
        </>
      )}

      {screen === "business" && step === 5 && (
        <>
          {error && (
            <div
              style={{
                position: "sticky",
                top: 0,
                zIndex: 1000,
                background: "#ffe5e5",
                color: "#b00020",
                padding: "12px 16px",
                fontSize: 13,
                fontWeight: 700,
                textAlign: "center",
              }}
            >
              {error}
            </div>
          )}

          <BusinessStep5Confirm
            form={form}
            onSubmit={handleSubmit}
            onPrev={() => setStep(4)}
          />

          {submitting && (
            <div
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.35)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 2000,
              }}
            >
              <div
                style={{
                  background: "#fff",
                  borderRadius: 16,
                  padding: "18px 22px",
                  fontSize: 15,
                  fontWeight: 800,
                  color: "#095db6",
                }}
              >
                送信中です...
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}