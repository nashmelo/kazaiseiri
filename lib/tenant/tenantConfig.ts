// lib/tenant/tenantConfig.ts

export type TenantKey = "default" | "ezurin" | "client-a";

export type TopConfig = {
  headline: string;
  subHeadline: string;
  heroImageSrc?: string;
  noticeText?: string;

  garbageButtonLabel: string;
  businessButtonLabel: string;
  movingButtonLabel: string;

  showFaqButton: boolean;
  showReasonButton: boolean;
  showServiceAreaButton: boolean;
};

export type TenantConfig = {
  key: TenantKey;
  brandName: string;

  showMoving: boolean;
  showPurchase: boolean;
  showTreeCutting: boolean;

  top: TopConfig;
};

export const tenantConfigMap: Record<TenantKey, TenantConfig> = {
  default: {
    key: "default",
    brandName: "すっきりん",
    showMoving: false,
    showPurchase: false,
    showTreeCutting: false,
    top: {
      headline: "LINEで簡単　無料でお見積もり",
      subHeadline: "不用品回収のご相談はこちら",
      heroImageSrc: "/sukkirinlogo.svg",
      noticeText: "許可業者限定だから安心",
      garbageButtonLabel: "家庭ごみ回収",
      businessButtonLabel: "事業ごみ回収",
      movingButtonLabel: "引越しのご相談はこちら",
      showFaqButton: true,
      showReasonButton: true,
      showServiceAreaButton: true,
    },
  },

  ezurin: {
    key: "ezurin",
    brandName: "すっきりん",
    showMoving: true,
    showPurchase: false,
    showTreeCutting: false,
    top: {
      headline: "LINEで簡単　無料でお見積もり",
      subHeadline: "片付け・不用品回収・引越し相談はこちら",
      heroImageSrc: "/sukkirinlogo.svg",
      noticeText: "許可業者限定だから安心",
      garbageButtonLabel: "家庭ごみ回収",
      businessButtonLabel: "事業ごみ回収",
      movingButtonLabel: "引越しのご相談はこちら",
      showFaqButton: true,
      showReasonButton: true,
      showServiceAreaButton: true,
    },
  },

  "client-a": {
    key: "client-a",
    brandName: "すっきりん",
    showMoving: false,
    showPurchase: false,
    showTreeCutting: false,
    top: {
      headline: "LINEで簡単　無料でお見積もり",
      subHeadline: "不用品回収のご相談はこちら",
      heroImageSrc: "/sukkirinlogo.svg",
      noticeText: "安心してご相談ください",
      garbageButtonLabel: "家庭ごみ回収",
      businessButtonLabel: "事業ごみ回収",
      movingButtonLabel: "引越しのご相談はこちら",
      showFaqButton: true,
      showReasonButton: true,
      showServiceAreaButton: true,
    },
  },
};

export function getTenantConfig(tenant?: string): TenantConfig {
  if (!tenant) return tenantConfigMap.default;

  if (tenant in tenantConfigMap) {
    return tenantConfigMap[tenant as TenantKey];
  }

  return tenantConfigMap.default;
}