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

    // Remove headers that block iframes
    headers.delete("x-frame-options");
    headers.delete("content-security-policy");
    headers.set("content-type", "text/html");

    const body = await res.text();
    return new Response(body, { status: res.status, headers });
  } catch (err) {
    console.error("Proxy error:", err);
    return new Response("Proxy error", { status: 500 });
  }
}
