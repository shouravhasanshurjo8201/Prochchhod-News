import type {
  ApiEnvelope,
  ArticleDetails,
  CategoryPage,
  NewsArticle,
  NewsCategory,
  NewsSection,
} from "@/types/news";

import { sanitizeNewsArticle, sanitizeNewsArticles } from "@/lib/utils";

const API_BASE = process.env.NEWS_API_BASE_URL?.replace(/\/+$/, "");

const REVALIDATE_SECONDS = Number(
  process.env.NEWS_API_REVALIDATE_SECONDS ?? 120,
);

if (!API_BASE) {
  throw new Error("NEWS_API_BASE_URL is missing from environment variables");
}

if (!Number.isInteger(REVALIDATE_SECONDS) || REVALIDATE_SECONDS < 0) {
  throw new Error("Invalid NEWS_API_REVALIDATE_SECONDS value");
}

export class NewsApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = "NewsApiError";
  }
}

async function request<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    next: { revalidate: REVALIDATE_SECONDS },
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new NewsApiError(`News API request failed: ${path}`, response.status);
  }

  const payload = (await response.json()) as ApiEnvelope<T>;

  if (payload.success === false) {
    throw new Error(`News API returned an unsuccessful response: ${path}`);
  }

  return payload.data;
}

export async function getCategories(): Promise<NewsCategory[]> {
  return request<NewsCategory[]>("/categories");
}

export async function getNewsSections(): Promise<NewsSection[]> {
  const sections = await request<NewsSection[]>("/news/sections");

  return sections.map((section) => ({
    ...section,
    articles: sanitizeNewsArticles(section.articles ?? []),
  }));
}

export async function getLatestNews(limit = 5): Promise<NewsArticle[]> {
  return sanitizeNewsArticles(
    await request<NewsArticle[]>(`/news/latest?limit=${limit}`),
  );
}

export async function getMostRead(): Promise<NewsArticle[]> {
  return sanitizeNewsArticles(await request<NewsArticle[]>("/news/most-read"));
}

export async function getNewsFeed(limit = 10): Promise<NewsArticle[]> {
  return sanitizeNewsArticles(
    await request<NewsArticle[]>(`/news?limit=${limit}`),
  );
}

export async function getCategoryNews(
  slug: string,
  page = 1,
): Promise<CategoryPage> {
  const safeSlug = encodeURIComponent(slug);

  const response = await fetch(
    `${API_BASE}/category/${safeSlug}?page=${Math.max(1, page)}`,
    {
      next: { revalidate: REVALIDATE_SECONDS },
      headers: {
        Accept: "application/json",
      },
    },
  );

  if (!response.ok) {
    throw new NewsApiError("News API category request failed", response.status);
  }

  const payload = (await response.json()) as ApiEnvelope<NewsArticle[]>;

  if (payload.success === false) {
    throw new Error("News API returned an unsuccessful category response");
  }

  return {
    slug: String(payload.slug ?? slug),
    title: String(payload.title ?? slug),
    data: sanitizeNewsArticles(payload.data ?? []),
    page: Number(payload.page ?? page),
    pageCount: Number(payload.pageCount ?? 1),
    count: Number(payload.count ?? payload.data?.length ?? 0),
  };
}

export async function getArticle(id: string): Promise<ArticleDetails> {
  return sanitizeNewsArticle(
    await request<ArticleDetails>(`/article/${encodeURIComponent(id)}`),
  );
}

export async function getRelatedArticles(
  id: string,
  limit = 5,
): Promise<NewsArticle[]> {
  return sanitizeNewsArticles(
    await request<NewsArticle[]>(
      `/article/${encodeURIComponent(id)}/related?limit=${limit}`,
    ),
  );
}

export async function searchNews(query: string): Promise<NewsArticle[]> {
  const params = new URLSearchParams({ q: query });

  return sanitizeNewsArticles(
    await request<NewsArticle[]>(`/search?${params.toString()}`),
  );
}

export async function checkApiHealth(): Promise<boolean> {
  const response = await fetch(`${API_BASE}/health`, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`News API health check failed (${response.status})`);
  }

  return true;
}
