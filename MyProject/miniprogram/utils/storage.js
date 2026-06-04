const USER_KEY = 'user'
const USERS_KEY = 'users'
const TODOS_KEY = 'todos'

const Storage = {
  getUser: function () {
    try {
      return wx.getStorageSync(USER_KEY) || null
    } catch (e) {
      console.error('获取用户失败', e)
      return null
    }
  },

  setUser: function (user) {
    try {
      wx.setStorageSync(USER_KEY, user)
      return true
    } catch (e) {
      console.error('保存用户失败', e)
      return false
    }
  },

  removeUser: function () {
    try {
      wx.removeStorageSync(USER_KEY)
      return true
    } catch (e) {
      console.error('移除用户失败', e)
      return false
    }
  },

  getUsers: function () {
    try {
      return wx.getStorageSync(USERS_KEY) || []
    } catch (e) {
      console.error('获取用户列表失败', e)
      return []
    }
  },

  addUser: function (user) {
    try {
      const users = this.getUsers()
      users.push(user)
      wx.setStorageSync(USERS_KEY, users)
      return true
    } catch (e) {
      console.error('添加用户失败', e)
      return false
    }
  },

  getUserByUsername: function (username) {
    const users = this.getUsers()
    return users.find(u => u.username === username)
  },

  getTodos: function (userId) {
    try {
      const allTodos = wx.getStorageSync(TODOS_KEY) || []
      return allTodos.filter(todo => todo.userId === userId)
    } catch (e) {
      console.error('获取待办失败', e)
      return []
    }
  },

  getAllTodos: function () {
    try {
      return wx.getStorageSync(TODOS_KEY) || []
    } catch (e) {
      console.error('获取所有待办失败', e)
      return []
    }
  },

  addTodo: function (todo) {
    try {
      const todos = this.getAllTodos()
      todos.push(todo)
      wx.setStorageSync(TODOS_KEY, todos)
      return true
    } catch (e) {
      console.error('添加待办失败', e)
      return false
    }
  },

  updateTodo: function (todoId, updatedTodo) {
    try {
      const todos = this.getAllTodos()
      const index = todos.findIndex(t => t.id === todoId)
      if (index !== -1) {
        todos[index] = { ...todos[index], ...updatedTodo }
        wx.setStorageSync(TODOS_KEY, todos)
        return true
      }
      return false
    } catch (e) {
      console.error('更新待办失败', e)
      return false
    }
  },

  deleteTodo: function (todoId) {
    try {
      const todos = this.getAllTodos()
      const filtered = todos.filter(t => t.id !== todoId)
      wx.setStorageSync(TODOS_KEY, filtered)
      return true
    } catch (e) {
      console.error('删除待办失败', e)
      return false
    }
  },

  generateId: function () {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
  }
}

module.exports = Storage