export interface ArticleRouteProps {
  params: Promise<{ id: string }>;
}

export interface CategoryRouteProps {
  params: Promise<{ slug: string }>;
}

export interface SearchRouteProps {
  searchParams: Promise<{ q?: string | string[] }>;
}

export interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}
