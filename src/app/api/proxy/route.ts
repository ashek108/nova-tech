// app/api/proxy/route.ts
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");
  if (!url) return NextResponse.json({ error: "Missing url" }, { status: 400 });

  const res = await fetch(url);

  // Drop headers that block iframes
  const headers = new Headers(res.headers);
  headers.delete("x-frame-options");
  headers.delete("content-security-policy");

  const body = await res.text();
  return new NextResponse(body, {
    status: res.status,
    headers,
  });
}
