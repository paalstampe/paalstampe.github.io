/* Offline for landingssiden (service worker). Registreres fra index.html.

   Med nett er alt som før: egne filer hentes fra nettet først, så endringer vises straks.
   Uten nett, eller når nettet ikke svarer innen NETT_FRIST, brukes siste lagrede kopi.
   Google Fonts tas fra lageret når de finnes der.

   App-ene under stam.pe (byguider/, reiseplanlegging/) har egne service workers og eget lager;
   dem rører denne ikke (UNNTAK). Lagrer man stam.pe på hjemskjermen, åpner appen her — derfor
   må også denne siden virke uten nett.

   Ved endring i strategi eller lagerformat: øk VERSJON, så ryddes gamle lagre bort. */
const VERSJON = 'v1';
const LAGER = 'stampe-' + VERSJON;
const NETT_FRIST = 4000;
const OMFANG = new URL('./', self.location).href;
const UNNTAK = ['byguider/', 'reiseplanlegging/'].map(a => new URL('/' + a, self.location).href);
const FILER = ['./', 'style.css', 'mork.css', 'manifest.webmanifest', 'apple-touch-icon.png', 'ikon-192.png', 'ikon-512.png',
  'bilder/byguider.webp', 'bilder/byguider-mork.webp', 'bilder/reiseplanlegging.webp', '404.html'];
const FREMMEDE = /^https:\/\/(fonts\.googleapis\.com|fonts\.gstatic\.com)\//;
const SOK = { ignoreVary: true };

const egen = url => url.startsWith(OMFANG) && !UNNTAK.some(u => url.startsWith(u));

self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const lager = await caches.open(LAGER);
    await Promise.all(FILER.map(f => lagre(lager, new URL(f, OMFANG).href).catch(() => {})));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    const navn = await caches.keys();
    await Promise.all(navn.filter(n => n.startsWith('stampe-') && n !== LAGER).map(n => caches.delete(n)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  if (egen(req.url)) e.respondWith(nettForst(req));
  else if (FREMMEDE.test(req.url)) e.respondWith(lagerForst(req));
});

async function nettForst(req) {
  const lager = await caches.open(LAGER);
  const nett = fetch(req).then(r => {
    if (r.ok) lager.put(req, r.clone());
    return r;
  });
  const frist = new Promise(res => setTimeout(res, NETT_FRIST));
  try {
    const r = await Promise.race([nett, frist.then(() => lager.match(req, SOK).then(k => k || nett))]);
    if (r) return r;
  } catch (err) { /* uten nett */ }
  // ?lang=en o.l.: samme side uten parametre er godt nok uten nett
  const kopi = await lager.match(req, SOK) || await lager.match(req, { ignoreVary: true, ignoreSearch: true });
  if (kopi) return kopi;
  // Ukjent side uten nett: vis 404-siden, som lenker til app-ene
  if (req.mode === 'navigate') {
    const ukjent = await lager.match(new URL('404.html', OMFANG).href);
    if (ukjent) return ukjent;
  }
  return nett;
}

async function lagerForst(req) {
  const lager = await caches.open(LAGER);
  const kopi = await lager.match(req.url, SOK);
  if (kopi) return kopi;
  const r = await fetch(req);
  if (r.ok || r.type === 'opaque') lager.put(req.url, r.clone());
  return r;
}

async function lagre(lager, url) {
  let r;
  try { r = await fetch(url, url.startsWith(OMFANG) ? { cache: 'no-store' } : { mode: 'cors' }); }
  catch (err) { r = await fetch(url, { mode: 'no-cors' }); }
  if (r.ok || r.type === 'opaque') await lager.put(url, r);
}

/* Fra index.html: { type: 'forhandslast', adresser: [...] } — det siden har lastet (fontene),
   så de også finnes første gang siden åpnes uten nett. Henter bare det som mangler. */
self.addEventListener('message', e => {
  const m = e.data || {};
  if (m.type !== 'forhandslast' || !Array.isArray(m.adresser)) return;
  e.waitUntil((async () => {
    const lager = await caches.open(LAGER);
    for (const url of new Set(m.adresser)) {
      if (!egen(url) && !FREMMEDE.test(url)) continue;
      if (await lager.match(url, SOK)) continue;
      await lagre(lager, url).catch(() => {});
    }
  })());
});
