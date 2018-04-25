
/**
 * 微信js-sdk封装
 * author:liubo055
 */
(function function_name() {
  var WX_CONFIG = {}

  WX_CONFIG.initWxConfig = function (_href, _jsApiList) {
    var _url =  'https://pamap-gr.pingan.com.cn/do/wx/generateJSSDKConfig'
    var XHR = new XMLHttpRequest()
    XHR.open('POST', _url, false)
    XHR.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    
    XHR.onreadystatechange = function () {
      if (XHR.readyState == 4) {
        if (XHR.status == 200) {
          try {
            var res = JSON.parse(XHR.responseText);
            if (res && res.resultCode && "0" === res.resultCode) {
                var result = eval('(' + res.result + ')');
                result.debug = true
                wx.config(result);
            }
          } catch (e) {
          }
        } else {
        }
      }
    }
    XHR.send(serializeData({url: _href, jsApiList: _jsApiList}));
  }

  WX_CONFIG.wxShare = function (_title, _desc, _link, _imgUrl) {
    this.initWxConfig(_link, ["onMenuShareAppMessage", "onMenuShareTimeline"])
    wx.ready(function() {
    console.log('初始化成功')
    wx.onMenuShareAppMessage({
        title: _title, // 分享标题
        desc: _desc, // 分享描述
        link: _link, // 分享链接
        imgUrl: _imgUrl, // 分享图标
        type: '', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function() {
        },
        cancel: function() {
            // 用户取消分享后执行的回调函数
        }
    });
    wx.onMenuShareTimeline({
        title: _title+"；"+_desc, // 分享标题
        link: _link, // 分享链接
        imgUrl: _imgUrl, // 分享图标
        success: function() {
            // 用户确认分享后执行的回调函数
        },
        cancel: function() {
            // 用户取消分享后执行的回调函数
        }
    });
    });
    wx.error(function(res) {
    console.log(res)
    })
  }

  function serializeData(obj, traditional) {
    function serialize(params, obj, traditional, scope) {
        var type, array = obj instanceof Array,
            hash = false
        for (var key in obj) {
            var value = obj[key]
            type = typeof value
            if (scope) key = traditional ? scope :
                scope + '[' + (hash || type == 'object' || type == 'array' ? key : '') + ']'
                // handle data in serializeArray() format
            if (!scope && array) params.add(value.name, value.value)
                // recurse into nested objects
            else if (type == "array" || (!traditional && type == "object"))
                serialize(params, value, traditional, key)
            else params.add(key, value)
        }
    }
    var params = []
    params.add = function(key, value) {
        if (typeof value == 'function') return
        if (value == null) value = ""
        this.push(encodeURIComponent(key) + '=' + encodeURIComponent(value))
    }
    serialize(params, obj, traditional)
    return params.join('&').replace(/%20/g, '+')
  }

  window.WX_CONFIG = WX_CONFIG
})()
