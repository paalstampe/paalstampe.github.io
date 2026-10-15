# stam.pe – oppsett (02.10.2026)

**Landingsside:** repo `paalstampe/paalstampe.github.io` (lokalt `/Users/palstampe/Documents/GitHub/paalstampe.github.io`). GitHub Pages user site med `CNAME` = `stam.pe`. Filer: `index.html`, `style.css` (papirstil fra app-ene), `CNAME`, `.nojekyll`, `README.md`.

**Hjemskjerm-ikon:** `apple-touch-icon.png` (180×180, iOS) og `manifest.webmanifest` med `ikon-192.png`/`ikon-512.png` (Android). Konvolutt med frimerke «PS» (Playfair Display) og poststempel, i kobber på #F7F4EE; `ikon-192.png` er også favicon. Tegnet som SVG og gjengitt til PNG med Playwright. Navn under ikonet: «stam.pe» (`apple-mobile-web-app-title`). Åpnes som egen app (`display: standalone`, scope hele stam.pe, så byguider og reiseplanlegging åpnes i samme vindu). iOS henter `/apple-touch-icon.png` også for undersider som ikke har eget ikon.

**Deling:** Open Graph-tagger i `index.html` med `deling.png` (1200×630: ikonet, «stam.pe», «Påls apper», «Byguider og reiseplanlegging»), så lenken får et kort i Meldinger, Slack og e-post. Laget som HTML og tatt bilde av med Playwright. Endres app-lista vesentlig, lag bildet på nytt.

**Manifest:** `id` «/», beskrivelse, `ikon-maskable-512.png` (ikonet på 72 % midt på papirflaten, så Android kan beskjære til sirkel uten å kutte konvolutten) og snarveier til Byguider og Reiseplanlegging (høyreklikk / hold inne ikonet i Chrome og Android). Ny app: legg den til i `shortcuts`.

**404:** `404.html` vises for ukjente adresser på stam.pe (ikke inne i app-ene). Absolutte adresser, bare klassene fra `style.css`, NO/EN etter samme nøkkel. `sw.js` lagrer den og viser den uten nett. Ny app: legg til et oppslag der også.

**Veiledning for hjemskjermen:** Safari tilbyr ikke å installere siden selv (Chromium-nettlesere som Chrome og Vivaldi gjør det ut fra manifestet). I Safari 17+ på Mac (`erMacSafari`, ut fra user agent) vises samme boks med «Velg Arkiv → «Legg til i Dock …»» (`hjemHvordanMac`). På iPhone/iPad i nettleseren (ikke åpnet som app, `navigator.standalone` / `display-mode: standalone`) vises en liten boks under app-lista, over «Lagre alt for bruk offline» (installer først: iOS-appen har eget lager): «Bruk stam.pe som app — trykk Del i Safari (eller ··· og så Del), og velg «Legg til på Hjem-skjerm»». Lukkes med × og huskes i localStorage (`stampe-hjemskjerm-lukket`). Vises ikke på PC eller i appen.

**Offline:** `sw.js` (service worker, scope hele stam.pe, registreres fra `index.html`) lagrer landingssiden, bildene, ikonene og Google Fonts. Egne filer hentes fra nettet først (lagret kopi uten nett eller etter 4 s), fontene fra lageret. Den rører ikke `byguider/` og `reiseplanlegging/` (`UNNTAK`), som har egne service workers. Nødvendig fordi hjemskjerm-appen «stam.pe» alltid åpner her. Byguidene og reiseplanleggingen virker offline i den appen når de er åpnet der én gang med nett. Ny app med egen service worker skal inn i `UNNTAK`. Ved endret strategi: øk `VERSJON`.

**Lagre alt for bruk offline:** knappen under lista registrerer service workerne til `/reiseplanlegging/` og `/byguider/` (også om de ikke er åpnet) og sender dem meldingen `lagre` (se deres `sw.js`): først reiseplanleggingen, så alle byene fra `byguider/byer.json`, med fremdrift. Status «Tilgjengelig offline · 13. okt» under hver app leses fra nøklene app-ene selv skriver (`reiseplanlegging-offline:/reiseplanlegging/`, `byguider-offline:/byguider/<by>`; byguidene vises når alle byene er lagret — bylista huskes i `stampe-byguider-byer`). `KARTSTIL` og MapLibre-adressene i `index.html` skal være de samme som i byguidene. Før meldingen sendes, tvinges siste versjon av app-ens service worker fram (`reg.update()`, vent til aktiv) — ellers går den til en eldre utgave som ikke kjenner «lagre» (det hang på iPhone). Svarene kommer på en egen MessageChannel-port. Svar tas imot både på porten og som kringkasting (eldre utgaver av app-enes service workers svarer bare slik). Er det stille i 30 s (byguidene) / 60 s (reiseplanleggingen), hentes den aktive service workeren på nytt og meldingen sendes igjen, opptil fire ganger. Feiler en app likevel, prøves den én gang til; feiler det fortsatt, sier meldingen hva («reiseplanleggingen svarte ikke», «London: 3 filer feilet» o.l.). Ca. 100 MB i alt (13.10.2026).

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
