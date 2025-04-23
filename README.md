# Next.js Cloudflare MD Todo

このプロジェクトは、Next.js、Hono、Cloudflare を使用して構築されたマークダウン形式で Todo を管理できるアプリケーションです。

## 使用技術

- **Next.js**: フロントエンドフレームワーク
- **Hono**: 高速な Web フレームワーク（バックエンド）
- **Cloudflare**: サーバーレス環境
- **TypeScript**: 型安全なプログラミング
- **Markdown**: Todo の説明をマークダウン形式で記述可能
- **Fetch API**: データ通信

## バージョン情報

- Node.js: `20.x` 以上
- Next.js: `15.x` 以上
- Hono: `4.x` 以上
- TypeScript: `5.x` 以上

## セットアップ手順

1. **リポジトリをクローン**

   ```bash
   git clone https://github.com/your-repo/nextjs-cloudflare-todo.git
   cd nextjs-cloudflare-todo
   ```

2. **依存関係をインストール**

   ```bash
   npm install
   ```

3. **環境変数を設定**
   プロジェクトルートに `.env.local` ファイルを作成し、以下の内容を記述します。

   ```
   API_URL=https://your-api-url.com
   ```

4. **開発サーバーを起動**

   ```bash
   npm run dev
   ```

5. **アプリケーションにアクセス**
   ブラウザで `http://localhost:3000` を開きます。

## 主な機能

- Todo の作成、取得、更新、削除
- マークダウン形式で Todo の説明を記述可能
- Cloudflare Workers を使用した高速なバックエンド
- 優先度設定
- 期限設定
