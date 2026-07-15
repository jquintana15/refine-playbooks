export function SiteFooter() {
  return (
    <footer className="no-print border-t border-slate-200 dark:border-slate-800 mt-16">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <p className="text-[13px] font-medium text-slate-700 dark:text-slate-300">Refine Playbooks</p>
          <p className="text-[12px] text-slate-400 mt-0.5">Better hiring starts with better judgment.</p>
        </div>
        <p className="text-[12px] text-slate-400 max-w-md">
          Decision support only. Playbooks reflect one point of view on hiring — use judgment, and always pair them
          with your own evaluation of the person in front of you.
        </p>
      </div>
    </footer>
  );
}
