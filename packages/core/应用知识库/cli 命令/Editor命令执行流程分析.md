# Editor 命令执行流程分析

## 分析结果

经过深入分析 `@alicloud/console-toolkit-core` 包的源代码，**发现核心包中并未包含 "editor" 命令的实现**。

## 核心架构分析

### 1. Service 类 (packages/core/src/Service.ts)

Service 类是整个工具链的核心，继承自 EventEmitter，负责：

#### 构造函数初始化流程
```typescript
constructor(options: ServiceOption) {
    this.cwd = options.cwd;
    this._serviceOptions = options;
    this.pkg = require(path.join(this.cwd, 'package.json'));
    this.commands = {};
    this.asyncMethods = {};
    this.syncMethods = {};
    this.plugins = this.resolveBuiltInPlugins(options.plugins);
    this._pluginStateMap = new Map();
}
```

#### 命令执行流程 (Service.run方法)
```typescript
public async run(name: string, args: CommandArgs = {}) {
    await this.init(args);                    // 1. 初始化所有插件
    let command = this.commands[name];        // 2. 查找命令
    
    if (!command && name) {                   // 3. 命令不存在处理
        error(`command "${name}" does not exist.`);
        exit(0);
    }
    
    if (!command || args.help || args.h) {    // 4. 默认显示帮助
        command = this.commands.help;
    }
    
    const { fn } = command;
    await fn(args);                           // 5. 执行命令函数
}
```

### 2. 插件初始化流程 (Service.init方法)

```typescript
public async init(args: CommandArgs) {
    // 1. 初始化内置插件
    for (const plugin of this.plugins) {
        await this.initPlugin(plugin, args);
    }
    
    // 2. 解析预设
    await this.resolvePresets(args);
    
    // 3. 初始化用户定义的插件
    const config = this.getConfig();
    for (const plugin of config.plugins) {
        // 解析和初始化插件
    }
}
```

### 3. 内置插件

通过 `resolveBuiltInPlugins` 方法可以看到，核心包只包含3个内置插件：

```typescript
private resolveBuiltInPlugins(plugins?: any[]): BreezrPlugin[] {
    const builtInPlugins = [
        './plugins/config/config',    // 配置管理插件
        './plugins/common/index',     // 通用功能插件
        './plugins/commands/help'     // 帮助命令插件
    ].map(idToPlugin);
    
    return [...builtInPlugins, ...resolvePlugins];
}
```

### 4. PluginAPI 系统 (packages/core/src/PluginAPI.ts)

插件通过 PluginAPI 注册命令：

```typescript
public registerCommand(
    name: string,
    opts: CommandOption,
    fn: CommandCallback
) {
    this.service.commands[name] = {
        fn,
        option: opts || {}
    };
}
```

### 5. 现有命令

基于源代码分析，核心包中只有一个内置命令：

- **help**: 显示帮助信息 (packages/core/src/plugins/commands/help.ts)

## Editor 命令缺失分析

### 搜索结果
1. 在所有插件目录中搜索 "editor" 关键词，未找到相关命令注册
2. 在所有 `registerCommand` 调用中搜索 "editor"，未找到匹配结果
3. 检查了所有插件包，包括 plugin-docs、plugin-storybook 等，均未发现 editor 命令

### 结论
**"editor" 命令在当前的 @alicloud/console-toolkit-core 包中不存在**。

## 可能的解决方案

如果需要添加 editor 命令，可以通过以下方式：

### 1. 创建插件方式
```typescript
// packages/plugin-editor/src/index.ts
import { PluginAPI, CommandArgs } from '@alicloud/console-toolkit-core';

export default (api: PluginAPI) => {
    api.registerCommand('editor', {
        description: '打开编辑器',
        usage: 'editor [options]'
    }, async (args: CommandArgs) => {
        // 编辑器逻辑实现
        console.log('打开编辑器...');
    });
};
```

### 2. 在现有插件中添加
可以在任何现有插件中通过 `api.registerCommand` 注册 editor 命令。

### 3. 通过配置文件加载
在 `breezr.config.js` 中添加包含 editor 命令的插件：
```javascript
module.exports = {
    plugins: [
        '@alicloud/console-toolkit-plugin-editor'
    ]
};
```

## 命令系统工作原理

1. **插件加载**: Service 构造时解析内置插件
2. **插件初始化**: Service.init() 时依次初始化所有插件
3. **命令注册**: 插件通过 PluginAPI.registerCommand() 注册命令
4. **命令执行**: Service.run() 查找并执行对应命令
5. **错误处理**: 命令不存在时显示错误并退出

## 总结

当前 @alicloud/console-toolkit-core 包是一个纯净的插件系统基础框架，不包含 "editor" 命令。所有具体功能都需要通过插件系统来扩展实现。