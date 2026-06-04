const app = getApp()
const Api = require('../../utils/api.js')

Page({
  data: {
    user: null,
    token: null,
    todos: [],
    filteredTodos: [],
    filter: 'all',
    newTodoContent: '',
    showModal: false,
    modalContent: '',
    reminderDate: '',
    reminderTime: '',
    editingTodo: null
  },

  onLoad: function () {
    this.loadUser()
    this.loadTodos()
  },

  onShow: function () {
    this.loadUser()
    this.loadTodos()
  },

  loadUser: function () {
    const user = wx.getStorageSync('user')
    const token = wx.getStorageSync('token')
    this.setData({ user, token })
    app.globalData.user = user
    app.globalData.token = token
  },

  async loadTodos() {
    const { token } = this.data
    if (!token) {
      this.setData({ todos: [], filteredTodos: [] })
      return
    }

    try {
      const todos = await Api.getTodos(token)
      this.setData({ todos })
      this.applyFilter()
    } catch (error) {
      console.error('获取待办失败:', error)
    }
  },

  setFilter: function (filter) {
    this.setData({ filter })
    this.applyFilter()
  },

  applyFilter: function () {
    const { todos, filter } = this.data
    let filtered = todos

    switch (filter) {
      case 'active':
        filtered = todos.filter(t => t.completed === 0)
        break
      case 'completed':
        filtered = todos.filter(t => t.completed === 1)
        break
    }

    this.setData({ filteredTodos: filtered })
  },

  onNewTodoInput: function (e) {
    this.setData({ newTodoContent: e.detail.value })
  },

  handleAddTodo: function () {
    const content = this.data.newTodoContent.trim()
    if (!content) {
      wx.showToast({ title: '请输入待办内容', icon: 'none' })
      return
    }

    this.openAddModal(content)
  },

  openAddModal: function (content = '') {
    this.setData({
      showModal: true,
      modalContent: content,
      reminderDate: '',
      reminderTime: '',
      editingTodo: null
    })
  },

  handleEdit: function (e) {
    const todoId = e.currentTarget.dataset.id
    const todo = this.data.todos.find(t => t.id === todoId)
    if (todo) {
      const date = todo.reminder_time ? new Date(todo.reminder_time) : null
      this.setData({
        showModal: true,
        modalContent: todo.content,
        reminderDate: date ? this.formatDate(date) : '',
        reminderTime: date ? this.formatTimeValue(date) : '',
        editingTodo: todo
      })
    }
  },

  handleDelete: async function (e) {
    const todoId = e.currentTarget.dataset.id
    const { token } = this.data

    wx.showModal({
      title: '确认删除',
      content: '确定要删除这个待办吗？',
      success: async (res) => {
        if (res.confirm) {
          try {
            await Api.deleteTodo(token, todoId)
            this.loadTodos()
            wx.showToast({ title: '删除成功', icon: 'success' })
          } catch (error) {
            wx.showToast({ title: error.message, icon: 'none' })
          }
        }
      }
    })
  },

  toggleTodo: async function (e) {
    const todoId = e.currentTarget.dataset.id
    const todo = this.data.todos.find(t => t.id === todoId)
    const { token } = this.data

    if (todo) {
      try {
        await Api.updateTodo(token, todoId, { completed: todo.completed === 0 ? 1 : 0 })
        this.loadTodos()
      } catch (error) {
        wx.showToast({ title: error.message, icon: 'none' })
      }
    }
  },

  closeModal: function () {
    this.setData({ showModal: false })
  },

  onModalContentInput: function (e) {
    this.setData({ modalContent: e.detail.value })
  },

  onDateChange: function (e) {
    this.setData({ reminderDate: e.detail.value })
  },

  onTimeChange: function (e) {
    this.setData({ reminderTime: e.detail.value })
  },

  saveTodo: async function () {
    const content = this.data.modalContent.trim()
    if (!content) {
      wx.showToast({ title: '请输入待办内容', icon: 'none' })
      return
    }

    const { reminderDate, reminderTime, editingTodo, token } = this.data
    let reminderDateTime = null

    if (reminderDate && reminderTime) {
      reminderDateTime = new Date(`${reminderDate} ${reminderTime}`).toISOString()
    }

    try {
      if (editingTodo) {
        await Api.updateTodo(token, editingTodo.id, {
          content,
          reminderTime: reminderDateTime
        })
        wx.showToast({ title: '更新成功', icon: 'success' })
      } else {
        await Api.addTodo(token, content, reminderDateTime)
        this.setData({ newTodoContent: '' })
        wx.showToast({ title: '添加成功', icon: 'success' })
      }

      this.closeModal()
      this.loadTodos()
    } catch (error) {
      wx.showToast({ title: error.message, icon: 'none' })
    }
  },

  handleLogout: function () {
    wx.showModal({
      title: '确认退出',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          wx.removeStorageSync('token')
          wx.removeStorageSync('user')
          app.globalData.user = null
          app.globalData.token = null
          this.setData({ user: null, token: null, todos: [], filteredTodos: [] })
          wx.showToast({ title: '已退出', icon: 'success' })
          setTimeout(() => {
            wx.navigateTo({
              url: '/pages/index/index'
            })
          }, 1500)
        }
      }
    })
  },

  goToLogin: function () {
    wx.navigateTo({
      url: '/pages/index/index'
    })
  },

  formatDate: function (date) {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  },

  formatTimeValue: function (date) {
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    return `${hours}:${minutes}`
  },

  formatTime: function (isoString) {
    const date = new Date(isoString)
    return `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`
  }
})