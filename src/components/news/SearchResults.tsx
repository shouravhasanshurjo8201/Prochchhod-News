"use client";

import { useState, useTransition } from "react";
import { searchNewsAction } from "@/actions/newsActions";
import type { NewsArticle } from "@/types/news";
import SearchBar from "@/components/ui/SearchBar";
import NewsCard from "@/components/news/NewsCard";

export default function SearchResults({
  query,
  initialResults,
  initialError = "",
}: {
  query: string;
  initialResults: NewsArticle[];
  initialError?: string;
}) {
  const [results, setResults] = useState(initialResults);
  const [activeQuery, setActiveQuery] = useState(query);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState(initialError);

  function search(value: string) {
    const normalized = value.trim();
    if (normalized.length < 2) {
      setResults([]);
      setActiveQuery(normalized);
      return;
    }
    setError("");
    startTransition(async () => {
      try {
        setResults(await searchNewsAction(normalized));
        setActiveQuery(normalized);
      } catch {
        setError("অনুসন্ধান সম্পন্ন হয়নি। আবার চেষ্টা করুন।");
      }
    });
  }

  return (
    <>
      <div className="mx-auto mt-8 max-w-2xl">
        <SearchBar initialQuery={query} compact onSearch={search} />
      </div>
      <div className="mt-10 flex items-center justify-center gap-2">
        {pending && <span className="text-xs text-accent">খোঁজা হচ্ছে…</span>}
      </div>
      {error && (
        <p role="alert" className="mt-6 text-sm text-accent">
          {error}
        </p>
      )}
      {results.length ? (
        <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-9 md:grid-cols-2 lg:grid-cols-3">
          {results.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      ) : activeQuery && !pending && !error ? (
        <div className="empty-state mt-6">
          <p className="font-bengali text-2xl">কোনো খবর পাওয়া যায়নি</p>
          <p className="mt-2 text-sm text-muted">
            আপনার অনুসন্ধানের সাথে কোনো গল্প মেলেনি। অন্য কোনো কিওয়ার্ড দিয়ে
            চেষ্টা করুন।
          </p>
        </div>
      ) : null}
    </>
  );
}
