// AuditZ service worker.
//
// This intentionally does NOT cache anything. Deck content, card data, and
// account state all come live from Supabase and must never be served stale
// out of a cache — the whole point of this file existing is just to satisfy
// Chrome's installability check (a registered service worker with a fetch
// handler is one of the signals it looks for before firing
// `beforeinstallprompt`), not to add offline support.
//
// If real offline support is ever wanted later, this is the file to extend
// — but do it carefully: cache the static shell (index.html, manifest,
// icons) only, and always network-first / bypass the cache for anything
// that touches Supabase.

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Pure passthrough — always hit the network, never the cache.
  event.respondWith(fetch(event.request));
});
