"use client";

import { useEffect, useState } from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";

const KEY = "refine-bookmarks";

function readBookmarks(): string[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function BookmarkButton({ slug, title }: { slug: string; title: string }) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(readBookmarks().includes(slug));
  }, [slug]);

  const toggle = () => {
    const current = readBookmarks();
    const exists = current.includes(slug);
    const next = exists ? current.filter((s) => s !== slug) : [...current, slug];
    localStorage.setItem(KEY, JSON.stringify(next));
    localStorage.setItem(`${KEY}-title-${slug}`, title);
    setSaved(!exists);
  };

  return (
    <button
      onClick={toggle}
      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-800 px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
    >
      {saved ? <BookmarkCheck size={13} className="text-blue-600 dark:text-blue-400" /> : <Bookmark size={13} />}
      {saved ? "Bookmarked" : "Bookmark"}
    </button>
  );
}
