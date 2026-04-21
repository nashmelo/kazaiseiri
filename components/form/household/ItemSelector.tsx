"use client";

import React, { useEffect, useMemo, useState } from "react";
import AccordionSection from "@/components/form/common/AccordionSection";
import ItemCounterRow from "@/components/form/common/ItemCounterRow";
import { householdItemCategories } from "@/lib/itemSelector/householdItems";
import { buildItemsText } from "@/lib/itemSelector/buildItemsText";
import type { ItemCountMap } from "@/types/itemSelector";

type ItemSelectorProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function ItemSelector({
  value,
  onChange,
}: ItemSelectorProps) {
  const [counts, setCounts] = useState<ItemCountMap>({});
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(
      householdItemCategories.map((category) => [category.id, false])
    )
  );

  const selectedTotalCount = useMemo(() => {
    return Object.values(counts).reduce((sum, count) => sum + count, 0);
  }, [counts]);

  useEffect(() => {
    const nextText = buildItemsText(householdItemCategories, counts);
    if (nextText !== value) {
      onChange(nextText);
    }
  }, [counts, onChange, value]);

  const toggleSection = (categoryId: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  const changeCount = (itemId: string, diff: number) => {
    setCounts((prev) => {
      const current = prev[itemId] ?? 0;
      const next = Math.max(0, current + diff);

      return {
        ...prev,
        [itemId]: next,
      };
    });
  };

  const getCategorySelectedCount = (categoryId: string) => {
    const category = householdItemCategories.find(
      (item) => item.id === categoryId
    );
    if (!category) return 0;

    return category.items.reduce((sum, item) => {
      return sum + (counts[item.id] ?? 0);
    }, 0);
  };

  return (
    <div style={wrapperStyle}>
      <div style={summaryBoxStyle}>
        <div style={summaryTitleStyle}>品目をタップして数量を選択してください</div>
        <div style={summarySubTextStyle}>
          選択した内容は自動で入力欄に反映されます
        </div>
        {selectedTotalCount > 0 && (
          <div style={summaryCountStyle}>合計 {selectedTotalCount}点</div>
        )}
      </div>

      <div style={sectionListStyle}>
        {householdItemCategories.map((category) => (
          <AccordionSection
            key={category.id}
            title={category.label}
            isOpen={Boolean(openSections[category.id])}
            selectedCount={getCategorySelectedCount(category.id)}
            onToggle={() => toggleSection(category.id)}
          >
            {category.items.map((item) => (
              <ItemCounterRow
                key={item.id}
                label={item.label}
                count={counts[item.id] ?? 0}
                onDecrease={() => changeCount(item.id, -1)}
                onIncrease={() => changeCount(item.id, 1)}
              />
            ))}
          </AccordionSection>
        ))}
      </div>
    </div>
  );
}

const wrapperStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 14,
};

const summaryBoxStyle: React.CSSProperties = {
  padding: "2px 2px 0",
  background: "transparent",
  border: "none",
};

const summaryTitleStyle: React.CSSProperties = {
  fontSize: 14,
  fontWeight: 700,
  color: "var(--text-main)",
  lineHeight: 1.5,
};

const summarySubTextStyle: React.CSSProperties = {
  marginTop: 2,
  fontSize: 12,
  color: "var(--text-sub)",
  lineHeight: 1.5,
};

const summaryCountStyle: React.CSSProperties = {
  marginTop: 6,
  fontSize: 12,
  fontWeight: 700,
  color: "#e85d98",
};

const sectionListStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 10,
};