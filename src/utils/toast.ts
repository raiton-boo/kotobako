/**
 * トースト通知のユーティリティ
 *
 * 画面右下に通知を表示する機能を提供
 */

import type { ToastConfig } from '../types';

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
  // 既存のトーストを削除
  const existingToast = document.getElementById('toast-notification');
  if (existingToast) {
    existingToast.remove();
  }

  // トースト要素を作成
  const toast = document.createElement('div');
  toast.id = 'toast-notification';
  toast.className =
    'fixed bottom-6 right-6 flex items-center gap-3 px-6 py-4 rounded-full shadow-2xl text-white font-bold z-50 transform transition-all duration-300';
  toast.style.backgroundColor = color;
  toast.style.opacity = '0';
  toast.style.transform = 'translateY(20px) scale(0.9)';

  // アイコンとメッセージ
  toast.innerHTML = `
    <span class="text-2xl">${icon}</span>
    <span class="text-base">${message}</span>
  `;

  document.body.appendChild(toast);

  // アニメーション: フェードイン
  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0) scale(1)';
  });

  // 指定時間後にフェードアウト
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px) scale(0.9)';

    // アニメーション完了後に削除
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, duration);
}

/**
 * お気に入り追加のトースト
 */
export function showFavoriteAddedToast(): void {
  showToast('💖', 'お気に入りに追加しました', '#ec4899', 2000);
}

/**
 * お気に入り削除のトースト
 */
export function showFavoriteRemovedToast(): void {
  showToast('💔', 'お気に入りから削除しました', '#ef4444', 2000);
}

/**
 * リンクコピーのトースト
 */
export function showLinkCopiedToast(): void {
  showToast('🔗', 'リンクをコピーしました', '#3b82f6', 2000);
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
  const errorMessage = message || 'エラーが発生しました';
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
