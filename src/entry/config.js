// prod env config 

const config = {
  apiUrl: '/api',
  env: 'prod'
}

const env = {}

// dev env config
env.dev = {
  env: 'dev'
}

// test env config
env.test = {
  env: 'testing'
}

Object.assign(config, env[process.env.APP_ENV] || {})

export default config