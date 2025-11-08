/**
 * セリフカード関連の共通ロジック
 *
 * カードの初期化、イベントリスナーの設定などを行う
 */

import { setupLongPress, scrollToSavedSerifu } from '../utils/longPress';
import {
  setupFavoriteButtons,
  initFavoritesWatcher,
  updateAllFavoriteButtons,
} from '../utils/favorites';
import { setupSearch } from '../utils/search';
import { setupSort } from '../utils/sort';
import {
  showFavoriteAddedToast,
  showFavoriteRemovedToast,
} from '../utils/toast';
import { copySerifuUrl } from '../utils/clipboard';
import type { Serifu } from '../types';
import { getCategoryName } from '../utils/categories';
import { formatDateSlash } from '../utils/date';

/**
 * お気に入り件数更新イベントを発火
 */
function dispatchFavoritesUpdated(): void {
  window.dispatchEvent(new CustomEvent('favoritesUpdated'));
}

/**
 * セリフカードのHTMLを生成
 *
 * @param {Serifu & { category: string }} serifu - セリフデータ（カテゴリー付き）
 * @returns {string} カードのHTML文字列
 */
export function generateSerifuCardHTML(
  serifu: Serifu & { category: string }
): string {
  const categoryName = getCategoryName(serifu.category);
  const serifuNumber = serifu.id.split('-').pop();
  const displayId = `${categoryName} No.${serifuNumber}`;
  const formattedDate = formatDateSlash(serifu.createdAt);

  // テキストの長さに応じて高さを調整
  const textLength = serifu.text.length;
  let cardHeight = '280px';
  let fontSize = 'text-3xl md:text-4xl';

  if (textLength > 50) {
    cardHeight = '320px';
    fontSize = 'text-2xl md:text-3xl';
  }
  if (textLength > 80) {
    cardHeight = '360px';
    fontSize = 'text-xl md:text-2xl';
  }

  return `
    <div 
      id="serifu-${serifu.id}"
      class="serifu-card bg-white rounded-2xl shadow-md p-8 relative cursor-pointer select-none overflow-hidden flex flex-col"
      data-id="${serifu.id}"
      data-category="${serifu.category}"
      style="min-height: ${cardHeight};"
    >
      <div class="progress-overlay"></div>
      
      ${
        serifu.featured
          ? `
        <span class="absolute top-4 right-4 bg-yellow-400 text-yellow-900 text-xs px-3 py-1 rounded-full font-bold pointer-events-none" style="z-index: 2;">
          ⭐ おすすめ
        </span>
      `
          : ''
      }
      
      <!-- セリフテキスト（フレックスで中央配置） -->
      <div class="flex-1 flex items-center justify-center p-4" style="z-index: 2;">
        <p class="font-serifu ${fontSize} text-center leading-relaxed text-gray-800 select-text cursor-text pointer-events-auto">
          ${serifu.text}
        </p>
      </div>
      
      <!-- フッター（下部固定） -->
      <div class="flex justify-between items-center pt-4 mt-auto border-t border-gray-200 pointer-events-none" style="z-index: 2;">
        <div class="flex flex-col gap-1">
          <span class="text-sm font-bold text-gray-400">
            ${displayId}
          </span>
          <span class="text-xs text-gray-400">
            Created at ${formattedDate}
          </span>
        </div>
        
        <div class="flex gap-2 pointer-events-auto">
          <button
            class="favorite-btn action-button p-2 rounded-full transition-all duration-200"
            aria-label="お気に入りに追加"
            data-serifu-id="${serifu.id}"
          >
            ❤️
          </button>
          
          <button
            class="copy-btn action-button p-2 rounded-full transition-all duration-200"
            aria-label="リンクをコピー"
            data-serifu-id="${serifu.id}"
            data-category="${serifu.category}"
          >
            🔗
          </button>
        </div>
      </div>
    </div>
  `;
}

/**
 * セリフカードをDOMに描画
 *
 * @param {Array<Serifu & { category: string }>} serifuList - セリフデータの配列
 * @param {string} containerId - 描画先のコンテナID（デフォルト: 'serifu-list'）
 */
