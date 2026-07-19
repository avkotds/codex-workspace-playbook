# Set up my Codex workspace safely

Help me create a beginner-friendly Codex workspace using the Codex Workspace Playbook. GitHub remains canonical for project source and the public playbook.

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

- One or two projects usually do not need a manager; consider one with three or more active projects or repetitive routing.
- Use separate project-scoped threads for durable outcomes and sub-agents only for independent bounded work.
- Read the relevant skill, runbook, or source of truth before routing a workflow.
- Select the execution interface before the worker model: MCP/app/API → CLI/SDK/SSH → Browser/Chrome → Computer Use.
- Diagnose structured failures by identity, authentication, permissions, schema, target, and callability; never silently fall back to Browser or Computer Use.
- Use hybrid execution when helpful: structured mutation followed by UI visual verification.
- Use the most capable reasoning model for manager planning and review. Delegate bounded execution to the fastest, lowest-cost capable worker.
- Explain the dated **Current Codex example — July 2026** model table from `workspace-manager.md`, while keeping general capability guidance primary.
- Workers never use High reasoning; the manager decomposes or reviews instead.
- Require each worker to return outcome, relevant changes, verification, exact references, and blockers.
- Keep full logs in the worker and pull targeted evidence into the manager only when needed. Do not add global output or compaction hacks.
- Explain that this minimizes expensive reasoning use but cannot guarantee lower total token usage.
- Treat tests and builds as evidence; verify the actual output or runtime before reporting completion.

After creating the files, read them back, validate all referenced paths, confirm no secrets were written, and give me one example request I can send to the Workspace Manager.
