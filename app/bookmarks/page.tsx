"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bookmark, X } from "lucide-react";

const KEY = "refine-bookmarks";

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<{ slug: string; title: string }[]>([]);

  useEffect(() => {
    try {
      const slugs: string[] = JSON.parse(localStorage.getItem(KEY) || "[]");
      const items = slugs.map((slug) => ({
        slug,
        title: localStorage.getItem(`${KEY}-title-${slug}`) || slug,
      }));
      setBookmarks(items);
    } catch {
      setBookmarks([]);
    }
  }, []);

  const remove = (slug: string) => {
    const next = bookmarks.filter((b) => b.slug !== slug);
    setBookmarks(next);
    localStorage.setItem(KEY, JSON.stringify(next.map((b) => b.slug)));
  };

  return (
    <main className="max-w-3xl mx-auto px-5 sm:px-8 py-12">
      <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 mb-1.5">Bookmarks</h1>
      <p className="text-sm text-slate-500 mb-8">Saved on this device only — bookmarks aren&apos;t synced to an account.</p>

      {bookmarks.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-8 text-center">
          <Bookmark size={20} className="mx-auto text-slate-300 dark:text-slate-700 mb-3" />
          <p className="text-sm text-slate-500">No bookmarks yet. Open any playbook and click Bookmark.</p>
        </div>
      ) : (
        <ul className="space-y-2">
          {bookmarks.map((b) => (
            <li key={b.slug} className="flex items-center justify-between rounded-xl border border-slate-200 dark:border-slate-800 px-4 py-3">
              <Link href={`/playbooks/${b.slug}`} className="text-sm font-medium text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400">
                {b.title}
              </Link>
              <button onClick={() => remove(b.slug)} className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200">
                <X size={14} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
