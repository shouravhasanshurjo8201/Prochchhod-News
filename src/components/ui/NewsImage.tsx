"use client";

import Image from "next/image";
import { useState } from "react";
import { ImageIcon } from "lucide-react";
import { imageUrl } from "@/lib/utils";
import type { NewsImageProps } from "@/types/components";

export default function NewsImage({
  src,
  alt,
  className = "",
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
}: NewsImageProps) {
  const [failed, setFailed] = useState(false);
  const normalizedSrc = imageUrl(src);

  if (!normalizedSrc || failed) {
    return (
      <div
        aria-label={alt || "ছবির বিকল্প"}
        className={`absolute inset-0 flex items-center justify-center bg-[#e8e7e1] text-[#858781] dark:bg-[#292d2d] dark:text-[#9b9d96] ${className}`}
      >
        <ImageIcon aria-hidden="true" size={28} strokeWidth={1.4} />
      </div>
    );
  }

  return (
    <Image
      src={normalizedSrc}
      alt={alt || ""}
      fill
      sizes={sizes}
      priority={priority}
      className={`object-cover ${className}`}
      onError={() => setFailed(true)}
    />
  );
}
