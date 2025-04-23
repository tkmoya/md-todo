# TODOアプリケーション データベーススキーマ

## テーブル定義

### todos

| カラム名 | データ型 | 制約 | デフォルト値 |
|---------|---------|------|-------------|
| id | INTEGER | PRIMARY KEY | |
| title | TEXT | NOT NULL | |
| description | TEXT | | |
| created_at | INTEGER | | CURRENT_TIMESTAMP |
| completed | INTEGER | | 0 |
| priority | TEXT | | 'medium' |
| due_date | INTEGER | | |
| category_id | INTEGER | FOREIGN KEY | |

### categories

| カラム名 | データ型 | 制約 | デフォルト値 |
|---------|---------|------|-------------|
| id | INTEGER | PRIMARY KEY | |
| name | TEXT | NOT NULL | |
| color | TEXT | | |
| created_at | INTEGER | | CURRENT_TIMESTAMP |

### tags

| カラム名 | データ型 | 制約 | デフォルト値 |
|---------|---------|------|-------------|
| id | INTEGER | PRIMARY KEY | |
| name | TEXT | NOT NULL | |
| color | TEXT | | |
| created_at | INTEGER | | CURRENT_TIMESTAMP |

### todo_tags

| カラム名 | データ型 | 制約 | デフォルト値 |
|---------|---------|------|-------------|
| id | INTEGER | PRIMARY KEY | |
| todo_id | INTEGER | FOREIGN KEY | |
| tag_id | INTEGER | FOREIGN KEY | |
| created_at | INTEGER | | CURRENT_TIMESTAMP |

## インデックス

| 対象テーブル | 対象カラム |
|------------|-----------|
| todos | category_id |
| todo_tags | todo_id |
| todo_tags | tag_id |
| todos | created_at |
| todos | priority |
| todos | completed |
| todos | due_date |