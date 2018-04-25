// Files to cache
// 2018-03-28 v1.0.7
var cacheName = 'fiveone';
var appShellFiles = [
  '/smt/activitys/fiveone/index.html',
  '/smt/activitys/fiveone/css/index.css',
  '/smt/activitys/fiveone/js/index.js',
  '/smt/js/statistics.js',
  '/smt/activitys/fiveone/fiveone.manifes',
  '/smt/activitys/fiveone/favicon.ico',
  '/smt/activitys/fiveone/images/1.png',
  '/smt/activitys/fiveone/images/2.png',
  '/smt/activitys/fiveone/images/3.png',
  '/smt/activitys/fiveone/images/4.png',
  '/smt/activitys/fiveone/images/5.png',
  '/smt/activitys/fiveone/images/placeholder.png',
];
// Installing Service Worker
self.addEventListener('install', function (e) {
  console.log("注册")
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      console.log("初次缓存")
      return cache.addAll(appShellFiles);
    })
  );
});

// Fetching content using Service Worker
self.addEventListener('fetch', function (e) {
  e.respondWith(
    caches.match(e.request).then(function (r) {
      console.log("拉取缓存", r)
      return r || fetch(e.request).then(function (response) {
        return caches.open(cacheName).then(function (cache) { 
          cache.put(e.request, response.clone());
          return response;
        });
      });
    })
  );
});