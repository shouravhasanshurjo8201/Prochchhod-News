import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { articlePath, formatDate, formatNewsSource } from "@/lib/utils";
import type { NewsArticle } from "@/types/news";
import NewsImage from "@/components/ui/NewsImage";

export default function NewsCard({
  article,
  horizontal = false,
}: {
  article: NewsArticle;
  horizontal?: boolean;
}) {
  return (
    <article
      className={`group ${horizontal ? "grid grid-cols-[116px_1fr] gap-4 sm:grid-cols-[160px_1fr]" : ""}`}
    >
      <Link
        href={articlePath(article)}
        className={`image-frame ${horizontal ? "aspect-[4/3]" : "aspect-[16/10]"}`}
      >
        <NewsImage
          src={article.imageUrl}
          alt={article.imageAlt || article.title}
        />
      </Link>
      <div className={horizontal ? "py-0.5" : "pt-4"}>
        <div className="mb-2 flex items-center gap-2 text-[11px]">
          {article.category && (
            <span className="category-kicker">{article.category}</span>
          )}
          {article.isLive && <span className="live-tag">LIVE</span>}
        </div>
        <Link href={articlePath(article)}>
          <h3
            className={`card-title group-hover:text-accent ${horizontal ? "text-base sm:text-lg" : "text-lg md:text-xl"}`}
          >
            {article.title}
          </h3>
        </Link>
        {!horizontal && article.description && (
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted">
            {article.description}
          </p>
        )}
        <div className="mt-3 flex items-center justify-between text-[11px] text-muted">
          <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span>{formatNewsSource(article.source)}</span>
            <span aria-hidden="true">·</span>
            <span>{formatDate(article.firstPublished)}</span>
          </span>
          <Link
            href={articlePath(article)}
            aria-label={`Read ${article.title}`}
            className="opacity-0 transition group-hover:opacity-100"
          >
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
}
