export interface PlaybookFrontmatter {
  title: string;
  slug: string;
  category: string;
  description: string;
  readingTime: string;
}

export type PlaybookSummary = PlaybookFrontmatter;

export interface Playbook extends PlaybookFrontmatter {
  contentHtml: string;
}

export interface Topic {
  title: string;
  category: string;
  slug: string | null; // null = not yet published
}
