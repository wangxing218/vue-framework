const webpack = require('webpack')
const webpackDevServer = require("webpack-dev-server")
const merge = require('webpack-merge')
const util = require('./util')


// 根据命令参数加载不同环境配置
const env = process.env.NODE_ENV = process.argv[2]
let config = require('./env.prod.js')
let configEnv = require(`./env.${env}.js`)
config = env !== 'prod' ? merge(config, configEnv) : config
console.log(`当前环境为 ：${env}`)


// webpack 编译
let compiler = webpack(config, (err, stats) => {
  if (err) throw err
  if (config.devServer) startServer()
  console.log(`编译成功...`)
})

// 启动服务器
function startServer() {
  var domain = '127.0.0.1'
  serverConfig = config.devServer
  let server = new webpackDevServer(compiler, serverConfig)
  console.log(`正在启动服务...`)
  server.listen(serverConfig.port, serverConfig.port, (err, stats) => {
    var url = `http://${domain}:${serverConfig.port}`
    util.openBrowser(url)
    console.log(`${url} 已启动...`)
  })
  return server
}