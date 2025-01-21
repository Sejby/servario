# Next.js Servario

Tato aplikace je vyvinuta pomocí frameworku **Next.js** a nabízí funkce pro registraci, přihlášení a správu příspěvků (vytváření, úpravy, mazání). Používá **MongoDB** jako databázi a **Redis** pro cachování. Závislosti aplikace běží v prostředí Docker Compose.

## Funkce aplikace

- **Autentizace uživatelů**: registrace a přihlášení pomocí next-auth knihovny.
- **Správa příspěvků**: vytváření, úprava, mazání příspěvků.
- **Cachování pomocí Redis**: zrychlené načítání příspěvků.
- **Docker Compose**: zajišťuje prostředí MongoDB a Redis služeb.

---

## Požadavky

- [Node.js](https://nodejs.org/) (doporučeno: v18+)
- [Docker](https://www.docker.com/) a [Docker Compose](https://docs.docker.com/compose/)
- [Yarn](https://yarnpkg.com/) (volitelné)

---

## Instalace a spuštění
- git clone https://github.com/Sejby/servario.git
- yarn install (doporučuji využít yarn místo npm, rozběhnout next.js v dockeru se mi nepodařilo a npm má problém s některými závislostmi)
- docker compose up
- yarn run dev