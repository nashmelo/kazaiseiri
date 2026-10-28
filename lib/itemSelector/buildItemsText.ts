// lib/itemSelector/buildItemsText.ts

import type { ItemCategory, ItemCountMap } from "@/types/itemSelector";

export function buildItemsText(
  categories: ItemCategory[],
  counts: ItemCountMap
): string {
  const lines: string[] = [];

  for (const category of categories) {
    for (const item of category.items) {
      const count = counts[item.id] ?? 0;

      if (count > 0) {
        lines.push(`${item.label} ${count}${item.unit ?? "点"}`);
      }
    }
  }

  return lines.join("\n");
}

/** buildItemsText で作った文字から数を読み戻す（画面を行き来しても選んだ数が消えないように） */
export function parseItemsText(
  categories: ItemCategory[],
  text: string
): ItemCountMap {
  const counts: ItemCountMap = {};
  if (!text) return counts;
  const lines = text.split("\n");
  for (const category of categories) {
    for (const item of category.items) {
      const unit = item.unit ?? "点";
      const prefix = `${item.label} `;
      const line = lines.find(
        (l) => l.startsWith(prefix) && l.endsWith(unit)
      );
      if (!line) continue;
      const n = parseInt(line.slice(prefix.length, line.length - unit.length), 10);
      if (Number.isFinite(n) && n > 0) counts[item.id] = n;
    }
  }
  return counts;
}
