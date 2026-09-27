/**
 * Partner Fatih - Generator BRIVA & Tahfidz YTPAI
 * High-Performance Offline-First Service Worker (PWA v16)
 * Fitur: Seamless Auto-Update (Tanpa Uninstall/Reinstall) & 100% Offline Capability
 */

const CACHE_NAME = 'partner-fatih-v16';

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
  './css/main.css?v=16',
  './js/app.bundle.js?v=16',
  './mascot.png'
];

// 1. INSTALL EVENT: Pre-cache aset & langsung lewati masa tunggu (Skip Waiting)
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[PWA SW v16] Pre-caching offline assets...');
      return cache.addAll(PRECACHE_ASSETS).catch(err => {
        console.warn('[PWA SW] Pre-cache partial warning:', err);
      });
    })
  );
});

// 2. ACTIVATE EVENT: Bersihkan seluruh cache lama & langsung klaim semua klien
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log('[PWA SW] Menghapus cache versi lama:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3. FETCH EVENT: Network-First untuk Navigasi HTML (Auto-Update) + Stale-While-Revalidate untuk Aset
self.addEventListener('fetch', event => {
  const request = event.request;

  // Hanya proses request GET yang valid
  if (request.method !== 'GET' || !request.url.startsWith('http')) {
    return;
  }

  // --- A. NAVIGASI HALAMAN UTAMA (index.html): NETWORK-FIRST ---
  // Menjamin jika HP online langsung dapat tampilan & fitur terbaru tanpa perlu install ulang
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).then(networkResponse => {
        if (networkResponse && networkResponse.status === 200) {
          const clone = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
        }
        return networkResponse;
      }).catch(() => {
        // Mode Offline: Sajikan dari cache lokal
        return caches.match('./index.html') || caches.match('./');
      })
    );
    return;
  }

  // --- B. ASET STATIS (CSS, JS, GAMBAR): STALE-WHILE-REVALIDATE DENGAN EXACT URL ---
  event.respondWith(
    caches.match(request).then(cachedResponse => {
      const fetchPromise = fetch(request).then(networkResponse => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, responseToCache));
        }
        return networkResponse;
      }).catch(() => null);

      // Jika ada di cache, kirim instan 0ms; jika belum ada, tunggu jaringan
      return cachedResponse || fetchPromise || caches.match(request, { ignoreSearch: true });
    })
  );
});

// 4. MESSAGE EVENT: Menerima perintah skip waiting atau force refresh dari UI
self.addEventListener('message', event => {
  if (event.data) {
    if (event.data.type === 'SKIP_WAITING') {
      self.skipWaiting();
    }
    if (event.data.type === 'CLEAR_CACHE') {
      caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k))));
    }
  }
});

// 5. NOTIFICATION CLICK LISTENER (Mobile & Desktop App Notification)
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

// 6. BACKGROUND PUSH NOTIFICATION LISTENER
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
