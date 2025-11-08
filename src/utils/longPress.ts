/**
 * 長押し機能のユーティリティ
 *
 * カードを長押しすることで、カテゴリーページへ遷移したり
 * 同じページ内の該当セリフへスクロールする機能を提供
 */

import { getLocalStorage, setLocalStorage } from './storage';
import { STORAGE_KEYS } from '../types/serifu';

const LONG_PRESS_DURATION = 800; // 長押しと判定する時間（ミリ秒）

/**
 * 長押し機能をセットアップ
 *
 * @param {string} selector - 対象要素のセレクター
 * @param {boolean} disableOnCategoryPage - カテゴリーページでの長押しを無効化（デフォルト: false）
 *
 * @example
 * setupLongPress('[data-id]', true); // カテゴリーページでは無効
 */
export function setupLongPress(
  selector: string,
  disableOnCategoryPage: boolean = false
): void {
  // カテゴリーページかどうかをチェック
  const isCategoryPage = window.location.pathname.includes('/category/');

  // カテゴリーページで無効化フラグが立っている場合は何もしない
  if (disableOnCategoryPage && isCategoryPage) {
    return;
  }

  const elements = document.querySelectorAll(selector);

  elements.forEach((element) => {
    if (!(element instanceof HTMLElement)) return;

    let pressTimer: number | null = null;
    let startX = 0;
    let startY = 0;
    let isPressingButton = false; // ボタンを押しているかのフラグ
    const progressOverlay = element.querySelector(
      '.progress-overlay'
    ) as HTMLElement;

    const startPress = (e: MouseEvent | TouchEvent) => {
      // ボタンやインタラクティブ要素をクリックした場合は長押しを無効化
      const target = e.target as HTMLElement;
      if (
        target.closest('.favorite-btn') ||
        target.closest('.copy-btn') ||
        target.closest('button') ||
        target.closest('a')
      ) {
        isPressingButton = true;
        return;
      }

      isPressingButton = false;

      // タッチイベントとマウスイベントの座標を取得
      if (e instanceof TouchEvent) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
      } else {
        startX = e.clientX;
        startY = e.clientY;
      }

      // プログレスバーを表示
      if (progressOverlay) {
        progressOverlay.classList.add('active');
        progressOverlay.style.background =
          'linear-gradient(90deg, rgba(167, 139, 250, 0.3) 0%, transparent 0%)';
      }

      // カードを浮かせるアニメーション（より強力に）
      element.style.transform = 'translateY(-12px) scale(1.03)';
      element.style.boxShadow =
        '0 25px 50px -12px rgba(167, 139, 250, 0.4), 0 20px 25px -5px rgba(167, 139, 250, 0.3)';
      element.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
      element.style.filter = 'brightness(1.05)';

      let progress = 0;
      const interval = 10;
      const step = (interval / LONG_PRESS_DURATION) * 100;

      pressTimer = window.setInterval(() => {
        progress += step;

        if (progressOverlay) {
          progressOverlay.style.background = `linear-gradient(90deg, rgba(167, 139, 250, 0.3) ${progress}%, transparent ${progress}%)`;
        }

        if (progress >= 100) {
          if (pressTimer !== null) {
            clearInterval(pressTimer);
          }
          handleLongPress(element);
        }
      }, interval);
    };

    const endPress = (e: MouseEvent | TouchEvent) => {
      if (isPressingButton) {
        return; // ボタンを押していた場合は何もしない
      }

      if (pressTimer !== null) {
        clearInterval(pressTimer);
        pressTimer = null;
      }

      // カードを元に戻す（スムーズに）
      element.style.transform = '';
      element.style.boxShadow = '';
      element.style.filter = '';
      element.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';

      // プログレスバーを非表示
      if (progressOverlay) {
        progressOverlay.classList.remove('active');
      }
    };

    const cancelPress = (e: MouseEvent | TouchEvent) => {
      if (isPressingButton) {
        return;
      }

      // 移動量をチェック
      let currentX = 0;
      let currentY = 0;

      if (e instanceof TouchEvent && e.touches.length > 0) {
        currentX = e.touches[0].clientX;
        currentY = e.touches[0].clientY;
      } else if (e instanceof MouseEvent) {
        currentX = e.clientX;
        currentY = e.clientY;
      }

      const deltaX = Math.abs(currentX - startX);
      const deltaY = Math.abs(currentY - startY);

      // 移動量が10px以上の場合はキャンセル
      if (deltaX > 10 || deltaY > 10) {
        endPress(e);
      }
    };

    // イベントリスナーを追加
    element.addEventListener('mousedown', startPress);
    element.addEventListener('touchstart', startPress, { passive: true });

    element.addEventListener('mouseup', endPress);
    element.addEventListener('mouseleave', endPress);
    element.addEventListener('touchend', endPress);
    element.addEventListener('touchcancel', endPress);

    element.addEventListener('mousemove', cancelPress);
    element.addEventListener('touchmove', cancelPress, { passive: true });
  });
}

