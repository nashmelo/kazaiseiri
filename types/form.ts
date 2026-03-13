export type Step = 1 | 2 | 3 | 4 | 5;

export type Screen = "home" | "household" | "business" | "complete";

export type RequestFlow = "household" | "business" | "";

export type YesNo = "あり" | "なし" | "";

export type DisposalMethod = "自分で排出" | "排出を希望する" | "";

export type HouseholdService = "不用品回収" | "部屋を丸ごと片付け";

export type BusinessService = "事業ゴミスポット回収" | "事業ゴミ定期回収";

export type Service = HouseholdService | BusinessService | "";

export type BusinessFormType = "法人" | "個人事業主" | "";

export type FormData = {
  requestFlow: RequestFlow;

  // Step1
  postalCode: string;
  prefecture: string;
  city: string;
  address: string;

  buildingType: string;
  parking: YesNo;
  elevator: YesNo;
  disposalMethod: DisposalMethod;

  // Step2
  service: Service;
  items: string;
  notes: string;
  images: File[];

  // Step3
  pickupDate1: string;
  pickupDate2: string;
  pickupDate3: string;

  // household Step4
  name: string;
  furigana: string;
  phone: string;

  // business Step4
  businessFormType: BusinessFormType;
  businessName: string;

  contactLastName: string;
  contactFirstName: string;
  contactLastNameKana: string;
  contactFirstNameKana: string;
  contactPhone: string;
  contactEmail: string;

  receiptDifferent: boolean;
  receiptName: string;

  representativeLastName: string;
  representativeFirstName: string;
  representativeLastNameKana: string;
  representativeFirstNameKana: string;
  representativePhone: string;
  representativeEmail: string;
};

export const initialFormData: FormData = {
  requestFlow: "",

  // Step1
  postalCode: "",
  prefecture: "",
  city: "",
  address: "",

  buildingType: "",
  parking: "",
  elevator: "",
  disposalMethod: "",

  // Step2
  service: "",
  items: "",
  notes: "",
  images: [],

  // Step3
  pickupDate1: "",
  pickupDate2: "",
  pickupDate3: "",

  // household Step4
  name: "",
  furigana: "",
  phone: "",

  // business Step4
  businessFormType: "",
  businessName: "",

  contactLastName: "",
  contactFirstName: "",
  contactLastNameKana: "",
  contactFirstNameKana: "",
  contactPhone: "",
  contactEmail: "",

  receiptDifferent: false,
  receiptName: "",

  representativeLastName: "",
  representativeFirstName: "",
  representativeLastNameKana: "",
  representativeFirstNameKana: "",
  representativePhone: "",
  representativeEmail: "",
};