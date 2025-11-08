/**
 * トースト通知のユーティリティ
 *
 * 画面右下に通知を表示する機能を提供
 * デスクトップ: 最大3件、モバイル: 最大2件（小さいサイズ）
 */

import type { ToastConfig } from '../types';

// 表示中のトーストを管理
let activeToasts: HTMLElement[] = [];

/**
 * トースト通知を表示
 *
 * @param {string} icon - アイコン（絵文字）
 * @param {string} message - メッセージ
 * @param {string} color - 背景色（デフォルト: '#a78bfa'）
 * @param {number} duration - 表示時間（ミリ秒、デフォルト: 3000）
 *
 * @example
 * showToast('✅', 'お気に入りに追加しました', '#10b981');
 */
export function showToast(
  icon: string,
  message: string,
  color: string = '#a78bfa',
  duration: number = 3000
): void {
  // 画面幅で最大表示数とサイズを決定
  const isMobile = window.innerWidth < 768;
  const maxToasts = isMobile ? 2 : 3;

  // 最大数を超えたら最も古いトーストを削除
  if (activeToasts.length >= maxToasts) {
    const oldestToast = activeToasts.shift();
    if (oldestToast) {
      removeToast(oldestToast);
    }
  }

  // トーストコンテナを取得または作成
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className =
      'fixed bottom-4 right-4 md:bottom-6 md:right-6 flex flex-col-reverse gap-2 md:gap-3 z-50 pointer-events-none';
    document.body.appendChild(container);
  }

  // トースト要素を作成
  const toast = document.createElement('div');

  // モバイルとデスクトップでサイズを変更
  if (isMobile) {
    toast.className =
      'flex items-center gap-2 px-4 py-2.5 rounded-full shadow-xl text-white font-bold transform transition-all duration-300 pointer-events-auto text-sm';
  } else {
    toast.className =
      'flex items-center gap-3 px-6 py-4 rounded-full shadow-2xl text-white font-bold transform transition-all duration-300 pointer-events-auto';
  }

  toast.style.backgroundColor = color;
  toast.style.opacity = '0';
  toast.style.transform = 'translateX(400px) scale(0.9)';

  // アイコンとメッセージ（モバイルは小さく）
  if (isMobile) {
    toast.innerHTML = `
      <span class="text-lg">${icon}</span>
      <span class="text-xs whitespace-nowrap">${message}</span>
    `;
  } else {
    toast.innerHTML = `
      <span class="text-2xl">${icon}</span>
      <span class="text-base whitespace-nowrap">${message}</span>
    `;
  }

  // コンテナの先頭に追加（下から上に積み上がる）
  container.insertBefore(toast, container.firstChild);
  activeToasts.push(toast);

  // アニメーション: スライドイン
  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(0) scale(1)';
  });

  // 指定時間後にフェードアウト
  setTimeout(() => {
    removeToast(toast);
  }, duration);
}

/**
 * トーストを削除
 *
 * @param {HTMLElement} toast - 削除するトースト要素
 */
function removeToast(toast: HTMLElement): void {
  // フェードアウトアニメーション
  toast.style.opacity = '0';
  toast.style.transform = 'translateX(400px) scale(0.9)';

  // アニメーション完了後に削除
  setTimeout(() => {
    toast.remove();

    // activeToasts から削除
    const index = activeToasts.indexOf(toast);
    if (index > -1) {
      activeToasts.splice(index, 1);
    }

    // コンテナが空なら削除
    const container = document.getElementById('toast-container');
    if (container && activeToasts.length === 0) {
      container.remove();
    }
  }, 300);
}

/**
 * お気に入り追加のトースト
 */
export function showFavoriteAddedToast(): void {
  showToast('💖', 'お気に入りに追加', '#ec4899', 2000);
}

/**
 * お気に入り削除のトースト
 */
export function showFavoriteRemovedToast(): void {
  showToast('💔', 'お気に入りから削除', '#ef4444', 2000);
}

/**
 * リンクコピーのトースト
 */
export function showLinkCopiedToast(): void {
  showToast('🔗', 'リンクをコピー', '#3b82f6', 2000);
}

/**
 * コピー成功のトースト（汎用）
 */
export function showCopySuccessToast(): void {
  showToast('📋', 'コピーしました', '#10b981', 2000);
}

/**
 * エラーのトースト
 *
 * @param {string} message - エラーメッセージ（オプション）
 */
export function showErrorToast(message?: string): void {
  const errorMessage = message || 'エラーが発生';
  showToast('❌', errorMessage, '#ef4444', 3000);
}

/**
 * 成功のトースト
 *
 * @param {string} message - 成功メッセージ（オプション）
 */
export function showSuccessToast(message?: string): void {
  const successMessage = message || '成功しました';
  showToast('✅', successMessage, '#10b981', 2000);
}
