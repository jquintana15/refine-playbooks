# Refine Playbooks

Better hiring starts with better judgment.

A knowledge system for hiring managers, candidates, and recruiters, built
around one recruiter's philosophy: preparation beats memorization, ownership
beats participation, and interview performance is the communication of real
experience — never the invention of it.

Built with **Next.js 15 (App Router) + TypeScript + Tailwind CSS**, content
in **Markdown**, and an AI layer (**Vercel AI SDK + Anthropic**) that applies
the playbooks to a reader's specific situation — grounded in the playbook
text itself, never generic hiring advice.

## What's actually published in this build

This build ships **6 complete, publishable playbooks** — full depth, every
required section, ready to publish today:

1. Preparation Beats Memorization *(the core Refine Framework)*
2. How Candidates Should Prepare Stories
3. Ownership vs. Participation
4. How Hiring Managers Should Read Resumes
5. How to Evaluate Product Sense
6. Behavioral Interviews: Applying the Refine Framework

The full topic list from the brief (~70 topics) is real and live on
`/playbooks/roadmap` — clearly marked published vs. coming soon. Writing all
of them to the same depth as the six above is a big, ongoing content project,
not something to fake with placeholder text. The system is built to take
them as fast as they're written: drop a new Markdown file in
`content/playbooks/`, add one line to `lib/topics.ts`, and it's live —
search, related playbooks, categories, and the AI customize panel all pick
it up automatically.

## Stack

- **Next.js 15** App Router, Server + Client Components
- **TypeScript**, **Tailwind CSS** (dark mode via class strategy)
- **Markdown content** parsed with `gray-matter` + `remark` — no CMS lock-in,
  every playbook is a portable `.md` file
- **Vercel AI SDK** (`ai` + `@ai-sdk/anthropic`) for the "Customize this
  Playbook" feature, server-side only
- Deploys to **Vercel**

## Folder structure

```
refine-playbooks/
├── content/playbooks/*.md        # every playbook — the actual content
├── lib/
│   ├── playbooks.ts               # reads & renders markdown playbooks
│   ├── topics.ts                  # the full ~70-topic roadmap taxonomy
│   └── utils.ts
├── app/
│   ├── page.tsx                   # home / mission page
│   ├── playbooks/page.tsx         # searchable index
│   ├── playbooks/[slug]/page.tsx  # individual playbook
│   ├── playbooks/roadmap/page.tsx # full topic roadmap
│   ├── bookmarks/page.tsx         # localStorage-backed bookmarks
│   └── api/customize/route.ts     # AI "apply this playbook" endpoint
├── components/                    # header, footer, search, progress bar,
│                                   # bookmark button, related playbooks,
│                                   # customize panel, theme toggle
└── types/playbook.ts
```

## Adding a new playbook

1. Create `content/playbooks/your-slug.md` with this frontmatter:
   ```
   ---
   title: "Your Playbook Title"
   slug: "your-slug"
   category: "One of the existing categories, or a new one"
   description: "One sentence for cards and search results."
   readingTime: "8 min"
   ---
   ```
2. Write the body using `##` headers for each required section (Executive
   Summary, Why This Matters, The Refine Framework, How Hiring Managers
   Think, How Candidates Should Think, Common Mistakes, Real Examples,
   Interview Questions, Follow-up Questions, Strong Signals, Weak Signals,
   Red Flags, Green Flags, Decision Framework, Preparation Checklist, Hiring
   Manager Checklist, Candidate Checklist, Key Takeaways). Related Playbooks
   is generated automatically from category — don't write it by hand.
3. Update `lib/topics.ts`: find the matching topic entry and set its `slug`
   to your new slug (or add a new entry if it's a new topic).
4. That's it — search, the roadmap page, and the AI customize panel all pick
   it up with no other code changes.

## Environment variables

Copy `.env.example` to `.env.local`:

```
ANTHROPIC_API_KEY=sk-ant-...
ANTHROPIC_MODEL=claude-sonnet-4-5
```

Without a key, `/api/customize` returns a clearly labeled demo response
instead of failing — the rest of the site (all playbook content, search,
bookmarks) works fully with no key at all, since none of that depends on AI.

## Local development

```bash
npm install
cp .env.example .env.local   # add your real ANTHROPIC_API_KEY
npm run dev
```

## Deploying to Vercel

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit — Refine Playbooks"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/refine-playbooks.git
git push -u origin main
```

### 2. Import into Vercel
Go to https://vercel.com → **Add New… → Project** → import the repo. Vercel
auto-detects Next.js; no build settings need to change.

### 3. Add environment variables
Before or right after the first deploy, add `ANTHROPIC_API_KEY` (and
optionally `ANTHROPIC_MODEL`) under **Settings → Environment Variables**,
then redeploy.

### 4. Custom domain
**Settings → Domains** → add your domain → follow Vercel's DNS instructions
(A record for a root domain, CNAME for a subdomain). HTTPS is issued
automatically once DNS resolves.

## Production-readiness notes

**Ready:**
- Server-side AI calls only; no API key in the browser
- Content lives in portable Markdown, not locked into a database
- Every page — home, index, individual playbooks, roadmap, bookmarks — works
  with zero AI dependency; only the customize panel needs a key
- Dark mode, responsive layout, reading progress, bookmarks, search, related
  playbooks, and category filtering are all fully wired

**Before a public launch:**
- [ ] Write the remaining playbooks on the roadmap — this is the actual
      long pole, not an engineering task.
- [ ] Replace the in-memory rate limiter on `/api/customize` with a durable
      one (e.g. Upstash) before high traffic.
- [ ] Add real SEO metadata per playbook (Open Graph images, structured
      data) once the content set is more complete.
- [ ] Consider a proper search index (e.g. Algolia or a static search JSON)
      if the playbook count grows past what client-side filtering handles
      comfortably — fine as-is through the next few dozen playbooks.
- [ ] Add analytics if you want to see which playbooks get used most, using
      a privacy-friendly, anonymous-only tool.
