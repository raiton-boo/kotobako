/**
 * クリップボード操作のユーティリティ
 * 
 * テキストやURLのコピー機能を提供
 */

import { showLinkCopiedToast, showErrorToast } from './toast';

/**
 * テキストをクリップボードにコピー
 * 
 * @param {string} text - コピーするテキスト
 * @returns {Promise<boolean>} コピーに成功したか
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    // Clipboard API が使える場合
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    
    // フォールバック: 古いブラウザ対応
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    const result = document.execCommand('copy');
    textArea.remove();
    
    return result;
  } catch (error) {
    console.error('Failed to copy:', error);
    return false;
  }
}

/**
 * セリフのURLをクリップボードにコピー
 * 
 * @param {string} serifuId - セリフID
 * @param {string} category - カテゴリーID
 * @returns {Promise<boolean>} コピーに成功したか
 * 
 * @example
 * await copySerifuUrl('batsu-001', 'batsu');
 */
export async function copySerifuUrl(
  serifuId: string,
  category: string
): Promise<boolean> {
  // URLを生成
  const baseUrl = window.location.origin;
  const url = `${baseUrl}/kotobako/category/${category}#${serifuId}`;
  
  // クリップボードにコピー
  const success = await copyToClipboard(url);
  
  if (success) {
    showLinkCopiedToast();
  } else {
    showErrorToast('コピーに失敗しました');
  }
  
  return success;
}

/**
 * セリフのテキストをコピー
 * 
 * @param {string} text - セリフのテキスト
 * @returns {Promise<boolean>} コピーに成功したか
 */
export async function copySerifuText(text: string): Promise<boolean> {
  const success = await copyToClipboard(text);
  
  if (success) {
    showLinkCopiedToast();
  } else {
    showErrorToast('コピーに失敗しました');
  }
  
  return success;
}