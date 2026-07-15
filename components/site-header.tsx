import Link from "next/link";
import { BookOpen, Bookmark, Compass } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  return (
    <header className="no-print sticky top-0 z-40 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center">
            <BookOpen size={13} className="text-white" />
          </div>
          <span className="text-[14px] font-semibold tracking-tight text-slate-900 dark:text-slate-50">
            Refine Playbooks
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1 text-[13px] font-medium">
          <Link href="/playbooks" className="px-3 py-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900">
            Playbooks
          </Link>
          <Link href="/playbooks/roadmap" className="px-3 py-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 flex items-center gap-1.5">
            <Compass size={13} />
            Roadmap
          </Link>
          <Link href="/bookmarks" className="px-3 py-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 flex items-center gap-1.5">
            <Bookmark size={13} />
            Bookmarks
          </Link>
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
