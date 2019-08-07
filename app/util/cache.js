/**
 * 简单缓存入口
 */

let Cache = {
  // 存取key前辍
  _prefix: '_sc_',
  // 数组或JSON标识前辍
  _objectPrefix: '_json_',
  // 存取工厂的方法
  _instance(type, key, value) {
    var _this = this
    var type = type || 'sessionStorage'
    var actions = window[type]
    if (key === null) { // 清空数据
      return actions.clear()
    }

    if (value === undefined) { // 获取
      var res = actions.getItem(_this._prefix + key)
      if (res && res.indexOf(_this._objectPrefix) == 0)
        res = JSON.parse(res.substr(_this._objectPrefix.length))
      return res
    } else if (value === null) { // 删除
      return actions.removeItem(_this._prefix + key)
    } else { // 存储
      var res = value
      if (typeof res === 'object')
        res = _this._objectPrefix + JSON.stringify(res)
      return actions.setItem(_this._prefix + key, res)
    }
  },
  // 永久存储，利用localStorage
  store(key, value) {
    return this._instance('localStorage', key, value)
  },
  // session存储，利用sessionStorage
  session(key, value) {
    return this._instance('sessionStorage', key, value)
  },
  
}

export default Cache