import Link from "next/link";
import { ArrowRight, BookOpen, Users, Search } from "lucide-react";
import { getAllPlaybookSummaries } from "@/lib/playbooks";
import { PUBLISHED_COUNT, TOTAL_COUNT } from "@/lib/topics";

export default function HomePage() {
  const playbooks = getAllPlaybookSummaries();

  return (
    <main>
      <section className="max-w-4xl mx-auto px-5 sm:px-8 pt-20 pb-16 text-center">
        <p className="text-[13px] font-medium text-blue-600 dark:text-blue-400 mb-4">
          A knowledge system for hiring managers, candidates, and recruiters
        </p>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 leading-tight">
          Better hiring starts with better judgment.
        </h1>
        <p className="mt-4 text-base text-slate-500 max-w-2xl mx-auto leading-relaxed">
          Refine Playbooks codifies one recruiter&apos;s philosophy after years preparing hundreds of product
          leaders for interviews, and helping hiring managers evaluate them well. Hiring managers become better
          interviewers. Candidates become better communicators. Recruiters become better advisors.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3 flex-wrap">
          <Link
            href="/playbooks"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 text-white px-5 py-3 text-sm font-semibold hover:bg-blue-700 transition-colors"
          >
            Browse the playbooks
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/playbooks/roadmap"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 px-5 py-3 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
          >
            See the full roadmap
          </Link>
        </div>
        <p className="mt-4 text-[12px] text-slate-400">
          {PUBLISHED_COUNT} playbooks published · {TOTAL_COUNT} in the full knowledge system
        </p>
      </section>

      <section className="max-w-4xl mx-auto px-5 sm:px-8 pb-16">
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { icon: BookOpen, title: "One idea per playbook", body: "Every playbook solves exactly one hiring problem, in enough depth to actually change how you prepare or evaluate." },
            { icon: Users, title: "Both sides of the table", body: "Every playbook covers the hiring manager's perspective and the candidate's — because good hiring depends on both." },
            { icon: Search, title: "Frameworks that disappear", body: "The goal is never to sound like you memorized a framework. It's to think clearly enough that you don't need one." },
          ].map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-2xl border border-slate-200 dark:border-slate-800 p-5 bg-white dark:bg-slate-900/60">
              <Icon size={18} className="text-blue-600 dark:text-blue-400 mb-3" />
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-1.5">{title}</h3>
              <p className="text-[13px] text-slate-500 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-5 sm:px-8 pb-24">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">Start here</h2>
          <Link href="/playbooks" className="text-[13px] font-medium text-blue-600 dark:text-blue-400 hover:underline">
            View all
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {playbooks.map((p) => (
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
      </section>
    </main>
  );
}
