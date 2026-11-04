# NOTES — løpende status

Kort og oppdatert. Varig oppsett (DNS, Pages, offline, språk) står i HANDOVER.md; arbeidsregler i CLAUDE.md.
Oppdateres ved slutten av hver økt (`/avslutt`).

## Status nå

Sist oppdatert: 4. november 2026.

- 4.11.: Claude-oppsett. `.claude/launch.json` lar Claude-appen starte serveren i den innebygde nettleseren (8000 byguider,
  8001 reiseplanlegging, 8002 stam.pe). Hooks: `.claude/oppstart.sh` sjekker ved oppstart om repoet ligger bak eller foran origin
  (henter selv når det er trygt) og om /avslutt avviker fra claude-oppsett; `.claude/valider.sh` sjekker JSON/GeoJSON/Python
  etter hver filendring; `.claude/sky-push.sh` holder skyøkter igjen til committede endringer er pushet.
  Claude kjører /code-review og /simplify selv før fletting av kodeendringer.
- 4.11.: miniatyrene av reiseplanleggingen (lys og mørk) er tatt på nytt. Kartet går nå rundt jorda og fyller hele
  bredden (reiseplanlegging #21).

- 1.11.: ved deling fra forsiden på iPhone dukket byguidenes gamle «b»-ikon opp. Det ble byttet ut 31.10. under samme filnavn,
  og iOS hadde den gamle versjonen lagret. App-ene bruker nå `ikon-frimerke.png` (byguider #90, reiseplanlegging #20), og
  HANDOVER i alle tre repoene har regelen «nytt ikon = nytt filnavn». Forsidens egne ikonfiler har beholdt navnene.
- Landingssiden er live på https://stam.pe og lenker til Byguider og Reiseplanlegging.
- På plass: hjemskjermikon (PS-frimerke) og manifest med snarveier, delingsbilde og 404-side.
  «Lagre alt for bruk offline» viser plassbruk og har sletting. Siden er ikke søkbar
  (noindex og robots.txt), og mørk modus har mørke miniatyrer.
- 28.10.: byguide-teksten sier nå også «Byene slik vi bruker dem.», og iPhone forstørrer ikke teksten
  når telefonen ligger (PR #15).
- 28.10. sent: reiseplanleggingen finnes på engelsk. «In Norwegian only» er fjernet, og lenken dit får
  `?lang=en` på engelsk, også på 404-siden (PR #16).
- 31.10.: ukjente adresser inne i app-ene (f.eks. stam.pe/byguider/berlin/g) viste GitHubs standard-404, fordi Pages
  bruker 404.html fra repoet som eier stien. Byguider og reiseplanlegging har nå en kopi av 404.html
  (byguider #78, reiseplanlegging #18), og kommentaren i filen og HANDOVER.md sier fra.
- 31.10.: byguidene og reiseplanleggingen har egne delingskort og frimerke-ikoner i samme postale familie som PS-frimerket
  (postkort per by og luftpostkonvolutt; byguider #85, reiseplanlegging #19). Landingssiden er uendret; HANDOVER beskriver familien.
- Siste kodeendring her: hooks (validering også etter Bash, sky-push blokkerer ved feil) og axe-core-regelen (PR #20, 4.11.). Ingen åpne grener utenom `main`.

## Neste steg

- Ingen planlagte endringer. Når en ny app kommer: oppslag i index.html og 404.html (og kopi av 404.html i alle app-repoene,
  også det nye), snarvei i manifestet,
  `UNNTAK` i sw.js hvis den har egen service worker, miniatyr i lys og mørk utgave, eventuelt nytt delingsbilde, og eget delingskort og frimerke-ikon i appen
  (`.claude/delingsbilder.html` fra byguider).
- Neste gang forsidens ikon endres: gi filene nye navn (`apple-touch-icon.png`, `ikon-192.png` osv.) og oppdater
  index.html, 404.html (også kopiene i app-repoene), manifestet og `FILER` i sw.js.
- Mulig: snarveiene i manifestet kan bruke app-enes frimerke-ikoner i stedet for PS-ikonet.
- Oppdater miniatyren for byguidene når Nice-guiden endrer utseende merkbart.
- Publiseringen (`.github/workflows/pages.yml`) har `cancel-in-progress: true`. I byguidene ga det en feilet
  kjøring når fletting og sletting av grenen kom samtidig, og der står kjøringene nå i kø (`false`).
  Gjør det samme her (og i reiseplanlegging) hvis feilen dukker opp.

## Åpne spørsmål

- Ingen.

## Beslutningslogg

- 2026-11-04: Claude kjører /code-review og /simplify selv før fletting av kodeendringer, så Pål slipper å be om det.
- 2026-11-04: Git-sjekk ved oppstart og push-vakt i sky ligger som hooks i repoet (ikke bare som regel), så de virker både lokalt og i skyøkter.
- 2026-11-01: Et ikon eller delingsbilde som byttes, får nytt filnavn. iOS lagrer ikoner etter adresse og viste det gamle
  «b»-ikonet ved deling, et døgn etter at frimerket hadde overtatt filen.
- 2026-10-31: App-ene får delingskort og ikoner som postsaker: stam.pe er konvolutt med PS-frimerke, byguidene postkort
  med bynavnet i poststempelet, reiseplanleggingen luftpost. Bokstavikonene («b», «r») så for slappe ut ved siden av frimerket.
- 2026-10-02: Bunnteksten «Oslo · Nice · London» er fjernet.
- 2026-10-14: Pages-kilden er «GitHub Actions», slik at grener kan forhåndsvises på `stam.pe/forhandsvisning/<gren>/`.
- 2026-10-15: Siden er ikke søkbar (noindex), og KI-innsamlere er stengt ute i robots.txt. Den skal deles med lenke, ikke finnes.
- 2026-10-15: Mørk modus følger enheten, uten egen bryter.
- 2026-10-18: Løpende status føres i NOTES.md. HANDOVER.md er referanse.
- 2026-10-18: Mørk modus, lagt inn som prøve 15.10., beholdes som den er.
- 2026-10-28: Reiseplanleggingen er på norsk og engelsk, så lenken får `data-lang-lenke` som byguidene.
- 2026-10-31: 404.html kopieres uendret til hvert app-repo. Pages tar 404-siden fra repoet som eier stien,
  og en identisk fil med absolutte adresser er enklest. Ulempen er at endringer må kopieres til alle.
