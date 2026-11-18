import Link from "next/link";
import { ArrowUpRight, Radio } from "lucide-react";
import { articlePath } from "@/lib/utils";
import type { NewsArticle } from "@/types/news";

export default function BreakingTicker({
  articles,
}: {
  articles: NewsArticle[];
}) {
  if (!articles.length) return null;
  return (
    <section className="ticker-wrap" aria-label="সর্বশেষ খবর · Latest news">
      <div className="ticker-label">
        <Radio size={14} className="animate-pulse" />
        <span>সর্বশেষ</span>
      </div>
      <div className="no-scrollbar flex min-w-0 items-center gap-7 overflow-x-auto py-2">
        {articles.slice(1, 7).map((article) => (
          <Link
            href={articlePath(article)}
            key={article.id}
            className="ticker-story"
          >
            <span className="line-clamp-1">{article.title}</span>
            <ArrowUpRight size={13} className="line-clamp-1" />
          </Link>
        ))}
      </div>
    </section>
  );
}
