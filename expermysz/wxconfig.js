(function function_name() {
  var ua = navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    // 如果是微信执行
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
    var url =  'https://pamap-gr.pingan.com.cn/do/wx/generateJSSDKConfig'
    var href = window.location.href
    // var href = "https://pamap-gr.pingan.com.cn/smt/activitys/expermysz/index.html"
    var XHR = new XMLHttpRequest()
    XHR.open('POST', url, false)
    XHR.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    
    XHR.onreadystatechange = function () {
      if (XHR.readyState == 4) {
        if (XHR.status == 200) {
          try {
            var res = JSON.parse(XHR.responseText);
            if (res && res.resultCode && "0" === res.resultCode) {
                var result = eval('(' + res.result + ')');
                wx.config(result);
            }
          } catch (e) {
          }
        } else {
        }
      }
    }
    XHR.send(serializeData({url: href, jsApiList: ["onMenuShareAppMessage", "onMenuShareTimeline"]}));
  }

  wx.ready(function() {
    console.log("wx初始化成功")
    var title = "我的深圳"
    var desc = "五一活动"
    var link = window.location.href
    var imgUrl = window.location.origin + '/activitys/logo_small.png'
    wx.onMenuShareAppMessage({
        title: title, // 分享标题
        desc: desc, // 分享描述
        link: link, // 分享链接
        imgUrl: imgUrl, // 分享图标
        type: '', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function() {
        },
        cancel: function() {
            // 用户取消分享后执行的回调函数
        }
    });
    wx.onMenuShareTimeline({
        title: title+"；"+desc, // 分享标题
        link: link, // 分享链接
        imgUrl: imgUrl, // 分享图标
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
  
})()