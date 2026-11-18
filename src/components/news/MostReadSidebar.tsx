import Link from "next/link";
import { articlePath, formatNewsSource } from "@/lib/utils";
import type { NewsArticle } from "@/types/news";

export default function MostReadSidebar({
  articles,
}: {
  articles: NewsArticle[];
}) {
  return (
    <aside className="border-t-2 border-ink pt-4 dark:border-white/70">
      <div className="flex items-center justify-between gap-2">
        <p className="section-title">সর্বাধিক পঠিত</p>
        <span className="text-xs text-accent">০১ — ০৮</span>
      </div>
      <ol className="divide-y divide-line dark:divide-white/10">
        {articles.slice(0, 7).map((article) => (
          <li key={article.id} className="group flex gap-4 py-4">
            <Link href={articlePath(article)} className="flex-1">
              <span className="card-title block text-[15px] leading-6 transition group-hover:text-accent">
                {article.title}
              </span>
              <span className="mt-2 block text-[10px] text-muted">
                {formatNewsSource(article.source)}
                {article.category && ` · ${article.category}`}
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </aside>
  );
}
