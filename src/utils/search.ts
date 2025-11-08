/**
 * 検索機能のユーティリティ関数
 *
 * セリフカードを検索キーワードでフィルタリングする
 */

import { getElementById, querySelectorAll } from './dom';

/**
 * 検索クエリに基づいて要素をフィルタリング
 *
 * @param {string} query - 検索キーワード
 * @param {HTMLElement[]} items - フィルタリング対象の要素配列
 *
 * @example
 * const cards = Array.from(document.querySelectorAll('[data-text]'));
 * filterBySearch('こんにちは', cards);
 */
export function filterBySearch(query: string, items: HTMLElement[]): void {
  const normalizedQuery = query.toLowerCase().trim();

  items.forEach((item) => {
    const text = item.getAttribute('data-text') || '';
    const matches = text.includes(normalizedQuery);

    if (matches || normalizedQuery === '') {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

/**
 * 検索機能をセットアップ
 * 入力欄のIDとリストのIDを指定して、自動的に検索機能を有効化
 *
 * @param {string} inputId - 検索入力欄の要素ID
 * @param {string} listId - 検索対象のリストの要素ID
 *
 * @example
 * setupSearch('search-input', 'serifu-list');
 */
export function setupSearch(inputId: string, listId: string): void {
  const searchInput = getElementById(inputId) as HTMLInputElement;
  const serifuList = getElementById(listId);

  if (!searchInput || !serifuList) {
    console.warn(
      `Search setup failed: input or list not found (${inputId}, ${listId})`
    );
    return;
  }

  searchInput.addEventListener('input', (e) => {
    const query = (e.target as HTMLInputElement).value;
    const items = Array.from(
      serifuList.querySelectorAll('[data-text]')
    ) as HTMLElement[];
    filterBySearch(query, items);

    // 検索結果の件数を更新（存在する場合）
    updateSearchResultCount(items);
  });
}

/**
 * 検索結果の件数を更新
 *
 * @param {HTMLElement[]} items - フィルタリング対象の要素配列
 */
function updateSearchResultCount(items: HTMLElement[]): void {
  const countElement = getElementById('search-result-count');
  if (!countElement) return;

  const visibleCount = items.filter(
    (item) => item.style.display !== 'none'
  ).length;
  countElement.textContent = `${visibleCount} 件`;
}

/**
 * 検索クエリをハイライト表示
 *
 * @param {string} text - ハイライト対象のテキスト
 * @param {string} query - 検索キーワード
 * @returns {string} ハイライトされたHTML文字列
 *
 * @example
 * const highlighted = highlightSearchQuery('こんにちは世界', 'にち');
 * // "こん<mark>にち</mark>は世界"
 */
export function highlightSearchQuery(text: string, query: string): string {
  if (!query.trim()) return text;

  const normalizedQuery = query.toLowerCase();
  const regex = new RegExp(`(${normalizedQuery})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
}

/**
 * 検索入力欄をクリア
 *
 * @param {string} inputId - 検索入力欄の要素ID
 *
 * @example
 * clearSearch('search-input');
 */
export function clearSearch(inputId: string): void {
  const searchInput = getElementById(inputId) as HTMLInputElement;
  if (searchInput) {
    searchInput.value = '';
    searchInput.dispatchEvent(new Event('input'));
  }
}

/**
 * 検索がアクティブかどうか確認
 *
 * @param {string} inputId - 検索入力欄の要素ID
 * @returns {boolean} 検索キーワードが入力されている場合true
 *
 * @example
 * if (isSearchActive('search-input')) {
 *   console.log('検索中です');
 * }
 */
export function isSearchActive(inputId: string): boolean {
  const searchInput = getElementById(inputId) as HTMLInputElement;
  return searchInput ? searchInput.value.trim().length > 0 : false;
}
