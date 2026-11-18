import type { NewsArticle } from "@/types/news";

export function formatDate(
  value?: string | null,
  locale: "bn-BD" | "en-US" = "bn-BD",
): string {
  if (!value) return locale === "bn-BD" ? "সর্বশেষ" : "Latest";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
    timeZone: "Asia/Dhaka",
  }).format(date);
}

export function formatLongDate(date = new Date()): string {
  return new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).format(date);
}

const PUBLISHER_NAME = "Prochchhod News";

export function formatNewsSource(source?: string | null): string {
  const cleanSource = source?.trim();
  if (cleanSource === PUBLISHER_NAME) return cleanSource;
  return PUBLISHER_NAME;
}

export function sanitizeNewsArticle<T extends NewsArticle>(
  article: T,
): T & { source: string } {
  return { ...article, source: formatNewsSource(article.source) };
}

export function sanitizeNewsArticles(
  articles: NewsArticle[],
): Array<NewsArticle & { source: string }> {
  return articles.map(sanitizeNewsArticle);
}

export function readingTime(
  article: Pick<NewsArticle, "description"> & {
    text?: string;
    wordCount?: number;
  },
): number {
  const words =
    article.wordCount ??
    `${article.description ?? ""} ${article.text ?? ""}`.trim().split(/\s+/)
      .length;
  return Math.max(1, Math.ceil(words / 220));
}

export function articlePath(article: Pick<NewsArticle, "id">): string {
  return `/article/${encodeURIComponent(article.id)}`;
}

export function imageUrl(url?: string | null, width = 900): string | null {
  if (!url) return null;
  return url.replaceAll("{width}", String(width));
}
