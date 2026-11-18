"use client";

import { useState, useTransition } from "react";
import { LoaderCircle } from "lucide-react";
import { loadMoreCategory } from "@/actions/newsActions";
import type { LoadMoreButtonProps } from "@/types/news";
import NewsCard from "@/components/news/NewsCard";

export default function LoadMoreButton({
  slug,
  page,
  pageCount,
  initialArticles,
}: LoadMoreButtonProps) {
  const [articles, setArticles] = useState(initialArticles);
  const [currentPage, setCurrentPage] = useState(page);
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  function loadMore() {
    setError("");
    startTransition(async () => {
      try {
        const result = await loadMoreCategory(slug, currentPage + 1);
        setArticles((current) => {
          const known = new Set(current.map((article) => article.id));
          return [
            ...current,
            ...result.data.filter((item) => !known.has(item.id)),
          ];
        });
        setCurrentPage(result.page);
      } catch {
        setError("খবর লোড করা যায়নি। আবার চেষ্টা করুন।");
      }
    });
  }

  const hasMore = currentPage < pageCount;
  return (
    <>
      {articles.length > initialArticles.length && (
        <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.slice(initialArticles.length).map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      )}
      {error && (
        <p role="alert" className="mt-5 text-center text-sm text-accent">
          {error}
        </p>
      )}
      {hasMore && (
        <div className="mt-10 flex justify-center">
          <button
            className="outline-button"
            type="button"
            onClick={loadMore}
            disabled={pending}
          >
            {pending && <LoaderCircle size={16} className="animate-spin" />}
            {pending ? "লোড হচ্ছে…" : "আরও খবর লোড করুন"}
          </button>
        </div>
      )}
    </>
  );
}
