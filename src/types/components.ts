import type {
  NewsArticle,
  NewsCategory,
  NewsSection,
} from "@/types/news";

export interface BreakingTickerProps {
  articles: NewsArticle[];
}

export interface HeroLeadProps {
  article: NewsArticle;
}

export interface NewsCardProps {
  article: NewsArticle;
  horizontal?: boolean;
}

export interface MostReadSidebarProps {
  articles: NewsArticle[];
}

export interface SectionBlockProps {
  section: NewsSection;
}

export interface SearchResultsProps {
  query: string;
  initialResults: NewsArticle[];
  initialError?: string;
}

export interface InfiniteCategoryFeedProps {
  slug: string;
  initialPage: number;
  pageCount: number;
  initialArticles: NewsArticle[];
}

export interface SearchBarProps {
  initialQuery?: string;
  compact?: boolean;
  onSearch?: (query: string) => void;
}

export interface NewsImageProps {
  src?: string | null;
  alt?: string | null;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

export interface NavbarProps {
  categories: NewsCategory[];
}
