// types/itemSelector.ts

export type ItemOption = {
  id: string;
  label: string;
  unit?: string;
};

export type ItemCategory = {
  id: string;
  label: string;
  items: ItemOption[];
};

export type ItemCountMap = Record<string, number>;