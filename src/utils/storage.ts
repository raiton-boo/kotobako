/**
 * LocalStorage操作のユーティリティ関数
 *
 * LocalStorageへの安全なアクセスと、
 * JSONのparse/stringifyを自動で行う
 */

/**
 * LocalStorageから値を取得
 *
 * @template T - 取得する値の型
 * @param {string} key - LocalStorageのキー
 * @param {T} defaultValue - キーが存在しない場合のデフォルト値
 * @returns {T} 取得した値、またはデフォルト値
 *
 * @example
 * const favorites = getLocalStorage<string[]>('favorites', []);
 */
export function getLocalStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    if (item === null) {
      return defaultValue;
    }
    return JSON.parse(item) as T;
  } catch (error) {
    console.error(`Failed to get localStorage key "${key}":`, error);
    return defaultValue;
  }
}

/**
 * LocalStorageに値を保存
 *
 * @template T - 保存する値の型
 * @param {string} key - LocalStorageのキー
 * @param {T} value - 保存する値
 *
 * @example
 * setLocalStorage('favorites', ['serifu-001', 'serifu-002']);
 */
export function setLocalStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Failed to set localStorage key "${key}":`, error);
  }
}

/**
 * LocalStorageから値を削除
 *
 * @param {string} key - LocalStorageのキー
 *
 * @example
 * removeLocalStorage('favorites');
 */
export function removeLocalStorage(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Failed to remove localStorage key "${key}":`, error);
  }
}

/**
 * LocalStorageをクリア（全削除）
 *
 * @example
 * clearLocalStorage();
 */
export function clearLocalStorage(): void {
  try {
    localStorage.clear();
  } catch (error) {
    console.error('Failed to clear localStorage:', error);
  }
}

/**
 * LocalStorageにキーが存在するか確認
 *
 * @param {string} key - LocalStorageのキー
 * @returns {boolean} キーが存在する場合true
 *
 * @example
 * if (hasLocalStorage('favorites')) {
 *   console.log('お気に入りデータが存在します');
 * }
 */
export function hasLocalStorage(key: string): boolean {
  try {
    return localStorage.getItem(key) !== null;
  } catch (error) {
    console.error(`Failed to check localStorage key "${key}":`, error);
    return false;
  }
}
