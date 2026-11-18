import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page-shell py-28">
      <div className="empty-state">
        <p className="font-sans text-6xl font-semibold text-accent">404</p>
        <p className="mt-4 font-bengali text-2xl">খবরটি খুঁজে পাওয়া যায়নি</p>
        <Link href="/" className="outline-button mt-7">
          প্রচ্ছদে ফিরুন
        </Link>
      </div>
    </div>
  );
}