/**
 * 長押し時の処理
 *
 * @param {HTMLElement} element - 長押しされた要素
 */
function handleLongPress(element: HTMLElement): void {
  const serifuId = element.getAttribute('data-id');
  const category = element.getAttribute('data-category');

  if (!serifuId || !category) return;

  // バイブレーション（対応デバイスのみ）
  if (navigator.vibrate) {
    navigator.vibrate(50);
  }

  const currentPath = window.location.pathname;

  // カテゴリーページにいる場合は、同じページ内でスクロール
  if (currentPath.includes(`/category/${category}`)) {
    const targetElement = document.getElementById(`serifu-${serifuId}`);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });

      // ハイライト表示（より目立つように）
      targetElement.style.outline = '4px solid rgba(167, 139, 250, 0.6)';
      targetElement.style.outlineOffset = '8px';
      targetElement.style.boxShadow = '0 0 0 8px rgba(167, 139, 250, 0.2)';

      setTimeout(() => {
        targetElement.style.outline = '';
        targetElement.style.outlineOffset = '';
        targetElement.style.boxShadow = '';
      }, 2000);
    }
  } else {
    // 別のページにいる場合は、カテゴリーページへ遷移
    setLocalStorage(STORAGE_KEYS.SCROLL_TO_SERIFU, serifuId);
    window.location.href = `/kotobako/category/${category}#${serifuId}`;
  }
}

/**
 * 保存されたセリフIDにスクロール
 *
 * @example
 * scrollToSavedSerifu();
 */
export function scrollToSavedSerifu(): void {
  const serifuId = getLocalStorage<string>(STORAGE_KEYS.SCROLL_TO_SERIFU, '');

  if (serifuId) {
    // LocalStorageから削除
    setLocalStorage(STORAGE_KEYS.SCROLL_TO_SERIFU, '');

    // 少し遅延させてからスクロール（DOM構築完了を待つ）
    setTimeout(() => {
      const targetElement = document.getElementById(`serifu-${serifuId}`);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // ハイライト表示
        targetElement.style.outline = '4px solid rgba(167, 139, 250, 0.6)';
        targetElement.style.outlineOffset = '8px';
        targetElement.style.boxShadow = '0 0 0 8px rgba(167, 139, 250, 0.2)';

        setTimeout(() => {
          targetElement.style.outline = '';
          targetElement.style.outlineOffset = '';
          targetElement.style.boxShadow = '';
        }, 2000);
      }
    }, 100);
  }

  // URLハッシュがある場合もスクロール
  if (window.location.hash) {
    const hashSerifuId = window.location.hash.slice(1);
    setTimeout(() => {
      const targetElement = document.getElementById(`serifu-${hashSerifuId}`);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // ハイライト表示
        targetElement.style.outline = '4px solid rgba(167, 139, 250, 0.6)';
        targetElement.style.outlineOffset = '8px';
        targetElement.style.boxShadow = '0 0 0 8px rgba(167, 139, 250, 0.2)';

        setTimeout(() => {
          targetElement.style.outline = '';
          targetElement.style.outlineOffset = '';
          targetElement.style.boxShadow = '';
        }, 2000);
      }
    }, 100);
  }
}
