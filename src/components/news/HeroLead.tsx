import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { articlePath, formatDate, formatNewsSource } from "@/lib/utils";
import type { NewsArticle } from "@/types/news";
import NewsImage from "@/components/ui/NewsImage";

export default function HeroLead({ article }: { article: NewsArticle }) {
  return (
    <article className="group">
      <Link href={articlePath(article)} className="hero-image image-frame">
        <NewsImage
          src={article.imageUrl}
          alt={article.imageAlt || article.title}
          priority
          sizes="(max-width: 768px) 100vw, 66vw"
        />
        <span className="hero-image-shade" />
        <span className="hero-image-copy">
          <span className="mb-3 inline-flex items-center gap-2 text-xs font-medium text-white/85">
            <span className="h-px w-6 bg-accent" />
            {article.category || "প্রধান খবর"}
            {article.isLive && <span className="live-tag">LIVE</span>}
          </span>
          <span className="block max-w-3xl font-bengali text-2xl font-bold leading-[1.42] text-white sm:text-3xl md:text-[2.55rem]">
            {article.title}
          </span>
          {article.description && (
            <span className="mt-3 hidden max-w-2xl text-sm leading-6 text-white/80 sm:block">
              {article.description}
            </span>
          )}
          <span className="mt-5 flex items-center gap-2 text-xs text-white/80">
            <span>{formatNewsSource(article.source)}</span>
            <span aria-hidden="true">·</span>
            {formatDate(article.firstPublished)}
            <ArrowUpRight size={14} />
          </span>
        </span>
      </Link>
    </article>
  );
}
