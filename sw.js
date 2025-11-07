/* =========================================================== */
/* SERVICE WORKER - OFFLINE FUNKTIONALITÄT                    */
/* Ermöglicht das Spiel auch ohne Internet zu spielen         */
/* =========================================================== */

const CACHE_NAME = 'it-jeopardy-v1.2.0';
const DEBUG_MODE = false; // Für Debug-Nachrichten

// ========================================= 
// DATEIEN DIE GECACHT WERDEN SOLLEN       
// ========================================= 
const CACHE_FILES = [
  './',
  './index.html',
  './styles.css',
  './script.js',
  './questions_it.js', 
  './sounds.js',
  './manifest.json'
];

// =========================================
// SERVICE WORKER INSTALLATION             
// =========================================
self.addEventListener('install', event => {
  if (DEBUG_MODE) console.log('🔧 Service Worker wird installiert...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        if (DEBUG_MODE) console.log('📦 Dateien werden gecacht...');
        return cache.addAll(CACHE_FILES);
      })
      .then(() => {
        if (DEBUG_MODE) console.log('✅ Service Worker erfolgreich installiert!');
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('❌ Fehler beim Installieren des Service Workers:', error);
      })
  );
});

// =========================================
// SERVICE WORKER AKTIVIERUNG              
// =========================================
self.addEventListener('activate', event => {
  if (DEBUG_MODE) console.log('🚀 Service Worker wird aktiviert...');
  
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            // Alte Caches löschen
            if (cacheName !== CACHE_NAME) {
              if (DEBUG_MODE) console.log('🗑️ Alter Cache wird gelöscht:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        if (DEBUG_MODE) console.log('✅ Service Worker aktiviert!');
        return self.clients.claim();
      })
  );
});

// =========================================
// NETZWERK-ANFRAGEN ABFANGEN             
// =========================================
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        // Cache-First Strategie: Erst Cache prüfen, dann Netzwerk
        if (cachedResponse) {
          if (DEBUG_MODE) console.log('📋 Aus Cache geladen:', event.request.url);
          return cachedResponse;
        }
        
        if (DEBUG_MODE) console.log('🌐 Aus Netzwerk geladen:', event.request.url);
        return fetch(event.request)
          .catch(error => {
            console.warn('⚠️ Netzwerk-Fehler:', error);
            // Fallback für offline Modus
            if (event.request.destination === 'document') {
              return caches.match('./index.html');
            }
          });
      })
  );
});

// =========================================
// BACKGROUND SYNC FÜR STATISTIKEN        
// =========================================
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync-stats') {
    if (DEBUG_MODE) console.log('📊 Background Sync für Statistiken...');
    event.waitUntil(syncStatistics());
  }
});

// =========================================
// PUSH NOTIFICATIONS                      
// =========================================
self.addEventListener('push', event => {
  if (event.data) {
    const data = event.data.json();
    if (DEBUG_MODE) console.log('📨 Push Notification erhalten:', data);
    
    const options = {
      body: data.body || 'Neue Herausforderung verfügbar!',
      icon: './icons/icon-192x192.png',
      badge: './icons/icon-72x72.png',
      vibrate: [200, 100, 200],
      actions: [
        {
          action: 'open',
          title: 'Spiel öffnen',
          icon: './icons/icon-192x192.png'
        },
        {
          action: 'close', 
          title: 'Schließen'
        }
      ]
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title || 'IT-Jeopardy', options)
    );
  }
});

// =========================================
// NOTIFICATION CLICK HANDLING             
// =========================================
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  if (event.action === 'open') {
    event.waitUntil(
      clients.openWindow('./')
    );
  }
});

// =========================================
// HILFSFUNKTIONEN                         
// =========================================
async function syncStatistics() {
  try {
    // Statistiken aus localStorage holen und ggf. an Server senden
    // Hier könnte eine API-Verbindung für Online-Statistiken implementiert werden
    if (DEBUG_MODE) console.log('📈 Statistiken synchronisiert');
  } catch (error) {
    console.error('❌ Fehler beim Synchronisieren der Statistiken:', error);
  }
}