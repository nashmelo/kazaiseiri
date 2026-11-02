// lib/itemSelector/searchItems.ts

import type { ItemCategory, ItemOption } from "@/types/itemSelector";

/** 全角半角・カタカナひらがな・大文字小文字・空白の違いを無くして比べる */
export function normalizeForSearch(s: string): string {
  return s
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[ァ-ヶ]/g, (c) =>
      String.fromCharCode(c.charCodeAt(0) - 0x60)
    )
    .replace(/[\s・、,（）()]/g, "")
    .replace(/ー/g, "");
}

export type ItemHit = { item: ItemOption; categoryLabel: string };

/** 品名・別名に入力が含まれる品目を返す（無ければカテゴリ名で） */
export function searchItems(
  categories: ItemCategory[],
  query: string
): ItemHit[] {
  const q = normalizeForSearch(query);
  if (!q) return [];
  const hits: ItemHit[] = [];
  const catHits: ItemHit[] = [];
  for (const category of categories) {
    const cat = normalizeForSearch(category.label);
    for (const item of category.items) {
      const words = [item.label, ...(item.keywords ?? [])].map(
        normalizeForSearch
      );
      if (words.some((w) => w.includes(q))) {
        hits.push({ item, categoryLabel: category.label });
      } else if (cat.includes(q)) {
        catHits.push({ item, categoryLabel: category.label });
      }
    }
  }
  // 品名・別名で見つかればそれだけ。無ければカテゴリ名で（例：「家電」→家電の品目すべて）
  return hits.length ? hits : catHits;
}
