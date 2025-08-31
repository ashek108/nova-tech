import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");
  if (!url) {
    return NextResponse.json({ error: "Missing url" }, { status: 400 });
  }

  try {
    const res = await fetch(url);
    const headers = new Headers(res.headers);

    // Drop headers that block iframes
    headers.delete("x-frame-options");
    headers.delete("content-security-policy");

    let body = await res.text();

    // 🔑 Rewrite relative asset URLs to go through the proxy
    body = body.replace(
      /(src|href)=["'](\/[^"']+)["']/g,
      (_match, attr, path) => {
        const proxied = `/api/proxy?url=${encodeURIComponent(
          new URL(path, url).toString()
        )}`;
        return `${attr}="${proxied}"`;
      }
    );

    return new NextResponse(body, {
      status: res.status,
      headers,
    });
  } catch (err) {
    console.error("Proxy error:", err);
    return NextResponse.json({ error: "Proxy error" }, { status: 500 });
  }
}
