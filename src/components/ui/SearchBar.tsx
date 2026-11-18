"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, LoaderCircle, Search, X } from "lucide-react";
import { searchNewsAction } from "@/actions/newsActions";
import { articlePath } from "@/lib/utils";
import type { NewsArticle, SearchBarProps } from "@/types/news";

export default function SearchBar({
  initialQuery = "",
  compact = false,
  onSearch,
}: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<NewsArticle[]>([]);
  const [pending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const [searchError, setSearchError] = useState(false);
  const router = useRouter();
  const wrapper = useRef<HTMLDivElement>(null);
  const searchSequence = useRef(0);

  useEffect(() => {
    const sequence = ++searchSequence.current;
    if (query.trim().length < 2) {
      setResults([]);
      setOpen(false);
      return;
    }
    const timer = window.setTimeout(() => {
      startTransition(async () => {
        try {
          const found = await searchNewsAction(query);
          if (sequence !== searchSequence.current) return;
          setResults(found.slice(0, 5));
          setSearchError(false);
          setOpen(true);
        } catch {
          if (sequence !== searchSequence.current) return;
          setSearchError(true);
          setResults([]);
          setOpen(true);
        }
      });
    }, 350);
    return () => window.clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    function dismiss(event: PointerEvent) {
      if (!wrapper.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, []);

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = query.trim();
    if (value) {
      setOpen(false);
      if (onSearch) onSearch(value);
      else router.push(`/search?q=${encodeURIComponent(value)}`);
    }
  }

  return (
    <div
      className={`relative ${compact ? "w-full" : "w-full max-w-[410px]"}`}
      ref={wrapper}
    >
      <form className="search-field" onSubmit={submit} role="search">
        <Search size={17} className="shrink-0 text-muted" aria-hidden="true" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onFocus={() => results.length > 0 && setOpen(true)}
          placeholder="খবর খুঁজুন "
          aria-label="খবর খুঁজুন "
          autoComplete="off"
        />
        {pending ? (
          <LoaderCircle className="animate-spin text-muted" size={17} />
        ) : query ? (
          <button
            type="button"
            className="text-muted transition hover:text-ink dark:hover:text-white"
            aria-label="Clear search"
            onClick={() => setQuery("")}
          >
            <X size={16} />
          </button>
        ) : (
          <button type="submit" className="search-submit" aria-label="Search">
            <ArrowRight size={16} />
          </button>
        )}
      </form>

      {open && (
        <div className="search-popover">
          {searchError ? (
            <p role="alert" className="px-4 py-4 text-sm text-accent">
              অনুসন্ধান করা যায়নি · অনুগ্রহ করে পরে আবার চেষ্টা করুন
            </p>
          ) : results.length ? (
            <>
              {results.map((article) => (
                <Link
                  key={article.id}
                  href={articlePath(article)}
                  className="search-result"
                  onClick={() => setOpen(false)}
                >
                  <span>{article.title}</span>
                  <ArrowRight size={14} className="shrink-0 text-muted" />
                </Link>
              ))}
              <button
                type="button"
                className="search-all"
                onClick={() => {
                  setOpen(false);
                  router.push(`/search?q=${encodeURIComponent(query.trim())}`);
                }}
              >
                সব ফলাফল দেখুন
              </button>
            </>
          ) : (
            <p className="px-4 py-4 text-sm text-muted">কোনো ফল পাওয়া যায়নি</p>
          )}
        </div>
      )}
    </div>
  );
}
