"use client";

import React from "react";
import HomeScreen from "@/components/top/HomeScreen";
import liff from "@line/liff";
import {
  mainStyle,
  wrapStyle,
  panelStyle,
  buttonGroupStyle,
  primaryButtonStyle,
  secondaryButtonStyle,
} from "@/styles/formStepStyles";
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

import MovingStep1Location from "@/components/form/moving/MovingStep1Location";
import MovingStep2Request from "@/components/form/moving/MovingStep2Request";
import MovingStep3Schedule from "@/components/form/moving/MovingStep3Schedule";
import MovingStep4Applicant from "@/components/form/moving/MovingStep4Applicant";
import MovingStep5Confirm from "@/components/form/moving/MovingStep5Confirm";

import type { FormData, Screen, Step } from "@/types/form";
import type { TenantKey } from "@/lib/tenant/tenantConfig";

type FlowRendererProps = {
  screen: Screen;
  step: Step;
  form: FormData;
  setForm: React.Dispatch<React.SetStateAction<FormData>>;
  enableImageUpload: boolean;

  isServiceAreaOpen: boolean;
  setIsServiceAreaOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isReasonOpen: boolean;
  setIsReasonOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isFaqOpen: boolean;
  setIsFaqOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isBusinessWasteOpen: boolean;
  setIsBusinessWasteOpen: React.Dispatch<React.SetStateAction<boolean>>;

  error: string | null;
  submitting: boolean;

  tenantKey: TenantKey;
  showMoving: boolean;
  brandName?: string;

  onStartGarbageFlow: () => void;
  onStartBusinessFlow: () => void;
  onStartMovingFlow: () => void;
  onBackHome: () => void;
  onSetStep: React.Dispatch<React.SetStateAction<Step>>;
  /** 確認画面の「修正する」から来ているとき true */
  editingFromConfirm?: boolean;
  onEditFromConfirm?: (step: 1 | 2 | 3 | 4) => void;
  onSubmit: () => Promise<void> | void;
};

