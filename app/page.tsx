"use client";

import { useState } from "react";
import HomeScreen from "@/components/top/HomeScreen";
import EntryModal from "@/components/top/EntryModal";
import Step1Location from "@/components/form/Step1Location";
import { initialFormData, type FormData, type Screen, type Step } from "@/types/form";

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
          onNext={() => alert("次は Step2Request をつなぎます")}
          onBackToTop={handleBackHome}
        />
      )}
    </>
  );
}