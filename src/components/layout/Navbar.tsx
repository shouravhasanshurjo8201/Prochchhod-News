"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";
import type { NavbarProps } from "@/types/components";
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

export default function Navbar({ categories }: NavbarProps) {
  const pathname = usePathname();
  const visible = categories.filter(
    (category) =>
      !category.slug.startsWith("/") && category.slug !== "cxy7jg418e7t",
  );
  const navCategories = visible.length ? visible : fallbackCategories;
  const normalizedPathname = normalizePath(pathname);
  const isActive = (href: string) => {
    const normalizedHref = normalizePath(href);
    if (normalizedHref === "/") return normalizedPathname === "/";
    return (
      normalizedPathname === normalizedHref ||
      normalizedPathname.startsWith(`${normalizedHref}/`)
    );
  };
  const homeActive = isActive("/");
  const searchActive = isActive("/search");
  const categoryLinks = navCategories.map((category) => {
    const href = `/category/${encodeURIComponent(category.slug)}`;
    const active = isActive(href);
    return (
      <Link
        key={category.slug}
        href={href}
        className="nav-item shrink-0"
        aria-current={active ? "page" : undefined}
      >
        {category.title}
      </Link>
    );
  });

  return (
    <nav className="sticky top-0 z-30 border-y border-line bg-paper/95 backdrop-blur-md dark:border-white/10 dark:bg-[#171a1a]/95">
      <div className="page-shell flex h-12 items-center justify-between gap-3">
        <div className="no-scrollbar flex min-w-0 scroll-smooth items-center gap-7 overflow-x-auto">
          <Link
            href="/"
            className={`nav-item shrink-0${homeActive ? " font-semibold text-accent" : ""}`}
            aria-current={homeActive ? "page" : undefined}
          >
            প্রচ্ছদ
          </Link>
          {categoryLinks}
        </div>
        <Link
          href="/search"
          aria-label="Open search"
          className="icon-button shrink-0"
          aria-current={searchActive ? "page" : undefined}
        >
          <Search size={17} />
        </Link>
      </div>
    </nav>
  );
}

function normalizePath(path: string): string {
  let decodedPath = path;
  try {
    decodedPath = decodeURIComponent(path);
  } catch {
    // Keep the original pathname if it contains malformed encoding.
  }
  if (decodedPath === "/") return decodedPath;
  return decodedPath.replace(/\/+$/, "");
}
