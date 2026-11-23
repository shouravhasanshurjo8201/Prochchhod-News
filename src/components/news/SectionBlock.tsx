import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { SectionBlockProps } from "@/types/components";
import NewsCard from "@/components/news/NewsCard";

function categoryLink(title: string): string | null {
  const mapping: Record<string, string> = {
    বাংলাদেশ: "bangladesh",
    ভারত: "india",
    বিশ্ব: "world",
    স্বাস্থ্য: "health",
    খেলা: "sports",
    প্রযুক্তি: "technology",
  };
  return mapping[title] ?? null;
}

export default function SectionBlock({ section }: SectionBlockProps) {
  const articles = section.articles
    .filter((item) => item.title && item.id)
    .slice(0, 4);
  if (!articles.length) return null;
  const slug = categoryLink(section.title);

  return (
    <section className="editorial-section">
      <div className="section-heading">
        <div>
          <p className="section-title">{section.title}</p>
          <p className="mt-1 text-[11px] text-muted">আরও পড়ুন </p>
        </div>
        {slug && (
          <Link href={`/category/${slug}`} className="section-more">
            সব খবর <ArrowRight size={14} />
          </Link>
        )}
      </div>
      <div className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {articles.map((article) => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
}
