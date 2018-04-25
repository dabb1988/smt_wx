(function () {
  if('serviceWorker' in navigator) {
    // navigator.serviceWorker.register('/smt/activitys/expermysz/sw.js');
  };
  var ua = navigator.userAgent.toLowerCase();
  // if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    // WX_CONFIG.wxShare('我的深圳', '五一活动', window.location.href , window.location.origin + '/smt/lib/images/common/logo_small.png')
    WX_CONFIG.wxShare('我的深圳', '五一活动', window.location.href , '../../lib/images/common/logo_small.png')
  // }
  
  console.log(WX_CONFIG)
})();

