/**
 * 型定義のエントリーポイント
 */

export type {
  Serifu,
  Category,
  CategoriesData,
  FavoritesData,
  SortType,
} from './serifu';

export { STORAGE_KEYS } from './serifu';

/**
 * トースト通知の設定
 */
export interface ToastConfig {
  icon: string;
  message: string;
  color?: string;
  duration?: number;
}

/**
 * パンくずリストのアイテム
 */
export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: string;
}
