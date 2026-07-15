import { getAllPlaybookSummaries, getCategories } from "@/lib/playbooks";
import { SearchablePlaybookList } from "@/components/searchable-playbook-list";

export const metadata = { title: "Playbooks — Refine Playbooks" };

export default function PlaybooksIndexPage() {
  const playbooks = getAllPlaybookSummaries();
  const categories = getCategories();

  return (
    <main className="max-w-5xl mx-auto px-5 sm:px-8 py-12">
      <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 mb-1.5">Playbooks</h1>
      <p className="text-sm text-slate-500 mb-8">
        Every playbook solves exactly one hiring problem, for both sides of the table.
      </p>
      <SearchablePlaybookList playbooks={playbooks} categories={categories} />
    </main>
  );
}
