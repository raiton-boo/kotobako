/**
 * URL関連のユーティリティ関数
 *
 * URLの生成、パス判定などを行う
 */

/**
 * ベースURLを取得
 *
 * @returns {string} ベースURL
 *
 * @example
 * const base = getBaseUrl(); // "https://example.com/kotobako"
 */
export function getBaseUrl(): string {
  return `${window.location.origin}/kotobako`;
}

/**
 * 現在のパスを取得
 *
 * @returns {string} 現在のパス
 *
 * @example
 * const path = getCurrentPath(); // "/kotobako/category/batsu-game"
 */
export function getCurrentPath(): string {
  return window.location.pathname;
}

/**
 * 指定したパスが現在アクティブかどうか判定
 *
 * @param {string} path - 判定するパス
 * @param {string} currentPath - 現在のパス（省略時は自動取得）
 * @returns {boolean} アクティブな場合true
 *
 * @example
 * if (isActivePath('/kotobako')) {
 *   console.log('ホームページです');
 * }
 */
export function isActivePath(path: string, currentPath?: string): boolean {
  const current = currentPath || getCurrentPath();
  return current === path || current === `${path}/`;
}

/**
 * パスが特定の文字列を含むか判定
 *
 * @param {string} substring - 判定する文字列
 * @param {string} currentPath - 現在のパス（省略時は自動取得）
 * @returns {boolean} 含む場合true
 *
 * @example
 * if (pathIncludes('/favorites')) {
 *   console.log('お気に入りページです');
 * }
 */
export function pathIncludes(substring: string, currentPath?: string): boolean {
  const current = currentPath || getCurrentPath();
  return current.includes(substring);
}

/**
 * セリフの詳細ページURLを生成
 *
 * @param {string} serifuId - セリフID
 * @param {string} categoryId - カテゴリーID
 * @returns {string} 生成されたURL
 *
 * @example
 * const url = generateSerifuUrl('batsu-game-001', 'batsu-game');
 * // "https://example.com/kotobako/category/batsu-game#serifu-batsu-game-001"
 */
export function generateSerifuUrl(
  serifuId: string,
  categoryId: string
): string {
  return `${getBaseUrl()}/category/${categoryId}#serifu-${serifuId}`;
}

/**
 * カテゴリーページのURLを生成
 *
 * @param {string} categoryId - カテゴリーID
 * @returns {string} 生成されたURL
 *
 * @example
 * const url = generateCategoryUrl('batsu-game');
 * // "https://example.com/kotobako/category/batsu-game"
 */
export function generateCategoryUrl(categoryId: string): string {
  return `${getBaseUrl()}/category/${categoryId}`;
}

/**
 * ホームページのURLを生成
 *
 * @returns {string} 生成されたURL
 *
 * @example
 * const url = generateHomeUrl();
 * // "https://example.com/kotobako"
 */
export function generateHomeUrl(): string {
  return getBaseUrl();
}

/**
 * お気に入りページのURLを生成
 *
 * @returns {string} 生成されたURL
 *
 * @example
 * const url = generateFavoritesUrl();
 * // "https://example.com/kotobako/favorites"
 */
export function generateFavoritesUrl(): string {
  return `${getBaseUrl()}/favorites`;
}

/**
 * URLのハッシュ部分を取得
 *
 * @returns {string} ハッシュ部分（#を除く）
 *
 * @example
 * // URL: https://example.com/kotobako#serifu-001
 * const hash = getUrlHash(); // "serifu-001"
 */
export function getUrlHash(): string {
  return window.location.hash.slice(1);
}

/**
 * 指定したURLに遷移
 *
 * @param {string} url - 遷移先のURL
 *
 * @example
 * navigateTo('/kotobako/favorites');
 */
export function navigateTo(url: string): void {
  window.location.href = url;
}
