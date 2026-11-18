import Link from "next/link";
import { ArrowUpRight, Code2 } from "lucide-react";

const socialLinks = [
  {
    label: "Facebook",
    handle: "@ProchchhodNews",
    href: "https://facebook.com/ProchchhodNews",
  },
  {
    label: "Instagram",
    handle: "@ProchchhodNews",
    href: "https://instagram.com/ProchchhodNews",
  },
  {
    label: "YouTube",
    handle: "@ProchchhodNews",
    href: "https://youtube.com/@ProchchhodNews",
  },
];

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-line bg-[#efeee9] dark:border-white/10 dark:bg-[#141717]">
      <div className="page-shell pt-12 md:pt-14 pb-4 md:pb-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="brand-wordmark text-3xl">
              প্রচ্ছদ<span> নিউজ</span>
            </p>
            <p className="mt-2 text-sm text-muted">
              Prochchhod News · সত্যের প্রতিচ্ছবি
            </p>
            <p className="mt-5 max-w-md text-sm leading-7 text-muted">
              বাংলাদেশের ও বিশ্বের নির্ভরযোগ্য খবর, এক জায়গায়। প্রতিদিনের
              গুরুত্বপূর্ণ ঘটনাগুলো জানুন সহজ ভাষায়।
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 text-sm sm:grid-cols-3">
            <div className="space-y-3">
              <p className="eyebrow mb-4">বিভাগ </p>
              <Link className="footer-link" href="/category/politics">
                রাজনীতি <ArrowUpRight size={13} />
              </Link>
              <Link className="footer-link" href="/category/world">
                বিশ্ব <ArrowUpRight size={13} />
              </Link>
              <Link className="footer-link" href="/category/economics">
                অর্থনীতি <ArrowUpRight size={13} />
              </Link>
              <Link className="footer-link" href="/category/sports">
                খেলা <ArrowUpRight size={13} />
              </Link>
              <Link className="footer-link" href="/category/technology">
                প্রযুক্তি <ArrowUpRight size={13} />
              </Link>
            </div>
            <div className="space-y-3">
              <p className="eyebrow mb-4">আরও জানুন </p>
              <Link className="footer-link" href="/">
                আমাদের সম্পর্কে <ArrowUpRight size={13} />
              </Link>
              <Link className="footer-link" href="/search">
                খবর খুঁজুন <ArrowUpRight size={13} />
              </Link>
            </div>
            <div className="space-y-3">
              <p className="eyebrow mb-4">সামাজিক মাধ্যম </p>
              {socialLinks.map((social) => (
                <a
                  className="footer-link"
                  href={social.href}
                  key={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.label} <ArrowUpRight size={13} />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-4 border-t border-line pt-5 text-xs text-muted dark:border-white/10 md:grid-cols-3 md:items-center">
          <div className="text-center md:text-left">
            © {new Date().getFullYear()} Prochchhod News · প্রচ্ছদ নিউজ.
            সর্বস্বত্ব সংরক্ষিত।
          </div>

          <div className="flex items-center justify-center gap-1.5">
            <Code2 className="size-3.5" />

            <span>Developed by</span>

            <a
              href="https://www.linkedin.com/in/shourav-hasan"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground transition-colors hover:text-primary"
            >
              Shourav Hasan
            </a>
          </div>

          <div className="text-center md:text-right">
            বিশ্বাসযোগ্য সংবাদ, নির্ভুল তথ্য।
          </div>
        </div>
      </div>
    </footer>
  );
}