export function renderSerifuCards(
  serifuList: Array<Serifu & { category: string }>,
  containerId: string = 'serifu-list'
): void {
  const container = document.getElementById(containerId);
  if (!container) {
    console.warn(`Container not found: ${containerId}`);
    return;
  }

  container.innerHTML = '';

  serifuList.forEach((serifu, index) => {
    const wrapper = document.createElement('div');
    wrapper.setAttribute('data-text', serifu.text.toLowerCase());
    wrapper.setAttribute('data-date', serifu.createdAt);
    wrapper.setAttribute('data-featured', String(serifu.featured));

    // 初期状態を設定
    wrapper.style.opacity = '0';
    wrapper.style.transform = 'translateY(20px)';

    if ('addedAt' in serifu && serifu.addedAt) {
      wrapper.setAttribute('data-added', String(serifu.addedAt));
    }

    wrapper.innerHTML = generateSerifuCardHTML(serifu);
    container.appendChild(wrapper);

    // 順次表示アニメーション
    setTimeout(() => {
      wrapper.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      wrapper.style.opacity = '1';
      wrapper.style.transform = 'translateY(0)';
    }, index * 50);
  });
}

/**
 * コピーボタンのイベントリスナーを設定
 *
 * @param {string} selector - ボタンのセレクター（デフォルト: '.copy-btn'）
 */
export function setupCopyButtons(selector: string = '.copy-btn'): void {
  const buttons = document.querySelectorAll(selector);

  buttons.forEach((button) => {
    if (!(button instanceof HTMLElement)) return;

    button.addEventListener('click', async (e) => {
      e.stopPropagation();

      const serifuId = button.getAttribute('data-serifu-id');
      const category = button.getAttribute('data-category');

      if (!serifuId || !category) return;

      const success = await copySerifuUrl(serifuId, category);

      if (success) {
        button.classList.add('copied');
        button.textContent = '✅';
        setTimeout(() => {
          button.textContent = '🔗';
          button.classList.remove('copied');
        }, 2000);
      }
    });
  });
}

/**
 * セリフページの初期化（全機能を有効化）
 *
 * @param {object} options - オプション設定
 * @param {boolean} options.enableSearch - 検索機能を有効化（デフォルト: true）
 * @param {boolean} options.enableSort - ソート機能を有効化（デフォルト: true）
 * @param {boolean} options.enableLongPress - 長押し機能を有効化（デフォルト: true）
 * @param {boolean} options.disableLongPressOnCategory - カテゴリーページでの長押しを無効化（デフォルト: false）
 * @param {boolean} options.scrollToSerifu - 保存されたスクロール位置に移動（デフォルト: false）
 * @param {'newest' | 'oldest' | 'featured'} options.initialSort - 初期ソート（デフォルト: 'newest'）
 *
 * @example
 * initializeSerifuPage({ enableSearch: true, enableSort: true });
 */
export function initializeSerifuPage(
  options: {
    enableSearch?: boolean;
    enableSort?: boolean;
    enableLongPress?: boolean;
    disableLongPressOnCategory?: boolean;
    scrollToSerifu?: boolean;
    initialSort?: 'newest' | 'oldest' | 'featured';
  } = {}
): void {
  const {
    enableSearch = true,
    enableSort = true,
    enableLongPress = true,
    disableLongPressOnCategory = false,
    scrollToSerifu = false,
    initialSort = 'newest',
  } = options;

  // お気に入り機能の初期化（常に有効）
  initFavoritesWatcher();

  // お気に入りボタンのセットアップ
  setupFavoriteButtons('.favorite-btn', (serifuId, isAdded) => {
    if (isAdded) {
      showFavoriteAddedToast();
    } else {
      showFavoriteRemovedToast();
    }

    // お気に入り件数更新イベントを発火 ← ここを追加！
    dispatchFavoritesUpdated();
  });

  // コピーボタンのセットアップ
  setupCopyButtons('.copy-btn');

  // 長押し機能のセットアップ
  if (enableLongPress) {
    setupLongPress('[data-id]', disableLongPressOnCategory);
  }

  // 検索機能のセットアップ
  if (enableSearch) {
    setupSearch('search-input', 'serifu-list');
  }

  // ソート機能のセットアップ
  if (enableSort) {
    setupSort('sort-select', 'serifu-list', initialSort);
  }

  // スクロール位置の復元
  if (scrollToSerifu) {
    scrollToSavedSerifu();
  }

  // 初期状態でお気に入りボタンのUIを更新
  updateAllFavoriteButtons();
}

