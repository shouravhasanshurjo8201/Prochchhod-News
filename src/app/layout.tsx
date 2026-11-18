import type { Metadata } from "next";
import { Hind_Siliguri, Plus_Jakarta_Sans } from "next/font/google";
import { getCategories } from "@/lib/api";
import type { NewsCategory } from "@/types/news";
import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const hind = Hind_Siliguri({
  weight: ["400", "500", "600", "700"],
  subsets: ["bengali", "latin"],
  variable: "--font-hind-fallback",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://prochchhod-news-jkcu-nine.vercel.app/"),
  title: {
    default: "প্রচ্ছদ নিউজ | Prochchhod News",
    template: "%s | প্রচ্ছদ নিউজ",
  },
  description:
    "বাংলাদেশ ও বিশ্বের নির্ভরযোগ্য সংবাদ। Prochchhod News — a thoughtful view of the stories that matter.",
  applicationName: "Prochchhod News",
  creator: "Prochchhod News",
  publisher: "Prochchhod News",
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    type: "website",
    locale: "bn_BD",
    siteName: "Prochchhod News",
    title: "প্রচ্ছদ নিউজ | Prochchhod News",
  },
  twitter: {
    card: "summary_large_image",
    title: "প্রচ্ছদ নিউজ | Prochchhod News",
    description:
      "বাংলাদেশ ও বিশ্বের নির্ভরযোগ্য সংবাদ। Prochchhod News — a thoughtful view of the stories that matter.",
  },
};

async function categoryList(): Promise<NewsCategory[]> {
  try {
    return await getCategories();
  } catch (error) {
    console.error("Could not load navigation categories:", error);
    return [];
  }
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const categories = await categoryList();
  return (
    <html
      lang="bn"
      className={`${hind.variable} ${jakarta.variable}`}
      suppressHydrationWarning
    >
      <body>
        <Header />
        <Navbar categories={categories} />
        <main className="min-h-[55vh]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
