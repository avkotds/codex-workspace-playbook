"use client";

import { useState } from "react";

export function CopyPrompt({ text }: { text: string }) {
  const [state, setState] = useState<"idle" | "copied" | "error">("idle");

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setState("copied");
      window.setTimeout(() => setState("idle"), 2200);
    } catch {
      setState("error");
    }
  }

  const label = state === "copied" ? "Copied" : state === "error" ? "Copy failed" : "Copy prompt";
  return <button className="prompt-copy" type="button" onClick={copy} aria-live="polite">{label}</button>;
}
