const app = getApp()
const Api = require('../../utils/api.js')

Page({
  data: {
    isLoginMode: true,
    username: '',
    password: '',
    confirmPassword: ''
  },

  onLoad: function () {
    const token = wx.getStorageSync('token')
    const user = wx.getStorageSync('user')
    if (token && user) {
      app.globalData.user = user
      app.globalData.token = token
      wx.navigateTo({
        url: '/pages/todos/todos'
      })
    }
  },

  onUsernameInput: function (e) {
    this.setData({ username: e.detail.value })
  },

  onPasswordInput: function (e) {
    this.setData({ password: e.detail.value })
  },

  onConfirmPasswordInput: function (e) {
    this.setData({ confirmPassword: e.detail.value })
  },

  switchMode: function () {
    this.setData({
      isLoginMode: !this.data.isLoginMode,
      password: '',
      confirmPassword: ''
    })
  },

  handleLogin: async function () {
    const { username, password } = this.data

    if (!username.trim()) {
      wx.showToast({ title: '请输入用户名', icon: 'none' })
      return
    }

    if (!password.trim()) {
      wx.showToast({ title: '请输入密码', icon: 'none' })
      return
    }

    try {
      const result = await Api.login(username, password)
      
      wx.setStorageSync('token', result.token)
      wx.setStorageSync('user', result.user)
      app.globalData.user = result.user
      app.globalData.token = result.token

      wx.showToast({
        title: '登录成功',
        icon: 'success'
      })

      setTimeout(() => {
        wx.navigateTo({
          url: '/pages/todos/todos'
        })
      }, 1500)
    } catch (error) {
      wx.showToast({ title: error.message, icon: 'none' })
    }
  },

  handleRegister: async function () {
    const { username, password, confirmPassword } = this.data

    if (!username.trim()) {
      wx.showToast({ title: '请输入用户名', icon: 'none' })
      return
    }

    if (!password.trim()) {
      wx.showToast({ title: '请输入密码', icon: 'none' })
      return
    }

    if (password !== confirmPassword) {
      wx.showToast({ title: '两次输入的密码不一致', icon: 'none' })
      return
    }

    try {
      const result = await Api.register(username, password)
      
      wx.setStorageSync('token', result.token)
      wx.setStorageSync('user', result.user)
      app.globalData.user = result.user
      app.globalData.token = result.token

      wx.showToast({
        title: '注册成功',
        icon: 'success'
      })

      setTimeout(() => {
        wx.navigateTo({
          url: '/pages/todos/todos'
        })
      }, 1500)
    } catch (error) {
      wx.showToast({ title: error.message, icon: 'none' })
    }
  }
})