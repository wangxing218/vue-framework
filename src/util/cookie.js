var cookie = {
  get(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
      return encodeURIComponent(unescape(arr[2]));
    else
      return null;
  },
  set(name, value, config) {
  	if(value === undefined) return
    var opt = {
      path: '/',
      age: 0,
      domain: null,
    }
    config = config || {}
    opt.path = typeof config.path == 'string' ? config.path : opt.path
    opt.age = config.age || opt.age
    opt.domain = config.domain || opt.domain

    var time = 0
    var dict = {
      'd': 24 * 60 * 60 * 1000,
      'h': 24 * 60 * 60 * 1000,
      'm': 24 * 60 * 60 * 1000
    }
    
    if (typeof opt.age == 'number') {
      time = opt.age * 1000
    } else {
      time = parseInt(opt.age) * dict[opt.age.match(/\w$/)[0]]
    }
    var exp = new Date(new Date().getTime() + time)
    var cookieArr = [name + "=" + escape(encodeURIComponent(value))]

    time && cookieArr.push('expires=' + exp.toGMTString())
    opt.path && cookieArr.push('path=' + opt.path)
    opt.domain && cookieArr.push('domain=' + opt.domain)

    console.log(cookieArr.join(';'))
    document.cookie = cookieArr.join(';')
  },
  del(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
      document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
  },
  clear() {
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
      for (var i = keys.length; i--;)
        document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
    }
  }
}

export default cookie