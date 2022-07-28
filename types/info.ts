export type BasicUserInfo = {
  gender: string;
  bodyShape: string;
  topSize: string[];
  bottomSize: string[];
};

export type UserInfo = {
  styles: number[];
  gender: string;
  height: string;
  bodyShape: string;
  topSize: string[];
  bottomSize: string[];
  topColors: string[];
  bottomColors: string[];
};

export type ColorUserInfo = {
  topColors: string[];
  bottomColors: string[];
};

export type ClothesCategory = {
  top: string[];
  bottom: string[];
};

export type FilterInfo = {
  styles: string[];
  colors: ClothesCategory;
  fit: ClothesCategory;
  length: ClothesCategory;
  size: ClothesCategory;
};

export type ColorData = { name: string; code: string };

type btnBox = {
  label: string;
  required?: boolean;
};

export type basicBtnBox = {
  datas: string[];
  type: keyof BasicUserInfo;
} & btnBox;

export type colorBtnBox = {
  type: keyof ColorUserInfo;
  isColor?: boolean;
} & btnBox;

export type filterBtnBox = {
  type: keyof FilterInfo;
  subType?: keyof ClothesCategory;
  datas: string[] | ColorData[];
  isColor?: boolean;
  noCheckColor?: boolean;
} & btnBox;
