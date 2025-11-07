# 📜 要件定義書 — ことば箱（kotobako）

## 🌐 プロジェクト概要

**ことば箱（kotobako）** は、「罰ゲームセリフ集 1000」のように、面白い・恥ずかしい・笑えるセリフを集めた閲覧型 Web サイト。  
パーティーや配信などで使える「ネタ系セリフ集」として、見やすくシンプルなデザインを目指す。  
**GitHub Pages** で静的ホスティングを行う。

---

## ⚙️ 技術構成

| 項目               | 内容                                   |
| ------------------ | -------------------------------------- |
| **フレームワーク** | Astro                                  |
| **ホスティング**   | GitHub Pages                           |
| **言語**           | TypeScript / HTML / CSS                |
| **デザイン**       | Tailwind CSS（予定）                   |
| **アニメーション** | Framer Motion または GSAP（軽めで OK） |
| **ビルドツール**   | Vite（Astro 組み込み）                 |
| **管理**           | GitHub（リポジトリ名: `kotobako`）     |

---

## 💡 コア機能

### 基本機能（静的サイトでの実装）

- 🔍 **検索機能**

  - 入力したキーワードを含むセリフをクライアントサイドでリアルタイムフィルタリング
  - PC: ヘッダー右側に検索ボックス配置
  - スマホ: ヘッダー下に検索ボックス配置

- 🎲 **ランダム表示機能**

  - トップページ読み込み時に、複数件のセリフをランダムに表示
  - 「もっと見る」ボタンでさらにランダム表示を追加
  - 「シャッフル」ボタンで表示中のセリフを再シャッフル

- 📂 **カテゴリーナビゲーション**

  - PC: 左サイドバーにカテゴリー一覧を固定表示
  - スマホ: ヘッダー下に横スクロール可能なカテゴリータブを配置
  - カテゴリー選択で該当セリフのみ表示

- ⭐ **お気に入り機能**（LocalStorage 使用）

  - 各セリフカードに「お気に入り」ボタン
  - ブラウザの LocalStorage に保存（デバイスごとに独立）
  - お気に入り一覧ページで保存したセリフを表示

- 🔗 **シェア機能**
  - 各セリフを Twitter・LINE でシェアできるボタン
  - セリフのテキストとサイト URL を含めた投稿テンプレート

### データ管理

- **JSON ファイルでのセリフ管理**
  - `src/data/serifu.json` にすべてのセリフデータを記述
  - リポジトリにコミット・プッシュすると GitHub Actions で自動ビルド・デプロイ
  - 新規セリフの追加は JSON ファイルを直接編集

---

## 📊 データ構造

### セリフデータ（serifu.json）

```json
{
  "serifu": [
    {
      "id": 1,
      "text": "ニャーと鳴いてみて",
      "category": "batsu-game",
      "featured": false,
      "createdAt": "2025-11-07"
    }
  ]
}
```

**フィールド定義:**

- `id`: セリフの一意な ID（数値）
- `text`: セリフ本文（文字列）
- `category`: カテゴリー ID（文字列、categories.json と対応）
- `featured`: おすすめセリフフラグ（真偽値）
- `createdAt`: 追加日（ISO 8601 形式の日付文字列）

### カテゴリーデータ（categories.json）

```json
{
  "categories": [
    {
      "id": "batsu-game",
      "name": "罰ゲーム",
      "slug": "batsu-game",
      "emoji": "🎯",
      "description": "パーティーや配信で使える定番の罰ゲームセリフ"
    }
  ]
}
```

**初期カテゴリー案:**

- 🎯 罰ゲーム
- 💕 告白・恋愛
- 🎮 配信・実況
- 😂 お笑い・コント
- 🎭 演技・セリフ練習
- 🎪 その他

---

## 🎨 デザイン詳細

### カラーパレット

```css
/* Primary Colors */
--color-primary: #6366f1; /* Indigo - アクセントカラー */
--color-primary-light: #818cf8;
--color-primary-dark: #4f46e5;

/* Background */
--color-bg-main: #fafafa; /* メイン背景 */
--color-bg-gradient-start: #fafafa;
--color-bg-gradient-end: #f0f4ff;

/* Card & Surface */
--color-card-bg: #ffffff;
--color-card-border: #e5e7eb;
--color-card-shadow: rgba(0, 0, 0, 0.05);

/* Text */
--color-text-primary: #1f2937;
--color-text-secondary: #6b7280;
--color-text-muted: #9ca3af;
```

### レイアウト構成

#### デスクトップ（1024px 以上）

