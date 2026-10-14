# Swagger Sample（OpenAPI 3.0 + Express + Swagger UI）

OpenAPI 3.0 に準拠した RESTful API の学習用サンプルです。簡易タスク管理 API（CRUD）を Swagger UI 付きで提供します。

## 前提条件

- **Node.js v18 以上**（`node --version` で確認）

## セットアップ手順

### 1. 依存パッケージのインストール

```powershell
cd swagger-sample
npm install
```

### 2. サーバーの起動

```powershell
npm start
```

以下のように表示されれば起動成功です：

```
API server started: http://localhost:3000/tasks
Swagger UI:        http://localhost:3000/api-docs
```

終了は `Ctrl+C` です。

### 3. Swagger UI を開く

ブラウザで以下のURLにアクセスします：

```
http://localhost:3000/api-docs
```

エンドポイントの一覧・パラメータ・レスポンスのスキーマが表示されます。

### 4. ブラウザ上で API を試す

1. 試したいエンドポイント（例： `POST /tasks`）をクリックして展開
2. 右上の **Try it out** を押す
3. Request body のJSONを編集（例: `{"title": "会議の準備"}`）
4. **Execute** を押す
5. 画面下にレスポンス（`201` など）と body が表示される

## エンドポイント一覧

| メソッド | パス | 説明 |
|---|---|---|
| GET | `/tasks` | タスク一覧取得 |
| POST | `/tasks` | タスク作成（`title` 必須） |
| GET | `/tasks/{id}` | タスク詳細取得 |
| DELETE | `/tasks/{id}` | タスク削除 |

PowerShell から試す場合（GET のみ。日本語bodyはSwagger UIか `curl` 推奨）：

```powershell
Invoke-RestMethod http://localhost:3000/tasks
```

## ファイル構成

```
swagger-sample/
├── package.json      # 依存パッケージ（express, swagger-ui-express, js-yaml）
├── openapi.yaml      # OpenAPI 3.0.3 仕様書（このファイルが Swagger UI の元）
├── server.js         # Express 実装（openapi.yaml を読み込んで Swagger UI を配信）
└── node_modules/     # npm install で生成
```

## カスタマイズ方法

- **APIの仕様を変えたい** → `openapi.yaml` を編集（`paths` にエンドポイント、`components/schemas` に型を追加）→ 再起動で Swagger UI に反映
- **APIの動作を変えたい** → `server.js` を編集
- **ポートを変えたい** → `server.js` 末尾の `const PORT = 3000` を変更し、`openapi.yaml` の `servers.url` も合わせて更新

## 補足

- タスクのデータはメモリ上に保持されるため、サーバー再起動で初期状態（タスク2件）に戻ります
- OpenAPI/Swagger そのものは言語非依存の仕様です。実装言語を変える場合（FastAPI、ASP.NET Core など）でも `openapi.yaml` の書き方はそのまま活かせます
