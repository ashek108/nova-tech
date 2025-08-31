import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const targetUrl = searchParams.get("url");

  if (!targetUrl) {
    return new Response("Missing url parameter", { status: 400 });
  }

  try {
    const res = await fetch(targetUrl, {
      headers: {
        // forward headers like User-Agent if needed
        "User-Agent": req.headers.get("user-agent") || "",
      },
    });

    const headers = new Headers(res.headers);
    headers.delete("x-frame-options");
    headers.delete("content-security-policy");

    // don’t force text/html → keep original content type
    const body = res.body;

    return new Response(body, {
      status: res.status,
      headers,
    });
  } catch (err) {
    console.error("Proxy error:", err);
    return new Response("Proxy error", { status: 500 });
  }
}
