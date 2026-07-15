import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";
import type { Playbook, PlaybookSummary } from "@/types/playbook";

const PLAYBOOKS_DIR = path.join(process.cwd(), "content", "playbooks");

export function getAllPlaybookSlugs(): string[] {
  if (!fs.existsSync(PLAYBOOKS_DIR)) return [];
  return fs
    .readdirSync(PLAYBOOKS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getAllPlaybookSummaries(): PlaybookSummary[] {
  return getAllPlaybookSlugs()
    .map((slug) => {
      const fullPath = path.join(PLAYBOOKS_DIR, `${slug}.md`);
      const raw = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(raw);
      return {
        title: data.title,
        slug: data.slug || slug,
        category: data.category,
        description: data.description,
        readingTime: data.readingTime,
      } as PlaybookSummary;
    })
    .sort((a, b) => a.title.localeCompare(b.title));
}

export async function getPlaybookBySlug(slug: string): Promise<Playbook | null> {
  const fullPath = path.join(PLAYBOOKS_DIR, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  const processed = await remark().use(remarkHtml).process(content);
  const contentHtml = processed.toString();
  return {
    title: data.title,
    slug: data.slug || slug,
    category: data.category,
    description: data.description,
    readingTime: data.readingTime,
    contentHtml,
  };
}

export function getRelatedPlaybooks(current: PlaybookSummary, limit = 3): PlaybookSummary[] {
  const all = getAllPlaybookSummaries().filter((p) => p.slug !== current.slug);
  const sameCategory = all.filter((p) => p.category === current.category);
  const rest = all.filter((p) => p.category !== current.category);
  return [...sameCategory, ...rest].slice(0, limit);
}

export function getCategories(): string[] {
  const all = getAllPlaybookSummaries();
  return Array.from(new Set(all.map((p) => p.category))).sort();
}
