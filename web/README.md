# Marvel Rivals API + Next.js Starter

A minimal Next.js app that proxies calls to the Marvel Rivals API on the server, so your API key stays private.

## Endpoints used

- `GET /heroes`
- `GET /heroes/hero/:query`
- `GET /find-player/:username`
- `GET /player/:query` (with optional `season` query param)

Base URL: `https://marvelrivalsapi.com/api/v1`

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy env file and set your key:
   ```bash
   cp .env.example .env.local
   ```
3. Run dev server:
   ```bash
   npm run dev
   ```
4. Open `http://localhost:3000`

## Notes

- API key is read from `MARVEL_RIVALS_API_KEY` and sent as `x-api-key` in server routes.
- Client calls local routes (`/api/heroes`, `/api/player`) instead of calling the third-party API directly.