```
┌─────────────────────────────────────────────────┐
│  Header: ロゴ + サイト名           [検索ボックス] │
├────────────┬────────────────────────────────────┤
│            │                                    │
│ Sidebar    │  Main Content                      │
│ (固定)     │  ┌──────────────────────────────┐  │
│            │  │ セリフカード                 │  │
│ カテゴリー │  │ "ニャーと鳴いてみて"         │  │
│ 🎯罰ゲーム │  │ [♥お気に入り] [🔗シェア]    │  │
│ 💕告白     │  └──────────────────────────────┘  │
│ 🎮配信     │  ┌──────────────────────────────┐  │
│ 😂お笑い   │  │ セリフカード                 │  │
│ 🎭演技     │  └──────────────────────────────┘  │
│ 🎪その他   │                                    │
│            │  [シャッフル] [もっと見る]        │
│            │                                    │
│ (幅: 240px)│  (残りの幅)                        │
└────────────┴────────────────────────────────────┘
```

#### スマホ（768px 未満）

```
┌─────────────────────────┐
│  Header: ロゴ + タイトル │
├─────────────────────────┤
│  [検索ボックス]         │
├─────────────────────────┤
│ 🎯罰ゲーム 💕告白 🎮配信 │ ← 横スクロール
│  😂お笑い 🎭演技 🎪他   │
├─────────────────────────┤
│                         │
│  ┌───────────────────┐  │
│  │ セリフカード      │  │
│  │                   │  │
│  │ "ニャーと鳴いて   │  │
│  │  みて"            │  │
│  │                   │  │
│  │ [♥] [🔗]         │  │
│  └───────────────────┘  │
│                         │
│  ┌───────────────────┐  │
│  │ セリフカード      │  │
│  └───────────────────┘  │
│                         │
│  [シャッフル]           │
│  [もっと見る]           │
└─────────────────────────┘
```

### コンポーネント仕様

#### セリフカード

- **サイズ**: 最大幅 600px、高さは内容に応じて可変
- **余白**: padding 24px-32px
- **角丸**: border-radius 16px
- **影**: box-shadow 軽め（ホバー時に少し浮く）
- **フォント**:
  - セリフ本文: 24px-32px、line-height 1.6
  - メタ情報: 14px-16px
- **アニメーション**:
  - フェードイン（opacity 0 → 1、0.3s）
  - 上からスライド（transform translateY(20px) → 0、0.3s）

#### カテゴリーナビ（サイドバー）

- **幅**: 240px（固定）
- **項目**: 絵文字 + カテゴリー名
- **ホバー**: 背景色変化、カーソルポインター
- **アクティブ**: 太字 + プライマリーカラーの左ボーダー

#### カテゴリータブ（スマホ）

- **高さ**: 48px
- **横スクロール**: overflow-x: auto
- **項目**: pill 型（角丸大きめ）
- **アクティブ**: プライマリーカラー背景、白文字

### フォント

- **メインフォント（日本語）**:
  - **RocknRoll One**（ウェイト: 400 のみ）
  - カジュアルでポップな手書き風フォント
  - 柔らかく親しみやすい雰囲気で、セリフ表示に最適
- **サブフォント（UI 要素用）**:
  - **Klee One**（カテゴリー名、ボタンなど細かい文字用）
  - より整った手書き風で可読性が高い
- **代替フォント案**:

  - **Yuji Mai**（筆ペン風の手書きフォント、優しくレトロな雰囲気）
  - **Yuji Syuku**（筆文字風、より個性的で温かい印象）
  - **Hachi Maru Pop**（ポップで丸みのある手書き風）
  - **Dela Gothic One**（太めで存在感のある手書き風、見出し向き）

- **英数字**: RocknRoll One で統一（日本語フォントに含まれる）

- **読み込み**: Google Fonts CDN 経由

  ```html
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link
    href="https://fonts.googleapis.com/css2?family=RocknRoll+One&family=Klee+One:wght@400;600&display=swap"
    rel="stylesheet"
  />
  ```

- **フォールバック**:

  ```css
  /* セリフ本文用 */
  font-family: 'RocknRoll One', 'Klee One', 'YuMincho', 'Yu Mincho', cursive,
    sans-serif;

  /* UI要素用 */
  font-family: 'Klee One', 'RocknRoll One', 'YuMincho', 'Yu Mincho', sans-serif;
  ```

- **フォントサイズ階層**:
  - セリフ本文: 28px-36px（RocknRoll One、大きめで目立つように）
  - カテゴリー名: 16px-18px（Klee One）
  - ボタン: 15px-17px（Klee One）
  - メタ情報: 13px-15px（Klee One）

