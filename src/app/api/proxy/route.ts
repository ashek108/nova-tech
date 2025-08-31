// app/api/proxy/route.ts
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const targetUrl = searchParams.get("url");

  if (!targetUrl) {
    return new Response("Missing url", { status: 400 });
  }

  try {
    const res = await fetch(targetUrl, {
      headers: { "User-Agent": "Next.js Proxy" },
    });

    // Pass through headers carefully
    const headers = new Headers(res.headers);
    headers.set("access-control-allow-origin", "*");
    headers.delete("content-security-policy");
    headers.delete("x-frame-options");

    const body = await res.text();
    return new Response(body, {
      status: res.status,
      headers,
    });
  } catch (e) {
    return new Response("Proxy error", { status: 500 });
  }
}
