const BASE_URL = 'http://localhost:3000/api'

const Api = {
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

module.exports = Api