export default function FlowRenderer({
  screen,
  step,
  form,
  setForm,
  enableImageUpload,
  isServiceAreaOpen,
  setIsServiceAreaOpen,
  isReasonOpen,
  setIsReasonOpen,
  isFaqOpen,
  setIsFaqOpen,
  isBusinessWasteOpen,
  setIsBusinessWasteOpen,
  error,
  submitting,
  tenantKey,
  showMoving,
  brandName,
  onStartGarbageFlow,
  onStartBusinessFlow,
  onStartMovingFlow,
  onBackHome,
  onSetStep,
  editingFromConfirm = false,
  onEditFromConfirm,
  onSubmit,
}: FlowRendererProps) {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "100%",
        overflowX: "hidden",
      }}
    >
      {screen === "home" && (
        <>
          <HomeScreen
            tenantKey={tenantKey}
            onOpenGarbageEntry={onStartGarbageFlow}
            onOpenBusinessWaste={() => setIsBusinessWasteOpen(true)}
            onOpenFaq={() => setIsFaqOpen(true)}
            onOpenReason={() => setIsReasonOpen(true)}
            onOpenRegion={() => setIsServiceAreaOpen(true)}
            showMoving={showMoving}
            onOpenMovingEntry={onStartMovingFlow}
          />

          <BusinessWasteModal
            open={isBusinessWasteOpen}
            onClose={() => setIsBusinessWasteOpen(false)}
            onProceed={onStartBusinessFlow}
            tenantKey={tenantKey}
          />

          <ServiceAreaModal
            open={isServiceAreaOpen}
            onClose={() => setIsServiceAreaOpen(false)}
            showMoving={showMoving}
          />

          <ReasonModal
            open={isReasonOpen}
            onClose={() => setIsReasonOpen(false)}
            tenantKey={tenantKey}
          />

          <FaqModal open={isFaqOpen} onClose={() => setIsFaqOpen(false)} />
        </>
      )}

      {screen === "complete" && <CompleteScreen onBackHome={onBackHome} />}

      {screen === "household" && step === 1 && (
        <Step1Location
          tenantKey={tenantKey}
          form={form}
          setForm={setForm}
          onNext={() => onSetStep(editingFromConfirm ? 5 : 2)}
          nextLabel={editingFromConfirm ? "確認画面に戻る" : undefined}
          onBackToTop={onBackHome}
        />
      )}

      {screen === "household" && step === 2 && (
        <Step2Request
          tenantKey={tenantKey}
          form={form}
          setForm={setForm}
          onNext={() => onSetStep(editingFromConfirm ? 5 : 3)}
          nextLabel={editingFromConfirm ? "確認画面に戻る" : undefined}
          onPrev={() => onSetStep(1)}
          enableImageUpload={enableImageUpload}
        />
      )}

      {screen === "household" && step === 3 && (
        <Step3Schedule
          tenantKey={tenantKey}
          form={form}
          setForm={setForm}
          onNext={() => onSetStep(editingFromConfirm ? 5 : 4)}
          nextLabel={editingFromConfirm ? "確認画面に戻る" : undefined}
          onPrev={() => onSetStep(2)}
        />
      )}

      {screen === "household" && step === 4 && (
        <Step4Applicant
          tenantKey={tenantKey}
          form={form}
          setForm={setForm}
          onNext={() => onSetStep(editingFromConfirm ? 5 : 5)}
          nextLabel={editingFromConfirm ? "確認画面に戻る" : undefined}
          onPrev={() => onSetStep(3)}
        />
      )}

      {screen === "household" && step === 5 && (
        <>
          {error && <ErrorBanner error={error} />}

          <Step5Confirm
            tenantKey={tenantKey}
            form={form}
            onSubmit={onSubmit}
            onPrev={() => onSetStep(4)}
            onEdit={onEditFromConfirm}
          />

          {submitting && <SubmittingOverlay />}
        </>
      )}

      {screen === "business" && step === 1 && (
        <BusinessStep1Location
          form={form}
          setForm={setForm}
          onNext={() => onSetStep(editingFromConfirm ? 5 : 2)}
          nextLabel={editingFromConfirm ? "確認画面に戻る" : undefined}
          onBackToTop={onBackHome}
        />
      )}

      {screen === "business" && step === 2 && (
        <BusinessStep2Request
          form={form}
          setForm={setForm}
          onNext={() => onSetStep(editingFromConfirm ? 5 : 3)}
          nextLabel={editingFromConfirm ? "確認画面に戻る" : undefined}
          onPrev={() => onSetStep(1)}
          enableImageUpload={enableImageUpload}
        />
      )}

      {screen === "business" && step === 3 && (
        <BusinessStep3Schedule
          form={form}
          setForm={setForm}
          onNext={() => onSetStep(editingFromConfirm ? 5 : 4)}
          nextLabel={editingFromConfirm ? "確認画面に戻る" : undefined}
          onPrev={() => onSetStep(2)}
        />
      )}

      {screen === "business" && step === 4 && (
        <BusinessStep4Applicant
          tenantKey={tenantKey}
          form={form}
          setForm={setForm}
          onNext={() => onSetStep(editingFromConfirm ? 5 : 5)}
          nextLabel={editingFromConfirm ? "確認画面に戻る" : undefined}
          onPrev={() => onSetStep(3)}
        />
      )}

      {screen === "business" && step === 5 && (
        <>
          {error && <ErrorBanner error={error} />}

          <BusinessStep5Confirm
            tenantKey={tenantKey}
            form={form}
            onSubmit={onSubmit}
            onPrev={() => onSetStep(4)}
            onEdit={onEditFromConfirm}
          />

          {submitting && <SubmittingOverlay />}
        </>
      )}

      {showMoving && screen === "moving" && step === 1 && (
        <MovingStep1Location
          form={form}
          setForm={setForm}
          onNext={() => onSetStep(editingFromConfirm ? 5 : 2)}
          nextLabel={editingFromConfirm ? "確認画面に戻る" : undefined}
          onBackToTop={onBackHome}
        />
      )}

      {showMoving && screen === "moving" && step === 2 && (
        <MovingStep2Request
          form={form}
          setForm={setForm}
          onNext={() => onSetStep(editingFromConfirm ? 5 : 3)}
          nextLabel={editingFromConfirm ? "確認画面に戻る" : undefined}
          onPrev={() => onSetStep(1)}
          enableImageUpload={enableImageUpload}
        />
      )}

      {showMoving && screen === "moving" && step === 3 && (
        <MovingStep3Schedule
          form={form}
          setForm={setForm}
          onNext={() => onSetStep(editingFromConfirm ? 5 : 4)}
          nextLabel={editingFromConfirm ? "確認画面に戻る" : undefined}
          onPrev={() => onSetStep(2)}
        />
      )}

      {showMoving && screen === "moving" && step === 4 && (
        <MovingStep4Applicant
          form={form}
          setForm={setForm}
          onNext={() => onSetStep(editingFromConfirm ? 5 : 5)}
          nextLabel={editingFromConfirm ? "確認画面に戻る" : undefined}
          onPrev={() => onSetStep(3)}
        />
      )}

      {showMoving && screen === "moving" && step === 5 && (
        <>
          {error && <ErrorBanner error={error} />}

          <MovingStep5Confirm
            form={form}
            onSubmit={onSubmit}
            onPrev={() => onSetStep(4)}
            onEdit={onEditFromConfirm}
          />

          {submitting && <SubmittingOverlay />}
        </>
      )}
    </div>
  );
}

function CompleteScreen({ onBackHome }: { onBackHome: () => void }) {
  const inLine = typeof window !== "undefined" && liff.isInClient?.();
  return (
    <main style={mainStyle}>
      <div style={wrapStyle}>
        <div style={{ ...panelStyle, textAlign: "center" }}>
          <div
            aria-hidden
            style={{
              width: 64,
              height: 64,
              margin: "8px auto 14px",
              borderRadius: "50%",
              background: "var(--pink-strong)",
              color: "#fff",
              fontSize: 34,
              lineHeight: "64px",
              fontWeight: 900,
            }}
          >
            ✓
          </div>
          <h2
            style={{
              margin: "0 0 12px",
              fontSize: 22,
              fontWeight: 800,
              color: "var(--text-main)",
            }}
          >
            ご依頼を受け付けました
          </h2>
          <p
            style={{
              margin: "0 0 22px",
              fontSize: 14,
              lineHeight: 1.8,
              color: "var(--text-main)",
              textAlign: "left",
            }}
          >
            送っていただいた内容は、LINEのトークにも残っています。
            <br />
            内容を確認して、担当者からLINEでお見積もりをご連絡します。
          </p>
          <div style={buttonGroupStyle}>
            {inLine && (
              <button
                type="button"
                onClick={() => liff.closeWindow()}
                style={primaryButtonStyle}
              >
                LINEのトークに戻る
              </button>
            )}
            <button
              type="button"
              onClick={onBackHome}
              style={inLine ? secondaryButtonStyle : primaryButtonStyle}
            >
              トップに戻る
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

function ErrorBanner({ error }: { error: string }) {
  return (
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
  );
}

function SubmittingOverlay() {
  return (
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
          color: "var(--text-main)",
          textAlign: "center",
          lineHeight: 1.6,
        }}
      >
        送信中です...
        <br/>このまま画面を閉じずにお待ちください
      </div>
    </div>
  );
}