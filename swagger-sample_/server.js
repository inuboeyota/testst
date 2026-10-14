const express = require('express');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');
const jsyaml = require('js-yaml');

const app = express();
app.use(express.json());

// OpenAPI 仕様の読み込みと Swagger UI の配信（/api-docs）
const spec = jsyaml.load(fs.readFileSync(path.join(__dirname, 'openapi.yaml'), 'utf8'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(spec));

// 簡易インメモリデータ
let tasks = [
  { id: 1, title: '買い物に行く', done: false },
  { id: 2, title: 'レポートを書く', done: true },
];
let nextId = 3;

// タスク一覧取得
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// タスク作成
app.post('/tasks', (req, res) => {
  const { title, done } = req.body;
  if (typeof title !== 'string' || title.length === 0) {
    return res.status(400).json({ message: 'title は必須です（1文字以上）' });
  }
  const task = { id: nextId++, title, done: Boolean(done) };
  tasks.push(task);
  res.status(201).json(task);
});

// タスク詳細取得
app.get('/tasks/:id', (req, res) => {
  const task = tasks.find((t) => t.id === Number(req.params.id));
  if (!task) return res.status(404).json({ message: 'タスクが見つかりません' });
  res.json(task);
});

// タスク削除
app.delete('/tasks/:id', (req, res) => {
  const exists = tasks.some((t) => t.id === Number(req.params.id));
  if (!exists) return res.status(404).json({ message: 'タスクが見つかりません' });
  tasks = tasks.filter((t) => t.id !== Number(req.params.id));
  res.status(204).end();
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`API server started: http://localhost:${PORT}/tasks`);
  console.log(`Swagger UI:        http://localhost:${PORT}/api-docs`);
});
