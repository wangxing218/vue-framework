const childProcess = require('child_process')


module.exports = {
  // 用浏览器打开一个链接
  openBrowser: function(url) {
    childProcess.exec(`start ${url}`)
  }
}