---

## 📁 フォルダ構成

```
kotobako/
├── public/
│   ├── favicon.ico
│   └── og-image.png            # OGP画像
├── src/
│   ├── assets/
│   │   └── images/             # サイト用画像
│   ├── components/
│   │   ├── CategoryNav.astro   # カテゴリーナビゲーション
│   │   ├── CategoryTabs.astro  # カテゴリータブ（スマホ用）
│   │   ├── SerifuCard.astro    # セリフカード
│   │   ├── SearchBox.astro     # 検索ボックス
│   │   ├── RandomButton.astro  # ランダム/シャッフルボタン
│   │   ├── FavoriteButton.astro # お気に入りボタン
│   │   └── ShareButton.astro   # シェアボタン
│   ├── data/
│   │   ├── serifu.json         # セリフデータ
│   │   └── categories.json     # カテゴリー定義
│   ├── layouts/
│   │   └── Layout.astro        # 共通レイアウト
│   ├── pages/
│   │   ├── index.astro         # トップページ
│   │   ├── favorites.astro     # お気に入り一覧ページ
│   │   └── category/
│   │       └── [slug].astro    # カテゴリー別ページ
│   ├── scripts/
│   │   ├── search.ts           # 検索ロジック
│   │   ├── random.ts           # ランダム表示ロジック
│   │   └── favorites.ts        # LocalStorage操作
│   └── styles/
│       └── global.css          # グローバルスタイル
├── astro.config.mjs
├── tailwind.config.cjs
├── tsconfig.json
├── package.json
└── README.md
```

**補足:**

- GitHub Pages は `astro.config.mjs` に設定を記述するだけで自動デプロイされます
- リポジトリの Settings > Pages で GitHub Actions を有効にすれば、プッシュするだけで自動的にビルド・デプロイされます
- `.github/workflows/` フォルダは不要です（Astro が自動で処理）

---

## 🛠️ ページ構造

### 1. トップページ（`/`）

**URL**: `/` または `/index.html`

**機能**:

- ページ読み込み時に全カテゴリーから 10-15 件のセリフをランダム表示
- 検索ボックスでリアルタイムフィルタリング
- カテゴリーナビで「すべて」を表示中
- シャッフルボタンで表示中のセリフを再シャッフル
- もっと見るボタンで追加のランダムセリフを表示

### 2. カテゴリー別ページ（`/category/[slug]`）

**URL**: `/category/batsu-game` など

**機能**:

- 選択されたカテゴリーのセリフのみ表示
- 検索は該当カテゴリー内のみ対象
- カテゴリーナビで該当カテゴリーがアクティブ表示
- ランダム表示は該当カテゴリー内のみ

**動的ルート生成**:

- `categories.json` を元にビルド時にすべてのカテゴリーページを生成

### 3. お気に入りページ（`/favorites`）

**URL**: `/favorites` または `/favorites.html`

**機能**:

- LocalStorage に保存されたお気に入りセリフを表示
- お気に入りがない場合は空状態メッセージ表示
- 検索機能はお気に入り内のみ対象

---

## ✨ アニメーション方針

### アニメーション実装方針

- **ライブラリ**: CSS Transitions + Intersection Observer API（軽量化優先）
- **フレームワーク**: 必要に応じて View Transitions API（Astro 標準機能）を使用
- **過剰な動きは避ける**: シンプルで自然な印象を保つ

### アニメーション一覧

#### ページ遷移

- **View Transitions API** を使用
- フェードクロス: 0.3s ease-in-out

#### セリフカード表示

- **初期表示**:
  - opacity: 0 → 1（0.3s）
  - transform: translateY(20px) → translateY(0)（0.3s）
  - 各カード 0.05s 遅延でカスケード表示
- **ホバー時**:
  - box-shadow: 少し強く（0.2s）
  - transform: translateY(-4px)（0.2s）

#### カテゴリーナビ

- **ホバー**:
  - background-color 変化（0.2s）
- **アクティブ切り替え**:
  - 左ボーダーのスライド（0.3s）

#### 検索フィルタリング

- マッチしないカードは opacity: 0 + 高さ 0 に（0.2s）
- マッチするカードは opacity: 1 に戻る（0.3s）

#### ボタン類

- **ホバー**: scale(1.05)（0.2s）
- **クリック**: scale(0.95)（0.1s）

---

## 🔎 SEO 対策

