import axios from 'axios'
import { Toast } from 'vant'
import config from '../entry/config'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
nprogress.configure({
  showSpinner: false
})

// 通用配置
const instance = axios.create({
  baseURL: config.apiUrl,
  timeout: 15e3,
})

/**
 * ajax请求
 * @param {*} options 
 */
export async function ajax(options = {}) {
  if (options.nprogress === undefined) {
    nprogress.start()
    nprogress.inc(0.6)
  }
  try {
    const { data } = await instance({
      ...options,
    })
    if (data && Number(data.code) !== 0) {
      return handleError(data)
    }
    return data
  } catch (err) {
    return handleError({
      code: 504,
      msg: err.msg || '服务器出故障了~',
    })
  } finally {
    nprogress.done()
  }
  // 自动处理错误
  function handleError(err) {
    if (options.error === undefined) {
      Toast(err.msg)
    } else if (options.error === 'function') {
      options.error(err)
    }
    return Promise.reject(err)
  }
}

/**
 * 提交get请求
 * @param {*} url 
 * @param {*} params
 * @param {*} options 
 */
export function get(url, params, options) {
  return ajax({
    ...options,
    url,
    params,
    method: 'get'
  })
}


/**
 * 提交json请求
 * @param {*} url 
 * @param {*} data 
 * @param {*} options 
 */
export function post(url, data, options) {
  return ajax({
    ...options,
    method: 'post',
    url,
    data,
  })
}

/**
 * ajax上传文件请求
 * @param {*} url 
 * @param {*} data 
 * @param {*} options 
 */
export function postFile(url, data, options) {
  const formData = new FormData()
  for (let key in data) {
    formData.append(key, data[key])
  }
  return ajax({
    ...options,
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    url,
    data: formData,
  })
}


export default {
  ajax,
  get,
  post,
  postFile,
}