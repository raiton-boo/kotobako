/**
 * DOM操作のユーティリティ関数
 *
 * よく使うDOM操作を簡潔に記述できるヘルパー関数群
 */

/**
 * IDで要素を取得
 *
 * @param {string} id - 要素のID（#なし）
 * @returns {HTMLElement | null} 取得した要素、存在しない場合null
 *
 * @example
 * const button = getElementById('submit-btn');
 */
export function getElementById(id: string): HTMLElement | null {
  return document.getElementById(id);
}

/**
 * セレクターで要素を取得（単数）
 *
 * @param {string} selector - CSSセレクター
 * @returns {HTMLElement | null} 取得した要素、存在しない場合null
 *
 * @example
 * const card = querySelector('.serifu-card');
 */
export function querySelector(selector: string): HTMLElement | null {
  return document.querySelector(selector);
}

/**
 * セレクターで要素を取得（複数）
 *
 * @param {string} selector - CSSセレクター
 * @returns {NodeListOf<Element>} 取得した要素のリスト
 *
 * @example
 * const cards = querySelectorAll('.serifu-card');
 * cards.forEach(card => console.log(card));
 */
export function querySelectorAll(selector: string): NodeListOf<Element> {
  return document.querySelectorAll(selector);
}

/**
 * 要素にクラスを追加
 *
 * @param {HTMLElement} element - 対象の要素
 * @param {...string} classes - 追加するクラス名（複数指定可）
 *
 * @example
 * addClass(button, 'active', 'highlighted');
 */
export function addClass(element: HTMLElement, ...classes: string[]): void {
  element.classList.add(...classes);
}

/**
 * 要素からクラスを削除
 *
 * @param {HTMLElement} element - 対象の要素
 * @param {...string} classes - 削除するクラス名（複数指定可）
 *
 * @example
 * removeClass(button, 'active', 'highlighted');
 */
export function removeClass(element: HTMLElement, ...classes: string[]): void {
  element.classList.remove(...classes);
}

/**
 * 要素のクラスをトグル（あれば削除、なければ追加）
 *
 * @param {HTMLElement} element - 対象の要素
 * @param {string} className - トグルするクラス名
 * @returns {boolean} トグル後にクラスが存在する場合true
 *
 * @example
 * toggleClass(modal, 'hidden');
 */
export function toggleClass(element: HTMLElement, className: string): boolean {
  return element.classList.toggle(className);
}

/**
 * 要素がクラスを持っているか確認
 *
 * @param {HTMLElement} element - 対象の要素
 * @param {string} className - 確認するクラス名
 * @returns {boolean} クラスを持っている場合true
 *
 * @example
 * if (hasClass(button, 'active')) {
 *   console.log('ボタンはアクティブです');
 * }
 */
export function hasClass(element: HTMLElement, className: string): boolean {
  return element.classList.contains(className);
}

/**
 * 要素の属性を取得
 *
 * @param {HTMLElement} element - 対象の要素
 * @param {string} attributeName - 属性名
 * @returns {string | null} 属性値、存在しない場合null
 *
 * @example
 * const id = getAttribute(card, 'data-id');
 */
export function getAttribute(
  element: HTMLElement,
  attributeName: string
): string | null {
  return element.getAttribute(attributeName);
}

/**
 * 要素に属性を設定
 *
 * @param {HTMLElement} element - 対象の要素
 * @param {string} attributeName - 属性名
 * @param {string} value - 属性値
 *
 * @example
 * setAttribute(button, 'aria-label', 'お気に入りに追加');
 */
export function setAttribute(
  element: HTMLElement,
  attributeName: string,
  value: string
): void {
  element.setAttribute(attributeName, value);
}

/**
 * 要素から属性を削除
 *
 * @param {HTMLElement} element - 対象の要素
 * @param {string} attributeName - 属性名
 *
 * @example
 * removeAttribute(input, 'disabled');
 */
export function removeAttribute(
  element: HTMLElement,
  attributeName: string
): void {
  element.removeAttribute(attributeName);
}

/**
 * 要素を非表示にする
 *
 * @param {HTMLElement} element - 対象の要素
 *
 * @example
 * hide(modal);
 */
export function hide(element: HTMLElement): void {
  element.style.display = 'none';
}

/**
 * 要素を表示する
 *
 * @param {HTMLElement} element - 対象の要素
 * @param {string} displayType - displayプロパティの値（デフォルト: 'block'）
 *
 * @example
 * show(modal, 'flex');
 */
export function show(
  element: HTMLElement,
  displayType: string = 'block'
): void {
  element.style.display = displayType;
}

/**
 * 要素を作成して返す
 *
 * @template K - HTMLElementのタグ名
 * @param {K} tagName - タグ名
 * @param {Partial<HTMLElementTagNameMap[K]>} attributes - 属性とプロパティ
 * @returns {HTMLElementTagNameMap[K]} 作成した要素
 *
 * @example
 * const div = createElement('div', { className: 'card', id: 'main-card' });
 */
export function createElement<K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  attributes?: Partial<HTMLElementTagNameMap[K]>
): HTMLElementTagNameMap[K] {
  const element = document.createElement(tagName);
  if (attributes) {
    Object.assign(element, attributes);
  }
  return element;
}

/**
 * 要素を親から削除
 *
 * @param {HTMLElement} element - 対象の要素
 *
 * @example
 * removeElement(oldCard);
 */
export function removeElement(element: HTMLElement): void {
  element.remove();
}
