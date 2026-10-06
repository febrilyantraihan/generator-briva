/**
 * Partner Fatih - Generator BRIVA & Tahfidz YTPAI
 * High-Performance Offline-First Service Worker (PWA v1.0.0)
 * Fitur: Semantic Versioning, In-App Auto-Update & 100% Offline Capability
 */

const APP_VERSION = '1.0.0';
const CACHE_NAME = `partner-fatih-v${APP_VERSION}`;

// Seluruh aset inti yang wajib tersedia offline secara instan
const PRECACHE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './version.json',
  './favicon.ico',
  './favicon.png',
  './icon.svg',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png',
  './mascot.png',
  './css/main.css',
  './css/main.css?v=1.0.0',
  './js/app.bundle.js',
  './js/app.bundle.js?v=1.0.0',
  './js/vendor/tailwindcss.js',
  './js/vendor/lucide.min.js',
  './js/vendor/jszip.min.js',
  './js/vendor/xlsx.full.min.js',
  './js/vendor/pptxgen.bundle.js'
];

// 1. INSTALL EVENT: Pre-cache aset & langsung lewati masa tunggu (Skip Waiting)
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(async cache => {
      console.log('[PWA SW v30] Pre-caching offline assets...');
      await Promise.all(
        PRECACHE_ASSETS.map(url => {
          return cache.add(url).catch(err => {
            console.warn('[PWA SW] Pre-cache skip:', url, err);
          });
        })
      );
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

// 3. FETCH EVENT: Robust Offline-First Engine
self.addEventListener('fetch', event => {
  const request = event.request;

  // Hanya proses request GET yang valid
  if (request.method !== 'GET' || !request.url.startsWith('http')) {
    return;
  }

  // --- A. NAVIGASI HALAMAN UTAMA (index.html): NETWORK-FIRST DENGAN OFFLINE FALLBACK ---
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).then(networkResponse => {
        if (networkResponse && networkResponse.status === 200) {
          const clone = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(request, clone);
            cache.put('./index.html', clone.clone());
            cache.put('./', clone.clone());
          });
        }
        return networkResponse;
      }).catch(async () => {
        // Mode Offline: Sajikan dari cache lokal
        const cached = (await caches.match('./index.html')) || 
                       (await caches.match('./')) || 
                       (await caches.match(request));
        if (cached) return cached;
        return new Response(
          '<!DOCTYPE html><html lang="id"><head><meta charset="utf-8"><title>Partner Fatih - Offline</title><meta name="viewport" content="width=device-width, initial-scale=1"></head><body style="font-family:sans-serif;text-align:center;padding:40px;background:#0f172a;color:#fff;"><h2>Mode Offline</h2><p>Buka aplikasi ini sekali saat tersambung internet untuk memuat seluruh sistem offline.</p></body></html>',
          { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
        );
      })
    );
    return;
  }

  // --- B. ASET STATIS (CSS, JS, VENDOR, GAMBAR): CACHE-FIRST DENGAN BACKGROUND REVALIDATE ---
  event.respondWith(
    (async () => {
      // 1. Cek exact match di cache
      let cached = await caches.match(request);
      
      // 2. Jika tidak ada exact match, coba abaikan query string (?v=30 vs ?v=28)
      if (!cached) {
        cached = await caches.match(request, { ignoreSearch: true });
      }

      // Jalankan network fetch di background untuk update cache jika sedang online
      const fetchPromise = fetch(request).then(async networkResponse => {
        if (networkResponse && (networkResponse.status === 200 || networkResponse.type === 'opaque')) {
          const responseToCache = networkResponse.clone();
          const cache = await caches.open(CACHE_NAME);
          await cache.put(request, responseToCache);
        }
        return networkResponse;
      }).catch(() => null);

      // Jika ada di cache lokal, kembalikan instan (0ms, 100% offline-ready)
      if (cached) {
        return cached;
      }

      // Jika belum ada di cache (akses pertama), tunggu jaringan
      const networkResponse = await fetchPromise;
      if (networkResponse) {
        return networkResponse;
      }

      // Fallback cadangan jika offline dan exact URL berbeda sedikit
      const fallback = await caches.match(request, { ignoreSearch: true });
      if (fallback) return fallback;

      return new Response('', { status: 408, statusText: 'Offline Asset Unavailable' });
    })()
  );
});

// 4. MESSAGE EVENT: Menerima perintah skip waiting, cek versi, atau force refresh dari UI
self.addEventListener('message', event => {
  if (event.data) {
    if (event.data.type === 'SKIP_WAITING') {
      self.skipWaiting();
    }
    if (event.data.type === 'GET_VERSION') {
      if (event.ports && event.ports[0]) {
        event.ports[0].postMessage({ version: APP_VERSION });
      }
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
