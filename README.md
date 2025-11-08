# 📦 Kotobako

![Kotobako Screenshot](public/docs/ScreenShot.png)

<!-- Badges -->

<div align="center">
<!-- status badges -->
[![GitHub stars](https://img.shields.io/github/stars/raiton-boo/kotobako?style=flat-square)](https://github.com/raiton-boo/kotobako/stargazers) [![Last commit](https://img.shields.io/github/last-commit/raiton-boo/kotobako?style=flat-square)](https://github.com/raiton-boo/kotobako/commits/main) [![Open issues](https://img.shields.io/github/issues/raiton-boo/kotobako?style=flat-square)](https://github.com/raiton-boo/kotobako/issues) [![Repo size](https://img.shields.io/github/repo-size/raiton-boo/kotobako?style=flat-square)](https://github.com/raiton-boo/kotobako) [![License](https://img.shields.io/github/license/raiton-boo/kotobako?style=flat-square)](https://github.com/raiton-boo/kotobako/blob/main/LICENSE)

<br />

<!-- tech / meta badges -->

[![Built with Astro](https://img.shields.io/badge/built%20with-Astro-FF5A5F?style=flat-square&logo=astro&logoColor=white)](https://astro.build/)

</div>

Kotobako は「パーティーや配信で使える面白いセリフ集」を手軽に閲覧できる、モダンな静的サイトです。
軽量な Astro ベースで、TailwindCSS によるレスポンシブデザインを採用しています。

[デモサイト（GitHub Pages）](https://raiton-boo.github.io/kotobako/)

---

## 目次

- [特徴](#特徴)
- [技術スタック](#技術スタック)
- [ローカルで動かす](#ローカルで動かす)
- [デプロイ](#デプロイ)
- [プロジェクト構成](#プロジェクト構成)
- [貢献](#貢献)
- [ライセンス](#ライセンス)
- [今後の改善案](#今後の改善案)

---

## 特徴

- シンプルで軽量な静的サイト (Astro)
- TailwindCSS を使ったカジュアルで拡張しやすいデザイン
- モバイルファーストでレスポンシブ対応
- GitHub Pages による簡単デプロイ

## 技術スタック

- フレームワーク: Astro (プロジェクトの package.json に準拠)
- スタイル: TailwindCSS
- デプロイ: GitHub Pages (`gh-pages` パッケージを使用)

詳しくは `package.json` の scripts / dependencies を参照してください。

---

## ローカルで動かす

前提: Node.js (推奨: LTS)、npm

```bash
# リポジトリをクローン
git clone https://github.com/raiton-boo/kotobako.git
cd kotobako

# 依存関係をインストール
npm install

# 開発サーバー起動（ホットリロード付き）
npm run dev

# ビルド
npm run build

# プレビュー
npm run preview
```

---

## デプロイ

このリポジトリでは `gh-pages` を使い、`npm run deploy` で `dist/` を `gh-pages` ブランチに push するよう設定されています。

1. `npm run build` でビルド
2. `npm run deploy` を実行

（GitHub Actions 等で自動デプロイを設定することも推奨します）

---

## プロジェクト構成（抜粋）

- `src/pages/` - ページコンポーネント
- `src/components/` - 再利用コンポーネント
- `src/layouts/` - レイアウト
- `public/` - 静的アセット（スクリーンショット: `public/docs/ScreenShot.png`）
- `package.json` - スクリプトと依存関係

---

## 貢献

貢献歓迎です！

1. Issue を立てて提案やバグを知らせてください
2. フォークしてブランチを切り、プルリクエストを送ってください

開発フローの簡単な提案:

- ブランチ名: `feature/xxx`, `fix/yyy` など
- PR には変更の概要と確認手順を記載してください

---

## ライセンス

このプロジェクトは `MIT` ライセンスの下で公開されています。詳しくは `LICENSE` を参照してください。

---

## 今後の改善案

- スクリーンショットや GIF を `public/docs/` に複数追加して README に表示
- アクセシビリティ等の追加・改善
- ダークモードの追加
- 共有機能の強化
- アニメーションの強化
- 統計機能の追加

---

<div align="center">
  <small>© 2025 raiton-boo</small>
  <h4>Docs writer by ChatGPT</h4>
</div>
