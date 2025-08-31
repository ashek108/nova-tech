// app/api/proxy/route.ts
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const targetUrl = searchParams.get("url");
  if (!targetUrl) {
    return new Response("Missing url parameter", { status: 400 });
  }

  try {
    const res = await fetch(targetUrl);
    const headers = new Headers(res.headers);

    headers.delete("x-frame-options");
    headers.delete("content-security-policy");

    return new Response(res.body, {
      status: res.status,
      headers,
    });
  } catch (err) {
    console.error("Proxy error:", err);
    return new Response("Proxy error", { status: 500 });
  }
}
