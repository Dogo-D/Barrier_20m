const express = require('express')
const sqlite3 = require('sqlite3').verbose()
const cors = require('cors')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const app = express()
const PORT = process.env.PORT || 3000
const SECRET_KEY = 'todo-secret-key-2024'

app.use(cors())
app.use(express.json())

const db = new sqlite3.Database('./todo.db', (err) => {
  if (err) {
    console.error('数据库连接失败:', err.message)
  } else {
    console.log('数据库连接成功')
    initDatabase()
  }
})

function initDatabase() {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `)

  db.run(`
    CREATE TABLE IF NOT EXISTS todos (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      content TEXT NOT NULL,
      completed INTEGER DEFAULT 0,
      reminder_time TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `)
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

app.post('/api/register', async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({ success: false, message: '用户名和密码不能为空' })
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    const userId = generateId()

    db.run('INSERT INTO users (id, username, password) VALUES (?, ?, ?)',
      [userId, username, hashedPassword],
      function(err) {
        if (err) {
          if (err.message.includes('UNIQUE constraint failed')) {
            return res.status(400).json({ success: false, message: '用户名已存在' })
          }
          return res.status(500).json({ success: false, message: '注册失败' })
        }

        const token = jwt.sign({ userId, username }, SECRET_KEY, { expiresIn: '7d' })
        res.json({ success: true, message: '注册成功', token, user: { id: userId, username } })
      }
    )
  } catch (err) {
    res.status(500).json({ success: false, message: '注册失败' })
  }
})

app.post('/api/login', (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({ success: false, message: '用户名和密码不能为空' })
  }

  db.get('SELECT * FROM users WHERE username = ?', [username], async (err, user) => {
    if (err) {
      return res.status(500).json({ success: false, message: '登录失败' })
    }

    if (!user) {
      return res.status(400).json({ success: false, message: '用户不存在' })
    }

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      return res.status(400).json({ success: false, message: '密码错误' })
    }

    const token = jwt.sign({ userId: user.id, username: user.username }, SECRET_KEY, { expiresIn: '7d' })
    res.json({ success: true, message: '登录成功', token, user: { id: user.id, username: user.username } })
  })
})

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ success: false, message: '未授权' })
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ success: false, message: 'token无效' })
    }
    req.user = decoded
    next()
  })
}

app.get('/api/todos', authenticateToken, (req, res) => {
  const { userId } = req.user
  db.all('SELECT * FROM todos WHERE user_id = ? ORDER BY created_at DESC', [userId], (err, todos) => {
    if (err) {
      return res.status(500).json({ success: false, message: '获取待办失败' })
    }
    res.json({ success: true, todos })
  })
})

app.post('/api/todos', authenticateToken, (req, res) => {
  const { userId } = req.user
  const { content, reminderTime } = req.body

  if (!content) {
    return res.status(400).json({ success: false, message: '待办内容不能为空' })
  }

  const todoId = generateId()
  db.run('INSERT INTO todos (id, user_id, content, reminder_time) VALUES (?, ?, ?, ?)',
    [todoId, userId, content, reminderTime || null],
    function(err) {
      if (err) {
        return res.status(500).json({ success: false, message: '添加待办失败' })
      }
      res.json({ success: true, message: '添加成功' })
    }
  )
})

app.put('/api/todos/:id', authenticateToken, (req, res) => {
  const { userId } = req.user
  const todoId = req.params.id
  const { content, completed, reminderTime } = req.body

  db.run(
    'UPDATE todos SET content = COALESCE(?, content), completed = COALESCE(?, completed), reminder_time = COALESCE(?, reminder_time) WHERE id = ? AND user_id = ?',
    [content, completed, reminderTime, todoId, userId],
    function(err) {
      if (err) {
        return res.status(500).json({ success: false, message: '更新待办失败' })
      }
      if (this.changes === 0) {
        return res.status(404).json({ success: false, message: '待办不存在' })
      }
      res.json({ success: true, message: '更新成功' })
    }
  )
})

app.delete('/api/todos/:id', authenticateToken, (req, res) => {
  const { userId } = req.user
  const todoId = req.params.id

  db.run('DELETE FROM todos WHERE id = ? AND user_id = ?', [todoId, userId], function(err) {
    if (err) {
      return res.status(500).json({ success: false, message: '删除待办失败' })
    }
    if (this.changes === 0) {
      return res.status(404).json({ success: false, message: '待办不存在' })
    }
    res.json({ success: true, message: '删除成功' })
  })
})

app.get('/api/reminders', (req, res) => {
  const now = new Date().toISOString()
  db.all('SELECT * FROM todos WHERE reminder_time IS NOT NULL AND reminder_time <= ? AND completed = 0', [now], (err, todos) => {
    if (err) {
      return res.status(500).json({ success: false, message: '获取提醒失败' })
    }
    res.json({ success: true, todos })
  })
})

app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`)
})