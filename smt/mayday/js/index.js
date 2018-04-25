(function () {
  if('serviceWorker' in navigator) {
    // navigator.serviceWorker.register('/smt/activitys/expermysz/sw.js');
  };
  var oMatte = document.getElementById('downloadMatte');
  var u = navigator.userAgent;
  var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
  var ua = window.navigator.userAgent.toLowerCase();// 获取判断用的对象
  var requestUrl ='';
  if(location.port =='48080'){
    requestUrl = '//smt-app-stg.pingan.com.cn:58080/smtapp/appVersion/queryVersionInfo.do';
  }else if(location.port =='48443'){
    requestUrl = '//smt-app-stg.pingan.com.cn:58443/smtapp/appVersion/queryVersionInfo.do';
  }else{
    requestUrl = '//smt-app.pingan.com.cn/smtapp/appVersion/queryVersionInfo.do';
  }
  var data = {
    url: ''
  }; 
  var paramsObj = {
    'data': {
      'deviceType': '1'
    }
  };
  var paramsStr = 'jsonData=' + JSON.stringify(paramsObj);
  console.log(paramsStr);
  var myxhr = new XMLHttpRequest();
  myxhr.open('POST', requestUrl, true);
  myxhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  myxhr.send(paramsStr);
  myxhr.onreadystatechange = function() {
    if (myxhr.readyState == 4) {
      if (myxhr.status == 200) {
        //  console.log(myxhr)
        data.url = JSON.parse(myxhr.responseText).data.newAppInfo.downloadUrl;
        // console.log(JSON.parse(myxhr.responseText))
      } else {
        alert(JSON.parse(myxhr.responseText).msg);
      }
    }
  };
  //
  var currentViewType = window.localStorage.getItem('currentViewType') || ''
  // $("img.lazyload").lazyload()
  var width = document.body.clientWidth
  document.querySelector("#btn").addEventListener("click",function(e){
    if(window._hmt){
      // 百度统计点击事件
      _hmt.push(['_trackEvent', 'button', 'click', '五一活动s_点我体验-' + currentViewType])
    }
    if(window._czc){
      _czc.push(['_trackEvent', 'button', 'click', '五一活动s_点我体验-' + currentViewType]);
    }
    // setTimeout(function(){
    //   // window.location.href = '/smt/downloadapp/h5/index.html' + location.search
    //   window.location.href = '/smt/downloadapp/app/downloadapp.html' + location.search
    // },300)
    
    if (isiOS) {
      window.location.href = 'itms-apps://itunes.apple.com/cn/app/id1363830499?mt=8';
      // window.open('itms-apps://itunes.apple.com/cn/app/id387682726?mt=8');
    }else if(ua.match(/MicroMessenger/i) == 'micromessenger' || ua.match(/AlipayClient/i) == 'alipayclient') {
        oMatte.style.display = 'block';
    }else{
      console.log(data.url =='');
      if(data.url ==''){
        myxhr.open('POST', requestUrl, true);
        myxhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        myxhr.send(paramsStr);
        myxhr.onreadystatechange = function() {
          if (myxhr.readyState == 4) {
          if (myxhr.status == 200) {
            //  console.log(myxhr)
            data.url = JSON.parse(myxhr.responseText).data.newAppInfo.downloadUrl;
            window.location.href = data.url;
          } else {
            alert(JSON.parse(myxhr.responseText).msg);
          }
          }
        };
      }else{
        window.location.href = data.url;
      }
    }
  }, false)
  

  oMatte.addEventListener("click", function(){
    oMatte.style.display = 'none';
  },false)
})();

