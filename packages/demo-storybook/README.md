# Storybook Demo with @alicloud/console-toolkit-core

这个包演示了如何将官方 Storybook 与 `@alicloud/console-toolkit-core` 集成，实现构建配置的复用和一致性。

## 特性

- ✅ 使用官方 Storybook 6.5.16 (兼容 React 16 + Webpack 5)
- ✅ 集成 `@alicloud/console-toolkit-core` 的插件系统
- ✅ 复用 breezr.config.js 的 webpack 配置
- ✅ 支持 TypeScript 和现代构建工具链
- ✅ 包含示例组件和完整的 Stories

## 快速开始

### 安装依赖

```bash
cd packages/demo-storybook
npm install
```

### 启动 Storybook

```bash
npm run storybook
```

这将启动 Storybook 开发服务器在 http://localhost:6006

### 构建 Storybook

```bash
npm run build-storybook
```

构建的静态文件将输出到 `storybook-static` 目录。

## 架构说明

### console-toolkit-core 集成

Storybook 通过 `.storybook/main.js` 中的 `webpackFinal` 钩子与 console-toolkit-core 集成：

1. **Service 初始化**: 创建 console-toolkit-core Service 实例
2. **插件加载**: 自动加载 `breezr.config.js` 中配置的插件
3. **配置合并**: 将 breezr 的 webpack 配置合并到 Storybook 配置中
4. **冲突处理**: 过滤掉可能与 Storybook 冲突的插件和规则

### 配置文件

- **breezr.config.js**: console-toolkit-core 的主配置
- **.storybook/main.js**: Storybook 主配置，包含集成逻辑
- **.storybook/preview.js**: Storybook 预览配置

### 支持的功能

- **Webpack 5**: 使用 `@storybook/builder-webpack5`
- **React 16**: 确保与项目 React 版本一致
- **TypeScript**: 完整的 TypeScript 支持
- **热更新**: 开发时的热模块替换
- **插件复用**: 自动复用 console-toolkit-core 的构建插件

## 示例组件

### Button

功能完整的按钮组件，支持：
- 多种尺寸 (small/medium/large)
- 主题变体 (primary/secondary)
- 禁用状态
- 自定义背景色
- 点击事件

### Card

容器组件，支持：
- 多种尺寸
- 可选标题
- 阴影效果
- 边框样式
- 可点击状态
- 丰富内容支持

## 技术细节

### 兼容性矩阵

| 组件 | 版本 | 状态 |
|------|------|------|
| Storybook | 6.5.16 | ✅ 支持 |
| React | 16.x | ✅ 支持 |
| Webpack | 5.x | ✅ 支持 |
| TypeScript | 4.x | ✅ 支持 |

### 集成流程

1. Storybook 启动时读取 `.storybook/main.js`
2. `webpackFinal` 钩子执行，创建 console-toolkit-core Service
3. Service 加载 `breezr.config.js` 和相关插件
4. 提取并合并 webpack 配置到 Storybook
5. 启动开发服务器或构建静态文件

## 故障排除

### 常见问题

1. **插件冲突**: 某些 webpack 插件可能与 Storybook 冲突，已在代码中过滤
2. **依赖版本**: 确保 React 和相关依赖版本兼容
3. **配置错误**: 检查 `breezr.config.js` 语法是否正确

### 调试

启动 Storybook 时会显示集成状态：
- ✅ 成功集成会显示加载的插件列表
- ⚠️ 失败时会显示警告并使用默认配置

## 扩展

你可以基于这个 demo 进行扩展：

1. 添加更多组件和 Stories
2. 集成更多 console-toolkit-core 插件
3. 自定义 Storybook 主题和配置
4. 添加自动化测试和 CI/CD

## 参考链接

- [Storybook Documentation](https://storybook.js.org/docs)
- [console-toolkit-core 架构文档](../../core/应用知识库/README.md)
- [Webpack 5 迁移指南](https://webpack.js.org/migrate/5/)