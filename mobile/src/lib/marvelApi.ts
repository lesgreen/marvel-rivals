const API_BASE_URL = "https://marvelrivalsapi.com/api/v1";

function getApiKey(): string {
  const apiKey = process.env.EXPO_PUBLIC_MARVEL_RIVALS_API_KEY;
  if (!apiKey) {
    throw new Error(
      "Missing EXPO_PUBLIC_MARVEL_RIVALS_API_KEY. Set it in your .env file."
    );
  }

  return apiKey;
}

async function request<T>(path: string, query?: Record<string, string>) {
  const url = new URL(`${API_BASE_URL}${path}`);

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
  }

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "x-api-key": getApiKey(),
      Accept: "application/json"
    }
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Marvel API error (${response.status}): ${body}`);
  }

  return response.json() as Promise<T>;
}

export function fetchHeroes(heroName?: string) {
  if (heroName?.trim()) {
    return request<unknown>(`/heroes/hero/${encodeURIComponent(heroName.trim())}`);
  }

  return request<unknown>("/heroes");
}

export async function fetchPlayer(username: string, season?: string) {
  const lookup = await request<{ uid?: string; name?: string }>(
    `/find-player/${encodeURIComponent(username.trim())}`
  );

  const query = lookup.uid ?? username.trim();
  const stats = await request<unknown>(
    `/player/${encodeURIComponent(query)}`,
    season?.trim() ? { season: season.trim() } : undefined
  );

  return { lookup, stats };
}
