import Link from "next/link";
import type { PlaybookSummary } from "@/types/playbook";

export function RelatedPlaybooks({ playbooks }: { playbooks: PlaybookSummary[] }) {
  if (playbooks.length === 0) return null;
  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-5 bg-white dark:bg-slate-900/60">
      <h3 className="text-[13px] font-semibold tracking-wide uppercase text-slate-500 dark:text-slate-400 mb-3">
        Related Playbooks
      </h3>
      <ul className="space-y-3">
        {playbooks.map((p) => (
          <li key={p.slug}>
            <Link href={`/playbooks/${p.slug}`} className="block group">
              <p className="text-[13px] font-medium text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                {p.title}
              </p>
              <p className="text-[12px] text-slate-400">{p.category}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
