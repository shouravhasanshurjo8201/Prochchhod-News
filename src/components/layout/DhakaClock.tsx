"use client";

import { useEffect, useState } from "react";

function formatDhakaTime(date: Date): string {
  return new Intl.DateTimeFormat("bn-BD", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "Asia/Dhaka",
  }).format(date);
}

export default function DhakaClock() {
  const [timeText, setTimeText] = useState<string>(() =>
    formatDhakaTime(new Date()),
  );

  useEffect(() => {
    const updateClock = () => {
      setTimeText(formatDhakaTime(new Date()));
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);

    return () => clearInterval(interval);
  }, []);

  return <span suppressHydrationWarning>{timeText} - বাংলাদেশ সময়</span>;
}
