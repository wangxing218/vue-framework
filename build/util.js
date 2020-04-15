/**
 * webpack 相关工具类
 */
const path = require('path')
const childProcess = require('child_process')
const config = require('./config')

module.exports = {
  // 项目根路径
  rootResolve(dir = '') {
    return path.resolve(__dirname, '..', dir);
  },

  // app应用路径
  appResolve(dir = '') {
    return path.resolve(__dirname, '../app', dir);
  },

  //  编译目录路径
  distResolve(dir = '') {
    var folder = this.getConfig().dist
    return path.resolve(__dirname, folder, dir);
  },

  // 从config 获取不同环境 的用户配置
  getConfig(env) {
    env = env || process.env.NODE_ENV || 'prod'
    return Object.assign({}, config.prod, config[env] || {})
  },

}