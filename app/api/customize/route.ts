import { NextRequest, NextResponse } from "next/server";
import { generateText } from "ai";
import { createAnthropic } from "@ai-sdk/anthropic";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export const runtime = "nodejs";
export const maxDuration = 30;

const RATE_LIMIT = 15;
const WINDOW_MS = 60 * 60 * 1000;
const hits = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || entry.resetAt < now) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count += 1;
  return true;
}

function getPlaybookRawContent(slug: string): { title: string; content: string } | null {
  const safeSlug = slug.replace(/[^a-z0-9-]/gi, "");
  const fullPath = path.join(process.cwd(), "content", "playbooks", `${safeSlug}.md`);
  if (!fs.existsSync(fullPath)) return null;
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  return { title: data.title, content };
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: "Rate limit exceeded. Please try again later." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { slug, scenario } = (body ?? {}) as { slug?: string; scenario?: string };
  if (!slug || !scenario || typeof scenario !== "string" || scenario.length > 2000) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const playbook = getPlaybookRawContent(slug);
  if (!playbook) {
    return NextResponse.json({ error: "Playbook not found" }, { status: 404 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({
      text: `[Demo mode — no ANTHROPIC_API_KEY configured]\n\nWith a key configured, this would apply "${playbook.title}" directly to: "${scenario}" — grounded in the playbook's framework, not generic hiring advice.`,
    });
  }

  try {
    const anthropic = createAnthropic({ apiKey });
    const model = process.env.ANTHROPIC_MODEL || "claude-sonnet-4-5";

    const prompt = `You are applying a specific playbook from Refine Playbooks to a reader's real situation. Use ONLY the framework, terminology, and philosophy in the playbook below as your source of truth. Do not introduce generic hiring advice or frameworks (like STAR) that the playbook doesn't use or explicitly moves away from. Match the voice of the playbook: direct, simple, no fluff, no corporate jargon, teach rather than lecture.

PLAYBOOK: "${playbook.title}"

PLAYBOOK CONTENT:
${playbook.content}

READER'S SITUATION:
${scenario}

Write a focused, practical response (250-400 words) applying this playbook's specific framework and terminology to the reader's exact situation. Reference the playbook's named framework and sections where relevant. Be concrete, not generic.`;

    const { text } = await generateText({
      model: anthropic(model),
      prompt,
      maxTokens: 700,
    });

    return NextResponse.json({ text });
  } catch (err) {
    console.error("[/api/customize] generation failed:", err instanceof Error ? err.message : "unknown error");
    return NextResponse.json({ error: "Live generation is unavailable right now. Please try again shortly." }, { status: 200 });
  }
}
