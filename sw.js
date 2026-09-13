const CACHE_NAME = 'hpt-smart-v1';
const urlsToCache = [
  './index.html',
  './manifest.json'
  // Thêm các file CSS, JS hoặc hình ảnh khác của bạn vào đây nếu có
];

// Cài đặt Service Worker và lưu cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Lấy dữ liệu từ cache khi offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});