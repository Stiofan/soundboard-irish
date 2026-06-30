const CACHE_VERSION = 'v2';
const SHELL_CACHE = `shell-${CACHE_VERSION}`;
const AUDIO_CACHE = `audio-${CACHE_VERSION}`;

const SHELL_FILES = [
  './',
  './index.html',
  './phrases-data.js',
  './service-worker-register.js',
  './audio-engine.js',
  './app.js',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(SHELL_CACHE)
      .then(cache => cache.addAll(SHELL_FILES))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(k => k !== SHELL_CACHE && k !== AUDIO_CACHE)
          .map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== 'GET') return;

  // Don't intercept abair.ie calls — the audio engine handles those via IndexedDB
  if (url.hostname === 'synthesis.abair.ie') return;

  // Bundled audio files: cache-first, then network (so they work offline after first play)
  if (url.pathname.match(/\/audio\/[^/]+\.(mp3|wav)$/)) {
    event.respondWith(
      caches.open(AUDIO_CACHE).then(cache =>
        cache.match(request).then(cached => {
          if (cached) return cached;
          return fetch(request).then(response => {
            if (response.ok) cache.put(request, response.clone());
            return response;
          }).catch(() => new Response('', { status: 404 }));
        })
      )
    );
    return;
  }

  // App shell: cache-first, network fallback
  event.respondWith(
    caches.match(request).then(cached => {
      const networkFetch = fetch(request).then(response => {
        if (response.ok) {
          caches.open(SHELL_CACHE).then(c => c.put(request, response.clone()));
        }
        return response;
      });
      return cached || networkFetch.catch(() => new Response('Offline', { status: 503 }));
    })
  );
});
