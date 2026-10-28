"use client";

import { useEffect, useState } from "react";
import liff from "@line/liff";
import FlowRenderer from "@/components/flow/FlowRenderer";
import { submitInquiry } from "@/lib/form/submitInquiry";
import { buildSummaryText } from "@/lib/form/buildSummaryText";
import { getTenantConfig } from "@/lib/tenant/tenantConfig";
import {
  initialFormData,
  type FormData,
  type Screen,
  type Step,
} from "@/types/form";

const LIFF_ID = process.env.NEXT_PUBLIC_LIFF_ID || "";

type ActiveRequestFlow = "household" | "business" | "moving";
type AppMode = "upload" | "chat";

export default function Page() {
  const [mode, setMode] = useState<AppMode>("upload");
  const [tenant, setTenant] = useState<string>("ezurin");
  const enableImageUpload = mode === "upload";

  const tenantConfig = getTenantConfig(tenant);

  const [screen, setScreen] = useState<Screen>("home");
  const [step, setStep] = useState<Step>(1);
  const [requestFlow, setRequestFlow] =
    useState<ActiveRequestFlow>("household");
  const [form, setForm] = useState<FormData>(initialFormData);
  const [isServiceAreaOpen, setIsServiceAreaOpen] = useState(false);
  const [isReasonOpen, setIsReasonOpen] = useState(false);
  const [isFaqOpen, setIsFaqOpen] = useState(false);
  const [isBusinessWasteOpen, setIsBusinessWasteOpen] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  // 確認画面の「修正する」から来たか（そのステップの次へで確認画面に戻す）
  const [editingFromConfirm, setEditingFromConfirm] = useState(false);

  useEffect(() => {
    if (step === 5 || screen === "home") setEditingFromConfirm(false);
  }, [step, screen]);

  const handleEditFromConfirm = (target: 1 | 2 | 3 | 4) => {
    setEditingFromConfirm(true);
    setStep(target);
  };
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const rawMode = params.get("mode");
    const rawTenant = params.get("tenant");

    if (rawMode === "chat") {
      setMode("chat");
    } else {
      setMode("upload");
    }

    setTenant(rawTenant || "ezurin");
  }, []);

  useEffect(() => {
    const init = async () => {
      try {
        if (!LIFF_ID) {
          throw new Error("NEXT_PUBLIC_LIFF_ID が未設定です。");
        }

        await liff.init({ liffId: LIFF_ID });
      } catch (err) {
        console.error("LIFF init error:", err);
        setError(
          err instanceof Error
            ? err.message
            : "LINE初期化に失敗しました。"
        );
      }
    };

    init();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [screen, step]);

  const handleStartGarbageFlow = () => {
    setError(null);
    setRequestFlow("household");
    setScreen("household");
    setStep(1);
    setForm((prev) => ({
      ...initialFormData,
      service: "不用品回収",
      images: prev.images ?? [],
    }));
  };

  const handleStartBusinessFlow = () => {
    setError(null);
    setIsBusinessWasteOpen(false);
    setRequestFlow("business");
    setScreen("business");
    setStep(1);
    setForm(initialFormData);
  };

  const handleStartMovingFlow = () => {
    if (!tenantConfig.showMoving) {
      return;
    }

    setError(null);
    setRequestFlow("moving");
    setScreen("moving");
    setStep(1);
    setForm((prev) => ({
      ...initialFormData,
      service: "引越し",
      images: prev.images ?? [],
    }));
  };

  const handleBackHome = () => {
    // 入力の途中でトップに戻ると全部消えるので、確かめてから戻る
    // 初期値が自動で入る項目（依頼内容・排出方法など）は除き、利用者が書いた・選んだ物があるかで判断する
    const typedKeys: (keyof FormData)[] = [
      "postalCode",
      "city",
      "address",
      "movingPostalCode",
      "movingCity",
      "movingAddress",
      "items",
      "movingItems",
      "disposalItems",
      "notes",
    ];
    const isDirty =
      screen !== "complete" &&
      (typedKeys.some((k) => String(form[k] ?? "").trim() !== "") ||
        (form.images?.length ?? 0) > 0);
    if (
      isDirty &&
      !window.confirm("入力した内容は消えます。トップに戻りますか？")
    ) {
      return;
    }
    setError(null);
    setScreen("home");
    setStep(1);
    setRequestFlow("household");
    setForm(initialFormData);
  };

  const handleSubmit = async () => {
    setError(null);
    setSubmitting(true);

    try {
      const result = await submitInquiry({
        form,
        requestFlow,
        enableImageUpload,
        tenant: tenantConfig.key,
      });

      const baseSummaryText = buildSummaryText({
        form,
        requestFlow,
        enableImageUpload,
      });

      const summaryText = result.summaryUrl
        ? `${baseSummaryText}

お写真の確認はこちら
${result.summaryUrl}`
        : baseSummaryText;

      if (liff.isInClient()) {
        await liff.sendMessages([{ type: "text", text: summaryText }]);
      } else {
        console.log("LINE外のため sendMessages はスキップしました");
      }

      // 送ったあとは「受け付けた・次に何が起きるか」の画面を出す
      setForm(initialFormData);
      setScreen("complete");
      setStep(1);
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
    <FlowRenderer
      screen={screen}
      step={step}
      form={form}
      setForm={setForm}
      enableImageUpload={enableImageUpload}
      isServiceAreaOpen={isServiceAreaOpen}
      setIsServiceAreaOpen={setIsServiceAreaOpen}
      isReasonOpen={isReasonOpen}
      setIsReasonOpen={setIsReasonOpen}
      isFaqOpen={isFaqOpen}
      setIsFaqOpen={setIsFaqOpen}
      isBusinessWasteOpen={isBusinessWasteOpen}
      setIsBusinessWasteOpen={setIsBusinessWasteOpen}
      error={error}
      submitting={submitting}
      tenantKey={tenantConfig.key}
      showMoving={tenantConfig.showMoving}
      brandName={tenantConfig.brandName}
      onStartGarbageFlow={handleStartGarbageFlow}
      onStartBusinessFlow={handleStartBusinessFlow}
      onStartMovingFlow={handleStartMovingFlow}
      onBackHome={handleBackHome}
      onSetStep={setStep}
      editingFromConfirm={editingFromConfirm}
      onEditFromConfirm={handleEditFromConfirm}
      onSubmit={handleSubmit}
    />
  );
}