// lib/itemSelector/householdItems.ts

import type { ItemCategory } from "@/types/itemSelector";

export const householdItemCategories: ItemCategory[] = [
  {
    id: "bed-mattress-futon",
    label: "ベッド・マットレス・布団",
    items: [
      { id: "bed-single-semidouble", label: "ベッド（シングル、セミダブル）" },
      { id: "bed-double-up", label: "ベッド（ダブル以上）" },
      {
        id: "mattress-single-semidouble",
        label: "マットレス（シングル、セミダブル）",
      },
      { id: "mattress-double-up", label: "マットレス（ダブル以上）" },
      { id: "futon", label: "布団" },
      { id: "carpet", label: "カーペット" },
    ],
  },
  {
    id: "chair-sofa",
    label: "椅子・ソファ",
    items: [
      { id: "dining-chair", label: "ダイニングチェア" },
      { id: "sofa", label: "ソファ" },
      { id: "sofa-large", label: "ソファ（3人掛け以上）" },
      { id: "floor-chair", label: "座椅子" },
    ],
  },
  {
    id: "tv-stand-desk-table",
    label: "テレビ台・机・テーブル",
    items: [
      { id: "pc-desk", label: "PCデスク" },
      { id: "study-desk", label: "学習机" },
      { id: "tv-stand", label: "テレビ台" },
      { id: "small-table", label: "座卓・テーブル（小）" },
      { id: "large-table", label: "テーブル（大）" },
      { id: "kotatsu", label: "こたつ" },
    ],
  },
  {
    id: "storage-furniture",
    label: "収納家具類",
    items: [
      { id: "cupboard", label: "食器棚" },
      { id: "bookshelf-small", label: "本棚（小）" },
      { id: "dresser-chest", label: "タンス" },
      { id: "storage-case", label: "衣装ケース" },
      { id: "dresser", label: "ドレッサー" },
      { id: "color-box", label: "カラーボックス" },
      { id: "rack", label: "ラック類" },
    ],
  },
  {
    id: "appliances",
    label: "家電",
    items: [
      { id: "refrigerator-small", label: "冷蔵庫（170L以下）" },
      { id: "refrigerator-large", label: "冷蔵庫（171L以上）" },
      { id: "air-conditioner", label: "エアコン" },
      { id: "crt-tv", label: "ブラウン管テレビ" },
      { id: "flat-tv", label: "液晶・プラズマ式テレビ" },
      { id: "washer-dryer", label: "洗濯機・衣類乾燥機" },
      { id: "large-appliance", label: "大型家電" },
      { id: "small-appliance", label: "小型家電" },
    ],
  },
  {
    id: "sports-music",
    label: "スポーツ用品・楽器",
    items: [
      { id: "bicycle", label: "自転車" },
      {
        id: "ski-snowboard-surfboard",
        label: "スキー・スノボ・サーフボード",
      },
      { id: "golf-clubs", label: "ゴルフクラブ" },
      { id: "piano", label: "ピアノ" },
      { id: "guitar", label: "ギター" },
      { id: "fishing-gear", label: "釣具" },
      { id: "other-sports-music", label: "その他スポーツ用品・楽器" },
    ],
  },
  {
    id: "others",
    label: "その他",
    items: [
      { id: "safe", label: "金庫" },
      { id: "buddhist-altar", label: "仏壇・神棚" },
      { id: "plants", label: "植物類" },
      { id: "tatami", label: "畳" },
      { id: "tires", label: "タイヤ" },
      { id: "shed-garden-deck", label: "物置・ガーデンデッキ" },
      { id: "blocks-bricks", label: "ブロック・レンガ" },
      { id: "clothes", label: "衣類" },
      { id: "books", label: "本" },
      { id: "kitchen-items", label: "キッチン用品" },
    ],
  },
];