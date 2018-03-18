const path = require('path')
const rootDist = path.resolve(__dirname, '../dist')

module.exports = {
  mode: 'development',
  devServer: {
    contentBase: rootDist,
    port: 8080,
    inline: true
  }
}