/**
 * お気に入り機能のユーティリティ
 *
 * お気に入りの追加・削除、状態管理を行う
 */

import { getLocalStorage, setLocalStorage } from './storage';
import { STORAGE_KEYS, type FavoritesData } from '../types';

/**
 * お気に入りデータを取得
 *
 * @returns {FavoritesData} お気に入りデータ
 */
export function getFavoritesData(): FavoritesData {
  return getLocalStorage<FavoritesData>(STORAGE_KEYS.FAVORITES_DATA, {});
}

/**
 * お気に入りデータを保存
 *
 * @param {FavoritesData} data - お気に入りデータ
 */
export function saveFavoritesData(data: FavoritesData): void {
  setLocalStorage(STORAGE_KEYS.FAVORITES_DATA, data);

  // カスタムイベントを発火（他のコンポーネントに通知）
  window.dispatchEvent(new CustomEvent('favoritesUpdated', { detail: data }));
}

/**
 * お気に入りに追加
 *
 * @param {string} serifuId - セリフID
 * @returns {boolean} 追加に成功したか
 */
export function addFavorite(serifuId: string): boolean {
  const data = getFavoritesData();

  if (data[serifuId]) {
    return false; // 既に追加済み
  }

  data[serifuId] = Date.now();
  saveFavoritesData(data);

  return true;
}

/**
 * 現在のページがお気に入りページかチェック
 *
 * @returns {boolean} お気に入りページかどうか
 */
function isFavoritesPage(): boolean {
  return window.location.pathname.includes('/favorites');
}

/**
 * お気に入りから削除
 *
 * @param {string} serifuId - セリフID
 * @param {boolean} withAnimation - アニメーションを有効化（デフォルト: 自動判定）
 * @returns {boolean} 削除に成功したか
 */
export function removeFavorite(
  serifuId: string,
  withAnimation?: boolean
): boolean {
  const data = getFavoritesData();

  if (!data[serifuId]) {
    return false; // 存在しない
  }

  // アニメーションのデフォルト値を設定
  // お気に入りページの場合のみアニメーション有効
  const shouldAnimate =
    withAnimation !== undefined ? withAnimation : isFavoritesPage();

  // アニメーション付きで削除（お気に入りページのみ）
  if (shouldAnimate) {
    const card = document.querySelector(
      `[data-id="${serifuId}"]`
    )?.parentElement;

    if (card instanceof HTMLElement) {
      const container = document.getElementById('serifu-list');

      // カードの現在位置を取得
      const cardRect = card.getBoundingClientRect();

      // 削除前に全カードの位置を記録
      const allCards = container?.querySelectorAll('[data-text]');
      const cardPositions = new Map<Element, DOMRect>();

      allCards?.forEach((c) => {
        cardPositions.set(c, c.getBoundingClientRect());
      });

      // フェードアウトアニメーション（より滑らかに）
      card.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
      card.style.transform = 'scale(0.8) translateY(-20px)';
      card.style.opacity = '0';
      card.style.pointerEvents = 'none';

      // アニメーション完了後に削除
      setTimeout(() => {
        delete data[serifuId];
        saveFavoritesData(data);

        // カードを削除
        card.remove();

        // 残りのカードをスムーズに移動
        if (container) {
          const remainingCards = container.querySelectorAll('[data-text]');

          remainingCards.forEach((c) => {
            if (c instanceof HTMLElement) {
              const oldPos = cardPositions.get(c);
              const newPos = c.getBoundingClientRect();

              if (oldPos) {
                // 移動距離を計算
                const deltaY = oldPos.top - newPos.top;

                if (deltaY !== 0) {
                  // 元の位置から開始
                  c.style.transition = 'none';
                  c.style.transform = `translateY(${deltaY}px)`;

                  // 次のフレームで新しい位置へアニメーション
                  requestAnimationFrame(() => {
                    c.style.transition =
                      'transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)';
                    c.style.transform = 'translateY(0)';
                  });
                }
              }
            }
          });
        }

        // お気に入り件数を更新
        updateFavoriteCount();
      }, 400);
    } else {
      // カードが見つからない場合は即座に削除
      delete data[serifuId];
      saveFavoritesData(data);
    }
  } else {
    // アニメーションなしで即座に削除（通常のページ）
    delete data[serifuId];
    saveFavoritesData(data);
  }

  return true;
}

/**
 * お気に入りに登録されているか確認
 *
 * @param {string} serifuId - セリフID
 * @returns {boolean} 登録されているか
 */
