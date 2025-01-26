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

//-------------
const express = require('express');
const bodyParser = require('body-parser');
const { User } = require('./models'); // Sequelizeモデルをインポート
app.use(bodyParser.json());

// GET: ユーザー一覧取得
app.get('/users', async (req, res) => {
try {
    const users = await User.findAll();
    res.status(200).json(users);
} catch (error) {
    res.status(500).json({ error: error.message });
}
});

// POST: ユーザー作成
app.post('/users', async (req, res) => {
try {
    const { name, email, password } = req.body;
    const newUser = await User.create({ name, email, password });
    res.status(201).json(newUser);
} catch (error) {
    res.status(500).json({ error: error.message });
}
});

// GET: 特定ユーザー取得
app.get('/users/:id', async (req, res) => {
try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (user) {
res.status(200).json(user);
    } else {
res.status(404).json({ message: 'User not found' });
    }
} catch (error) {
res.status(500).json({ error: error.message });
}
});

// PUT: ユーザー更新
app.put('/users/:id', async (req, res) => {
try {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const user = await User.findByPk(id);
    if (user) {
    await user.update({ name, email, password });
    res.status(200).json(user);
    } else {
    res.status(404).json({ message: 'User not found' });
    }
} catch (error) {
    res.status(500).json({ error: error.message });
}
});

// DELETE: ユーザー削除
app.delete('/users/:id', async (req, res) => {
try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (user) {
    await user.destroy();
    res.status(204).send();
    } else {
    res.status(404).json({ message: 'User not found' });
    }
} catch (error) {
    res.status(500).json({ error: error.message });
}
});
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

