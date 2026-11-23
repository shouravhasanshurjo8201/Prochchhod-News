import type { Metadata } from "next";
import { searchNews } from "@/lib/api";
import SearchResults from "@/components/news/SearchResults";
import type { NewsArticle } from "@/types/news";
import type { SearchRouteProps } from "@/types/routes";

export const revalidate = 120;

export const metadata: Metadata = {
  title: "খবর খুঁজুন",
  description: "বাংলা ও ইংরেজিতে খবর অনুসন্ধান করুন।",
};

export default async function SearchPage({
  searchParams,
}: SearchRouteProps) {
  const params = await searchParams;
  const rawQuery = Array.isArray(params.q) ? params.q[0] : params.q;
  const query = rawQuery?.trim() ?? "";
  let results: NewsArticle[] = [];
  let searchError = "";

  if (query.length >= 2) {
    try {
      results = await searchNews(query);
    } catch (error) {
      console.error("Could not load search results:", error);
      searchError = "অনুসন্ধান সম্পন্ন হয়নি। আবার চেষ্টা করুন।";
    }
  }

  return (
    <div className="page-shell min-h-[50vh] pb-10">
      <div className="category-banner">
        <p className="eyebrow">অনুসন্ধান</p>
        <h1 className="mt-3 font-bengali text-4xl font-semibold sm:text-5xl">
          খবর খুঁজুন
        </h1>
        <p className="mt-3 text-sm text-muted">আপনার পছন্দের খবর খুঁজে নিন </p>
      </div>
      <SearchResults
        query={query}
        initialResults={results}
        initialError={searchError}
      />
    </div>
  );
}
