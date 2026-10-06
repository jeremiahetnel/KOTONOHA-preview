const CACHE_NAME = 'kotonoha-shell-v2.3.15.1';
const PRECACHE = ["/KOTONOHA-preview/","/KOTONOHA-preview/index.html","/KOTONOHA-preview/manifest.webmanifest","/KOTONOHA-preview/kotonoha-icon.svg","/KOTONOHA-preview/assets/island-concept.png","/KOTONOHA-preview/assets/island-tea-house-v1.png","/KOTONOHA-preview/assets/island-sakura-tree-v1.png","/KOTONOHA-preview/assets/island-stone-lantern-v1.png","/KOTONOHA-preview/assets/avatar-sprites.png","/KOTONOHA-preview/assets/pixel-avatar-spritesheet-concept.png","/KOTONOHA-preview/assets/pixel-avatar-short-hair-spritesheet.png","/KOTONOHA-preview/assets/pixel-avatar-short-samurai-mustache-spritesheet.png","/KOTONOHA-preview/assets/pixel-avatar-topknot-spritesheet.png","/KOTONOHA-preview/assets/pixel-avatar-mustache-spritesheet.png","/KOTONOHA-preview/assets/pixel-avatar-clean-spritesheet.png","/KOTONOHA-preview/assets/pixel-avatar-traveler-spritesheet.png","/KOTONOHA-preview/assets/pixel-avatar-traveler-mustache-spritesheet.png","/KOTONOHA-preview/assets/pixel-avatar-kimono-spritesheet.png","/KOTONOHA-preview/assets/index-yVk_vqr5.js","/KOTONOHA-preview/assets/index-DC6Y1MUe.css","/KOTONOHA-preview/assets/inter-cyrillic-400-normal-HOLc17fK.woff","/KOTONOHA-preview/assets/inter-cyrillic-400-normal-obahsSVq.woff2","/KOTONOHA-preview/assets/inter-cyrillic-500-normal-BasfLYem.woff2","/KOTONOHA-preview/assets/inter-cyrillic-500-normal-CxZf_p3X.woff","/KOTONOHA-preview/assets/inter-cyrillic-600-normal-4D_pXhcN.woff","/KOTONOHA-preview/assets/inter-cyrillic-600-normal-CWCymEST.woff2","/KOTONOHA-preview/assets/inter-cyrillic-ext-400-normal-BQZuk6qB.woff2","/KOTONOHA-preview/assets/inter-cyrillic-ext-400-normal-DQukG94-.woff","/KOTONOHA-preview/assets/inter-cyrillic-ext-500-normal-B0yAr1jD.woff2","/KOTONOHA-preview/assets/inter-cyrillic-ext-500-normal-BmqWE9Dz.woff","/KOTONOHA-preview/assets/inter-cyrillic-ext-600-normal-Bcila6Z-.woff","/KOTONOHA-preview/assets/inter-cyrillic-ext-600-normal-Dfes3d0z.woff2","/KOTONOHA-preview/assets/inter-greek-400-normal-B4URO6DV.woff2","/KOTONOHA-preview/assets/inter-greek-400-normal-q2sYcFCs.woff","/KOTONOHA-preview/assets/inter-greek-500-normal-BIZE56-Y.woff2","/KOTONOHA-preview/assets/inter-greek-500-normal-Xzm54t5V.woff","/KOTONOHA-preview/assets/inter-greek-600-normal-BZpKdvQh.woff","/KOTONOHA-preview/assets/inter-greek-600-normal-plRanbMR.woff2","/KOTONOHA-preview/assets/inter-greek-ext-400-normal-DGGRlc-M.woff2","/KOTONOHA-preview/assets/inter-greek-ext-400-normal-KugGGMne.woff","/KOTONOHA-preview/assets/inter-greek-ext-500-normal-2j5mBUwD.woff","/KOTONOHA-preview/assets/inter-greek-ext-500-normal-C4iEst2y.woff2","/KOTONOHA-preview/assets/inter-greek-ext-600-normal-B8X0CLgF.woff","/KOTONOHA-preview/assets/inter-greek-ext-600-normal-DRtmH8MT.woff2","/KOTONOHA-preview/assets/inter-latin-400-normal-C38fXH4l.woff2","/KOTONOHA-preview/assets/inter-latin-400-normal-CyCys3Eg.woff","/KOTONOHA-preview/assets/inter-latin-500-normal-BL9OpVg8.woff","/KOTONOHA-preview/assets/inter-latin-500-normal-Cerq10X2.woff2","/KOTONOHA-preview/assets/inter-latin-600-normal-CiBQ2DWP.woff","/KOTONOHA-preview/assets/inter-latin-600-normal-LgqL8muc.woff2","/KOTONOHA-preview/assets/inter-latin-ext-400-normal-77YHD8bZ.woff","/KOTONOHA-preview/assets/inter-latin-ext-400-normal-C1nco2VV.woff2","/KOTONOHA-preview/assets/inter-latin-ext-500-normal-BxGbmqWO.woff","/KOTONOHA-preview/assets/inter-latin-ext-500-normal-CV4jyFjo.woff2","/KOTONOHA-preview/assets/inter-latin-ext-600-normal-CIVaiw4L.woff","/KOTONOHA-preview/assets/inter-latin-ext-600-normal-D2bJ5OIk.woff2","/KOTONOHA-preview/assets/inter-vietnamese-400-normal-Bbgyi5SW.woff","/KOTONOHA-preview/assets/inter-vietnamese-400-normal-DMkecbls.woff2","/KOTONOHA-preview/assets/inter-vietnamese-500-normal-DOriooB6.woff2","/KOTONOHA-preview/assets/inter-vietnamese-500-normal-mJboJaSs.woff","/KOTONOHA-preview/assets/inter-vietnamese-600-normal-BuLX-rYi.woff","/KOTONOHA-preview/assets/inter-vietnamese-600-normal-Cc8MFFhd.woff2"];
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
