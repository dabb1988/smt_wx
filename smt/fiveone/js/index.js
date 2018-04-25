(function () {
  if('serviceWorker' in navigator) {
    // navigator.serviceWorker.register('/smt/activitys/expermysz/sw.js');
  };
  // 微信分享
  var ua = navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    WX_CONFIG.wxShare('诚信，深圳更出彩', '五一大鹏预约通行', window.location.href, window.location.origin + '/smt/images/common/logo_small.png')
  }
  // 二维码
  var currentViewType = window.localStorage.getItem('currentViewType') || ''
  var qrcode = document.getElementById('qrcode');
  // var geturl = window.location.origin + '/smt/downloadapp/h5/index.html' + location.search
  var geturl = window.location.origin + '/smt/downloadapp/app/downloadapp.html' + location.search
  var width = window.document.body.clientWidth * 0.266666
  new QRCode(qrcode, {
    text: geturl,
    width: width,
    height: width,
    correctLevel: QRCode.CorrectLevel.H
  });
  // $("img.lazyload").lazyload()
  var width = document.body.clientWidth
  document.querySelector("#btn").addEventListener("click",function(e){
    // x 范围 26.7 ~ 72
    // y 范围 16 ~ 24
    // var e = event.touches[0]
    // console.log(e)
    // console.log(event)
    var x = parseInt(e.offsetX * 100 / width)
    var y = parseInt(e.offsetY * 100 / width)
    if (x >= 26 && x <= 72 && y >=16 && y<=24) {
      if(window._hmt){
        // 百度统计点击事件
        _hmt.push(['_trackEvent', 'button', 'click', '五一活动l_点我体验-' + currentViewType])
      }
      if(window._czc){
        _czc.push(['_trackEvent', 'button', 'click', '五一活动l_点我体验-' + currentViewType]);
      }
      setTimeout(function(){
        window.location.href = '/smt/downloadapp/h5/index.html'+ location.search
        // window.location.href = '/smt/downloadapp/app/downloadapp.html'+ location.search
      },300)
      
    }
  }, false)
  
})();

