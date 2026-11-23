import Link from "next/link";
import { Search } from "lucide-react";
import ThemeToggle from "@/components/layout/ThemeToggle";
import SearchBar from "@/components/ui/SearchBar";
import { formatLongDate } from "@/lib/utils";
import DhakaClock from "./DhakaClock";

export default function Header() {
  return (
    <>
      <div className="topline">
        <div className="page-shell flex min-h-11 items-center justify-between gap-4">
          <p className="flex flex-wrap items-center gap-x-2 text-[11px] text-muted">
            <span className="font-bengali">{formatLongDate()}</span>
            <span aria-hidden="true" className="text-line">
              /
            </span>
            <DhakaClock />
            <span className="hidden sm:inline">
              <span aria-hidden="true" className="mx-2 text-line">
                /
              </span>
              প্রতিদিনের খবর
            </span>
          </p>
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <div className="hidden w-[260px] sm:block">
              <SearchBar />
            </div>
            <Link
              href="/search"
              aria-label="খবর খুঁজুন "
              className="header-search-trigger sm:hidden"
            >
              <Search size={18} />
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </div>

      <header className="page-shell">
        <div className="brand-header">
          <div className="brand-lockup">
            <Link
              href="/"
              className="brand-wordmark"
              aria-label="Prochchhod News home"
            >
              প্রচ্ছদ<span> নিউজ</span>
            </Link>
            <p className="brand-subtitle">
              PROCHCHHOD NEWS <span>·</span> সংবাদে স্পষ্ট দৃষ্টিভঙ্গি
            </p>
          </div>
        </div>
      </header>
    </>
  );
}
