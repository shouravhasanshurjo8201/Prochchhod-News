import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  getLatestNews,
  getMostRead,
  getNewsFeed,
  getNewsSections,
} from "@/lib/api";
import BreakingTicker from "@/components/news/BreakingTicker";
import HeroLead from "@/components/news/HeroLead";
import NewsCard from "@/components/news/NewsCard";
import MostReadSidebar from "@/components/news/MostReadSidebar";
import SectionBlock from "@/components/news/SectionBlock";

export const revalidate = 120;

const isExcludedPromoArticle = (article: {
  title?: string | null;
  imageUrl?: string | null;
  imageAlt?: string | null;
}) => {
  const title = article.title?.trim() ?? "";
  const imageAlt = article.imageAlt?.trim() ?? "";
  const imageUrl = article.imageUrl ?? "";

  return (
    title === "BBC World Service অ্যাপ-এর নতুন ঠিকানায় স্বাগতম" ||
    imageAlt === "বিবিসি ওয়ার্ল্ড সার্ভিস লোগো" ||
    imageUrl.includes("5b1adaa0-d753-11f1-8bf4-5f3ca896096e")
  );
};

export default async function HomePage() {
  const [sections, latest, mostRead, feed] = await Promise.all([
    getNewsSections(),
    getLatestNews(5),
    getMostRead(),
    getNewsFeed(10),
  ]);
  const leadSection =
    sections.find((section) => section.title === "প্রধান খবর") ?? sections[0];
  const leads = (leadSection?.articles ?? feed).filter(
    (article) => !isExcludedPromoArticle(article),
  );
  const hero = leads[1];
  const secondary = leads.slice(2, 5);
  const categorySections = sections.filter(
    (section) =>
      section.articles?.length &&
      !["প্রধান খবর", "নির্বাচিত খবর"].includes(section.title) &&
      !section.title.includes("সামাজিক মাধ্যমে") &&
      !section.title.includes("বিবিসি বাংলা এখন") &&
      !section.title.includes("হোয়াটসঅ্যাপ") &&
      !section.title.includes("ইন্সটাগ্রাম"),
  );

  if (!hero) {
    return (
      <div className="page-shell py-24">
        <div className="empty-state">
          <p className="font-bengali text-2xl">
            এই মুহূর্তে খবর পাওয়া যাচ্ছে না
          </p>
          <p className="mt-2 text-sm text-muted">Please check back soon.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="page-shell">
        <BreakingTicker articles={latest} />
        <div className="home-date-row">
          <span>আজকের শিরোনাম</span>

          <span className="h-px flex-1 bg-line dark:bg-white/10" />

          <span className="text-[11px] text-muted">
            {new Date().toLocaleDateString("bn-BD", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>

        <section className="home-lead-grid items-stretch">
          <div className="flex min-w-0 flex-col">
            <HeroLead article={hero} />
          </div>
          <div className="flex h-full flex-col justify-between gap-6 border-t border-line pt-5 dark:border-white/10 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
            <div className="flex flex-1 flex-col">
              <p className="eyebrow mb-4">নির্বাচিত খবর</p>
              <div className="flex flex-1 flex-col justify-between divide-y divide-line dark:divide-white/10">
                {secondary.map((article) => (
                  <div key={article.id} className="py-3.5 first:pt-0 last:pb-0">
                    <NewsCard article={article} horizontal />
                  </div>
                ))}
                {!secondary.length &&
                  feed
                    .filter((article) => !isExcludedPromoArticle(article))
                    .slice(0, 3)
                    .map((article) => (
                      <div
                        key={article.id}
                        className="py-3.5 first:pt-0 last:pb-0"
                      >
                        <NewsCard article={article} horizontal />
                      </div>
                    ))}
              </div>
            </div>
            <Link
              href="/search"
              className="inline-flex items-center gap-2 self-start text-xs font-semibold text-accent"
            >
              প্রচ্ছদ খবর খুঁজুন <ArrowRight size={14} />
            </Link>
          </div>
        </section>

        {sections.some((section) => section.title === "নির্বাচিত খবর") && (
          <section className="editorial-section">
            <div className="section-heading">
              <div>
                <p className="section-title">নির্বাচিত খবর</p>
              </div>
              <span className="text-[11px] text-muted">
                বিশেষভাবে আপনার জন্য
              </span>
            </div>
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
              {(
                sections.find((section) => section.title === "নির্বাচিত খবর")
                  ?.articles ?? []
              )
                .filter(
                  (article, index) =>
                    index !== 1 && !isExcludedPromoArticle(article),
                )
                .slice(0, 3)
                .map((article) => (
                  <NewsCard key={article.id} article={article} />
                ))}
            </div>
          </section>
        )}

        <div className="home-body-grid">
          <div className="min-w-0">
            {categorySections.slice(0, 8).map((section) => (
              <SectionBlock
                section={section}
                key={`${section.title}-${section.curationId ?? ""}`}
              />
            ))}
            {!categorySections.length && (
              <section className="editorial-section">
                <div className="section-heading">
                  <div>
                    <p className="section-title">সর্বশেষ</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {feed
                    .filter((article) => !isExcludedPromoArticle(article))
                    .slice(0, 2)
                    .map((article) => (
                      <NewsCard key={article.id} article={article} />
                    ))}
                </div>
              </section>
            )}
          </div>

          <div className="pt-2 mt-9">
            <MostReadSidebar articles={mostRead} />
            <div className="mt-10 border border-line p-5 dark:border-white/10">
              <p className="eyebrow">দৃষ্টিভঙ্গি </p>
              <p className="mt-4 font-bengali text-xl font-semibold leading-8">
                খবরের ভিড়ে, সত্যের প্রতিচ্ছবি।
              </p>
              <p className="mt-2 text-sm leading-6 text-muted">
                বিশ্বকে আরও স্পষ্টভাবে দেখার জন্য সুচিন্তিত প্রতিবেদন।{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
