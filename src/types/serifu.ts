/**
 * セリフデータの型定義
 */

/**
 * セリフのデータ型
 */
export interface Serifu {
  id: string;
  text: string;
  createdAt: string;
  featured: boolean;
}

/**
 * カテゴリーのデータ型
 */
export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  serifu: Serifu[];
}

/**
 * categories.json全体のデータ型
 */
export interface CategoriesData {
  categories: Category[];
}

/**
 * お気に入りデータの型
 * キーがセリフID、値が追加日時のタイムスタンプ
 */
export interface FavoritesData {
  [serifuId: string]: number;
}

/**
 * ソートの種類
 */
export type SortType =
  | 'newest'
  | 'oldest'
  | 'featured'
  | 'added-newest'
  | 'added-oldest';

/**
 * LocalStorageのキー定義
 */
export const STORAGE_KEYS = {
  FAVORITES_DATA: 'favoritesData',
  FAVORITES: 'favorites',
  FAVORITE_NOTICE_SEEN: 'favorite-notice-seen',
  SCROLL_TO_SERIFU: 'scroll-to-serifu', // 追加
} as const;