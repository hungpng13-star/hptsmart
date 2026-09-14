const CACHE_NAME = 'hpt-control-v1';
const assetsToCache = [
  './index.html',
  ./dashboard.html',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(assetsToCache))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  // Không cache các request gọi API trực tiếp tới phần cứng ESP32
  if (event.request.url.includes('/status') || event.request.url.includes('/control')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request).catch(() => {
          // Fallback khi offline nếu cần thiết
        });
      })
  );
});