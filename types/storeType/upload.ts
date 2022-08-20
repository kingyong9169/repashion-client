import { State } from 'zustand';

import { ImgBasicProps } from '..';

export interface StyleUpload {
  tag: string;
  color: string[];
  material: string;
}

export interface BasicInfo {
  title: string;
  curCategoryIdx: number;
  category: [string, string, string];
  brand: string;
}

export interface SellerNote {
  condition: string;
  pollution: string;
  height: number;
  bodyShape: string;
  length: string;
  fit: string;
}

export interface Measure {
  [index: string]: number; // Todo: 없애기 TextInput에서 처리하도록
  length: number;
  shoulderWidth: number;
  chestSection: number;
  sleeveLength: number;
  waistSection: number;
  thighSection: number;
  rise: number;
  bottomSection: number;
}

export interface AdditionalInfo {
  [index: string]: string; // Todo: 없애기 TextInput에서 처리하도록
  purchaseTime: string;
  purchasePlace: string;
}

export interface UploadState extends State {
  imgList: { id: number; src: string }[];
  style: StyleUpload;
  price: number;
  isIncludeDelivery: boolean;
  basicInfo: BasicInfo;
  size: string;
  sellerNote: SellerNote;
  measure: Measure;
  additionalInfo: AdditionalInfo;
  opinion: string;
}

export type UpdateUpload = (
  value: string | number | boolean,
  type: keyof UploadState,
  subType?:
    | keyof StyleUpload
    | keyof BasicInfo
    | keyof SellerNote
    | keyof Measure,
  idx?: number,
) => void;

export interface UploadStoreState extends UploadState {
  imgUpload: (imgList: ({ id: number } & ImgBasicProps)[]) => void;
  removeImg: (removeId: number) => void;
  clearMeasure: () => void;
  clearUpload: () => void;
  updateUpload: UpdateUpload;
}
