# Set up my Codex workspace safely

Help me create a beginner-friendly Codex workspace using the Codex Workspace Playbook.

First, inspect the current directory and existing files without changing anything. Then ask me only for information you cannot discover:

1. The workspace root path I want to use.
2. Whether durable knowledge lives in Notion, Obsidian, plain Markdown, or somewhere else.
3. The first one or two projects that should be canonical.

Before writing, show a concise preview of the files and directories you intend to create or update. Never overwrite an existing file silently. If a target file already exists, read it, preserve unrelated content, and propose a merged version.

Create or adapt:

- Root `AGENTS.md` for shared work, Git, safety, and verification rules.
- Root `WORKSPACE_INDEX.md` that distinguishes canonical projects from duplicates, worktrees, archives, and unknown folders.
- `knowledge-bootstrap.md` that points to the smallest durable knowledge entry point without storing secrets or private identifiers.
- `workspace-manager.md` for a pinned orchestration thread that owns routing and acceptance.
- A project-level `AGENTS.md` template for each canonical project.

Teach me how to use the result:

- Use separate project-scoped threads for durable outcomes.
- Use sub-agents inside a thread only for independent bounded checks, research lanes, or variations.
- Avoid multiple agents editing the same files.
- Let the central manager policy choose the lowest capable model instead of asking me to select one every time.
- Treat tests and builds as evidence; verify the actual output or runtime before reporting completion.

After creating the files, read them back, validate all referenced paths, confirm no secrets were written, and give me one example request I can send to the Workspace Manager.
