/**
 * カテゴリー関連のユーティリティ関数
 *
 * カテゴリーIDから名前やアイコンを取得する
 */

/**
 * カテゴリーIDと表示名のマッピング
 */
export const CATEGORY_NAMES: Record<string, string> = {
  'batsu-game': '罰ゲーム',
  kokuhaku: '告白',
  haishin: '配信',
  chuunibyou: '厨二病',
} as const;

/**
 * カテゴリーIDとアイコンのマッピング
 */
export const CATEGORY_ICONS: Record<string, string> = {
  'batsu-game': '🎯',
  kokuhaku: '💕',
  haishin: '🎮',
  chuunibyou: '⚔️',
} as const;

/**
 * カテゴリーIDから表示名を取得
 *
 * @param {string} categoryId - カテゴリーID
 * @returns {string} カテゴリーの表示名、存在しない場合はIDをそのまま返す
 *
 * @example
 * const name = getCategoryName('batsu-game'); // "罰ゲーム"
 */
export function getCategoryName(categoryId: string): string {
  return CATEGORY_NAMES[categoryId] || categoryId;
}

/**
 * カテゴリーIDからアイコンを取得
 *
 * @param {string} categoryId - カテゴリーID
 * @returns {string} カテゴリーのアイコン（絵文字）、存在しない場合は空文字
 *
 * @example
 * const icon = getCategoryIcon('batsu-game'); // "🎯"
 */
export function getCategoryIcon(categoryId: string): string {
  return CATEGORY_ICONS[categoryId] || '';
}

/**
 * カテゴリーIDから表示用のIDを生成
 *
 * @param {string} categoryId - カテゴリーID
 * @param {string} serifuNumber - セリフ番号
 * @returns {string} 表示用のID
 *
 * @example
 * const displayId = getDisplayId('batsu-game', '001'); // "罰ゲーム No.001"
 */
export function getDisplayId(categoryId: string, serifuNumber: string): string {
  const categoryName = getCategoryName(categoryId);
  return `${categoryName} No.${serifuNumber}`;
}

/**
 * セリフIDから表示用のIDを生成
 *
 * @param {string} serifuId - セリフID（例: "batsu-game-001"）
 * @returns {string} 表示用のID
 *
 * @example
 * const displayId = getDisplayIdFromSerifuId('batsu-game-001'); // "罰ゲーム No.001"
 */
export function getDisplayIdFromSerifuId(serifuId: string): string {
  const parts = serifuId.split('-');
  const serifuNumber = parts[parts.length - 1];
  const categoryId = parts.slice(0, -1).join('-');
  return getDisplayId(categoryId, serifuNumber);
}

/**
 * 全カテゴリーIDの配列を取得
 *
 * @returns {string[]} カテゴリーIDの配列
 *
 * @example
 * const ids = getAllCategoryIds(); // ["batsu-game", "kokuhaku", "haishin", "chuunibyou"]
 */
export function getAllCategoryIds(): string[] {
  return Object.keys(CATEGORY_NAMES);
}

/**
 * カテゴリーが存在するか確認
 *
 * @param {string} categoryId - カテゴリーID
 * @returns {boolean} 存在する場合true
 *
 * @example
 * if (categoryExists('batsu-game')) {
 *   console.log('カテゴリーが存在します');
 * }
 */
export function categoryExists(categoryId: string): boolean {
  return categoryId in CATEGORY_NAMES;
}