export function isFavorite(serifuId: string): boolean {
  const data = getFavoritesData();
  return !!data[serifuId];
}

/**
 * 全てのお気に入りをクリア
 */
export function clearAllFavorites(): void {
  saveFavoritesData({});
}

/**
 * お気に入りボタンのイベントリスナーを設定
 *
 * @param {string} selector - ボタンのセレクター
 * @param {Function} onToggle - トグル時のコールバック
 */
export function setupFavoriteButtons(
  selector: string,
  onToggle?: (serifuId: string, isAdded: boolean) => void
): void {
  const buttons = document.querySelectorAll(selector);

  buttons.forEach((button) => {
    if (!(button instanceof HTMLElement)) return;

    button.addEventListener('click', (e) => {
      e.stopPropagation();

      const serifuId = button.getAttribute('data-serifu-id');
      if (!serifuId) return;

      const isCurrentlyFavorite = isFavorite(serifuId);

      if (isCurrentlyFavorite) {
        // お気に入りから削除
        // お気に入りページの場合のみアニメーション付きで削除
        removeFavorite(serifuId);
        button.textContent = '🤍';

        // ボタンにアニメーションクラスを追加
        button.classList.add('removed');
        setTimeout(() => {
          button.classList.remove('removed');
        }, 500);

        if (onToggle) {
          onToggle(serifuId, false);
        }
      } else {
        // お気に入りに追加
        addFavorite(serifuId);
        button.textContent = '❤️';

        // ボタンにアニメーションクラスを追加
        button.classList.add('added');
        button.style.transform = 'scale(1.3)';
        setTimeout(() => {
          button.style.transform = '';
          button.classList.remove('added');
        }, 500);

        if (onToggle) {
          onToggle(serifuId, true);
        }
      }
    });
  });
}

/**
 * 全てのお気に入りボタンのUIを更新
 */
export function updateAllFavoriteButtons(): void {
  const buttons = document.querySelectorAll('.favorite-btn');

  buttons.forEach((button) => {
    if (!(button instanceof HTMLElement)) return;

    const serifuId = button.getAttribute('data-serifu-id');
    if (!serifuId) return;

    if (isFavorite(serifuId)) {
      button.textContent = '❤️';
    } else {
      button.textContent = '🤍';
    }
  });
}

/**
 * お気に入りバッジを更新
 */
export function updateFavoriteBadge(): void {
  const badge = document.querySelector('.favorite-badge');
  if (!badge) return;

  const data = getFavoritesData();
  const count = Object.keys(data).length;

  if (count > 0) {
    badge.textContent = String(count);
    if (badge instanceof HTMLElement) {
      badge.style.display = 'flex';
    }
  } else {
    if (badge instanceof HTMLElement) {
      badge.style.display = 'none';
    }
  }
}

/**
 * お気に入り件数表示を更新（お気に入りページ用）
 */
function updateFavoriteCount(): void {
  const favoriteCount = document.getElementById('favorite-count');
  const clearAllBtn = document.getElementById('clear-all-btn');
  const emptyState = document.getElementById('empty-state');
  const serifuList = document.getElementById('serifu-list');

  if (!favoriteCount) return;

  const data = getFavoritesData();
  const count = Object.keys(data).length;

  favoriteCount.textContent = `全 ${count} 件`;

  // 0件の場合は空状態を表示
  if (count === 0) {
    if (emptyState) {
      emptyState.style.transition = 'opacity 0.3s ease';
      emptyState.classList.remove('hidden');
      requestAnimationFrame(() => {
        emptyState.style.opacity = '1';
      });
    }
    if (serifuList) serifuList.classList.add('hidden');
    if (clearAllBtn) clearAllBtn.classList.add('hidden');
  } else {
    if (clearAllBtn) clearAllBtn.classList.remove('hidden');
  }
}

/**
 * お気に入り監視を初期化
 *
 * ページ読み込み時やお気に入り更新時にバッジとボタンを自動更新
 */
export function initFavoritesWatcher(): void {
  // 初期化時に更新
  updateFavoriteBadge();
  updateAllFavoriteButtons();

  // お気に入り更新イベントを監視
  window.addEventListener('favoritesUpdated', () => {
    updateFavoriteBadge();
    updateAllFavoriteButtons();

    // お気に入りページの場合は件数も更新
    if (isFavoritesPage()) {
      updateFavoriteCount();
    }
  });
}
