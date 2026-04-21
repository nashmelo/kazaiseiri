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