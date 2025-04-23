import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/drizzle/schema.ts", // テーブルスキーマ記述ファイル
  out: "./src/drizzle/migrations", // マイグレーションファイル出力先
  dialect: "sqlite",
});
