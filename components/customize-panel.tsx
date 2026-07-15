"use client";

import { useState } from "react";
import { Sparkles, Loader2, ShieldCheck } from "lucide-react";

const EXAMPLE_PROMPTS = [
  "I'm interviewing a Principal Product Manager.",
  "I'm hiring a Head of Product.",
  "I'm interviewing for Stripe.",
  "I'm hiring a payments product leader.",
  "I need to evaluate strategic thinking.",
];

export function CustomizePanel({ slug, title }: { slug: string; title: string }) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [response, setResponse] = useState("");

  const run = async (value?: string) => {
    const q = (value ?? prompt).trim();
    if (!q) return;
    setLoading(true);
    setError("");
    setResponse("");
    try {
      const res = await fetch("/api/customize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, scenario: q }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setResponse(data.text);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-blue-200 dark:border-blue-500/20 bg-blue-50/40 dark:bg-slate-900/60 p-5">
      <div className="flex items-center gap-2 mb-1.5">
        <Sparkles size={15} className="text-blue-600 dark:text-blue-400" />
        <h3 className="text-[13px] font-semibold tracking-wide uppercase text-slate-600 dark:text-slate-300">
          Customize this Playbook
        </h3>
      </div>
      <p className="text-[13px] text-slate-500 leading-relaxed mb-3">
        Describe your situation, and this playbook's framework will be applied to it directly — not generic hiring
        advice.
      </p>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {EXAMPLE_PROMPTS.map((ex) => (
          <button
            key={ex}
            onClick={() => {
              setPrompt(ex);
              run(ex);
            }}
            className="text-[11px] font-medium px-2.5 py-1 rounded-full border border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-white dark:hover:bg-slate-800"
          >
            {ex}
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && run()}
          placeholder={`Apply "${title}" to your situation…`}
          className="flex-1 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/25 dark:focus:ring-blue-500/40 text-slate-800 dark:text-slate-100 placeholder:text-slate-400"
        />
        <button
          onClick={() => run()}
          disabled={loading || !prompt.trim()}
          className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 text-white px-4 py-2 text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? <Loader2 size={14} className="animate-spin" /> : "Apply"}
        </button>
      </div>

      {error && <p className="text-[12px] text-amber-600 mt-3">{error}</p>}

      {response && (
        <div className="mt-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-4">
          <p className="text-sm whitespace-pre-wrap leading-relaxed text-slate-700 dark:text-slate-300">{response}</p>
        </div>
      )}

      <p className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-3">
        <ShieldCheck size={12} />
        Your scenario is sent to Anthropic's Claude API to generate this response and is not stored.
      </p>
    </div>
  );
}
