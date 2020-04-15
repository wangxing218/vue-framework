const util = require('./util')
const sshNode = require('node-ssh')

// 根据命令参数加载不同环境配置
process.env.NODE_ENV = process.argv[2] || 'prod'
const config = util.getConfig()
const localDir = util.distResolve()
const remoteDir = config.deploy.remoteDir


const ssh = new sshNode()
console.log('Current env: ', process.env.NODE_ENV)
console.log('Connecting remote server...')
ssh.connect({
  host: config.deploy.host,
  username: config.deploy.username || 'root',
  port: config.deploy.port || 22,
  password: config.deploy.password,
}).then(() => {
  console.log('Connected!')
  console.log(`Putting files from "${localDir}" to "${remoteDir}" !`)
  return ssh.putDirectory(localDir, remoteDir, {
    recursive: true,
    concurrency: 1,
    validate: itemPath => {
      return true
    },
    tick: (localPath, remotePath, error) => {
      const localRealPath = localPath.substr(localDir.length)
      const remoteRealPath = remotePath.substr(remoteDir.length)
      if (error) {
        console.error(`--put file FAIL: ${localRealPath} -> ${remoteRealPath}`)
      } else {
        console.log(`--put file OK: ${localRealPath} -> ${remoteRealPath}`)
      }
    }
  })
}, () => {
  console.error('Connect fail !')
}).then(status => {
  ssh.dispose()
  if (status) {
    console.log('Deploy success!')
  } else {
    console.log('Deploy fail!')
  }
}).catch(() => {
  ssh.dispose()
  console.log('Deploy error!')
})