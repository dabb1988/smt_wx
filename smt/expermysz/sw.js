// Files to cache
// 2018-03-28 v1.0.7
var cacheName = 'expermysz';
var appShellFiles = [
  '/smt/activitys/expermysz/index.html',
  '/smt/activitys/expermysz/css/index.css',
  '/smt/activitys/expermysz/js/index.js',
  '/smt/js/statistics.js',
  '/smt/activitys/expermysz/expermysz.manifes',
  '/smt/activitys/expermysz/favicon.ico',
  '/smt/activitys/expermysz/images/1.png',
  '/smt/activitys/expermysz/images/2.png',
  '/smt/activitys/expermysz/images/3.png',
  '/smt/activitys/expermysz/images/4.png',
  '/smt/activitys/expermysz/images/5.png',
  '/smt/activitys/expermysz/images/6.png',
  '/smt/activitys/expermysz/images/7.png',
  '/smt/activitys/expermysz/images/placeholder.png',
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