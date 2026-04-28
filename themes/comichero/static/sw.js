const CACHE = 'comichero-v1';
const OFFLINE = ['/'];
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(OFFLINE)));
});
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then((res) =>
      res ||
      fetch(e.request)
        .then((net) => {
          const copy = net.clone();
          caches.open(CACHE).then((c) => c.put(e.request, copy));
          return net;
        })
        .catch(() => caches.match('/'))
    )
  );
});
