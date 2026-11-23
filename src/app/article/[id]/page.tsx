import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Clock3 } from "lucide-react";
import {
  getArticle,
  getMostRead,
  getRelatedArticles,
  NewsApiError,
} from "@/lib/api";
import {
  formatDate,
  formatNewsSource,
  imageUrl,
  readingTime,
} from "@/lib/utils";
import NewsImage from "@/components/ui/NewsImage";
import NewsCard from "@/components/news/NewsCard";
import ArticleTools from "@/components/article/ArticleTools";
import type { ArticleBlock, NewsArticle } from "@/types/news";
import type { ArticleRouteProps } from "@/types/routes";
import Link from "next/link";

export const revalidate = 120;

export async function generateMetadata({
  params,
}: ArticleRouteProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const article = await getArticle(id);
    return {
      title: article.title,
      description: article.description ?? article.text?.slice(0, 160),
      openGraph: {
        title: article.title,
        description: article.description ?? article.text?.slice(0, 160),
        siteName: "Prochchhod News",
        images: article.imageUrl
          ? [imageUrl(article.imageUrl, 1200) ?? ""]
          : [],
        type: "article",
        publishedTime: article.firstPublished ?? undefined,
      },
    };
  } catch {
    return { title: "প্রতিবেদন" };
  }
}

function renderBlock(block: ArticleBlock, index: number) {
  if (block.type === "image" && block.url) {
    return (
      <figure className="my-8" key={`${block.type}-${index}`}>
        <div className="relative aspect-[16/9] overflow-hidden bg-line dark:bg-white/10">
          <NewsImage src={block.url} alt={block.altText || block.caption} />
        </div>
        {block.caption && (
          <figcaption className="mt-2 text-xs text-muted">
            {block.caption}
          </figcaption>
        )}
      </figure>
    );
  }
  if (block.type === "heading" && block.text) {
    return (
      <h2
        className="my-8 font-bengali text-2xl font-semibold leading-9"
        key={`${block.type}-${index}`}
      >
        {block.text}
      </h2>
    );
  }
  if (block.type === "quote" && block.text) {
    return (
      <blockquote
        className="my-8 border-l-2 border-accent pl-5 font-bengali text-xl leading-9 text-ink dark:text-white"
        key={`${block.type}-${index}`}
      >
        {block.text}
      </blockquote>
    );
  }
  if (block.text) {
    return (
      <p className="article-paragraph" key={`${block.type}-${index}`}>
        {block.text}
      </p>
    );
  }
  return null;
}

export default async function ArticlePage({ params }: ArticleRouteProps) {
  const { id } = await params;
  let article;
  try {
    article = await getArticle(id);
  } catch (error) {
    console.error(`Could not load article ${id}:`, error);
    if (error instanceof NewsApiError && error.status === 404) notFound();
    throw error;
  }

  let related: NewsArticle[] = [];
  let mostRead: NewsArticle[] = [];

  try {
    related = await getRelatedArticles(id, 4);
  } catch (error) {
    console.error(`Could not load related articles for ${id}:`, error);
  }

  try {
    const mostReadData = await getMostRead();
    mostRead = mostReadData.filter((item) => item.id !== id).slice(1, 9);
  } catch (error) {
    console.error(`Could not load most read articles for ${id}:`, error);
  }

  const blocks = article.body?.length
    ? article.body
    : article.text
      ? article.text.split(/\n{2,}/).map((text) => ({ type: "text", text }))
      : [];
  const readingMinutes = readingTime(article);
  const leadImage = imageUrl(article.imageUrl, 1200);
  return (
    <article className="page-shell article-shell">
      <div className="article-topline">
        <span className="category-kicker">
          {article.category || "প্রতিবেদন"}
        </span>
        <span className="text-muted">/</span>
        <span className="text-xs text-muted">
          {formatDate(article.firstPublished)}
        </span>
      </div>
      <div className="article-header">
        <h1 className="font-bengali text-3xl font-semibold leading-[1.38] tracking-[-.025em] sm:text-4xl md:text-[2.8rem]">
          {article.title}
        </h1>
        {article.description && (
          <p className="mt-5 font-bengali text-lg leading-8 text-muted sm:text-xl">
            {article.description}
          </p>
        )}
        <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-y border-line py-4 dark:border-white/10">
          <div className="flex flex-wrap items-center gap-4 text-xs text-muted">
            <span className="text-ink dark:text-white">
              {formatNewsSource(article.source)}
            </span>
            {article.byline?.length ? (
              <span>
                {article.byline
                  .map((author) => author.name)
                  .filter(Boolean)
                  .join(", ")}
              </span>
            ) : null}
            <span className="flex items-center gap-1.5">
              <Clock3 size={14} /> {readingMinutes} মিনিট পড়ুন
            </span>
          </div>
          <ArticleTools />
        </div>
      </div>

      {leadImage && (
        <figure className="article-cover">
          <div className="relative aspect-[16/9] overflow-hidden bg-line dark:bg-white/10">
            <NewsImage
              src={leadImage}
              alt={article.imageAlt || article.title}
              priority
              sizes="(max-width: 900px) 100vw, 900px"
            />
          </div>
          {article.imageAlt && (
            <figcaption className="mt-2 text-xs text-muted">
              {article.imageAlt}
            </figcaption>
          )}
        </figure>
      )}

      <div className="article-content">
        <div className="article-body">
          {blocks.map((block, index) => renderBlock(block, index))}
          {!blocks.length && (
            <p className="text-sm text-muted">
              এই প্রতিবেদনের বিস্তারিত পাওয়া যায়নি।
            </p>
          )}
          {article.tags && article.tags.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-2 border-t border-line pt-5 dark:border-white/10">
              {article.tags.map((tag) => (
                <span key={tag} className="tag-chip">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <section className="editorial-section">
          <div className="section-heading">
            <div>
              <p className="section-title">সম্পর্কিত খবর</p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {related.map((item) => (
              <NewsCard key={item.id} article={item} />
            ))}
          </div>
        </section>
      )}

      {mostRead.length > 0 && (
        <section className="editorial-section">
          <div className="section-heading">
            <div>
              <p className="section-title">সবচেয়ে পঠিত</p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
            {mostRead.slice(0, 8).map((item) => (
              <Link
                key={item.id}
                href={`/article/${item.id}`}
                className="group flex flex-col justify-between  pt-4"
              >
                <h3 className="font-bengali text-base font-semibold leading-7 text-ink transition-colors group-hover:text-accent dark:text-white">
                  {item.title}
                </h3>
                <span className="mt-3 text-xs text-muted">
                  <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span>{formatNewsSource(article.source)}</span>
                    <span aria-hidden="true">·</span>
                    <span>{formatDate(article.firstPublished)}</span>
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
