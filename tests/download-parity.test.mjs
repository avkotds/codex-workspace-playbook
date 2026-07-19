import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const downloadNames = ["AGENTS.md", "WORKSPACE_INDEX.md", "project-AGENTS.md", "knowledge-bootstrap.md", "workspace-manager.md", "setup-prompt.md"];

function readStoredZip(buffer) {
  const entries = new Map();
  let offset = 0;
  while (buffer.readUInt32LE(offset) === 0x04034b50) {
    const method = buffer.readUInt16LE(offset + 8);
    const size = buffer.readUInt32LE(offset + 18);
    const nameLength = buffer.readUInt16LE(offset + 26);
    const extraLength = buffer.readUInt16LE(offset + 28);
    assert.equal(method, 0, "starter ZIP entries must use deterministic store mode");
    const nameStart = offset + 30;
    const bodyStart = nameStart + nameLength + extraLength;
    const name = buffer.subarray(nameStart, nameStart + nameLength).toString("utf8");
    entries.set(name, buffer.subarray(bodyStart, bodyStart + size));
    offset = bodyStart + size;
  }
  return entries;
}

test("starter ZIP exactly mirrors every downloadable template", async () => {
  const zip = readStoredZip(await readFile(new URL("../public/downloads/codex-workspace-starter.zip", import.meta.url)));
  assert.deepEqual([...zip.keys()], downloadNames);
  for (const name of downloadNames) {
    const source = await readFile(new URL(`../public/downloads/${name}`, import.meta.url));
    assert.deepEqual(zip.get(name), source, `${name} differs between public download and ZIP`);
  }
});

test("Notion body is a complete canonical mirror with wrapper links and footer", async () => {
  const guide = (await readFile(new URL("../content/playbook.md", import.meta.url), "utf8")).trim();
  const notion = await readFile(new URL("../generated/notion-playbook.md", import.meta.url), "utf8");
  assert.ok(notion.includes(guide), "Notion body must include the full canonical Markdown");
  assert.match(notion, /Canonical Markdown/);
  assert.match(notion, /Manager template/);
  assert.match(notion, /GitHub is canonical/);
});

test("canonical and download surfaces share the manager-routing contract", async () => {
  const paths = ["../content/playbook.md", "../public/downloads/workspace-manager.md", "../public/downloads/setup-prompt.md", "../generated/notion-playbook.md"];
  const phrases = [
    /MCP\/app\/API → CLI\/SDK\/SSH → Browser\/Chrome → Computer Use/,
    /identity, authentication, permissions, schema, target, and callability/i,
    /Current Codex example — July 2026/,
    /workers never use High/i,
    /outcome, relevant changes, verification, exact references, and blockers/i,
  ];
  for (const path of paths) {
    const text = await readFile(new URL(path, import.meta.url), "utf8");
    for (const phrase of phrases) assert.match(text, phrase, `${path} is missing ${phrase}`);
  }
});
