// 配置文件示例 - 这是 Service 会自动读取的配置文件
module.exports = {
  // 预设配置
  presets: [],
  
  // 插件配置 - 演示配置文件中的插件
  plugins: [
    // 暂时不加载插件，专注配置合并测试
    // 'config-file-plugin-example',
    // 'another-config-plugin',
    
    // 注释掉真实插件，避免找不到模块错误
    // '@alicloud/console-toolkit-plugin-webpack5',
    // '@alicloud/console-toolkit-plugin-webpack5-react',
    // '@ali/aliyun-com-biu-plugin-lowcode-material',
  ],
  
  // 其他配置选项
  devServer: {
    port: 8080,
    host: 'localhost'
  },
  
  // 构建相关配置
  outputPath: './dist',
  publicPath: '/',
  
  // 自定义配置
  customConfig: {
    enableMaterial: true,
    materialType: 'lowcode'
  },
  
  // 演示配置覆盖
  constructorConfig: {
    from: 'config-file',
    value: 'overridden',
    newProperty: 'added-by-config-file'
  }
};