// lib/itemSelector/householdItems.ts

import type { ItemCategory } from "@/types/itemSelector";

export const householdItemCategories: ItemCategory[] = [
  {
    id: "bed-mattress-futon",
    label: "ベッド・マットレス・布団",
    items: [
      { id: "bed-single-semidouble", label: "ベッド（シングル、セミダブル）", keywords: ["べっど", "ベッドフレーム", "すのこ"] },
      { id: "bed-double-up", label: "ベッド（ダブル以上）", keywords: ["べっど", "ベッドフレーム", "クイーン", "キング"] },
      {
        id: "mattress-single-semidouble",
        label: "マットレス（シングル、セミダブル）", keywords: ["スプリング"],
      },
      { id: "mattress-double-up", label: "マットレス（ダブル以上）", keywords: ["スプリング"] },
      { id: "futon", label: "布団", keywords: ["ふとん", "毛布", "まくら", "枕", "掛け布団", "敷き布団"] },
      { id: "carpet", label: "カーペット", keywords: ["じゅうたん", "絨毯", "ラグ", "マット"] },
    ],
  },
  {
    id: "chair-sofa",
    label: "椅子・ソファ",
    items: [
      { id: "dining-chair", label: "ダイニングチェア", keywords: ["椅子", "いす", "イス", "チェア", "スツール"] },
      { id: "sofa", label: "ソファ", keywords: ["ソファー", "そふぁ", "1人掛け", "2人掛け"] },
      { id: "sofa-large", label: "ソファ（3人掛け以上）", keywords: ["ソファー", "そふぁ", "カウチ"] },
      { id: "floor-chair", label: "座椅子", keywords: ["ざいす", "いす", "椅子"] },
    ],
  },
  {
    id: "tv-stand-desk-table",
    label: "テレビ台・机・テーブル",
    items: [
      { id: "pc-desk", label: "PCデスク", keywords: ["机", "つくえ", "デスク", "パソコンデスク", "オフィスデスク"] },
      { id: "study-desk", label: "学習机", keywords: ["机", "つくえ", "勉強机", "デスク"] },
      { id: "tv-stand", label: "テレビ台", keywords: ["テレビボード", "TVボード", "ローボード"] },
      { id: "small-table", label: "座卓・テーブル（小）", keywords: ["机", "ちゃぶ台", "ローテーブル", "サイドテーブル"] },
      { id: "large-table", label: "テーブル（大）", keywords: ["机", "ダイニングテーブル", "食卓"] },
      { id: "kotatsu", label: "こたつ", keywords: ["コタツ", "炬燵"] },
    ],
  },
  {
    id: "storage-furniture",
    label: "収納家具類",
    items: [
      { id: "cupboard", label: "食器棚", keywords: ["カップボード", "キッチンボード", "棚"] },
      { id: "bookshelf-small", label: "本棚（小）", keywords: ["本棚", "書棚", "棚", "シェルフ"] },
      { id: "dresser-chest", label: "タンス", keywords: ["たんす", "箪笥", "チェスト", "整理ダンス", "洋服ダンス"] },
      { id: "storage-case", label: "衣装ケース", keywords: ["衣装ケース", "収納ケース", "プラケース", "引き出し"] },
      { id: "dresser", label: "ドレッサー", keywords: ["鏡台", "化粧台", "鏡"] },
      { id: "color-box", label: "カラーボックス", keywords: ["カラボ", "棚"] },
      { id: "rack", label: "ラック類", keywords: ["スチールラック", "メタルラック", "棚", "シェルフ", "ハンガーラック"] },
    ],
  },
  {
    id: "appliances",
    label: "家電",
    items: [
      { id: "refrigerator-small", label: "冷蔵庫（170L以下）", keywords: ["れいぞうこ", "冷凍庫", "小さい冷蔵庫", "一人暮らし"] },
      { id: "refrigerator-large", label: "冷蔵庫（171L以上）", keywords: ["れいぞうこ", "冷凍庫", "大きい冷蔵庫"] },
      { id: "air-conditioner", label: "エアコン", keywords: ["クーラー", "室外機"] },
      { id: "crt-tv", label: "ブラウン管テレビ", keywords: ["テレビ", "TV", "てれび"] },
      { id: "flat-tv", label: "液晶・プラズマ式テレビ", keywords: ["テレビ", "TV", "てれび", "液晶テレビ"] },
      { id: "washer-dryer", label: "洗濯機・衣類乾燥機", keywords: ["せんたくき", "洗濯機", "乾燥機", "ドラム式"] },
      { id: "large-appliance", label: "大型家電", keywords: ["食洗機", "マッサージチェア", "ウォーターサーバー", "ルームランナー"] },
      { id: "small-appliance", label: "小型家電", keywords: ["電子レンジ", "レンジ", "炊飯器", "掃除機", "扇風機", "ストーブ", "ヒーター", "トースター", "ポット", "ドライヤー", "プリンター", "パソコン", "PC"] },
    ],
  },
  {
    id: "sports-music",
    label: "スポーツ用品・楽器",
    items: [
      { id: "bicycle", label: "自転車", keywords: ["じてんしゃ", "ママチャリ", "三輪車"] },
      {
        id: "ski-snowboard-surfboard",
        label: "スキー・スノボ・サーフボード",
      },
      { id: "golf-clubs", label: "ゴルフクラブ", keywords: ["ゴルフバッグ", "ゴルフ"] },
      { id: "piano", label: "ピアノ", keywords: ["電子ピアノ", "キーボード", "オルガン"] },
      { id: "guitar", label: "ギター" },
      { id: "fishing-gear", label: "釣具" },
      { id: "other-sports-music", label: "その他スポーツ用品・楽器" },
    ],
  },
  {
    id: "others",
    label: "その他",
    items: [
      { id: "safe", label: "金庫", keywords: ["きんこ"] },
      { id: "buddhist-altar", label: "仏壇・神棚", keywords: ["ぶつだん", "仏壇", "神棚"] },
      { id: "plants", label: "植物類", keywords: ["植木", "鉢", "プランター", "観葉植物"] },
      { id: "tatami", label: "畳", keywords: ["たたみ"] },
      { id: "tires", label: "タイヤ", keywords: ["ホイール"] },
      { id: "shed-garden-deck", label: "物置・ガーデンデッキ", keywords: ["物置", "倉庫", "ウッドデッキ"] },
      { id: "blocks-bricks", label: "ブロック・レンガ", keywords: ["コンクリート", "石"] },
      { id: "clothes", label: "衣類", keywords: ["服", "洋服", "ふく", "靴", "バッグ", "かばん"] },
      { id: "books", label: "本", keywords: ["ほん", "雑誌", "漫画", "マンガ", "書籍"] },
      { id: "kitchen-items", label: "キッチン用品", keywords: ["食器", "鍋", "なべ", "フライパン", "調理器具"] },
    ],
  },
];