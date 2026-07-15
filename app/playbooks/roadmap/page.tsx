import Link from "next/link";
import { CheckCircle2, Circle } from "lucide-react";
import { getTopicsByCategory, PUBLISHED_COUNT, TOTAL_COUNT } from "@/lib/topics";

export const metadata = { title: "Roadmap — Refine Playbooks" };

export default function RoadmapPage() {
  const byCategory = getTopicsByCategory();

  return (
    <main className="max-w-4xl mx-auto px-5 sm:px-8 py-12">
      <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 mb-1.5">
        The full knowledge system
      </h1>
      <p className="text-sm text-slate-500 mb-1">
        {PUBLISHED_COUNT} of {TOTAL_COUNT} playbooks are published. The rest are on the roadmap — this page exists
        so the shape of the system is visible before every playbook is written.
      </p>
      <p className="text-[12px] text-slate-400 mb-8">
        Nothing here is placeholder content pretending to be a finished playbook — unpublished topics are marked
        clearly as coming soon.
      </p>

      <div className="space-y-8">
        {Object.entries(byCategory).map(([category, topics]) => (
          <div key={category}>
            <h2 className="text-[13px] font-semibold tracking-wide uppercase text-slate-500 dark:text-slate-400 mb-3">
              {category}
            </h2>
            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
              {topics.map((t) => (
                <li key={t.title} className="flex items-center gap-2 text-sm">
                  {t.slug ? (
                    <>
                      <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                      <Link href={`/playbooks/${t.slug}`} className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400">
                        {t.title}
                      </Link>
                    </>
                  ) : (
                    <>
                      <Circle size={14} className="text-slate-300 dark:text-slate-700 shrink-0" />
                      <span className="text-slate-400">{t.title}</span>
                      <span className="text-[10px] text-slate-300 dark:text-slate-700">coming soon</span>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </main>
  );
}
