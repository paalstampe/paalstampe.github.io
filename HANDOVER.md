# stam.pe – oppsett (26.09.2026)

**Landingsside:** repo `paalstampe/paalstampe.github.io` (lokalt `/Users/palstampe/Documents/GitHub/paalstampe.github.io`). GitHub Pages user site med `CNAME` = `stam.pe`. Filer: `index.html`, `style.css` (papirstil fra app-ene), `CNAME`, `.nojekyll`, `README.md`.

**App-er** (project sites, arver domenet automatisk):
- https://stam.pe/reiseplanlegging/ ← repo `paalstampe/reiseplanlegging`
- https://stam.pe/nabolag-london/ ← repo `paalstampe/nabolag-london` («Påls London»)

**Ny app:** nytt repo med Pages på (branch `main`, root, ingen egen CNAME) → havner på `stam.pe/<repo>`. Legg til en `<a class="oppslag">`-blokk i landingssidens `index.html`.

**DNS:** hos Fastmail (Settings → Domains → stam.pe → Customize DNS). Domenet er registrert hos GoDaddy med Fastmail-navneservere.
- Egendefinert: 4 × A `@` → 185.199.108–111.153; 4 × AAAA `@` → 2606:50c0:8000–8003::153; CNAME `www` → `paalstampe.github.io`.
- Fastmail-standard «Host websites at https://stam.pe/» (A @ → 103.168.172.37/.52) er slått av. E-postposter (MX, DKIM, SPF, DMARC, SRV) og wildcard `*.stam.pe` er urørt.

**Publisering:** commit + Push origin i GitHub Desktop. HTTPS: Settings → Pages → Enforce HTTPS.

**Språk:** Pål unngår genetiv-apostrof på norsk – «Påls», ikke «Pål's».

**Språk (NO / EN):** språkvalg øverst til høyre. Lagres i localStorage under `byguider-sprak` — samme nøkkel som byguidene, så valget følger med mellom stam.pe og /byguider/. `?lang=en` overstyrer. Reiseplanlegging er bare på norsk (står i den engelske teksten).
