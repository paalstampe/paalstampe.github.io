# stam.pe – oppsett (02.10.2026)

**Landingsside:** repo `paalstampe/paalstampe.github.io` (lokalt `/Users/palstampe/Documents/GitHub/paalstampe.github.io`). GitHub Pages user site med `CNAME` = `stam.pe`. Filer: `index.html`, `style.css` (papirstil fra app-ene), `CNAME`, `.nojekyll`, `README.md`.

**App-er** (project sites, arver domenet automatisk):
- https://stam.pe/byguider/ ← repo `paalstampe/byguider`
- https://stam.pe/reiseplanlegging/ ← repo `paalstampe/reiseplanlegging`

**Ny app:** nytt repo med Pages på (branch `main`, root, ingen egen CNAME) → havner på `stam.pe/<repo>`. Repoer med forhåndsvisning av grener (som denne og byguidene) bruker i stedet Pages-kilden «GitHub Actions». Legg til en `<a class="oppslag">`-blokk i landingssidens `index.html`.

**Miniatyrer:** hvert oppslag på landingssiden har et lite bilde av app-ens åpningsside foran navnet, i stedet for nummer (01, 02). Filene ligger i `bilder/` som webp, 360×270 (4:3), og vises som 120×90 på desktop og 76×57 på mobil, med tynn kantlinje og rette hjørner. Byguidene bruker Nice-guiden (`/byguider/nice/`), siden byguide-forsiden er nesten tom. Slik lages et bilde: skjermbilde med viewport 1300×900 og deviceScaleFactor 2, beskjær 1200×900 fra venstre, og skaler ned til 360×270 (Playwright, med canvas som gir webp). Ta nytt bilde når en app endrer utseende merkbart. Ny app trenger også en miniatyr.

**Bunntekst:** «Oslo · Nice · London» nederst er fjernet (02.10.2026).

**DNS:** hos Fastmail (Settings → Domains → stam.pe → Customize DNS). Domenet er registrert hos GoDaddy med Fastmail-navneservere.
- Egendefinert: 4 × A `@` → 185.199.108–111.153; 4 × AAAA `@` → 2606:50c0:8000–8003::153; CNAME `www` → `paalstampe.github.io`.
- Fastmail-standard «Host websites at https://stam.pe/» (A @ → 103.168.172.37/.52) er slått av. E-postposter (MX, DKIM, SPF, DMARC, SRV) og wildcard `*.stam.pe` er urørt.

**Publisering:** commit + Push origin i GitHub Desktop. `.github/workflows/pages.yml` publiserer `main` på `stam.pe/` og hver annen gren på `stam.pe/forhandsvisning/<gren>/`, ett–to minutter etter push (samme oppsett som byguidene). Slettede grener forsvinner ved neste publisering. Pages-kilden er «GitHub Actions»; det egendefinerte domenet står i Settings → Pages (CNAME-filen brukes ikke lenger av Actions, men ligger igjen). HTTPS: Settings → Pages → Enforce HTTPS.

**Språk:** Pål unngår genetiv-apostrof på norsk – «Påls», ikke «Pål's».

**Språk (NO / EN):** språkvalg øverst til høyre. Lagres i localStorage under `byguider-sprak` — samme nøkkel som byguidene, så valget følger med mellom stam.pe og /byguider/. `?lang=en` overstyrer. Reiseplanlegging er bare på norsk (står i den engelske teksten).

**Sjekke design:** før Claude sier at en endring er ferdig, tar Claude skjermbilder og ser på dem — av forhåndsvisningen for grener, ellers av den publiserte siden: `.claude/skjermbilde.sh https://stam.pe/ <fil.png> 390 844` (mobil) og `1300 900` (desktop); legg til `hel` for hele siden. Tillatt: `https://stam.pe/...` og `http://localhost:<port>/...` (kjør `python3 -m http.server 8000 --bind 127.0.0.1` først; bind hindrer at andre på samme nett ser mappen). Virker i skyen og på Macen (krever Node og Playwright, se øverst i skriptet). I lokale økter starter Claude serveren og åpner siden for Pål når han bør se på noe. Kjøretillatelsen står i `.claude/settings.json`.
