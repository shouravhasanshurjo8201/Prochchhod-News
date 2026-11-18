"use client";

import { useState } from "react";
import { Check, Minus, Plus, Share2 } from "lucide-react";

export default function ArticleTools() {
  const [fontSize, setFontSize] = useState(19);
  const [copied, setCopied] = useState(false);

  async function share() {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title: document.title, url });
      return;
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  function adjust(amount: number) {
    setFontSize((size) => Math.min(24, Math.max(16, size + amount)));
    document.documentElement.style.setProperty(
      "--article-font-size",
      `${Math.min(24, Math.max(16, fontSize + amount))}px`,
    );
  }

  return (
    <div className="flex items-center gap-1">
      <span className="mr-2 hidden text-[11px] text-muted sm:inline">
        লেখার আকার
      </span>
      <button
        className="tool-button"
        onClick={() => adjust(-1)}
        aria-label="Decrease font size"
      >
        <Minus size={15} />
      </button>
      <button
        className="tool-button"
        onClick={() => adjust(1)}
        aria-label="Increase font size"
      >
        <Plus size={15} />
      </button>
      <span className="mx-2 h-5 w-px bg-line dark:bg-white/10" />
      <button
        className="tool-button"
        onClick={share}
        aria-label="Share article"
      >
        {copied ? <Check size={16} /> : <Share2 size={16} />}
      </button>
    </div>
  );
}
