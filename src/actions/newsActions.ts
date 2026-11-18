"use server";

import { getCategoryNews, searchNews } from "@/lib/api";
import type { CategoryPage, NewsArticle } from "@/types/news";

export async function loadMoreCategory(
  slug: string,
  page: number,
): Promise<CategoryPage> {
  if (!slug.trim() || !Number.isInteger(page) || page < 1) {
    throw new Error("Invalid category pagination request");
  }
  return getCategoryNews(slug, page);
}

export async function searchNewsAction(query: string): Promise<NewsArticle[]> {
  const normalizedQuery = query.trim();
  if (normalizedQuery.length < 2) return [];
  return searchNews(normalizedQuery);
}
