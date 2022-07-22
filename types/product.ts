export type ProductBasicInfo = {
  title: string;
  classification: string;
  brand: string;
  productInfo: string;
  styleInfo: string;
};

export type ProductNoticeInfo = {
  condition: string;
  pollution: string;
  height: string;
  length: string;
  bodyForm: string;
  fit: string;
  purchaseTime?: string;
  purchasePlace?: string;
  reason: string;
};

export type ProductSizeInfo = {
  length: number;
  shoulderWidth?: number;
  chestSection?: number;
  sleeveLength?: number;
  waistSection?: number;
  thighSection?: number;
  rise?: number;
  bottomSection?: number;
};
