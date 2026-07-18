import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request("http://localhost/", { headers: { accept: "text/html" } }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
}

test("server-renders the finished playbook", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /<title>Codex Workspace Playbook<\/title>/i);
  assert.match(html, /Turn one folder into a working AI team/);
  assert.match(html, /Threads own outcomes/);
  assert.match(html, /Download starter kit/);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|react-loading-skeleton/);
});

test("canonical guide and downloadable prompt retain the core contract", async () => {
  const guide = await readFile(new URL("../content/playbook.md", import.meta.url), "utf8");
  const prompt = await readFile(new URL("../public/downloads/setup-prompt.md", import.meta.url), "utf8");
  for (const phrase of ["Workspace Manager", "separate.*threads", "sub-agents", "verif"]) {
    assert.match(guide, new RegExp(phrase, "i"));
    assert.match(prompt, new RegExp(phrase, "i"));
  }
});
