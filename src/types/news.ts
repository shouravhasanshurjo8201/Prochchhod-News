export interface NewsArticle {
  id: string;
  title: string;
  description?: string | null;
  link?: string | null;
  imageUrl?: string | null;
  imageAlt?: string | null;
  category?: string | null;
  type?: string | null;
  isLive?: boolean;
  firstPublished?: string | null;
  lastPublished?: string | null;
  source?: string | null;
  rank?: number;
  score?: number;
}

export interface NewsCategory {
  slug: string;
  title: string;
  topicId?: string | null;
  url?: string | null;
  scrapable?: boolean;
}

export interface NewsSection {
  title: string;
  curationId?: string | null;
  curationType?: string | null;
  link?: string | null;
  count?: number;
  articles: NewsArticle[];
}

export interface ApiEnvelope<T> {
  success: boolean;
  data: T;
  count?: number;
  total?: number;
  page?: number;
  pageCount?: number;
  limit?: number;
  offset?: number;
  [key: string]: unknown;
}

export interface CategoryPage {
  slug: string;
  title: string;
  data: NewsArticle[];
  page: number;
  pageCount: number;
  count?: number;
}

export interface ArticleBlock {
  type: string;
  text?: string;
  url?: string;
  width?: number;
  height?: number;
  caption?: string;
  altText?: string;
}

export interface ArticleByline {
  name?: string;
  title?: string;
}

export interface ArticleTopic {
  id: string;
  name: string;
}

export interface ArticleDetails extends NewsArticle {
  body?: ArticleBlock[];
  text?: string;
  byline?: ArticleByline[];
  tags?: string[];
  topics?: ArticleTopic[];
  wordCount?: number;
}
