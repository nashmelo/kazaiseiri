export type Step = 1 | 2 | 3 | 4 | 5;

export type Screen = "home" | "form" | "complete";

export type FormData = {
  postalCode: string;
  prefecture: string;
  city: string;
  address: string;

  buildingType: string;
  parking: "あり" | "なし" | "";
  elevator: "あり" | "なし" | "";
  disposalMethod: "自分で排出" | "排出を希望する" | "";

  service: "不用品の回収" | "部屋を丸ごと片付け" | "";
  items: string;
  notes: string;
  images: File[];

  pickupDate1: string;
  pickupDate2: string;
  pickupDate3: string;

  name: string;
  furigana: string;
  phone: string;
};

export const initialFormData: FormData = {
  postalCode: "",
  prefecture: "",
  city: "",
  address: "",

  buildingType: "",
  parking: "",
  elevator: "",
  disposalMethod: "",

  service: "",
  items: "",
  notes: "",
  images: [],

  pickupDate1: "",
  pickupDate2: "",
  pickupDate3: "",

  name: "",
  furigana: "",
  phone: "",
};