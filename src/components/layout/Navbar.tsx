import Link from "next/link";
import { Search } from "lucide-react";
import type { NewsCategory } from "@/types/news";

const fallbackCategories: NewsCategory[] = [
  { slug: "bangladesh", title: "বাংলাদেশ" },
  { slug: "politics", title: "রাজনীতি" },
  { slug: "world", title: "বিশ্ব" },
  { slug: "economics", title: "অর্থনীতি" },
  { slug: "health", title: "স্বাস্থ্য" },
  { slug: "sports", title: "খেলা" },
  { slug: "technology", title: "প্রযুক্তি" },
];

export default function Navbar({ categories }: { categories: NewsCategory[] }) {
  const visible = categories.filter(
    (category) =>
      !category.slug.startsWith("/") && category.slug !== "cxy7jg418e7t",
  );
  const navCategories = visible.length ? visible : fallbackCategories;

  return (
    <nav className="sticky top-0 z-30 border-y border-line bg-paper/95 backdrop-blur-md dark:border-white/10 dark:bg-[#171a1a]/95">
      <div className="page-shell flex h-12 items-center justify-between gap-3">
        <div className="no-scrollbar flex min-w-0 scroll-smooth items-center gap-7 overflow-x-auto">
          <Link
            href="/"
            className="nav-item shrink-0 font-semibold text-accent"
          >
            প্রচ্ছদ
          </Link>
          {navCategories.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${encodeURIComponent(category.slug)}`}
              className="nav-item shrink-0"
            >
              {category.title}
            </Link>
          ))}
        </div>
        <Link
          href="/search"
          aria-label="Open search"
          className="icon-button shrink-0"
        >
          <Search size={17} />
        </Link>
      </div>
    </nav>
  );
}
