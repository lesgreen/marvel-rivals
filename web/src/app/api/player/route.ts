import { NextRequest, NextResponse } from "next/server";
import { marvelRequest } from "@/lib/marvel-api";

export async function GET(request: NextRequest) {
  const username = request.nextUrl.searchParams.get("username")?.trim();
  const season = request.nextUrl.searchParams.get("season")?.trim();

  if (!username) {
    return NextResponse.json(
      { error: "Missing required query param: username" },
      { status: 400 }
    );
  }

  try {
    const lookup = await marvelRequest<{ uid?: string; name?: string }>(
      `/find-player/${encodeURIComponent(username)}`
    );
    const query = lookup.uid ?? username;
    const stats = await marvelRequest<unknown>(
      `/player/${encodeURIComponent(query)}`,
      season ? { season } : undefined
    );

    return NextResponse.json({ data: { lookup, stats } });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unexpected server error";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
