"use client";

import type { GlobalErrorProps } from "@/types/routes";

export default function ErrorPage({ reset }: GlobalErrorProps) {
  return (
    <div className="page-shell py-24">
      <div className="empty-state">
        <p className="font-bengali text-2xl">দুঃখিত, খবর লোড করা যায়নি</p>
        <p className="mt-2 text-sm text-muted">
          আমরা সর্বশেষ খবরগুলো লোড করতে পারিনি। অনুগ্রহ করে আবার চেষ্টা করুন।
        </p>
        <button className="outline-button mt-6" onClick={reset}>
          আবার চেষ্টা করুন{" "}
        </button>
      </div>
    </div>
  );
}
