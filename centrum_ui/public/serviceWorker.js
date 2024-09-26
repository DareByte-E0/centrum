const CACHE_NAME = 'professor-version1';
const urlsToCache = [
  '/',
  '/index.html',
  '/offline.html',
  '/static/js/main.*.js',
  '/static/css/main.*.css',
];

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log(`Opened cache ${CACHE_NAME}`);
        return cache.addAll(urlsToCache);
      })
  );
});


// Fetch event
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Check if the response is valid and not a redirect
        if (!response || response.status !== 200 || response.type === 'opaqueredirect') {
          return response;
        }
        
        // Update the cache with the new response
        const responseToCache = response.clone();
        caches.open(CACHE_NAME)
          .then((cache) => {
            cache.put(event.request, responseToCache);
          });

        return response;
      })
      .catch(() => {
        // If fetch fails, try to match the request in the cache
        return caches.match(event.request)
          .then((response) => {
            return response || caches.match('/offline.html');
          });
      })
  );
});


// Activate event and clean up old caches
self.addEventListener('activate', (event) => {
  const cacheWhiteList = [];
  cacheWhiteList.push(CACHE_NAME);

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhiteList.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
