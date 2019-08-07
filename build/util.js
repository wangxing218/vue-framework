/**
 * webpack 相关工具类
 */
const path = require('path')
const childProcess = require('child_process')
const config = require('./config.js')

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
  getConfig(env){
    env = env || process.env.NODE_ENV || 'local'
    return Object.assign({},config.base, config[env] || {})
  },

  // 打开浏览器
  openUrl(url = '127.0.0.1') {
    var cmd = process.platform == 'darwin' ? 'open' : 'start'
    childProcess.exec(`${cmd} ${url}`)
  },

  // 获取本机ip
  getLocalIp() {
    var os = require("os");
    var networkInterfaces = os.networkInterfaces()
    let ip = localIp = '127.0.0.1'
    Object.keys(networkInterfaces).forEach(key => {
      let items = networkInterfaces[key]
      if (ip !== localIp) return
      for (var i in items) {
        var self = items[i]
        if (self.address && (self.address.match(/^(192\.168\.)|(10\.1\.)/))) {
          ip = self.address
          return false
        }
      }
    })
    return ip
  },
}