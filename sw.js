const CACHE_NAME = 'saarvice-v7-editorial-24';
const ASSETS = [
  './',
  './index.html',
  './jean.html',
  './drops.html',
  './getraenke.html',
  './catering.html',
  './presse.html',
  './css/style.css',
  './js/config.js',
  './js/main.js',
  './js/viral.js',
  './assets/fonts/plus-jakarta-sans-latin.woff2',
  './assets/fonts/plus-jakarta-sans-latin-ext.woff2',
  './assets/images/logo_stamp.png',
  './assets/images/hero_poster.webp',
  './assets/images/jean.jpg',
  './assets/images/jean-cool.jpg',
  './assets/images/jean_mascot.svg',
  './assets/images/promptgott_logo.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then((cached) => {
      const networked = fetch(event.request)
        .then((res) => {
          if (res && res.status === 200 && res.type === 'basic') {
            const clone = res.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone)).catch(() => {});
          }
          return res;
        })
        .catch(() => cached);
      return cached || networked;
    })
  );
});
