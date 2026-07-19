import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const sourcePath = resolve(root, "content/playbook.md");
const outputPath = resolve(root, process.argv[2] ?? "generated/notion-playbook.md");
const source = (await readFile(sourcePath, "utf8")).trim();

const wrapper = [
  "> This page is a complete mirror generated from the GitHub-canonical playbook. Edit the Markdown source in GitHub, then regenerate this body.",
  "",
  "[Canonical Markdown](https://github.com/avkotds/codex-workspace-playbook/blob/main/content/playbook.md) · [Manager template](https://github.com/avkotds/codex-workspace-playbook/blob/main/public/downloads/workspace-manager.md) · [Starter kit files](https://github.com/avkotds/codex-workspace-playbook/tree/main/public/downloads)",
  "",
  source,
  "",
  "---",
  "",
  "GitHub is canonical: [codex-workspace-playbook](https://github.com/avkotds/codex-workspace-playbook). Regenerate this full Notion mirror after changing the canonical Markdown.",
  "",
].join("\n");

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, wrapper, "utf8");
console.log(outputPath);
