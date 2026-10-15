# stam.pe — arbeidsregler for Claude

Landingssiden for https://stam.pe (GitHub Pages user site, repo `paalstampe/paalstampe.github.io`).
Den lenker videre til Påls app-er, som er egne repoer og arver domenet:
- https://stam.pe/byguider/ ← repo `paalstampe/byguider`
- https://stam.pe/reiseplanlegging/ ← repo `paalstampe/reiseplanlegging`
Les HANDOVER.md før større endringer — den har DNS, Pages-oppsett, språkvalg og status.
Hold HANDOVER.md oppdatert når noe vesentlig endres.

## Språk
- Svar Pål på norsk, direkte og konsist. Ikke forklar grunnleggende git- eller webbegreper.
- Commit-meldinger, PR-titler og -beskrivelser på norsk. Commit-stil: «Område: hva som er endret»
  (f.eks. «Landingsside: byguidene først»).
- Kode: norske navn på variabler og funksjoner.
- Ingen genetiv-apostrof på norsk: «Påls», ikke «Pål's».

## Arbeidsflyt
- Endringer som ikke trenger forhåndsvisning — dokumentasjon (CLAUDE.md, HANDOVER.md, README.md) og
  rene tekstrettelser — pushes rett til main, uten gren og PR.
- Kodeendringer (index.html, style.css, .github/, .claude/) og nye oppslag på egen gren. Push grenen;
  forhåndsvisningen er https://stam.pe/forhandsvisning/<gren>/ (klar 1–2 min etter push,
  bygges av .github/workflows/pages.yml).
- Sjekk designet selv: .claude/skjermbilde.sh <url> <fil.png> 390 844 (mobil) og 1300 900 (desktop);
  legg til «hel» for hele siden. Tillatt: https://stam.pe/... og http://localhost:<port>/... (eller 127.0.0.1)
  (kjør python3 -m http.server 8000 --bind 127.0.0.1 først — gir rask sjekk før push). Virker i skyen og på Macen;
  på Macen kreves Node og Playwright (installasjon øverst i skriptet).
- Sjekk begge språk (?lang=en) når du endrer tekst eller layout.
- Fletting: Kan du selv verifisere at alt er i orden (skjermbilder mobil + desktop, begge språk, ingen JS-feil),
  åpne PR og flett uten å spørre. Er det noe Pål bør se på (designvalg, smak, ordlyd, usikkerhet), push grenen,
  oppgi forhåndsvisningen og vent — flett når han sier ok.
- Lokal økt på Påls Mac: skal Pål se på noe, start serveren selv om den ikke kjører
  (python3 -m http.server 8000 --bind 127.0.0.1, i bakgrunnen) og åpne siden for ham med
  open http://localhost:8000/ (lenkene til app-ene virker ikke lokalt). Stopp serveren når han er ferdig. I skyøkter: bruk forhåndsvisningen.
- Lokal eller sky velges når Pål starter økta. Kode- og designarbeid går raskest lokalt på Macen;
  data og dokumentasjon går like bra i sky. Får du en kode- eller designoppgave i en skyøkt,
  si fra tidlig at den egner seg bedre lokalt (fortsett hvis Pål vil).
- GitHub sletter grenen automatisk ved fletting. Sjekk bare at den er borte (git ls-remote --heads origin);
  slett den selv bare hvis den likevel ligger igjen.
- Én endring per gren. Små, selvstendige commits.

## Teknikk (kort — detaljer i HANDOVER.md)
- Ingen byggesteg, ingen rammeverk, ingen npm. Statiske filer: index.html, style.css.
- Pages-kilden er «GitHub Actions»; det egendefinerte domenet står i Settings → Pages.
  CNAME-filen brukes ikke av Actions, men skal ligge igjen.
- Ny app: nytt repo med Pages (uten egen CNAME) → havner på stam.pe/<repo>. Legg til en
  `<a class="oppslag">`-blokk i index.html (kopier en eksisterende), med tekster i TEKST på begge språk.
- Språkvalg NO / EN øverst til høyre. Faste tekster står i TEKST i index.html (data-t-attributter);
  nye UI-tekster skal alltid ha begge språk. Valget lagres i localStorage under `byguider-sprak` — samme
  nøkkel som byguidene, så valget følger med. `?lang=en` overstyrer. Lenker til app-er med engelsk
  versjon får `data-lang-lenke`. Reiseplanlegging er bare på norsk (står i den engelske teksten).
- Mobil er like viktig som desktop. Hover-effekter bare under (hover: hover) and (pointer: fine).
  Respekter prefers-reduced-motion.

## Design (samme som app-ene)
- Playfair Display til navn og titler, Work Sans til brødtekst.
- Papirflate #F7F4EE, tekst #241F19, dempet #6B5D4A, aksent kobber #8A5A2B.
- Ingen skygger, ingen avrundede kort — kantlinjer og luft. Skal ligne en guidebok.
- Mørk modus følger enheten: mork.css (papir #1B1814, tekst #ECE5D8, dempet #A6987F, kobber #C99158).


## Miniatyrer (gjelder alle tre repoene)
Småbildene finnes flere steder, alle i en lys og en mørk utgave (`-mork.webp`, vises i mørk modus):
- stam.pe-forsiden og 404-siden (repo `paalstampe.github.io`): `bilder/byguider(-mork).webp` (tatt av Nice-guiden,
  `/byguider/nice/`) og `bilder/reiseplanlegging(-mork).webp`.
- Byguide-forsiden (repo `byguider`): `bilder/<by>(-mork).webp` for hver by, laget med `.claude/miniatyrer.sh`
  (lager begge utgavene).
Når et småbilde oppdateres — en app eller by har endret utseende, eller en ny by eller app kommer til —
oppdater alle bildene som viser den, i alle repoene og i begge utgavene, og sjekk forsidene i lys og mørk modus.
Oppskrift: viewport 1300×900, deviceScaleFactor 2, beskjær 1200×900 fra venstre, skaler til 360×270 webp,
Playwright med `colorScheme: 'light'` og `'dark'`. Ta bildene fra stam.pe etter at endringen er publisert.
## DNS
- Domenet er registrert hos GoDaddy med Fastmail-navneservere; DNS-postene styres hos Fastmail.
  Claude har ikke tilgang dit — beskriv endringen for Pål i stedet.
- Ikke foreslå endringer i e-postpostene (MX, DKIM, SPF, DMARC, SRV) eller wildcard `*.stam.pe`.

## Ikke gjør
- Ikke slett CNAME eller .nojekyll.
- Ikke legg inn avhengigheter, byggeverktøy eller rammeverk.
- Ikke slett uflettede grener eller force-push uten at Pål ber om det.
