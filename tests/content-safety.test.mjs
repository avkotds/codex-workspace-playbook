import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import test from "node:test";

const roots = [new URL("../content/", import.meta.url), new URL("../public/downloads/", import.meta.url), new URL("../generated/", import.meta.url)];
const sourceOutputs = [new URL("../app/page.tsx", import.meta.url), new URL("../README.md", import.meta.url)];
const forbidden = [
  /[A-Z]:\\(?:Users|GitHub-projects)\\/i,
  /\/home\/[a-z0-9_-]+\/projects\//i,
  /[\w.+-]+@[\w.-]+\.[a-z]{2,}/i,
  /(?:secret|token|password)\s*[:=]\s*[^\s`\[]+/i,
  /\b[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\b/i,
];

test("public guide and starter files contain no private identifiers", async () => {
  const texts = [];
  for (const root of roots) {
    for (const name of await readdir(root)) {
      if (!name.endsWith(".md")) continue;
      texts.push([name, await readFile(new URL(name, root), "utf8")]);
    }
  }
  for (const file of sourceOutputs) texts.push([file.pathname, await readFile(file, "utf8")]);
  for (const [name, text] of texts) {
    for (const pattern of forbidden) assert.doesNotMatch(text, pattern, `${name} matched ${pattern}`);
  }
});
