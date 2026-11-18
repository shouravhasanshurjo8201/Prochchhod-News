import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategories, getCategoryNews, NewsApiError } from "@/lib/api";
import NewsCard from "@/components/news/NewsCard";
import LoadMoreButton from "@/components/ui/LoadMoreButton";
import type { NewsCategory } from "@/types/news";

export const revalidate = 120;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const category = await getCategoryNews(slug, 1);
    return {
      title: `${category.title} সংবাদ`,
      description: `${category.title} বিভাগের সর্বশেষ খবর ও প্রতিবেদন।`,
    };
  } catch {
    return { title: "বিভাগের খবর" };
  }
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  let result;
  try {
    result = await getCategoryNews(slug, 1);
  } catch (error) {
    console.error(`Could not load category ${slug}:`, error);
    if (error instanceof NewsApiError && error.status === 404) notFound();
    throw error;
  }

  let categories: NewsCategory[] = [];
  try {
    categories = await getCategories();
  } catch (error) {
    console.error("Could not load categories:", error);
  }

  if (!result.data.length && result.pageCount === 0) notFound();
  const title =
    categories.find((category) => category.slug === slug)?.title ||
    result.title;
  return (
    <div className="page-shell">
      <div className="category-banner">
        <p className="eyebrow">বিভাগ </p>
        <h1 className="mt-3 font-bengali text-4xl font-semibold sm:text-5xl">
          {title}
        </h1>
        <p className="mt-3 text-sm text-muted">এই বিভাগের সর্বশেষ প্রতিবেদন </p>
      </div>
      {result.data.length ? (
        <>
          <div className="grid grid-cols-1 gap-x-7 gap-y-10 border-t border-line pt-8 dark:border-white/10 md:grid-cols-2 lg:grid-cols-3">
            {result.data.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
          <LoadMoreButton
            slug={slug}
            page={result.page}
            pageCount={result.pageCount}
            initialArticles={result.data}
          />
        </>
      ) : (
        <div className="empty-state border-t border-line py-20 dark:border-white/10">
          <p className="font-bengali text-2xl">এই বিভাগে এখনো কোনো খবর নেই</p>
          <p className="mt-2 text-sm text-muted">
            এই বিভাগে এখনও কোনো গল্প নেই।
          </p>
        </div>
      )}
    </div>
  );
}
