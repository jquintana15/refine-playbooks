import { notFound } from "next/navigation";
import { getAllPlaybookSlugs, getPlaybookBySlug, getRelatedPlaybooks } from "@/lib/playbooks";
import { ReadingProgress } from "@/components/reading-progress";
import { BookmarkButton } from "@/components/bookmark-button";
import { RelatedPlaybooks } from "@/components/related-playbooks";
import { CustomizePanel } from "@/components/customize-panel";

export async function generateStaticParams() {
  return getAllPlaybookSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const playbook = await getPlaybookBySlug(params.slug);
  if (!playbook) return {};
  return { title: `${playbook.title} — Refine Playbooks`, description: playbook.description };
}

export default async function PlaybookPage({ params }: { params: { slug: string } }) {
  const playbook = await getPlaybookBySlug(params.slug);
  if (!playbook) notFound();

  const related = getRelatedPlaybooks(playbook, 3);

  return (
    <>
      <ReadingProgress targetId="playbook-article" />
      <main className="max-w-6xl mx-auto px-5 sm:px-8 py-10">
        <div className="grid lg:grid-cols-[1fr_280px] gap-10">
          <article id="playbook-article">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400 mb-2">
              {playbook.category}
            </p>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 mb-2">
              {playbook.title}
            </h1>
            <div className="flex items-center gap-3 mb-6">
              <p className="text-[13px] text-slate-400">{playbook.readingTime} read</p>
              <BookmarkButton slug={playbook.slug} title={playbook.title} />
            </div>

            <div
              className="prose-playbook text-[15px] text-slate-700 dark:text-slate-300"
              dangerouslySetInnerHTML={{ __html: playbook.contentHtml }}
            />

            <div className="mt-10">
              <CustomizePanel slug={playbook.slug} title={playbook.title} />
            </div>
          </article>

          <aside className="no-print lg:sticky lg:top-20 h-fit space-y-4">
            <RelatedPlaybooks playbooks={related} />
          </aside>
        </div>
      </main>
    </>
  );
}
