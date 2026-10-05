const CACHE_NAME = 'kotonoha-shell-v2.3.1';
const PRECACHE = ["/KOTONOHA-preview/","/KOTONOHA-preview/index.html","/KOTONOHA-preview/manifest.webmanifest","/KOTONOHA-preview/kotonoha-icon.svg","/KOTONOHA-preview/assets/island-concept.png","/KOTONOHA-preview/assets/avatar-sprites.png","/KOTONOHA-preview/assets/index-WvAIoxe_.js","/KOTONOHA-preview/assets/index-XnhbcqGT.css","/KOTONOHA-preview/assets/montserrat-cyrillic-400-normal-BPq32Q8K.woff2","/KOTONOHA-preview/assets/montserrat-cyrillic-400-normal-jEs4Tk-Z.woff","/KOTONOHA-preview/assets/montserrat-cyrillic-500-normal-CyGtXmN9.woff","/KOTONOHA-preview/assets/montserrat-cyrillic-500-normal-T0SG181k.woff2","/KOTONOHA-preview/assets/montserrat-cyrillic-600-normal-CQEPC0hM.woff2","/KOTONOHA-preview/assets/montserrat-cyrillic-600-normal-DUglwBrH.woff","/KOTONOHA-preview/assets/montserrat-cyrillic-ext-400-normal-DRPPeomZ.woff","/KOTONOHA-preview/assets/montserrat-cyrillic-ext-400-normal-Xqov12YL.woff2","/KOTONOHA-preview/assets/montserrat-cyrillic-ext-500-normal-11xBT7e1.woff2","/KOTONOHA-preview/assets/montserrat-cyrillic-ext-500-normal-DOzfAZ45.woff","/KOTONOHA-preview/assets/montserrat-cyrillic-ext-600-normal-BtBW-rpm.woff2","/KOTONOHA-preview/assets/montserrat-cyrillic-ext-600-normal-wReYPmz2.woff","/KOTONOHA-preview/assets/montserrat-latin-400-normal-BLhwKU8k.woff2","/KOTONOHA-preview/assets/montserrat-latin-400-normal-xItZbAXg.woff","/KOTONOHA-preview/assets/montserrat-latin-500-normal-DRFEGfly.woff2","/KOTONOHA-preview/assets/montserrat-latin-500-normal-Dok2oTci.woff","/KOTONOHA-preview/assets/montserrat-latin-600-normal-CdhFl4lI.woff","/KOTONOHA-preview/assets/montserrat-latin-600-normal-UVxSCcoG.woff2","/KOTONOHA-preview/assets/montserrat-latin-ext-400-normal-B8bwfy6Y.woff2","/KOTONOHA-preview/assets/montserrat-latin-ext-400-normal-BffdBkAA.woff","/KOTONOHA-preview/assets/montserrat-latin-ext-500-normal-BKtbrd6n.woff2","/KOTONOHA-preview/assets/montserrat-latin-ext-500-normal-DWPqqZgs.woff","/KOTONOHA-preview/assets/montserrat-latin-ext-600-normal-CSDhkhgS.woff","/KOTONOHA-preview/assets/montserrat-latin-ext-600-normal-DSkTqI9L.woff2","/KOTONOHA-preview/assets/montserrat-vietnamese-400-normal-BeEscFYY.woff","/KOTONOHA-preview/assets/montserrat-vietnamese-400-normal-D4oHqQTd.woff2","/KOTONOHA-preview/assets/montserrat-vietnamese-500-normal-DpeZlV_K.woff","/KOTONOHA-preview/assets/montserrat-vietnamese-500-normal-NT-t8RG1.woff2","/KOTONOHA-preview/assets/montserrat-vietnamese-600-normal-DKe6qT_E.woff2","/KOTONOHA-preview/assets/montserrat-vietnamese-600-normal-SJ-HTWuM.woff"];
const BASE_URL = '/KOTONOHA-preview/';

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin) return;

  if (event.request.mode === 'navigate') {
    event.respondWith(caches.match(`${BASE_URL}index.html`).then((cachedShell) => cachedShell || fetch(event.request)));
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      const fresh = fetch(event.request).then((response) => {
        if (response.ok) caches.open(CACHE_NAME).then((cache) => cache.put(event.request, response.clone()));
        return response;
      });
      return cached || fresh;
    }),
  );
});
