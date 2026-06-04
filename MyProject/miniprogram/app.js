App({
  globalData: {
    user: null,
    token: null,
    todos: []
  },

  onLaunch: function () {
    this.loadUser()
    this.checkReminders()
    setInterval(() => {
      this.checkReminders()
    }, 60000)
  },

  loadUser: function () {
    try {
      const user = wx.getStorageSync('user')
      const token = wx.getStorageSync('token')
      if (user && token) {
        this.globalData.user = user
        this.globalData.token = token
      }
    } catch (e) {
      console.error('加载用户失败', e)
    }
  },

  logout: function () {
    try {
      wx.removeStorageSync('token')
      wx.removeStorageSync('user')
      this.globalData.user = null
      this.globalData.token = null
    } catch (e) {
      console.error('登出失败', e)
    }
  },

  async checkReminders() {
    try {
      const Api = require('./utils/api.js')
      const todos = await Api.getReminders()
      todos.forEach(todo => {
        if (!todo.completed) {
          this.showReminder(todo)
        }
      })
    } catch (e) {
      console.error('检查提醒失败', e)
    }
  },

  showReminder: function (todo) {
    wx.showModal({
      title: '待办提醒',
      content: todo.content,
      showCancel: false,
      confirmText: '知道了'
    })
  }
})