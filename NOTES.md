# NOTES — løpende status

Kort og oppdatert. Varig oppsett (DNS, Pages, offline, språk) står i HANDOVER.md; arbeidsregler i CLAUDE.md.
Oppdateres ved slutten av hver økt (`/avslutt`).

## Status nå

Sist oppdatert: 18. oktober 2026.

- Landingssiden er live på https://stam.pe og lenker til Byguider og Reiseplanlegging.
- På plass: hjemskjermikon (PS-frimerke) og manifest med snarveier, delingsbilde og 404-side.
  «Lagre alt for bruk offline» viser plassbruk og har sletting. Siden er ikke søkbar
  (noindex og robots.txt), og mørk modus har mørke miniatyrer.
- Siste kodeendring: mørk modus (PR #13, 15.10.). Ingen åpne grener utenom `main`.

## Neste steg

- Ingen planlagte endringer. Når en ny app kommer: oppslag i index.html og 404.html, snarvei i manifestet,
  `UNNTAK` i sw.js hvis den har egen service worker, miniatyr i lys og mørk utgave, og eventuelt nytt delingsbilde.
- Oppdater miniatyren for byguidene når Nice-guiden endrer utseende merkbart.

## Åpne spørsmål

- Mørk modus ble lagt inn som «prøve» (commit 15.10.). Skal den beholdes slik den er?

## Beslutningslogg

- 2026-10-02: Bunnteksten «Oslo · Nice · London» er fjernet.
- 2026-10-14: Pages-kilden er «GitHub Actions», slik at grener kan forhåndsvises på `stam.pe/forhandsvisning/<gren>/`.
- 2026-10-15: Siden er ikke søkbar (noindex), og KI-innsamlere er stengt ute i robots.txt. Den skal deles med lenke, ikke finnes.
- 2026-10-15: Mørk modus følger enheten, uten egen bryter.
- 2026-10-18: Løpende status føres i NOTES.md. HANDOVER.md er referanse.
