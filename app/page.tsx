"use client";

import { useState } from "react";
import HomeScreen from "@/components/top/HomeScreen";
import EntryModal from "@/components/top/EntryModal";

export default function Page() {
  const [isEntryModalOpen, setIsEntryModalOpen] = useState(false);

  return (
    <>
      <HomeScreen
        onOpenGarbageEntry={() => setIsEntryModalOpen(true)}
        onOpenBusinessWaste={() => alert("事業ゴミ回収は未実装です")}
        onOpenReuse={() => alert("家電リユースは未実装です")}
        onOpenReason={() => alert("DUSTALKが選ばれる理由は未実装です")}
        onOpenRegion={() => alert("サービス展開地域は未実装です")}
      />

      <EntryModal
        open={isEntryModalOpen}
        onStart={() => {
          setIsEntryModalOpen(false);
          alert("次は Step1Location をつなぎます");
        }}
        onClose={() => setIsEntryModalOpen(false)}
      />
    </>
  );
}