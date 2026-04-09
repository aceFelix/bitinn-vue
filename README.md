# Bitinn 比特客栈

一个基于 Vue 3 的现代化博客/文章管理平台前端项目。

## 项目简介

Bitinn（比特客栈）是一个功能完善的博客平台，提供文章创作、发布、管理等功能，支持用户注册登录、个人中心管理、社交登录等特性。

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Vue | 3.5.x | 渐进式 JavaScript 框架 |
| Vite | 6.x | 下一代前端构建工具 |
| Vue Router | 4.x | Vue.js 官方路由 |
| Pinia | 3.x | Vue 状态管理库 |
| Element Plus | 2.x | 基于 Vue 3 的组件库 |
| Axios | 1.x | HTTP 请求库 |
| Vditor | 3.x | Markdown 编辑器 |
| Vue Quill | 1.x | 富文本编辑器 |
| Sass | 1.x | CSS 预处理器 |

## 项目结构

```
bitinn-vue/
├── public/                 # 静态资源
├── src/
│   ├── api/                # API 接口
│   │   ├── article.js      # 文章相关接口
│   │   └── user.js         # 用户相关接口
│   ├── assets/             # 资源文件（图片等）
│   ├── components/         # 公共组件
│   │   ├── create/         # 创作页组件
│   │   ├── home/           # 首页组件
│   │   └── login/          # 登录页组件
│   ├── router/             # 路由配置
│   ├── stores/             # Pinia 状态管理
│   │   ├── token.js        # Token 状态
│   │   └── userInfo.js     # 用户信息状态
│   ├── styles/             # 全局样式
│   ├── utils/              # 工具函数
│   │   └── request.js      # Axios 封装
│   ├── views/              # 页面视图
│   │   ├── article/        # 文章相关页面
│   │   ├── login/          # 登录相关页面
│   │   └── user/           # 用户中心页面
│   ├── App.vue             # 根组件
│   └── main.js             # 入口文件
├── index.html              # HTML 模板
├── vite.config.js          # Vite 配置
├── jsconfig.json           # JS 配置
└── package.json            # 项目依赖配置
```

## 功能特性

### 用户模块
- 用户注册（支持邮箱）
- 用户登录
- 忘记密码（邮箱验证码重置）
- 社交登录（GitHub、Gitee）
- 个人信息管理
- 头像更新
- 密码修改

### 文章模块
- 文章浏览（首页推荐、热门、最新）
- 文章创作
- 文章编辑
- 文章分类管理
- 文章标签管理
- 草稿箱功能

### 界面特性
- 响应式布局
- 独立滚动区域
- 橙色主题设计
- 悬浮阴影动效

## 快速开始

### 环境要求

- Node.js >= 18.x
- npm >= 9.x 或 yarn >= 1.22.x

### 安装依赖

```bash
npm install
# 或
yarn install
```

### 开发模式

```bash
npm run dev
# 或
yarn dev
```

访问 http://localhost:5173 查看项目

### 生产构建

```bash
npm run build
# 或
yarn build
```

### 预览构建结果

```bash
npm run preview
# 或
yarn preview
```

## 开发配置

### API 代理配置

开发环境下，API 请求会代理到后端服务。配置位于 `vite.config.js`：

```javascript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, ''),
    },
  },
}
```

### 路由守卫

项目配置了路由守卫，未登录用户访问需要认证的页面会被重定向到登录页。

## 后端项目

后端项目位于 `../bitinn` 目录，基于 Spring Boot 3.x 开发。

## IDE 推荐

- [VS Code](https://code.visualstudio.com/)
- [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)（禁用 Vetur）

## 许可证

MIT License

## 作者

aceFelix
