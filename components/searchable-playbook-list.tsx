"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import type { PlaybookSummary } from "@/types/playbook";
import { cn } from "@/lib/utils";

export function SearchablePlaybookList({
  playbooks,
  categories,
}: {
  playbooks: PlaybookSummary[];
  categories: string[];
}) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return playbooks.filter((p) => {
      const matchesQuery =
        !q || p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
      const matchesCategory = !activeCategory || p.category === activeCategory;
      return matchesQuery && matchesCategory;
    });
  }, [playbooks, query, activeCategory]);

  return (
    <div>
      <div className="relative mb-5">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search playbooks…"
          className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 pl-10 pr-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500/25 dark:focus:ring-blue-500/40 text-slate-800 dark:text-slate-100 placeholder:text-slate-400"
        />
      </div>

      <div className="flex flex-wrap gap-1.5 mb-6">
        <button
          onClick={() => setActiveCategory(null)}
          className={cn(
            "text-[12px] font-medium px-2.5 py-1 rounded-full border transition-colors",
            !activeCategory
              ? "bg-blue-600 text-white border-blue-600"
              : "border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-900"
          )}
        >
          All
        </button>
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActiveCategory(c)}
            className={cn(
              "text-[12px] font-medium px-2.5 py-1 rounded-full border transition-colors",
              activeCategory === c
                ? "bg-blue-600 text-white border-blue-600"
                : "border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-900"
            )}
          >
            {c}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-slate-500">No playbooks match that search yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {filtered.map((p) => (
            <Link
              key={p.slug}
              href={`/playbooks/${p.slug}`}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 p-5 bg-white dark:bg-slate-900/60 hover:border-blue-300 dark:hover:border-blue-500/40 transition-colors"
            >
              <p className="text-[11px] font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400 mb-1.5">
                {p.category}
              </p>
              <h3 className="text-[15px] font-semibold text-slate-900 dark:text-slate-100 mb-1.5">{p.title}</h3>
              <p className="text-[13px] text-slate-500 leading-relaxed mb-2">{p.description}</p>
              <p className="text-[11px] text-slate-400">{p.readingTime} read</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
