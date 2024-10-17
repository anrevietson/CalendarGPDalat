const CACHE_NAME = 'static-v1';

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll([
        './js/saintcelebration.js',
        './js/calculateLunarSolar.js',
        './js/calculateChasuble.js',
        './js/calculateFeasts.js',
        './js/calculateBasic.js',
        './js/calculatenumberSunday.js',
        './js/calculatenumberSecondary.js',
        './js/calculateReading.js',
        './Reading/Sunday.js',
        './js/calculatebibleReads.js',
        './Reading/DailySeason.js',
        './Reading/DailyOrdinary1.js',
        './Reading/DailyOrdinary2.js',
        './Reading/SaintsBible.js',
        './Reading/Optionsaint.js',
        './Reading/eucharisticAdoration.js',
        './js/secondfeast.js',
        './js/calculateOptionbibleReads.js',
        './js/calculateEucharisticAdoration.js',
        './CalendarGPDalat.html',
        './style.css',
        './01.webp',
        './02.webp',  // Có vẻ bạn đã nhầm khi viết hai lần './01.webp', thay vào đó, mình để './02.webp'.
      ]);
    })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Sử dụng chiến lược network-first cho việc fetch tài nguyên
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(networkResponse => {
        // Nếu tải từ mạng thành công, lưu trữ vào cache và trả về dữ liệu
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      })
      .catch(() => {
        // Nếu không kết nối được với mạng, lấy từ cache
        return caches.match(event.request);
      })
  );
});
