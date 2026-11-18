module.exports = {
  publicPath: '/',
  configureWebpack: {
    optimization: {
      splitChunks: {
        cacheGroups: {
          three: {
            name: 'chunk-three',
            test: /[\\/]node_modules[\\/]three[\\/]/,
            priority: 20,
            chunks: 'all'
          }
        }
      }
    }
  }
}
