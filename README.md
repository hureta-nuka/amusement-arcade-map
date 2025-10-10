# 🎮 日本ゲームセンターマップ

React + TypeScript + Leafletを使用した、日本のゲームセンターを可視化するWebアプリケーションです。

## 🌟 機能

- 📍 インタラクティブなマップ上にゲームセンターの位置を表示
- 🔍 店名・住所での検索機能
- 🏷️ カテゴリータグでのフィルタリング
  - 音ゲー
  - 格ゲー
  - クレーンゲーム
  - レトロゲーム
  - メダルゲーム
  - プライズ
- 📱 レスポンシブデザイン（PC・スマホ対応）
- ℹ️ マーカークリックで詳細情報表示

## 🚀 セットアップ

### 前提条件

- Node.js 18以上
- npm または yarn

### インストール

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# ビルド
npm run build

# プレビュー
npm run preview

# テスト実行
npm test

# テストUI表示
npm run test:ui

# カバレッジ確認
npm run test:coverage
```

## 📦 使用技術

- **React** 18.3.1 - UIライブラリ
- **TypeScript** 5.6.2 - 型安全性
- **Vite** 5.4.10 - ビルドツール
- **Leaflet** 1.9.4 - マップライブラリ
- **React-Leaflet** 4.2.1 - React用Leafletラッパー
- **Sass (SCSS)** - スタイリング（変数、mixin、ネストをサポート）
- **Vitest** - テストフレームワーク
- **React Testing Library** - Reactコンポーネントテスト

## 🌐 デプロイ

このプロジェクトはGitHub Pagesでホストされています。

### GitHub Actionsを使用した自動デプロイ

1. GitHubリポジトリの設定で、Pages の Source を「GitHub Actions」に設定
2. mainブランチにプッシュすると自動的にビルド＆デプロイ

### 手動デプロイ

```bash
npm run deploy
```

## 📝 データの追加・編集

ゲームセンターのデータは `src/data/arcades.json` で管理されています。

```json
{
  "id": 1,
  "name": "店舗名",
  "address": "住所",
  "latitude": 35.6895,
  "longitude": 139.6917,
  "description": "説明文",
  "tags": ["音ゲー", "格ゲー"],
  "openingHours": "10:00-23:00"
}
```

## 🧪 テスト

このプロジェクトはVitestとReact Testing Libraryを使用して自動テストを実装しています。

### テストの実行

```bash
# ウォッチモードでテスト実行
npm test

# 一度だけテスト実行
npm test -- --run

# UI付きでテスト実行
npm run test:ui

# カバレッジレポート生成
npm run test:coverage
```

### テストファイル

- `src/App.test.tsx` - メインアプリケーションのテスト
- `src/components/SearchPanel.test.tsx` - 検索パネルのテスト
- `src/types/arcade.test.ts` - 型定義のテスト
- `src/data/arcades.test.ts` - データ検証テスト

### CI/CD

GitHub Actionsで2つのワークフローを自動実行：

**1. Test ワークフロー (test.yml)**
- トリガー: プルリクエスト & mainブランチへのプッシュ
- リンターチェック (`npm run lint`)
- ユニットテスト (`npm test`)
- ビルド確認

**2. Deploy ワークフロー (deploy.yml)**
- トリガー: mainブランチへのプッシュのみ
- ビルド
- GitHub Pagesへの自動デプロイ

## 🎨 スタイリング (SCSS)

このプロジェクトはSCSSを使用しています。

### ファイル構成

- `src/styles/_variables.scss` - カラー、スペーシング、フォントサイズなどの変数
- `src/styles/_mixins.scss` - レスポンシブ、ホバーエフェクトなどの再利用可能なmixin

### 使用例

```scss
@use './styles/variables' as *;
@use './styles/mixins' as *;

.my-component {
  color: $primary-color;
  padding: $spacing-lg;
  
  @include mobile {
    padding: $spacing-sm;
  }
}
```

## 📄 ライセンス

MIT License

## 🤝 コントリビューション

プルリクエストを歓迎します！新しいゲームセンターの追加や機能改善の提案をお待ちしています。

