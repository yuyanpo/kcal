/**
 * 营养素数值的三种特殊状态：
 * - 'not_measured'  : 未检测（原始数据为 — 或空白）
 * - 'not_detected'  : 未检出 / 痕量（原始数据为 tr 或 ...）
 * - 'estimated'     : 估计值（原始数据带 * 后缀）
 */
export type NutrientSpecial = 'not_measured' | 'not_detected' | 'estimated';

export interface NutrientValue {
  value: number;
  special?: NutrientSpecial; // 仅 'estimated' 时有数值，其余两种 value 无意义
}

/**
 * 营养素字段类型：
 * - number          : 普通数值
 * - 'not_measured'  : 未检测
 * - 'not_detected'  : 未检出（痕量）
 * - NutrientValue   : 估计值（number + special:'estimated'）
 *
 * 简化表示：用 number | NutrientSpecial 即可，估计值直接存为 number
 * 并用单独字段 estimatedFields 标记。
 */
export type NutrientField = number | NutrientSpecial;

export interface FoodItem {
  id: string;
  category: string;
  name: string;
  /** 食物名拼音（带空格，如 "ji dan huang"），用于拼音搜索 */
  pinyin: string;
  /** 食物名拼音（连写，如 "jidanhuang"），用于连写搜索 */
  pinyinCompact: string;
  energy: NutrientField;
  protein: NutrientField;
  phosphorus: NutrientField;
  pProteinRatio: NutrientField;
  fat: NutrientField;
  water: NutrientField;
  potassium: NutrientField;
  sodium: NutrientField;
  calcium: NutrientField;
  magnesium: NutrientField;
  iron: NutrientField;
  /** 哪些字段为估计值（带 * 的字段名列表） */
  estimated?: (keyof Omit<FoodItem, 'id' | 'category' | 'name' | 'estimated'>)[];
}

export const CATEGORIES = [
  '全部',
  '谷薯类',
  '蔬菜类',
  '水果类',
  '豆类',
  '肉蛋奶类',
  '坚果油脂类',
  '加工食品及饮料类',
] as const;

export type Category = (typeof CATEGORIES)[number];

/** 判断字段是否有有效数值 */
export function isNumber(v: NutrientField): v is number {
  return typeof v === 'number';
}

/** 格式化营养素字段为显示字符串 */
export function formatNutrient(v: NutrientField, decimals = 1): string {
  if (v === 'not_measured') return '未检测';
  if (v === 'not_detected') return '未检出';
  return Number(v).toFixed(decimals).replace(/\.0$/, '');
}
