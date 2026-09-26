# stam.pe

Landingsside for https://stam.pe (GitHub Pages user site, repo `paalstampe/paalstampe.github.io`).

- `CNAME` setter domenet til `stam.pe`. Alle andre Pages-repoer under `paalstampe` arver domenet:
  `paalstampe/reiseplanlegging` → https://stam.pe/reiseplanlegging/ osv.
- Ny app: lag et nytt repo med GitHub Pages slått på (uten egen CNAME), og legg til en `<a class="oppslag">` i `index.html`.
- DNS ligger hos GoDaddy: 4 A-poster + 4 AAAA-poster på `@` mot GitHub Pages, `www` CNAME → `paalstampe.github.io`.
