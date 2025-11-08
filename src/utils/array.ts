/**
 * 配列操作のユーティリティ関数
 *
 * 配列のシャッフル、ランダム取得などを行う
 */

/**
 * 配列をシャッフル（Fisher-Yatesアルゴリズム）
 * 元の配列は変更されず、新しい配列を返す
 *
 * @template T - 配列の要素の型
 * @param {T[]} array - シャッフルする配列
 * @returns {T[]} シャッフルされた新しい配列
 *
 * @example
 * const numbers = [1, 2, 3, 4, 5];
 * const shuffled = shuffle(numbers); // [3, 1, 5, 2, 4]
 */
export function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * 配列からランダムに指定個数の要素を取得
 *
 * @template T - 配列の要素の型
 * @param {T[]} array - 取得元の配列
 * @param {number} count - 取得する個数
 * @returns {T[]} ランダムに選ばれた要素の配列
 *
 * @example
 * const items = [1, 2, 3, 4, 5];
 * const random = getRandomItems(items, 3); // [2, 5, 1]
 */
export function getRandomItems<T>(array: T[], count: number): T[] {
  const shuffled = shuffle(array);
  return shuffled.slice(0, Math.min(count, array.length));
}

/**
 * 配列からランダムに1つの要素を取得
 *
 * @template T - 配列の要素の型
 * @param {T[]} array - 取得元の配列
 * @returns {T | undefined} ランダムに選ばれた要素、配列が空の場合undefined
 *
 * @example
 * const items = ['a', 'b', 'c'];
 * const random = getRandomItem(items); // 'b'
 */
export function getRandomItem<T>(array: T[]): T | undefined {
  if (array.length === 0) return undefined;
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * 配列から重複を除去
 *
 * @template T - 配列の要素の型
 * @param {T[]} array - 重複を除去する配列
 * @returns {T[]} 重複が除去された新しい配列
 *
 * @example
 * const numbers = [1, 2, 2, 3, 3, 3, 4];
 * const unique = uniqueArray(numbers); // [1, 2, 3, 4]
 */
export function uniqueArray<T>(array: T[]): T[] {
  return [...new Set(array)];
}

/**
 * 配列を指定サイズのチャンクに分割
 *
 * @template T - 配列の要素の型
 * @param {T[]} array - 分割する配列
 * @param {number} size - チャンクのサイズ
 * @returns {T[][]} チャンクに分割された配列
 *
 * @example
 * const numbers = [1, 2, 3, 4, 5, 6, 7];
 * const chunks = chunkArray(numbers, 3); // [[1, 2, 3], [4, 5, 6], [7]]
 */
export function chunkArray<T>(array: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

/**
 * 配列の要素数をカウント
 *
 * @template T - 配列の要素の型
 * @param {T[]} array - カウントする配列
 * @param {(item: T) => boolean} predicate - カウント条件
 * @returns {number} 条件に一致する要素の個数
 *
 * @example
 * const numbers = [1, 2, 3, 4, 5];
 * const count = countBy(numbers, n => n > 3); // 2
 */
export function countBy<T>(
  array: T[],
  predicate: (item: T) => boolean
): number {
  return array.filter(predicate).length;
}
