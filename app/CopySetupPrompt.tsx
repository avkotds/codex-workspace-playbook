"use client";

import { useState } from "react";

export function CopySetupPrompt({ compact = false }: { compact?: boolean }) {
  const [state, setState] = useState<"idle" | "copied" | "error">("idle");
  async function copyPrompt() {
    try {
      const response = await fetch("/downloads/setup-prompt.md");
      if (!response.ok) throw new Error("Prompt unavailable");
      await navigator.clipboard.writeText(await response.text());
      setState("copied");
      window.setTimeout(() => setState("idle"), 2200);
    } catch { setState("error"); }
  }
  const label = state === "copied" ? "Setup prompt copied ✓" : state === "error" ? "Open setup prompt" : "Copy setup prompt";
  if (state === "error") return <a className={`button primary${compact ? " compact" : ""}`} href="/downloads/setup-prompt.md">{label}</a>;
  return <button className={`button primary${compact ? " compact" : ""}`} type="button" onClick={copyPrompt}>{label}</button>;
}
