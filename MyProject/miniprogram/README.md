# 待办清单 - Todo List

一款简洁高效的待办清单小程序，帮助您更好地管理日常任务。

## 功能特性

### 用户认证
- ✅ 用户注册功能
- ✅ 用户登录功能
- ✅ 本地数据存储
- ✅ 自动登录状态保持

### 待办管理
- ✅ 添加新待办
- ✅ 编辑待办内容
- ✅ 删除待办
- ✅ 标记完成状态
- ✅ 待办分类筛选（全部/待完成/已完成）

### 提醒功能
- ✅ 设置提醒日期和时间
- ✅ 定时弹窗提醒
- ✅ 后台运行时提醒

## 技术实现

- **框架**: 微信小程序
- **数据存储**: 本地存储 (wx.storage)
- **语言**: JavaScript
- **UI设计**: 简洁现代风格

## 项目结构

```
miniprogram/
├── app.js              # 应用入口
├── app.json            # 应用配置
├── app.wxss            # 全局样式
├── utils/
│   └── storage.js      # 本地存储工具
├── pages/
│   ├── index/          # 登录/注册页面
│   │   ├── index.wxml
│   │   ├── index.js
│   │   └── index.wxss
│   └── todos/          # 待办列表页面
│       ├── todos.wxml
│       ├── todos.js
│       └── todos.wxss
└── README.md           # 项目说明
```

## 使用说明

### 首次使用

1. 打开小程序后进入登录页面
2. 点击"还没有账号？立即注册"进行注册
3. 输入用户名和密码完成注册
4. 注册成功后自动登录并进入待办列表

### 添加待办

1. 在输入框中输入待办内容
2. 点击"+"按钮或按回车键添加
3. 在弹出的窗口中可以设置提醒时间
4. 点击"保存"完成添加

### 管理待办

- **标记完成**: 点击待办项即可切换完成状态
- **编辑**: 点击"编辑"按钮修改待办内容和提醒时间
- **删除**: 点击"删除"按钮移除待办（需确认）
- **筛选**: 使用底部筛选栏查看不同状态的待办

### 退出登录

点击"退出登录"按钮即可退出当前账号，返回登录页面。

---

# Todo List App

A simple and efficient todo list mini-program to help you manage daily tasks.

## Features

### User Authentication
- ✅ User registration
- ✅ User login
- ✅ Local data storage
- ✅ Auto login status persistence

### Todo Management
- ✅ Add new todos
- ✅ Edit todo content
- ✅ Delete todos
- ✅ Mark completion status
- ✅ Filter todos (All/Active/Completed)

### Reminder Functionality
- ✅ Set reminder date and time
- ✅ Popup reminder notification
- ✅ Background reminder

## Technical Implementation

- **Framework**: WeChat Mini Program
- **Data Storage**: Local Storage (wx.storage)
- **Language**: JavaScript
- **UI Design**: Clean and modern style

## Project Structure

```
miniprogram/
├── app.js              # App entry
├── app.json            # App configuration
├── app.wxss            # Global styles
├── utils/
│   └── storage.js      # Storage utility
├── pages/
│   ├── index/          # Login/Register page
│   │   ├── index.wxml
│   │   ├── index.js
│   │   └── index.wxss
│   └── todos/          # Todo list page
│       ├── todos.wxml
│       ├── todos.js
│       └── todos.wxss
└── README.md           # Project documentation
```

## Usage Guide

### First Time Use

1. Open the mini-program to enter the login page
2. Click "还没有账号？立即注册" to register
3. Enter username and password to complete registration
4. Automatically logged in and redirected to todo list

### Add Todo

1. Enter todo content in the input field
2. Click "+" button or press Enter to add
3. Set reminder time in the popup window (optional)
4. Click "Save" to complete

### Manage Todos

- **Mark Complete**: Click on a todo item to toggle completion status
- **Edit**: Click "编辑" (Edit) button to modify content and reminder
- **Delete**: Click "删除" (Delete) button to remove todo (confirmation required)
- **Filter**: Use the filter bar to view todos by status

### Logout

Click "退出登录" (Logout) button to sign out and return to login page.