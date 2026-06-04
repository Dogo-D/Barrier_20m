# 待办清单 - Todo List

一款简洁高效的待办清单微信小程序，帮助您更好地管理日常任务。

## 功能特性

### 用户认证
- ✅ 用户注册功能
- ✅ 用户登录功能
- ✅ JWT Token认证
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

- **前端框架**: 微信小程序
- **后端框架**: Node.js + Express
- **数据库**: SQLite
- **认证方式**: JWT Token
- **密码加密**: bcryptjs
- **语言**: JavaScript

## 项目结构

```
MyProject/
├── .codebuddy/                # CodeBuddy配置文件
│   ├── project.config.json    # 项目配置
│   ├── launch.json            # 调试配置
│   └── settings.json          # 设置配置
├── assets/                    # 资源文件
│   └── icons/                 # 图标资源
├── backend/                   # 后端服务
│   ├── package.json           # 依赖配置
│   ├── server.js              # 服务器入口
│   └── todo.db                # SQLite数据库（运行后自动生成）
├── miniprogram/               # 微信小程序前端
│   ├── app.js                 # 应用入口
│   ├── app.json               # 应用配置
│   ├── app.wxss               # 全局样式
│   ├── utils/                 # 工具类
│   │   ├── api.js             # API接口封装
│   │   └── storage.js         # 本地存储工具（保留兼容）
│   ├── pages/
│   │   ├── index/             # 登录/注册页面
│   │   │   ├── index.wxml
│   │   │   ├── index.js
│   │   │   └── index.wxss
│   │   └── todos/             # 待办列表页面
│   │       ├── todos.wxml
│   │       ├── todos.js
│   │       └── todos.wxss
│   └── README.md              # 小程序说明
└── README.md                  # 项目总说明
```

## 安装与运行

### 后端服务

1. 进入后端目录
```bash
cd backend
```

2. 安装依赖
```bash
npm install
```

3. 启动服务器
```bash
npm start
```

服务器将运行在 http://localhost:3000

### 前端小程序

使用微信开发者工具打开 `miniprogram` 目录即可运行。

## API接口

| 接口 | 方法 | 描述 |
|------|------|------|
| `/api/register` | POST | 用户注册 |
| `/api/login` | POST | 用户登录 |
| `/api/todos` | GET | 获取待办列表 |
| `/api/todos` | POST | 添加待办 |
| `/api/todos/:id` | PUT | 更新待办 |
| `/api/todos/:id` | DELETE | 删除待办 |
| `/api/reminders` | GET | 获取待提醒的待办 |

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
- ✅ JWT Token authentication
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

- **Frontend Framework**: WeChat Mini Program
- **Backend Framework**: Node.js + Express
- **Database**: SQLite
- **Authentication**: JWT Token
- **Password Encryption**: bcryptjs
- **Language**: JavaScript

## Project Structure

```
MyProject/
├── .codebuddy/                # CodeBuddy configuration
│   ├── project.config.json    # Project config
│   ├── launch.json            # Debug configuration
│   └── settings.json          # Settings
├── assets/                    # Assets
│   └── icons/                 # Icon resources
├── backend/                   # Backend service
│   ├── package.json           # Dependencies
│   ├── server.js              # Server entry
│   └── todo.db                # SQLite database (auto-generated)
├── miniprogram/               # WeChat Mini Program
│   ├── app.js                 # App entry
│   ├── app.json               # App config
│   ├── app.wxss               # Global styles
│   ├── utils/                 # Utilities
│   │   ├── api.js             # API wrapper
│   │   └── storage.js         # Local storage utility
│   ├── pages/
│   │   ├── index/             # Login/Register page
│   │   │   ├── index.wxml
│   │   │   ├── index.js
│   │   │   └── index.wxss
│   │   └── todos/             # Todo list page
│   │       ├── todos.wxml
│   │       ├── todos.js
│   │       └── todos.wxss
│   └── README.md              # Mini-program documentation
└── README.md                  # Project documentation
```

## Installation & Running

### Backend Service

1. Enter backend directory
```bash
cd backend
```

2. Install dependencies
```bash
npm install
```

3. Start server
```bash
npm start
```

Server will run at http://localhost:3000

### Frontend Mini Program

Open `miniprogram` directory with WeChat Developer Tools.

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/register` | POST | User registration |
| `/api/login` | POST | User login |
| `/api/todos` | GET | Get todo list |
| `/api/todos` | POST | Add todo |
| `/api/todos/:id` | PUT | Update todo |
| `/api/todos/:id` | DELETE | Delete todo |
| `/api/reminders` | GET | Get pending reminders |

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