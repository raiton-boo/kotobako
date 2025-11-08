/**
 * ソート機能のユーティリティ
 * 
 * セリフの並び順を変更する機能を提供
 */

import type { SortType } from '../types';

/**
 * ソート機能をセットアップ
 * 
 * @param {string} selectId - selectボックスのID
 * @param {string} containerId - ソート対象のコンテナID
 * @param {SortType} initialSort - 初期ソート（デフォルト: 'newest'）
 * 
 * @example
 * setupSort('sort-select', 'serifu-list', 'newest');
 */
export function setupSort(
  selectId: string,
  containerId: string,
  initialSort: SortType = 'newest'
): void {
  const select = document.getElementById(selectId) as HTMLSelectElement;
  const container = document.getElementById(containerId);

  if (!select || !container) return;

  // 初期ソートを実行
  select.value = initialSort;
  const items = Array.from(container.children) as HTMLElement[];
  sortItems(items, initialSort, container);

  // セレクトボックスの変更を監視
  select.addEventListener('change', () => {
    const sortType = select.value as SortType;
    const currentItems = Array.from(container.children) as HTMLElement[];
    sortItems(currentItems, sortType, container);
  });
}

/**
 * アイテムをソート
 * 
 * @param {HTMLElement[]} items - ソート対象のアイテム
 * @param {SortType} sortType - ソートタイプ
 * @param {HTMLElement} container - コンテナ要素
 */
function sortItems(
  items: HTMLElement[],
  sortType: SortType,
  container: HTMLElement
): void {
  const sortedItems = [...items].sort((a, b) => {
    switch (sortType) {
      case 'newest':
        // 作成日が新しい順
        return compareDate(b, a);

      case 'oldest':
        // 作成日が古い順
        return compareDate(a, b);

      case 'featured': {
        // おすすめ順（おすすめを先に表示、その後作成日が古い順）
        const aFeatured = a.getAttribute('data-featured') === 'true';
        const bFeatured = b.getAttribute('data-featured') === 'true';
        
        // おすすめを優先
        if (aFeatured && !bFeatured) return -1;
        if (!aFeatured && bFeatured) return 1;
        
        // おすすめ同士、または非おすすめ同士は作成日が古い順
        return compareDate(a, b);
      }

      case 'added-newest':
        // お気に入り追加日が新しい順
        return compareAddedDate(b, a);

      case 'added-oldest':
        // お気に入り追加日が古い順
        return compareAddedDate(a, b);

      default:
        return 0;
    }
  });

  // コンテナをクリア
  container.innerHTML = '';

  // ソート済みアイテムをアニメーション付きで追加
  sortedItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    container.appendChild(item);

    // 順次フェードイン
    setTimeout(() => {
      item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      item.style.opacity = '1';
      item.style.transform = 'translateY(0)';
    }, index * 30);
  });
}

/**
 * 日付を比較
 * 
 * @param {HTMLElement} a - 要素A
 * @param {HTMLElement} b - 要素B
 * @returns {number} 比較結果
 */
function compareDate(a: HTMLElement, b: HTMLElement): number {
  const dateA = a.getAttribute('data-date') || '';
  const dateB = b.getAttribute('data-date') || '';
  return dateA.localeCompare(dateB);
}

/**
 * お気に入り追加日を比較
 * 
 * @param {HTMLElement} a - 要素A
 * @param {HTMLElement} b - 要素B
 * @returns {number} 比較結果
 */
function compareAddedDate(a: HTMLElement, b: HTMLElement): number {
  const addedA = parseInt(a.getAttribute('data-added') || '0', 10);
  const addedB = parseInt(b.getAttribute('data-added') || '0', 10);
  return addedA - addedB;
}