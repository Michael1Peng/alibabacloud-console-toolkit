# Console Toolkit Demo

这是一个演示如何使用 `@alicloud/console-toolkit-core` 的 Service 类的示例项目。

## 项目结构

```
packages/demo/
├── package.json          # 项目依赖配置
├── breezr.config.js      # 工具链配置文件
├── src/
│   └── index.js          # 主程序入口
└── README.md            # 说明文档
```

## 核心功能演示

### 1. Service 初始化

```javascript
const service = new Service({
    name: 'biu',
    version: '0.1.0',
    cwd: process.cwd(),
    configFile: {
        presets: [],
        plugins: [
            '@ali/aliyun-com-biu-plugin-lowcode-material'
        ],
    }
});
```

### 2. 配置文件支持

项目会自动读取 `breezr.config.js` 配置文件，支持：
- 插件配置 (plugins)
- 预设配置 (presets)  
- 开发服务器配置 (devServer)
- 构建配置 (outputPath, publicPath)
- 自定义配置项

### 3. 运行测试

```bash
cd packages/demo
npm install
npm start
```

## 配置文件生效原理

1. **Service 构造函数**：接收 `ServiceOption` 参数，包含初始配置
2. **配置文件解析**：Service.init() 时会调用 `getConfig()` 读取项目配置
3. **插件合并**：将构造函数中的插件与配置文件中的插件合并
4. **插件初始化**：按顺序初始化所有插件

## 关键方法

- `service.getConfig()`: 获取合并后的项目配置
- `service.run(command, args)`: 运行指定命令
- `service.init(args)`: 初始化所有插件
- `service.invoke(apiName, ...args)`: 调用异步 API
- `service.invokeSync(apiName, ...args)`: 调用同步 API