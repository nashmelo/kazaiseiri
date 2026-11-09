"use client";

import React, { useEffect, useMemo, useState } from "react";
import AccordionSection from "@/components/form/common/AccordionSection";
import ItemCounterRow from "@/components/form/common/ItemCounterRow";
import { householdItemCategories } from "@/lib/itemSelector/householdItems";
import {
  buildItemsText,
  parseItemsText,
} from "@/lib/itemSelector/buildItemsText";
import type { ItemCountMap } from "@/types/itemSelector";
import { searchItems } from "@/lib/itemSelector/searchItems";

type ItemSelectorProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function ItemSelector({
  value,
  onChange,
}: ItemSelectorProps) {
  // 前のステップや確認画面から戻ってきたときも、選んだ数を引き継ぐ
  const [counts, setCounts] = useState<ItemCountMap>(() =>
    parseItemsText(householdItemCategories, value)
  );
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(
      householdItemCategories.map((category) => [category.id, false])
    )
  );

  const [query, setQuery] = useState("");
  const hits = useMemo(
    () => searchItems(householdItemCategories, query),
    [query]
  );
  const isSearching = query.trim() !== "";

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

      <div style={searchWrapStyle}>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="品物の名前で探す（例：冷蔵庫、タンス）"
          aria-label="品物の名前で探す"
          enterKeyHint="search"
          style={searchInputStyle}
        />
        {isSearching && (
          <button
            type="button"
            onClick={() => setQuery("")}
            style={clearButtonStyle}
            aria-label="検索を消す"
          >
            ×
          </button>
        )}
      </div>

      {isSearching ? (
        <div style={resultBoxStyle} aria-live="polite">
          {hits.length > 0 ? (
            hits.map(({ item, categoryLabel }) => (
              <ItemCounterRow
                key={item.id}
                label={`${item.label}`}
                sub={categoryLabel}
                count={counts[item.id] ?? 0}
                onDecrease={() => changeCount(item.id, -1)}
                onIncrease={() => changeCount(item.id, 1)}
              />
            ))
          ) : (
            <p style={noHitStyle}>
              「{query.trim()}」は見つかりませんでした。近い品物を選ぶか、下の補足欄に書いてください。
            </p>
          )}
        </div>
      ) : (
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
      )}
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
  color: "var(--pink-strong)",
};

const sectionListStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 10,
};
const searchWrapStyle: React.CSSProperties = {
  position: "relative",
};

const searchInputStyle: React.CSSProperties = {
  width: "100%",
  padding: "13px 44px 13px 14px",
  borderRadius: 12,
  border: "1.5px solid rgba(251,155,204,0.55)",
  fontSize: 16,
  lineHeight: 1.4,
  background: "#ffffff",
  color: "var(--text-main)",
  boxSizing: "border-box",
};

const clearButtonStyle: React.CSSProperties = {
  position: "absolute",
  right: 4,
  top: "50%",
  transform: "translateY(-50%)",
  width: 44,
  height: 44,
  border: "none",
  background: "transparent",
  color: "var(--text-sub)",
  fontSize: 20,
  cursor: "pointer",
};

const resultBoxStyle: React.CSSProperties = {
  border: "1px solid #f0d4e2",
  borderRadius: 20,
  background: "#fff",
  padding: "4px 18px",
};

const noHitStyle: React.CSSProperties = {
  margin: "12px 0",
  fontSize: 13,
  lineHeight: 1.6,
  color: "var(--text-sub)",
};