- 各ページに適切な`meta`タグ（title / description / ogp）
- JSON-LD 構造化データによるコンテンツ分類
- パフォーマンス最適化（画像の遅延読み込み・圧縮）
- モバイルファーストデザイン
- ページタイトル・URL 構造にキーワードを含める（例：`/category/batsu-game`）
- サイトマップ自動生成（Astro 組み込み機能）
- robots.txt 設定

---

## 🚀 開発フェーズ

### Phase 1: 基盤構築

- [ ] プロジェクトセットアップ（Astro + Tailwind CSS）
- [ ] データ構造設計とサンプルデータ作成（serifu.json, categories.json）
- [ ] 基本レイアウト実装（Layout.astro）
- [ ] Git 初回コミット

### Phase 2: コンポーネント開発

- [ ] SerifuCard コンポーネント
- [ ] CategoryNav コンポーネント（デスクトップ）
- [ ] CategoryTabs コンポーネント（スマホ）
- [ ] SearchBox コンポーネント
- [ ] Git コミット

### Phase 3: ページ実装

- [ ] トップページ（index.astro）
- [ ] カテゴリー別ページ（[slug].astro）
- [ ] お気に入りページ（favorites.astro）
- [ ] Git コミット

### Phase 4: インタラクティブ機能

- [ ] 検索機能（search.ts）
- [ ] ランダム表示機能（random.ts）
- [ ] お気に入り機能（favorites.ts + LocalStorage）
- [ ] シェア機能
- [ ] Git コミット

### Phase 5: レスポンシブ対応

- [ ] デスクトップレイアウト最適化
- [ ] タブレットレイアウト
- [ ] スマホレイアウト
- [ ] Git コミット

### Phase 6: アニメーション実装

- [ ] ページ遷移アニメーション
- [ ] セリフカード表示アニメーション
- [ ] ホバー・インタラクションアニメーション
- [ ] Git コミット

### Phase 7: 仕上げ・最適化

- [ ] SEO 対策（meta タグ、OGP、構造化データ）
- [ ] パフォーマンス最適化（Lighthouse スコア確認）
- [ ] アクセシビリティ確認
- [ ] クロスブラウザテスト
- [ ] Git コミット

### Phase 8: デプロイ

- [ ] `astro.config.mjs` に GitHub Pages 設定を追加
- [ ] GitHub リポジトリの Settings > Pages で GitHub Actions を有効化
- [ ] main ブランチにプッシュ（自動デプロイ開始）
- [ ] 本番環境確認
- [ ] README.md 整備

---

## 📝 運用方法

### セリフの追加手順

1. `src/data/serifu.json` をエディタで開く
2. 新しいセリフオブジェクトを追加:
   ```json
   {
     "id": 999,
     "text": "新しいセリフ",
     "category": "batsu-game",
     "featured": false,
     "createdAt": "2025-11-07"
   }
   ```
3. Git にコミット・プッシュ
4. GitHub Actions が自動でビルド・デプロイ
5. 数分後にサイトに反映

### カテゴリーの追加手順

1. `src/data/categories.json` に新しいカテゴリーを追加
2. Git にコミット・プッシュ
3. ビルド時に自動でカテゴリーページが生成される

---

## 🎯 パフォーマンス目標

- **Lighthouse Score**: すべて 90 点以上
  - Performance: 95+
  - Accessibility: 95+
  - Best Practices: 95+
  - SEO: 100
- **初回読み込み時間**: 2 秒以内（3G 回線）
- **ファーストコンテンツフルペイント（FCP）**: 1.5 秒以内
- **バンドルサイズ**: JavaScript 50KB 以下（gzip 圧縮後）

---

## 🔒 技術的制約（GitHub Pages）

### できないこと

- サーバーサイド処理（API、データベース）
- リアルタイム統計情報（閲覧数、人気ランキング）
- ユーザー投稿機能（フォーム送信）
- ユーザー認証・ログイン機能

### 代替策

- **統計情報**: Google Analytics 等の外部サービス埋め込み
- **投稿受付**: GitHub Issue テンプレートで受付 → 手動で JSON 追加
- **お気に入り**: LocalStorage でブラウザ内のみ保存
- **新着セリフ**: JSON の`createdAt`フィールドでソート表示
- **おすすめセリフ**: `featured`フラグで手動キュレーション

---

## 📄 ライセンス・利用規約

- **コード**: MIT ライセンス
- **セリフコンテンツ**: CC BY 4.0（クレジット表記で利用可能）
- フッターに「Created by [あなたの名前]」を記載
