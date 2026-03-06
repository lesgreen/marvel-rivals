const API_BASE_URL = "https://marvelrivalsapi.com/api/v1";

function getApiKey(): string {
  const apiKey = process.env.MARVEL_RIVALS_API_KEY;

  if (!apiKey) {
    throw new Error(
      "Missing MARVEL_RIVALS_API_KEY. Add it to your environment variables."
    );
  }

  return apiKey;
}

export async function marvelRequest<T>(
  path: string,
  searchParams?: Record<string, string>
): Promise<T> {
  const url = new URL(`${API_BASE_URL}${path}`);

  if (searchParams) {
    for (const [key, value] of Object.entries(searchParams)) {
      url.searchParams.set(key, value);
    }
  }

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "x-api-key": getApiKey(),
      Accept: "application/json"
    },
    cache: "no-store"
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Marvel API error (${response.status}): ${body}`);
  }

  return response.json() as Promise<T>;
}
