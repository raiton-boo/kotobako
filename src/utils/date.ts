/**
 * 日付フォーマットのユーティリティ関数
 *
 * 日付文字列を整形して表示する
 */

/**
 * ISO形式の日付をスラッシュ区切りに変換
 *
 * @param {string} dateString - ISO形式の日付文字列（YYYY-MM-DD）
 * @returns {string} スラッシュ区切りの日付（YYYY/MM/DD）
 *
 * @example
 * const formatted = formatDateSlash('2024-01-15'); // "2024/01/15"
 */
export function formatDateSlash(dateString: string): string {
  return dateString.replace(/-/g, '/');
}

/**
 * ISO形式の日付をドット区切りに変換
 *
 * @param {string} dateString - ISO形式の日付文字列（YYYY-MM-DD）
 * @returns {string} ドット区切りの日付（YYYY.MM.DD）
 *
 * @example
 * const formatted = formatDateDot('2024-01-15'); // "2024.01.15"
 */
export function formatDateDot(dateString: string): string {
  return dateString.replace(/-/g, '.');
}

/**
 * ISO形式の日付を日本語形式に変換
 *
 * @param {string} dateString - ISO形式の日付文字列（YYYY-MM-DD）
 * @returns {string} 日本語形式の日付（YYYY年MM月DD日）
 *
 * @example
 * const formatted = formatDateJapanese('2024-01-15'); // "2024年01月15日"
 */
export function formatDateJapanese(dateString: string): string {
  const [year, month, day] = dateString.split('-');
  return `${year}年${month}月${day}日`;
}

/**
 * タイムスタンプを日付文字列に変換
 *
 * @param {number} timestamp - Unixタイムスタンプ（ミリ秒）
 * @param {string} separator - 区切り文字（デフォルト: '/'）
 * @returns {string} フォーマットされた日付
 *
 * @example
 * const formatted = formatTimestamp(1699999999999); // "2023/11/15"
 */
export function formatTimestamp(
  timestamp: number,
  separator: string = '/'
): string {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}${separator}${month}${separator}${day}`;
}

/**
 * タイムスタンプを日時文字列に変換
 *
 * @param {number} timestamp - Unixタイムスタンプ（ミリ秒）
 * @returns {string} フォーマットされた日時
 *
 * @example
 * const formatted = formatTimestampWithTime(1699999999999); // "2023/11/15 12:34"
 */
export function formatTimestampWithTime(timestamp: number): string {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}/${month}/${day} ${hours}:${minutes}`;
}

/**
 * 相対時間を取得（〇〇前）
 *
 * @param {number} timestamp - Unixタイムスタンプ（ミリ秒）
 * @returns {string} 相対時間の文字列
 *
 * @example
 * const relative = getRelativeTime(Date.now() - 3600000); // "1時間前"
 */
export function getRelativeTime(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) return `${years}年前`;
  if (months > 0) return `${months}ヶ月前`;
  if (days > 0) return `${days}日前`;
  if (hours > 0) return `${hours}時間前`;
  if (minutes > 0) return `${minutes}分前`;
  return '今';
}

/**
 * 現在の日時をISO形式で取得
 *
 * @returns {string} ISO形式の日付（YYYY-MM-DD）
 *
 * @example
 * const today = getCurrentDateISO(); // "2024-01-15"
 */
export function getCurrentDateISO(): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
