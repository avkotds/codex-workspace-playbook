# Workspace Instructions

## Work style

- Inspect before changing files.
- Prefer completing a clear task end to end.
- Ask only questions that materially change the result.
- Verify the real artifact before reporting completion.

## Project routing

- Read `WORKSPACE_INDEX.md` before choosing a project.
- Route implementation only to entries marked `Canonical`.
- Never treat a linked worktree, duplicate, archive, or unknown folder as canonical.
- Read the target project's `AGENTS.md` or runbook before working.

## Git safety

- Check Git status early.
- Use a new branch for normal work.
- Use a worktree when the checkout is dirty, the change is risky, or work runs in parallel.
- Preserve unrelated changes and stage only relevant files.

## Task contract

For non-trivial tasks, state:

- Repo
- Mode
- Target
- Done when
- Rules

Keep secrets, credentials, tokens, and personal data out of prompts and repositories.
