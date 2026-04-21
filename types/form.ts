export type Step = 1 | 2 | 3 | 4 | 5;

export type Screen = "home" | "household" | "business" | "moving" | "complete";

export type RequestFlow = "household" | "business" | "moving" | "";

export type YesNo = "あり" | "なし" | "";

export type DisposalMethod = "自分で排出" | "排出を希望する" | "";

export type BuildingType =
  | "戸建て"
  | "マンション・アパート"
  | "オフィス・店舗"
  | "倉庫"
  | "その他"
  | "";

export type FloorType = "1階" | "2階" | "3階以上" | "";

export type HouseholdService = "不用品回収" | "部屋を丸ごと片付け";

export type BusinessService = "事業ゴミスポット回収" | "事業ゴミ定期回収";

export type MovingService = "引越し";

export type Service = HouseholdService | BusinessService | MovingService | "";

export type BusinessFormType = "法人" | "個人事業主" | "";

export type RoomSize =
  | "1K"
  | "1DK"
  | "1LDK"
  | "2LDK"
  | "3LDK"
  | "その他"
  | "";

export type TimeSlot =
  | "9〜12時"
  | "12〜15時"
  | "15〜18時"
  | "9〜18時"
  | "希望なし"
  | "";

export type FormData = {
  requestFlow: RequestFlow;

  // Step1 搬出元
  postalCode: string;
  prefecture: string;
  city: string;
  address: string;

  buildingType: BuildingType;
  floor: FloorType;
  parking: YesNo;
  elevator: YesNo;
  disposalMethod: DisposalMethod;

  // Step1 運び先
  movingPostalCode: string;
  movingPrefecture: string;
  movingCity: string;
  movingAddress: string;

  movingBuildingType: BuildingType;
  movingFloor: FloorType;
  movingParking: YesNo;
  movingElevator: YesNo;

  // Step2
  service: Service;
  roomSize: RoomSize;
  items: string;
  movingItems: string;
  disposalItems: string;
  notes: string;
  movingNotes: string;
  disposalNotes: string;
  images: File[];

  // Step3
  pickupDate1: string;
  pickupDate1Slot: TimeSlot;
  pickupDate2: string;
  pickupDate2Slot: TimeSlot;
  pickupDate3: string;
  pickupDate3Slot: TimeSlot;

  // household / moving Step4
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

  // Step1 搬出元
  postalCode: "",
  prefecture: "",
  city: "",
  address: "",

  buildingType: "",
  floor: "",
  parking: "",
  elevator: "",
  disposalMethod: "",

  // Step1 運び先
  movingPostalCode: "",
  movingPrefecture: "",
  movingCity: "",
  movingAddress: "",

  movingBuildingType: "",
  movingFloor: "",
  movingParking: "",
  movingElevator: "",

  // Step2
  service: "",
  roomSize: "",
  items: "",
  movingItems: "",
  disposalItems: "",
  notes: "",
  movingNotes: "",
  disposalNotes: "",
  images: [],

  // Step3
  pickupDate1: "",
  pickupDate1Slot: "",
  pickupDate2: "",
  pickupDate2Slot: "",
  pickupDate3: "",
  pickupDate3Slot: "",

  // household / moving Step4
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