/**
 * ホームページ用の初期化（ランダムセリフ表示）
 * レスポンシブ対応：デスクトップ20件、モバイル15件
 *
 * @param {Array<Serifu & { category: string }>} allSerifu - 全セリフデータ
 */
export function initializeHomePage(
  allSerifu: Array<Serifu & { category: string }>
): void {
  // 画面幅で表示件数を変更（768px未満はモバイル）
  const isMobile = window.innerWidth < 768;
  const count = isMobile ? 15 : 20;

  // クライアントサイドでランダムに選択
  const shuffled = [...allSerifu].sort(() => Math.random() - 0.5);
  const randomSerifu = shuffled.slice(0, count);

  // カードを描画
  renderSerifuCards(randomSerifu);

  // 初期化（ホームは新しい順）
  initializeSerifuPage({
    enableSearch: true,
    enableSort: true,
    enableLongPress: true,
    disableLongPressOnCategory: false,
    scrollToSerifu: false,
    initialSort: 'newest',
  });

  // リサイズ時に再描画
  let resizeTimer: number;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      const newIsMobile = window.innerWidth < 768;
      const newCount = newIsMobile ? 15 : 20;

      // 件数が変わった場合のみ再描画
      if ((isMobile && !newIsMobile) || (!isMobile && newIsMobile)) {
        const newRandomSerifu = shuffled.slice(0, newCount);
        renderSerifuCards(newRandomSerifu);

        // 再初期化
        initializeSerifuPage({
          enableSearch: true,
          enableSort: true,
          enableLongPress: true,
          disableLongPressOnCategory: false,
          scrollToSerifu: false,
          initialSort: 'newest',
        });
      }
    }, 250);
  });
}

/**
 * カテゴリーページ用の初期化
 *
 * @param {Array<Serifu & { category: string }>} serifuList - カテゴリーのセリフデータ
 */
export function initializeCategoryPage(
  serifuList: Array<Serifu & { category: string }>
): void {
  // カードを描画
  renderSerifuCards(serifuList);

  // 初期化（カテゴリーページでは長押し無効化、スクロール位置の復元を有効化、古い順ソート）
  initializeSerifuPage({
    enableSearch: true,
    enableSort: true,
    enableLongPress: true,
    disableLongPressOnCategory: true, // カテゴリーページでは長押し無効
    scrollToSerifu: true,
    initialSort: 'oldest', // カテゴリーページは古い順
  });
}

/**
 * お気に入りページ用の初期化
 *
 * @param {Array<Serifu & { category: string, addedAt: number }>} favoriteSerifuList - お気に入りセリフデータ
 */
export function initializeFavoritesPage(
  favoriteSerifuList: Array<Serifu & { category: string; addedAt: number }>
): void {
  const serifuList = document.getElementById('serifu-list');
  const emptyState = document.getElementById('empty-state');
  const favoriteCount = document.getElementById('favorite-count');
  const clearAllBtn = document.getElementById('clear-all-btn');

  if (favoriteSerifuList.length === 0) {
    // 空の状態を表示
    if (emptyState) emptyState.classList.remove('hidden');
    if (serifuList) serifuList.classList.add('hidden');
    if (favoriteCount) favoriteCount.textContent = '全 0 件';
    if (clearAllBtn) clearAllBtn.classList.add('hidden');
  } else {
    // カードを描画
    renderSerifuCards(favoriteSerifuList);

    // 表示状態を更新
    if (emptyState) emptyState.classList.add('hidden');
    if (serifuList) serifuList.classList.remove('hidden');

    // 件数を表示
    if (favoriteCount) {
      favoriteCount.textContent = `全 ${favoriteSerifuList.length} 件`;
    }

    // 削除ボタンを表示
    if (clearAllBtn) {
      clearAllBtn.classList.remove('hidden');
    }

    // 初期化（お気に入りページでは長押しを有効化、追加日新しい順）
    initializeSerifuPage({
      enableSearch: true,
      enableSort: true,
      enableLongPress: true,
      disableLongPressOnCategory: false,
      scrollToSerifu: false,
      initialSort: 'newest', // お気に入りは新しい順
    });
  }
}
