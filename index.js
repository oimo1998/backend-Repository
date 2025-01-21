// 1. 必要なモジュールを読み込む
const express = require('express');
const app = express();

// 2. サーバーの設定
const PORT = 3000;

// 3. ルート（エンドポイント）を定義
app.get('/', (req, res) => {
    res.send('こんにちは！これは簡単なNode.jsバックエンドです。');
});

// 4. サーバーを起動
app.listen(PORT, () => {
    console.log(`サーバーが起動しました！ http://localhost:${PORT}`);
});
