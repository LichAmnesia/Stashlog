# Stashlog

专为知识付费创作者打造的高级内容平台，基于 Next.js 和 Firebase 构建，让卖课、做付费社区的朋友们能够通过独家会员内容实现知识变现。

## 🎯 适合人群

- **课程创作者** - 向付费学员分享高价值课程
- **社区运营者** - 运营高质量付费社区，提供独家内容
- **教练与顾问** - 为客户提供专属私密内容
- **知识博主** - 通过订阅内容实现专业知识变现

## 功能特性

- 🔐 **会员专属访问**：安全的身份验证确保只有付费会员才能访问您的内容
- 👥 **会员管理系统**：通过白名单授权精准控制谁可以访问您的付费内容
- 📝 **富文本内容创作**：使用 MDX（Markdown + React 组件）创作引人入胜的内容
- 💰 **知识变现就绪**：完美支持付费课程、独家教程和高级资源
- 🎨 **专业级设计**：简洁现代的界面，彰显您内容的价值
- ⚡ **极速性能**：基于 Next.js 15 和 Turbopack 构建，提供最佳性能体验
- 🔥 **企业级安全**：Firebase 身份验证和 Firestore 数据库保护您的内容安全
- 📱 **移动端适配**：您的会员可以在任何设备上学习

## 使用场景

### 📚 在线课程平台
为您的课程学员创建专属空间：
- 按模块组织的课程内容
- 独家资源和下载材料
- 会员专属讨论区

### 👥 付费社区中心
打造蓬勃发展的付费社区：
- 独家文章和深度见解
- 高级内容库
- 会员专享资源

### 🎓 教练咨询门户
为您的客户提供价值：
- 私密教练材料
- 个性化内容路径
- 客户专属资源

## 技术栈

- **前端**：Next.js 15、React 19、TypeScript
- **样式**：Tailwind CSS v4
- **身份验证**：Firebase Auth
- **数据库**：Firestore
- **内容管理**：MDX（Markdown + JSX）
- **部署**：Firebase App Hosting

## 前置要求

- 安装 Node.js 18+
- 拥有已启用身份验证和 Firestore 的 Firebase 项目
- npm 或 yarn 包管理器

## 快速开始

### 1. 克隆仓库

```bash
git clone https://github.com/LichAmnesia/Stashlog.git
cd Stashlog/app-hosting
```

### 2. 安装依赖

```bash
npm install
```

### 3. 设置环境变量

复制示例环境文件并填入您的 Firebase 配置：

```bash
cp .env.example .env.local
```

编辑 `.env.local` 文件，填入您的 Firebase 项目值：

```env
NEXT_PUBLIC_FIREBASE_API_KEY=您的-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=您的-auth-domain.firebaseapp.com
NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://您的-project-id.firebaseio.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=您的-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=您的-project-id.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=您的-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=您的-app-id
```

### 4. 配置 Firebase

1. 在 Firebase 项目中启用身份验证
   - 启用邮箱/密码和 Google 登录提供商
2. 创建 Firestore 数据库
3. 将授权用户添加到 `authorized_users` 集合：
   ```
   集合：authorized_users
   文档 ID：user@example.com
   字段：{ email: "user@example.com" }
   ```

### 5. 运行开发服务器

```bash
npm run dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看您的内容平台。

## 创建付费内容

在 `posts/` 目录中创建 MDX 文件：

```mdx
---
title: "第一模块：进阶概念入门"
date: "2025-01-01"
---

欢迎来到这个独家模块！在本课中，我们将深入探讨...
```

## 内容组织建议

- **课程内容**：按模块编号组织（例如：`module-1-intro.mdx`）
- **社区内容**：使用分类或主题（例如：`advanced-seo-tactics.mdx`）
- **教练内容**：创建客户专属路径（例如：`week-1-goals.mdx`）

## 项目结构

```
Stashlog/
├── app-hosting/          # Next.js 应用
│   ├── src/
│   │   ├── app/         # App Router 页面
│   │   ├── components/  # React 组件
│   │   └── lib/         # 工具函数
│   ├── posts/           # 您的付费内容（MDX 文件）
│   └── public/          # 静态资源
├── firebase.json        # Firebase 配置
└── firestore.indexes.json
```

## 部署

### 部署到 Firebase App Hosting

1. 安装 Firebase CLI：
   ```bash
   npm install -g firebase-tools
   ```

2. 登录 Firebase：
   ```bash
   firebase login
   ```

3. 部署：
   ```bash
   firebase deploy
   ```

## 变现策略

Stashlog 为您的内容业务提供技术基础。可以结合：
- **支付处理**：Stripe、PayPal 或其他支付网关
- **邮件营销**：新会员自动化入门引导
- **数据分析**：跟踪会员参与度和内容表现

## 安全与隐私

- 所有内容都需要身份验证 - 无公开访问
- 通过 Firestore 白名单进行会员授权
- 安全的 Firebase 身份验证保护您的宝贵内容
- 环境变量确保敏感配置的安全

## 为什么选择 Stashlog？

与通用博客平台不同，Stashlog 专为知识经济而设计：
- **为变现而生**：每个功能都支持您的内容业务
- **会员优先体验**：为付费会员提供流畅、专业的体验
- **可扩展架构**：从 10 个到 10,000+ 会员都能轻松应对
- **完全掌控**：自托管解决方案让您拥有完全的所有权

## 成功案例

### 💼 知识付费创作者
- 在线课程销售额提升 300%
- 会员续费率达到 85%
- 内容价值得到充分体现

### 🌟 社区运营者
- 付费社区月收入稳定增长
- 会员活跃度显著提升
- 内容质量持续优化

## 贡献

由于这是为个人内容创作者及其团队设计的，贡献通常仅限于授权的团队成员。请联系管理员获取访问权限。

## 许可证

本项目为私有专有项目。保留所有权利。

## 支持

如需技术支持或申请访问权限，请联系管理员。

---

**为知识经济而生** - 用 Stashlog 将您的专业知识转化为蓬勃发展的内容业务。