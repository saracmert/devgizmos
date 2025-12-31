const CACHE_NAME = 'devgizmos-cache-v1';
const OFFLINE_URL = '/offline.html';

// Önbelleğe alınacak statik dosyalar
const STATIC_CACHE_URLS = [
  '/',
  '/offline.html',
  '/manifest.json'
];

// Service Worker kurulumu
self.addEventListener('install', (event) => {
  console.log('DevGizmos Service Worker installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('DevGizmos cache opened');
        // Cache essential files one by one to handle failures gracefully
        return Promise.allSettled(
          STATIC_CACHE_URLS.map(url => 
            fetch(url).then(response => {
              if (response.ok) {
                return cache.put(url, response);
              }
              console.warn(`Failed to cache ${url}: ${response.status}`);
            }).catch(error => {
              console.warn(`Failed to fetch ${url}:`, error);
            })
          )
        );
      })
      .then(() => {
        console.log('DevGizmos essential files cached');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('DevGizmos cache installation failed:', error);
      })
  );
});

// Service Worker aktivasyonu
self.addEventListener('activate', (event) => {
  console.log('DevGizmos Service Worker activating...');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('DevGizmos deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('DevGizmos Service Worker activated');
      return self.clients.claim();
    })
  );
});

// Fetch olaylarını yakalama (Network-First stratejisi)
self.addEventListener('fetch', (event) => {
  // Sadece GET isteklerini önbelleğe al
  if (event.request.method !== 'GET') {
    return;
  }

  // Dış domainleri (API çağrıları) önbelleğe alma
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.match(event.request)
          .then((cachedResponse) => {
            // Network-first strategy for better development experience
            return fetch(event.request)
              .then((response) => {
                // Geçerli response kontrolü
                if (!response || response.status !== 200 || response.type !== 'basic') {
                  return cachedResponse || response;
                }

                // Response'u klonla (stream yalnızca bir kez okunabilir)
                const responseToCache = response.clone();
                
                // Cache'e ekle dinamik olarak
                const url = new URL(event.request.url);
                if (shouldCache(url.pathname)) {
                  cache.put(event.request, responseToCache);
                }

                return response;
              })
              .catch(() => {
                // Network hatası durumunda cache'ten dön
                if (cachedResponse) {
                  return cachedResponse;
                }
                // HTML sayfaları için offline sayfasını göster
                if (event.request.destination === 'document') {
                  return cache.match(OFFLINE_URL);
                }
              });
          });
      })
  );
});

// Cache'e alınması gereken dosya türlerini kontrol et
function shouldCache(pathname) {
  // Ana sayfa ve gizmo sayfaları
  if (pathname === '/' || pathname.startsWith('/en/') || pathname.startsWith('/tr/') || 
      pathname.startsWith('/zh/') || pathname.startsWith('/es/') || pathname.startsWith('/fr/') ||
      pathname.startsWith('/ja/') || pathname.startsWith('/de/') || pathname.startsWith('/ru/') ||
      pathname.startsWith('/hi/')) {
    return true;
  }
  
  // CSS, JS, resim dosyaları
  if (pathname.match(/\.(css|js|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|json)$/)) {
    return true;
  }
  
  return false;
}

// Background sync için message handler
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Push notification desteği (gelecekte kullanılabilir)
self.addEventListener('push', (event) => {
  if (!event.data) return;

  const data = event.data.json();
  const options = {
    body: data.body,
    icon: '/img/icon-192x192.png',
    badge: '/img/icon-72x72.png',
    tag: 'devgizmos-notification',
    renotify: true,
    requireInteraction: false,
    actions: [
      {
        action: 'open',
        title: 'Open DevGizmos'
      },
      {
        action: 'close',
        title: 'Close'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(data.title || 'DevGizmos', options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'open') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

console.log('DevGizmos Service Worker loaded successfully');