const BASE_URL = 'http://localhost:3000/api'

const MOCK_MODE = true

const testUser = {
  id: 'test-user-123',
  username: 'abcd'
}

const testToken = 'mock-token-12345'

const mockTodosByUser = {
  'test-user-123': [
    {
      id: 'todo-1',
      user_id: 'test-user-123',
      content: '完成项目文档',
      completed: 0,
      reminder_time: null,
      created_at: '2024-01-01T10:00:00Z'
    },
    {
      id: 'todo-2',
      user_id: 'test-user-123',
      content: '准备会议资料',
      completed: 0,
      reminder_time: null,
      created_at: '2024-01-01T11:00:00Z'
    },
    {
      id: 'todo-3',
      user_id: 'test-user-123',
      content: '代码审查',
      completed: 1,
      reminder_time: null,
      created_at: '2024-01-01T09:00:00Z'
    }
  ]
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

const MockApi = {
  register: function (username, password) {
    return new Promise((resolve) => {
      const userId = generateId()
      const user = { id: userId, username }
      
      const users = JSON.parse(wx.getStorageSync('mock_users') || '[]')
      users.push({ ...user, password })
      wx.setStorageSync('mock_users', JSON.stringify(users))
      
      wx.setStorageSync('mock_todos', JSON.stringify(mockTodosByUser))
      
      resolve({
        success: true,
        message: '注册成功',
        token: `mock-${userId}-token`,
        user
      })
    })
  },

  login: function (username, password) {
    return new Promise((resolve, reject) => {
      if (username === 'abcd' && password === '1234') {
        wx.setStorageSync('current_user_id', testUser.id)
        wx.setStorageSync('mock_todos', JSON.stringify(mockTodosByUser))
        resolve({
          success: true,
          message: '登录成功',
          token: testToken,
          user: testUser
        })
      } else {
        const users = JSON.parse(wx.getStorageSync('mock_users') || '[]')
        const user = users.find(u => u.username === username && u.password === password)
        if (user) {
          wx.setStorageSync('current_user_id', user.id)
          wx.setStorageSync('mock_todos', JSON.stringify(mockTodosByUser))
          resolve({
            success: true,
            message: '登录成功',
            token: `mock-${user.id}-token`,
            user: { id: user.id, username: user.username }
          })
        } else {
          reject(new Error('用户名或密码错误'))
        }
      }
    })
  },

  getTodos: function (token) {
    return new Promise((resolve) => {
      const userId = wx.getStorageSync('current_user_id') || 'test-user-123'
      const allTodos = JSON.parse(wx.getStorageSync('mock_todos') || JSON.stringify(mockTodosByUser))
      const userTodos = allTodos[userId] || []
      resolve(userTodos)
    })
  },

  addTodo: function (token, content, reminderTime) {
    return new Promise((resolve) => {
      const userId = wx.getStorageSync('current_user_id') || 'test-user-123'
      const allTodos = JSON.parse(wx.getStorageSync('mock_todos') || JSON.stringify(mockTodosByUser))
      
      if (!allTodos[userId]) {
        allTodos[userId] = []
      }
      
      const newTodo = {
        id: generateId(),
        user_id: userId,
        content,
        completed: 0,
        reminder_time: reminderTime,
        created_at: new Date().toISOString()
      }
      
      allTodos[userId].unshift(newTodo)
      wx.setStorageSync('mock_todos', JSON.stringify(allTodos))
      resolve({ success: true, message: '添加成功' })
    })
  },

  updateTodo: function (token, todoId, data) {
    return new Promise((resolve) => {
      const userId = wx.getStorageSync('current_user_id') || 'test-user-123'
      const allTodos = JSON.parse(wx.getStorageSync('mock_todos') || JSON.stringify(mockTodosByUser))
      
      if (!allTodos[userId]) {
        allTodos[userId] = []
      }
      
      allTodos[userId] = allTodos[userId].map(todo => {
        if (todo.id === todoId) {
          return {
            ...todo,
            content: data.content !== undefined ? data.content : todo.content,
            completed: data.completed !== undefined ? data.completed : todo.completed,
            reminder_time: data.reminderTime !== undefined ? data.reminderTime : todo.reminder_time
          }
        }
        return todo
      })
      
      wx.setStorageSync('mock_todos', JSON.stringify(allTodos))
      resolve({ success: true, message: '更新成功' })
    })
  },

  deleteTodo: function (token, todoId) {
    return new Promise((resolve) => {
      const userId = wx.getStorageSync('current_user_id') || 'test-user-123'
      const allTodos = JSON.parse(wx.getStorageSync('mock_todos') || JSON.stringify(mockTodosByUser))
      
      if (!allTodos[userId]) {
        allTodos[userId] = []
      }
      
      allTodos[userId] = allTodos[userId].filter(todo => todo.id !== todoId)
      wx.setStorageSync('mock_todos', JSON.stringify(allTodos))
      resolve({ success: true, message: '删除成功' })
    })
  },

  getReminders: function () {
    return new Promise((resolve) => {
      const userId = wx.getStorageSync('current_user_id') || 'test-user-123'
      const allTodos = JSON.parse(wx.getStorageSync('mock_todos') || JSON.stringify(mockTodosByUser))
      const userTodos = allTodos[userId] || []
      const now = new Date().toISOString()
      const reminders = userTodos.filter(t => t.reminder_time && t.reminder_time <= now && t.completed === 0)
      resolve(reminders)
    })
  }
}

const RealApi = {
  register: function (username, password) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${BASE_URL}/register`,
        method: 'POST',
        data: { username, password },
        success: (res) => {
          if (res.data.success) {
            resolve(res.data)
          } else {
            reject(new Error(res.data.message))
          }
        },
        fail: (err) => {
          reject(new Error('网络请求失败'))
        }
      })
    })
  },

  login: function (username, password) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${BASE_URL}/login`,
        method: 'POST',
        data: { username, password },
        success: (res) => {
          if (res.data.success) {
            resolve(res.data)
          } else {
            reject(new Error(res.data.message))
          }
        },
        fail: (err) => {
          reject(new Error('网络请求失败'))
        }
      })
    })
  },

  getTodos: function (token) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${BASE_URL}/todos`,
        method: 'GET',
        header: {
          'Authorization': `Bearer ${token}`
        },
        success: (res) => {
          if (res.data.success) {
            resolve(res.data.todos)
          } else {
            reject(new Error(res.data.message))
          }
        },
        fail: (err) => {
          reject(new Error('网络请求失败'))
        }
      })
    })
  },

  addTodo: function (token, content, reminderTime) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${BASE_URL}/todos`,
        method: 'POST',
        header: {
          'Authorization': `Bearer ${token}`
        },
        data: { content, reminderTime },
        success: (res) => {
          if (res.data.success) {
            resolve(res.data)
          } else {
            reject(new Error(res.data.message))
          }
        },
        fail: (err) => {
          reject(new Error('网络请求失败'))
        }
      })
    })
  },

  updateTodo: function (token, todoId, data) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${BASE_URL}/todos/${todoId}`,
        method: 'PUT',
        header: {
          'Authorization': `Bearer ${token}`
        },
        data: data,
        success: (res) => {
          if (res.data.success) {
            resolve(res.data)
          } else {
            reject(new Error(res.data.message))
          }
        },
        fail: (err) => {
          reject(new Error('网络请求失败'))
        }
      })
    })
  },

  deleteTodo: function (token, todoId) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${BASE_URL}/todos/${todoId}`,
        method: 'DELETE',
        header: {
          'Authorization': `Bearer ${token}`
        },
        success: (res) => {
          if (res.data.success) {
            resolve(res.data)
          } else {
            reject(new Error(res.data.message))
          }
        },
        fail: (err) => {
          reject(new Error('网络请求失败'))
        }
      })
    })
  },

  getReminders: function () {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${BASE_URL}/reminders`,
        method: 'GET',
        success: (res) => {
          if (res.data.success) {
            resolve(res.data.todos)
          } else {
            reject(new Error(res.data.message))
          }
        },
        fail: (err) => {
          reject(new Error('网络请求失败'))
        }
      })
    })
  }
}

const Api = MOCK_MODE ? MockApi : RealApi

module.exports = Api