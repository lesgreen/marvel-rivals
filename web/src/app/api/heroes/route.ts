import { NextRequest, NextResponse } from "next/server";
import { marvelRequest } from "@/lib/marvel-api";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q")?.trim();

  try {
    if (query) {
      const hero = await marvelRequest<unknown>(
        `/heroes/hero/${encodeURIComponent(query)}`
      );
      return NextResponse.json({ mode: "single", data: hero });
    }

    const heroes = await marvelRequest<unknown>("/heroes");
    return NextResponse.json({ mode: "all", data: heroes });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unexpected server error";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
