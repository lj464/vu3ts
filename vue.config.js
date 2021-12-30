module.exports = {
  // 基本路径
  publicPath: './',
  // 输出文件目录
  outputDir: 'dist',
  // webpack-dev-server 相关配置
  devServer: {
    port: 8888
  }, //webpack配置
  lintOnSave: false, //配置关闭eslint
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://152.136.185.210:5000',
        pathRewrite: {
          '^/api': ''
        },
        changeOrigin: true
      }
    }
  },
}
