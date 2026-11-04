# NOTES — løpende status

Kort og oppdatert. Varig oppsett (DNS, Pages, offline, språk) står i HANDOVER.md; arbeidsregler i CLAUDE.md.
Oppdateres ved slutten av hver økt (`/avslutt`).

## Status nå

Sist oppdatert: 4. november 2026.

- 4.11. kveld: publiseringen feilet gjentatte ganger fordi Pages regnet en publisering som pågående lenge etter at den var
  ferdig («in progress deployment … Please cancel <sha> first»), eller hang til tidsavbruddet. GitHub hadde hendelser med
  Actions og Pages samme kveld. Alle tre repoene har nå kø (`cancel-in-progress: false`), rydding av Pages-publiseringer som
  henger, og tre forsøk med 5 min pause (byguider #102, reiseplanlegging #32, paalstampe.github.io #22).
- 4.11. kveld: verktøyoversikten (claude-oppsett#1). `.claude/valider.sh` sjekker nå også filer endret i Bash
  (sed, skript): JSON/GeoJSON/Python som git ser som endret siden forrige godkjenning, og melder en ødelagt fil til den er rettet.
  Stop-hooken `sky-push.sh` har `onFailure: block`. CLAUDE.md: vent med `gh run watch` før skjermbilder av forhåndsvisningen,
  og kjør axe-core ved UI-endringer. `/doctor prompt-audit` er kjørt på reglene og funnene er rettet. Ferdig flettede lokale grener er slettet.
  Ingen axe-brudd på forsiden. Dokumentasjonen bruker port 8002 for lokal server. Hooks: PR #20.
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

- Publiseringen: felles workflow `publiser.yml` ligger i paalstampe.github.io (#23), men har ikke fått publisert ennå. Pages blokkerte
  i over 22 min (21:22–21:44) på 61535b4, som ifølge API-et er ferdig og ikke kan avbrytes («as it's finished»). Sjekk først at
  stam.pe publiserer igjen (`gh workflow run pages.yml -R paalstampe/paalstampe.github.io`). Gjør den det, flytt byguider og
  reiseplanlegging over: `pages.yml` kaller `paalstampe/paalstampe.github.io/.github/workflows/publiser.yml@main` med
  permissions actions: write, contents: read, pages: write, id-token: write, deployments: read; byguider flytter stedsider-linjene
  til `.github/etter-sammensetting.sh` og sletter `.github/rydd-pages.sh`.
- Mistanke (ikke bekreftet): det som henger er alltid en commit som er publisert to eller flere ganger like etter hverandre
  (a44b14d, 0adc444, 61535b4). Hver push til en gren publiserer main på nytt, også når main er uendret. Kan løses med å hoppe over
  publisering når innholdet er likt, eller ved å samle grenpusher.
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

- 2026-11-04: Publiseringen rydder Pages-publiseringer som henger og prøver tre ganger med 5 min pause. Ferdige publiseringer
  («succeed») kan ikke avbrytes, selv når Pages sier de blokkerer; da hjelper bare venting. Lengre pauser er ikke lagt inn, siden
  blokkeringen 4.11. varte over 22 min og må løses ved årsaken.
- 2026-11-04: Publiseringen for alle tre repoene samles i `.github/workflows/publiser.yml` her (workflow_call), som de andre bruker med @main.
  Ryddingen ligger inne i workflowen, siden en kalt workflow ikke ser filene i repoet den ligger i.
- 2026-11-04: valider.sh kjører også etter Bash, siden auto mode ofte endrer filer med sed og skript, som før gikk utenom sjekken.
- 2026-11-04: UI-endringer sjekkes med axe-core (lys og mørk) før fletting. Brudd som krever nye farger tas med Pål.
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
