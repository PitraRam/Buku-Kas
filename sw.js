const CACHE_NAME = 'keuangan-pwa-v3'; // Naikkan versi dari v2 ke v3';
const ASSETS = [
    './',
    './index.html',
    './app.js',
    './manifest.json',
    'https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4',
    'https://unpkg.com/dexie/dist/dexie.js'
];

// Tahap Install: Simpan semua aset ke dalam cache browser
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
});

// Tahap Fetch: Jika sedang offline, ambil aset dari cache, bukan dari internet
self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((res) => {
            return res || fetch(e.request);
        })
    );
});
