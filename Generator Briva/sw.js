/**
 * Partner Fatih - Generator BRIVA & Tahfidz YTPAI
 * High-Performance Offline-First Service Worker (PWA)
 * Menjamin 100% fungsionalitas aplikasi tanpa koneksi internet (Offline Mode)
 */

const CACHE_NAME = 'partner-fatih-offline-v13';

// Seluruh aset inti yang wajib tersedia offline secara instan
const PRECACHE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './favicon.ico',
  './favicon.png',
  './icon.svg',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png',
  './css/main.css',
  './js/app.bundle.js',
  './mascot.png'
];

// 1. INSTALL EVENT: Pre-cache seluruh aset offline
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[PWA SW] Pre-caching offline assets...');
      return cache.addAll(PRECACHE_ASSETS).catch(err => {
        console.warn('[PWA SW] Partial pre-cache warning (safe to proceed):', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// 2. ACTIVATE EVENT: Bersihkan cache versi lama & klaim klien aktif
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log('[PWA SW] Removing outdated cache:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3. FETCH EVENT: Cache-First dengan Dynamic Runtime Caching & 404 Rescue Fallback
self.addEventListener('fetch', event => {
  const request = event.request;

  // Hanya tangani request GET (abaikan non-GET atau chrome-extension://)
  if (request.method !== 'GET' || !request.url.startsWith('http')) {
    return;
  }

  event.respondWith(
    caches.match(request, { ignoreSearch: true }).then(cachedResponse => {
      if (cachedResponse) {
        // Aset ditemukan di cache -> Sajikan instan 0ms (100% Offline Ready)
        // Background update jika online (Stale-While-Revalidate)
        fetch(request).then(networkResponse => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then(cache => cache.put(request, networkResponse.clone()));
          }
        }).catch(() => {/* Silent offline */});

        return cachedResponse;
      }

      // Jika belum ada di cache -> Ambil dari network lalu simpan ke runtime cache
      return fetch(request).then(networkResponse => {
        // PERLINDUNGAN ANTI-404: Jika server (Vercel) mengembalikan 404 untuk navigasi halaman HTML
        if (!networkResponse || networkResponse.status !== 200) {
          if (request.mode === 'navigate') {
            return caches.match('./index.html', { ignoreSearch: true }).then(fallback => {
              return fallback || caches.match('./', { ignoreSearch: true }) || networkResponse;
            });
          }
          return networkResponse;
        }

        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(request, responseToCache);
        });

        return networkResponse;
      }).catch(() => {
        // Jika offline & request navigasi halaman HTML -> Sajikan index.html dari cache
        if (request.mode === 'navigate') {
          return caches.match('./index.html', { ignoreSearch: true }).then(fallback => {
            return fallback || caches.match('./', { ignoreSearch: true });
          });
        }
        // Fallback pencarian cache dengan mengabaikan query search
        return caches.match(request, { ignoreSearch: true });
      });
    })
  );
});

// 4. NOTIFICATION CLICK LISTENER (Mobile & Desktop App Notification)
self.addEventListener('notificationclick', event => {
  event.notification.close();
  const urlToOpen = (event.notification.data && event.notification.data.url) || './';
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(windowClients => {
      for (let client of windowClients) {
        if ((client.url.includes('index.html') || client.url.endsWith('/')) && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});

// 5. BACKGROUND PUSH NOTIFICATION LISTENER
self.addEventListener('push', event => {
  if (event.data) {
    try {
      const data = event.data.json();
      event.waitUntil(
        self.registration.showNotification(data.title || "Partner Fatih", {
          body: data.body || "Aplikasi siap digunakan offline.",
          icon: './icon-192.png',
          badge: './favicon.png',
          vibrate: [200, 100, 200],
          data: data.data || { url: './' }
        })
      );
    } catch (e) {
      event.waitUntil(
        self.registration.showNotification("Partner Fatih", {
          body: event.data.text(),
          icon: './icon-192.png',
          badge: './favicon.png'
        })
      );
    }
  }
});
