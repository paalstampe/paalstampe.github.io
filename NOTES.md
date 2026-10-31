# NOTES — løpende status

Kort og oppdatert. Varig oppsett (DNS, Pages, offline, språk) står i HANDOVER.md; arbeidsregler i CLAUDE.md.
Oppdateres ved slutten av hver økt (`/avslutt`).

## Status nå

Sist oppdatert: 31. oktober 2026.

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
- Siste kodeendring: lenken til reiseplanleggingen på engelsk (PR #16, 28.10.). Ingen åpne grener utenom `main`.

## Neste steg

- Ingen planlagte endringer. Når en ny app kommer: oppslag i index.html og 404.html (og kopi av 404.html i alle app-repoene,
  også det nye), snarvei i manifestet,
  `UNNTAK` i sw.js hvis den har egen service worker, miniatyr i lys og mørk utgave, og eventuelt nytt delingsbilde.
- Oppdater miniatyren for byguidene når Nice-guiden endrer utseende merkbart.
- Publiseringen (`.github/workflows/pages.yml`) har `cancel-in-progress: true`. I byguidene ga det en feilet
  kjøring når fletting og sletting av grenen kom samtidig, og der står kjøringene nå i kø (`false`).
  Gjør det samme her (og i reiseplanlegging) hvis feilen dukker opp.

## Åpne spørsmål

- Ingen.

## Beslutningslogg

- 2026-10-02: Bunnteksten «Oslo · Nice · London» er fjernet.
- 2026-10-14: Pages-kilden er «GitHub Actions», slik at grener kan forhåndsvises på `stam.pe/forhandsvisning/<gren>/`.
- 2026-10-15: Siden er ikke søkbar (noindex), og KI-innsamlere er stengt ute i robots.txt. Den skal deles med lenke, ikke finnes.
- 2026-10-15: Mørk modus følger enheten, uten egen bryter.
- 2026-10-18: Løpende status føres i NOTES.md. HANDOVER.md er referanse.
- 2026-10-18: Mørk modus, lagt inn som prøve 15.10., beholdes som den er.
- 2026-10-28: Reiseplanleggingen er på norsk og engelsk, så lenken får `data-lang-lenke` som byguidene.
- 2026-10-31: 404.html kopieres uendret til hvert app-repo. Pages tar 404-siden fra repoet som eier stien,
  og en identisk fil med absolutte adresser er enklest. Ulempen er at endringer må kopieres til alle.
