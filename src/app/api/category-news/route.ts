import { NextResponse } from "next/server";
import { getCategoryNews, NewsApiError } from "@/lib/api";

export const revalidate = 120;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug")?.trim();
  const rawPage = searchParams.get("page");
  const page = rawPage ? Number(rawPage) : Number.NaN;

  if (!slug || !Number.isInteger(page) || page < 1) {
    return NextResponse.json(
      { error: "A valid category slug and page are required." },
      { status: 400 },
    );
  }

  try {
    const result = await getCategoryNews(slug, page);
    return NextResponse.json(result, {
      headers: {
        "Cache-Control": "public, s-maxage=120, stale-while-revalidate=120",
      },
    });
  } catch (error) {
    console.error(`Could not load category ${slug}, page ${page}:`, error);
    const status = error instanceof NewsApiError && error.status === 404 ? 404 : 502;
    return NextResponse.json(
      { error: "Could not load more category stories." },
      { status },
    );
  }
}
