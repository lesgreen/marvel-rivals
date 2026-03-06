# Marvel Rivals API + Expo

Expo version of the same functionality built in the Next.js app.

## Features

- Fetch all heroes or a single hero by name
- Find player by username
- Fetch player stats by uid (fallback to username) with optional season
- Render raw JSON responses for quick iteration

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create env file:
   ```bash
   cp .env.example .env
   ```
3. Set `EXPO_PUBLIC_MARVEL_RIVALS_API_KEY` in `.env`
4. Start:
   ```bash
   npm run start
   ```

## Important

`EXPO_PUBLIC_*` variables are bundled into the app. For production, keep the API key on a server you control and call that server from the mobile app.
