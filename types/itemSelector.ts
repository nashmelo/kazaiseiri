// types/itemSelector.ts

export type ItemOption = {
  id: string;
  label: string;
  unit?: string;
  /** 検索用の別名（ひらがな・言い換え） */
  keywords?: string[];
};

export type ItemCategory = {
  id: string;
  label: string;
  items: ItemOption[];
};

export type ItemCountMap = Record<string, number>;