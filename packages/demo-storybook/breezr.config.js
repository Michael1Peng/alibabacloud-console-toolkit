module.exports = {
  // Use webpack 5 plugins for modern build tooling
  plugins: [
    '@alicloud/console-toolkit-plugin-webpack5',
    '@alicloud/console-toolkit-plugin-webpack5-react',
    '@alicloud/console-toolkit-plugin-webpack5-typescript'
  ],
  
  // Development server configuration
  devServer: {
    port: 8080,
    hot: true
  },
  
  // Output configuration
  outputPath: './dist',
  
  // React configuration
  react: {
    version: 16
  },
  
  // TypeScript support
  typescript: {
    enabled: true
  }
};