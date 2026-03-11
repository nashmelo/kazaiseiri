"use client";

import { useState } from "react";
import HomeScreen from "@/components/top/HomeScreen";
import EntryModal from "@/components/top/EntryModal";
import Step1Location from "@/components/form/Step1Location";
import Step2Request from "@/components/form/Step2Request";
import Step3Schedule from "@/components/form/Step3Schedule";
import Step4Applicant from "@/components/form/Step4Applicant";
import Step5Confirm from "@/components/form/Step5Confirm";
import {
  initialFormData,
  type FormData,
  type Screen,
  type Step,
} from "@/types/form";

export default function Page() {
  const [screen, setScreen] = useState<Screen>("home");
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<FormData>(initialFormData);
  const [isEntryModalOpen, setIsEntryModalOpen] = useState(false);

  const handleStartGarbageFlow = () => {
    setIsEntryModalOpen(false);
    setScreen("form");
    setStep(1);
  };

  const handleBackHome = () => {
    setScreen("home");
    setStep(1);
    setForm(initialFormData);
  };

  return (
    <>
      {screen === "home" && (
        <>
          <HomeScreen
            onOpenGarbageEntry={() => setIsEntryModalOpen(true)}
            onOpenBusinessWaste={() => alert("事業ゴミ回収は未実装です")}
            onOpenReuse={() => alert("家電リユースは未実装です")}
            onOpenReason={() => alert("すっきりんが選ばれる理由は未実装です")}
            onOpenRegion={() => alert("サービス展開地域は未実装です")}
          />

          <EntryModal
            open={isEntryModalOpen}
            onStart={handleStartGarbageFlow}
            onClose={() => setIsEntryModalOpen(false)}
          />
        </>
      )}

      {screen === "form" && step === 1 && (
        <Step1Location
          onNext={() => setStep(2)}
          onBackToTop={handleBackHome}
        />
      )}

      {screen === "form" && step === 2 && (
        <Step2Request
          onNext={() => setStep(3)}
          onPrev={() => setStep(1)}
        />
      )}

      {screen === "form" && step === 3 && (
        <Step3Schedule
          onNext={() => setStep(4)}
          onPrev={() => setStep(2)}
        />
      )}

      {screen === "form" && step === 4 && (
        <Step4Applicant
          onNext={() => setStep(5)}
          onPrev={() => setStep(3)}
        />
      )}

      {screen === "form" && step === 5 && (
        <Step5Confirm
          onSubmit={() => {
            alert("ここに送信処理（kintone登録 + LINE送信）を入れます");
          }}
          onPrev={() => setStep(4)}
        />
      )}
    </>
  );
}