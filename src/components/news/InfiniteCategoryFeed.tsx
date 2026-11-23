"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { LoaderCircle } from "lucide-react";
import NewsCard from "@/components/news/NewsCard";
import type { CategoryPage, NewsArticle } from "@/types/news";

interface InfiniteCategoryFeedProps {
  slug: string;
  initialPage: number;
  pageCount: number;
  initialArticles: NewsArticle[];
}

export default function InfiniteCategoryFeed({
  slug,
  initialPage,
  pageCount,
  initialArticles,
}: InfiniteCategoryFeedProps) {
  const [articles, setArticles] = useState(initialArticles);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [lastPage, setLastPage] = useState(pageCount);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const sentinelRef = useRef<HTMLDivElement>(null);
  const currentPageRef = useRef(initialPage);
  const lastPageRef = useRef(pageCount);
  const inFlightRef = useRef(false);

  const loadNextPage = useCallback(async () => {
    if (inFlightRef.current || currentPageRef.current >= lastPageRef.current) {
      return;
    }

    inFlightRef.current = true;
    setIsLoading(true);
    setError("");

    const nextPage = currentPageRef.current + 1;
    const params = new URLSearchParams({ slug, page: String(nextPage) });

    try {
      const response = await fetch(`/api/category-news?${params.toString()}`, {
        cache: "no-store",
        headers: { Accept: "application/json" },
      });

      if (!response.ok) {
        throw new Error(`Category request failed (${response.status})`);
      }

      const result = (await response.json()) as CategoryPage;
      const receivedPage =
        Number.isInteger(result.page) && result.page >= nextPage
          ? result.page
          : nextPage;
      const receivedPageCount =
        Number.isInteger(result.pageCount) && result.pageCount >= receivedPage
          ? result.pageCount
          : receivedPage;

      setArticles((previous) => {
        const knownIds = new Set(previous.map((article) => article.id));
        const uniqueNewItems = result.data.filter((article) => {
          if (knownIds.has(article.id)) return false;
          knownIds.add(article.id);
          return true;
        });
        return [...previous, ...uniqueNewItems];
      });
      currentPageRef.current = receivedPage;
      lastPageRef.current = receivedPageCount;
      setCurrentPage(receivedPage);
      setLastPage(receivedPageCount);
    } catch (requestError) {
      console.error("Could not load the next category page:", requestError);
      setError("খবর লোড করা যায়নি। আবার চেষ্টা করুন।");
    } finally {
      inFlightRef.current = false;
      setIsLoading(false);
    }
  }, [slug]);

  const hasMore = currentPage < lastPage;

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasMore || error) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          void loadNextPage();
        }
      },
      { rootMargin: "300px 0px" },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [error, hasMore, loadNextPage]);

  return (
    <>
      <div className="grid grid-cols-1 gap-x-7 gap-y-10 border-t border-line pt-8 dark:border-white/10 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>
      {error && (
        <div className="mt-6 flex flex-col items-center gap-3">
          <p role="alert" className="text-center text-sm text-accent">
            {error}
          </p>
          <button
            type="button"
            className="outline-button"
            onClick={() => void loadNextPage()}
            disabled={isLoading}
          >
            আবার চেষ্টা করুন
          </button>
        </div>
      )}
      {isLoading && (
        <p
          role="status"
          className="mt-8 flex items-center justify-center gap-2 text-sm text-muted"
        >
          <LoaderCircle size={16} className="animate-spin" />
          আরও খবর লোড হচ্ছে…
        </p>
      )}
      {hasMore ? (
        <div ref={sentinelRef} aria-hidden="true" className="h-1 w-full" />
      ) : (
        <p className="mt-8 text-center text-sm text-muted">
          আপাতত এতটুকুই · You&apos;ve reached the end
        </p>
      )}
    </>
  );
}
