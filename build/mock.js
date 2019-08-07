/**
 * mock请求处理，
 * app为webpack devserver传入的express实例
 */
const fs = require('fs')
const mock = require('mockjs')
const util = require('./util.js')
const mockDir = util.rootResolve('mock')
const mockList = util.getConfig().mock || false

var mockApp = (app) => {
  // 未配置直接返回
  if (!mockList) return
  // 请求前辍是字符串
  if (typeof mockList == 'string' && mockList.length > 1) {
    app.all(mockList + '/**', (req, res) => {
      let file = mockDir + req.path.replace(mockList, '') + '.js'
      readAndEval(file, req, res)
    })
    return
  }
  // 请求前辍有多个时
  if (Array.isArray(mockList) && mockList.length > 1) {
    mockList.forEach(item => {
      app.all(item + '/**', (req, res) => {
        let file = mockDir + item + req.path.replace(item, '') + '.js'
        readAndEval(file, req, res)
      })
    })
  }
}


/**
 * 读取文件并执行
 */
function readAndEval(file, req, res, callback) {
  var respTime = mock.Random.integer(0, 600)
  // 直接按url读取文件可以实现即时更新
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      res.json({
        file: file,
        fail: true,
        msg: 'mock数据不存在'
      })
      return
    }
    data = data.trim()

    // 是对象,直接返回
    if (data.indexOf('{') == 0 || data.indexOf('[') == 0) {
      setTimeout(() => {
        res.json(eval(`(${data})`))
      }, respTime)
      return
    }
    // 是文本返回
    if (data.match(/^(`|'|")/)) {
      setTimeout(() => {
        res.send(eval(data))
      }, respTime)
      return
    }
    // 是函数
    try {
      var resData = eval(`(${data})`)(req, res, mock)
      if (typeof resData == 'object') {
        setTimeout(() => {
          res.json(resData)
        }, respTime)
      } else if (resData !== undefined) {
        setTimeout(() => {
          res.send(resData)
        }, respTime)
      }
    } catch (e) {
      res.json({
        fail: true,
        file: file,
        msg: 'mock数据文件有语法错误'
      })
    }
  })
}

module.exports = mockApp