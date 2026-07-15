"use client";

import { useEffect, useState } from "react";

export function ReadingProgress({ targetId }: { targetId: string }) {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
      setPct(total > 0 ? Math.round((scrolled / total) * 100) : 0);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [targetId]);

  return (
    <div className="no-print fixed top-14 left-0 right-0 z-30 h-0.5 bg-slate-100 dark:bg-slate-900">
      <div id="reading-progress-bar" className="h-full bg-blue-600" style={{ width: `${pct}%` }} />
    </div>
  );
}
