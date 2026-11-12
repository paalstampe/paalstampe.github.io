# NOTES — løpende status

Kort og oppdatert. Varig oppsett (DNS, Pages, offline, språk) står i HANDOVER.md; arbeidsregler i CLAUDE.md.
Oppdateres ved slutten av hver økt (`/avslutt`). Eldre status og beslutninger: ARKIV.md.

## Status nå

Sist oppdatert: 12. november 2026.

- 12.11.: når telefonen ligger (liggende og under 500 px høy, samme spørring som i byguidene), står appene i to kolonner
  med kompakte oppslag og lavere hode, så begge synes på første skjerm. Gjelder også 404-siden. Stående mobil og desktop er
  uendret. De kompakte reglene deles nå av mobil og liggende, og hover-forskyvningen gjelder bare med mus (PR #33).
- 5.11.: publiseringen er samlet og gjort robust. Én felles workflow for alle tre repoene (publiser.yml i paalstampe.github.io),
  som hopper over uendret innhold, og dokumentasjon og .claude/ publiseres ikke lenger (`.gitattributes`). Verifisert i alle tre:
  en commit som bare endrer dokumentasjon gir ingen ny publisering. Detaljer under Neste steg og i beslutningsloggen.
- Landingssiden er live på https://stam.pe og lenker til Byguider og Reiseplanlegging.
- På plass: hjemskjermikon (PS-frimerke) og manifest med snarveier, delingsbilde og 404-side.
  «Lagre alt for bruk offline» viser plassbruk og har sletting. Siden er ikke søkbar
  (noindex og robots.txt), og mørk modus har mørke miniatyrer.
- Siste kodeendring her: to kolonner på liggende mobil (PR #33, 12.11.). Ingen åpne grener utenom `main`.

## Neste steg

- Publiseringen er felles for alle tre: `pages.yml` kaller `paalstampe/paalstampe.github.io/.github/workflows/publiser.yml@main`
  (paalstampe.github.io #23, byguider #105, reiseplanlegging #35). Endringer gjøres der og gjelder alle tre fra neste kjøring.
  Byguiders delingssider lages av `.github/etter-sammensetting.sh`. Første publisering på stam.pe ble blokkert i rundt 30 min
  (21:22–ca. 21:55) av en publisering som ifølge API-et var ferdig og ikke kunne avbrytes; tredje forsøk gikk gjennom.
- Publiseringen hopper over når innholdet er det samme som det som ligger ute (paalstampe.github.io #26, 5.11.): et avtrykk av
  alle filene ligger som `publisert.txt` og sammenlignes. Verifisert: første kjøring publiserte og neste hoppet over, i alle tre;
  ved fletting publiserte push-kjøringen og sletting av grenen hoppet over. Pages kan likevel henge på én enkelt publisering:
  4.11. kl. 22:20 tidsavbrøt alle tre forsøkene på stam.pe (en NOTES-commit). Fikk dette ofte, er neste skritt lengre ventetid.
- Dokumentasjon og Claude-oppsett (CLAUDE.md, NOTES.md, HANDOVER.md, SMAK.md, README.md, .claude/, .github/) publiseres ikke
  lenger, heller ikke i forhåndsvisningene (paalstampe.github.io #27, 5.11.). En commit som bare endrer dokumentasjon gir da ingen
  ny publisering. Byguidenes data/*.md publiseres som før. Hvert repo bestemmer selv hva som ikke publiseres, med `export-ignore` i `.gitattributes`
  (byguider #106, reiseplanlegging #36, paalstampe.github.io #28); ny fil som ikke skal på nettsiden legges inn der.
- Miniatyren `bilder/reiseplanlegging-mork.webp` er tatt før «best» fikk mørkere grønn i mørk modus (reiseplanlegging #30).
  Forskjellen er knapt synlig; ta den på nytt neste gang miniatyrene oppdateres.
- Ingen planlagte endringer. Når en ny app kommer: oppslag i index.html og 404.html (og kopi av 404.html i alle app-repoene,
  også det nye), snarvei i manifestet,
  `UNNTAK` i sw.js hvis den har egen service worker, miniatyr i lys og mørk utgave, eventuelt nytt delingsbilde, og eget delingskort og frimerke-ikon i appen
  (`.claude/delingsbilder.html` fra byguider).
- Neste gang forsidens ikon endres: gi filene nye navn (`apple-touch-icon.png`, `ikon-192.png` osv.) og oppdater
  index.html, 404.html (også kopiene i app-repoene), manifestet og `FILER` i sw.js.
- Mulig: snarveiene i manifestet kan bruke app-enes frimerke-ikoner i stedet for PS-ikonet.
- Oppdater miniatyren for byguidene når Nice-guiden endrer utseende merkbart.

## Åpne spørsmål

- Ingen.

## Beslutningslogg

- 2026-11-12: Liggende mobil får appene i to kolonner, desktop beholder én. Liggende er høyden det knappe, og med to apper
  stod den andre under kanten. På desktop er det nok høyde, og beskrivelsene leses bedre i full bredde. Vurder to kolonner
  på desktop også når det kommer flere apper.
- 2026-11-05: Hva som ikke publiseres, står i hvert repos `.gitattributes` (`export-ignore`), ikke i den felles workflowen.
  git archive respekterer det, også for forhåndsvisningene. Bieffekt: GitHubs «Download ZIP» mangler dokumentasjonen.
- 2026-11-05: Dokumentasjonen publiseres ikke. Det er ikke for å skjule noe (repoene er offentlige), men så commits som bare
  endrer dokumentasjon ikke gir nye publiseringer, som er det som henger hos Pages.
- 2026-11-05: Publiseringen hopper over når innholdet er likt det som er ute (avtrykk i `publisert.txt`). Gjentatte
  publiseringer av samme innhold var det som oftest hang hos Pages 4.11.
