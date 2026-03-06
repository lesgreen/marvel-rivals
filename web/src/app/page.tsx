"use client";

import { FormEvent, useMemo, useState } from "react";
import { JsonViewer } from "@/components/json-viewer";

type ApiState = {
  loading: boolean;
  error: string | null;
  data: unknown;
};

const initialState: ApiState = {
  loading: false,
  error: null,
  data: null
};

async function readJson(response: Response) {
  const json = await response.json();
  if (!response.ok) {
    throw new Error(json?.error ?? "Request failed");
  }

  return json;
}

export default function HomePage() {
  const [heroQuery, setHeroQuery] = useState("");
  const [playerUsername, setPlayerUsername] = useState("");
  const [playerSeason, setPlayerSeason] = useState("");

  const [heroesState, setHeroesState] = useState<ApiState>(initialState);
  const [playerState, setPlayerState] = useState<ApiState>(initialState);

  const hasData = useMemo(
    () => heroesState.data !== null || playerState.data !== null,
    [heroesState.data, playerState.data]
  );

  async function fetchHeroes(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setHeroesState({ loading: true, error: null, data: null });

    try {
      const query = heroQuery.trim();
      const url = query
        ? `/api/heroes?q=${encodeURIComponent(query)}`
        : "/api/heroes";

      const result = await readJson(await fetch(url));
      setHeroesState({ loading: false, error: null, data: result });
    } catch (error) {
      setHeroesState({
        loading: false,
        error: error instanceof Error ? error.message : "Unexpected error",
        data: null
      });
    }
  }

  async function fetchPlayer(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPlayerState({ loading: true, error: null, data: null });

    try {
      const query = playerUsername.trim();
      if (!query) {
        throw new Error("Enter a player username");
      }

      const season = playerSeason.trim();
      const url = season
        ? `/api/player?username=${encodeURIComponent(query)}&season=${encodeURIComponent(season)}`
        : `/api/player?username=${encodeURIComponent(query)}`;
      const result = await readJson(await fetch(url));
      setPlayerState({ loading: false, error: null, data: result });
    } catch (error) {
      setPlayerState({
        loading: false,
        error: error instanceof Error ? error.message : "Unexpected error",
        data: null
      });
    }
  }

  return (
    <main className="container">
      <header>
        <p className="eyebrow">Marvel Rivals API</p>
        <h1>Next.js Starter</h1>
        <p>
          This app calls your own Next.js API routes, which then call
          <code> https://marvelrivalsapi.com/api/v1</code> with your server-side
          API key.
        </p>
      </header>

      <section className="grid">
        <form onSubmit={fetchHeroes} className="card">
          <h2>Heroes</h2>
          <label htmlFor="heroQuery">Hero name (optional)</label>
          <input
            id="heroQuery"
            value={heroQuery}
            onChange={(e) => setHeroQuery(e.target.value)}
            placeholder="e.g. Magik"
          />
          <button type="submit" disabled={heroesState.loading}>
            {heroesState.loading ? "Loading..." : "Fetch Heroes"}
          </button>
          {heroesState.error && <p className="error">{heroesState.error}</p>}
        </form>

        <form onSubmit={fetchPlayer} className="card">
          <h2>Player</h2>
          <label htmlFor="playerUsername">Username</label>
          <input
            id="playerUsername"
            value={playerUsername}
            onChange={(e) => setPlayerUsername(e.target.value)}
            placeholder="e.g. somePlayer"
          />
          <label htmlFor="playerSeason">Season (optional)</label>
          <input
            id="playerSeason"
            value={playerSeason}
            onChange={(e) => setPlayerSeason(e.target.value)}
            placeholder="e.g. 2"
          />
          <button type="submit" disabled={playerState.loading}>
            {playerState.loading ? "Loading..." : "Find Player"}
          </button>
          {playerState.error && <p className="error">{playerState.error}</p>}
        </form>
      </section>

      {hasData ? (
        <section className="results">
          {heroesState.data !== null && (
            <JsonViewer title="Heroes Response" data={heroesState.data} />
          )}
          {playerState.data !== null && (
            <JsonViewer title="Player Response" data={playerState.data} />
          )}
        </section>
      ) : (
        <section className="card">
          <h2>Results</h2>
          <p>Submit either form to see live API responses.</p>
        </section>
      )}
    </main>
  );
}
