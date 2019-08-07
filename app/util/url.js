const Url = {
  parse: function(url) {
    url = url === undefined ? window.location.href : url
    if (url.indexOf('=') == -1)
      return {}
    var search = url.substring(url.lastIndexOf("?") + 1);
    var obj = {};
    var reg = /([^?&=]+)=([^?&=]*)/g;
    search.replace(reg, function(rs, $1, $2) {
      var name = decodeURIComponent($1)
      var val = decodeURIComponent($2)
      renderKey(name, val)
    });

    function renderKey(key, value) {
      if (key.indexOf('[') === -1) {
        obj[key] = String(value)
        return
      }
      if (key.indexOf('[]')) {
        var arrKey = key.replace(/\[\]/g, '')
        if (Array.isArray(obj[arrKey])) {
          obj[arrKey].push(String(value))
        } else {
          obj[arrKey] = [String(value)]
        }
      }
    }
    return obj
  },

  // 将json序列化为url请求体,从jquery中剥离出来的。
  encode: function(obj) {
    var prefix, res = [];

    function add(key, value) {
      res[res.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value == null ? "" : value);
    }

    function buildParams(prefix, obj) {
      var name;
      var rbracket = /\[\]$/;
      if (Array.isArray(obj)) {
        obj.forEach(function(value, index) {
          if (rbracket.test(prefix)) {
            add(prefix, value);
          } else {
            buildParams(prefix + "[" + (typeof value === "object" && value != null ? index : "") + "]", value);
          }
        });
      } else if (typeof obj === "object") {
        for (name in obj) {
          buildParams(prefix + "[" + name + "]", obj[name], add);
        }
      } else {
        add(prefix, obj);
      }
    }
    for (prefix in obj) {
      buildParams(prefix, obj[prefix]);
    }
    return res.join("&");
  }
}

export default Url