# Codex Workspace Playbook

## The idea

Codex works best when it does not have to rediscover your world in every conversation. Give it a small, durable map:

1. A parent workspace folder that contains your projects.
2. One Git repository per real project.
3. Root instructions that define shared rules.
4. A workspace index that identifies canonical projects and blocked duplicates.
5. Short project instructions and runbooks near the code.
6. A knowledge bootstrap that points to Notion, Obsidian, or Markdown.
7. An optional pinned Workspace Manager thread when several active projects make routing repetitive.

This is an orchestration workspace, not a giant monorepo. The parent folder provides the map; each project keeps its own history, dependencies, and deployment lifecycle.

## The four layers

### 1. Durable knowledge

Your notes platform holds context that should survive individual tasks: goals, preferences, project summaries, decisions, playbooks, and links. Codex should begin with a small bootstrap page and load only what the current task needs.

Notion is one option. Obsidian, a wiki, Google Drive, or plain Markdown can play the same role. The important feature is a stable source of truth—not the brand of the tool.

### 2. Workspace routing

The workspace root contains `AGENTS.md` and `WORKSPACE_INDEX.md`. The first explains how work should be handled. The second maps project names to canonical paths.

The index protects you from a common failure: multiple checkouts, old experiments, and worktrees that look like valid projects. A manager should route only to approved canonical entries.

### 3. The Workspace Manager

The manager is not a special model or product mode. It is simply one pinned Codex thread that knows your project map. You tell it the outcome; it routes the work to the right project thread and checks the result.

Skip the manager when you have one or two projects and already know where each task belongs. Add one when you have three or more active projects, duplicate tasks become common, or choosing the correct project starts taking effort.

Example request to a manager:

> Update the checkout flow in Shop. Reuse the existing task if there is one, and verify the live result before calling it done.

Prompt to create one:

> Create a pinned Workspace Manager for this workspace. Read the root instructions and project index first. For each request, choose the right project, reuse an existing thread when possible, and verify the result before calling it done.

For every request, it should:

1. Read the root instructions and workspace index.
2. Search existing tasks before creating another.
3. Choose the canonical project.
4. Define repo, mode, target, done criteria, and important rules.
5. Delegate to a project-scoped execution thread.
6. Inspect the returned evidence.
7. Archive completed work and preserve unresolved blockers.

#### Why split the models

Use the most capable reasoning model for the manager. Its job is to understand an ambiguous request, choose the correct project, produce a concrete plan and worker brief, and review the returned evidence. Give bounded execution to faster, lower-cost models that can reliably edit, test, and report against that brief.

The goal is to minimize expensive reasoning use, not to promise fewer total tokens. Clear, non-overlapping scopes avoid paying for the strongest reasoning on every mechanical step. Too many agents, repeated context, or overlapping assignments can increase total usage.

For example, a request such as "Add CSV export to Reports" can become this worker brief:

- **Project:** Reports
- **Goal:** Export the currently filtered table.
- **Actions:** Add the button, generate the file, and preserve active filters.
- **Done when:** Tests pass and the downloaded CSV matches the visible rows.

The manager uses strong reasoning to create and review that brief. A fast execution thread implements it. The user should not need to select a model for every request.

### 4. Execution

Use separate threads and sub-agents for different jobs. A separate thread owns an outcome over time. A sub-agent is a temporary helper created inside the current thread for one narrow piece of work.

You do not need to talk to sub-agents separately. Ask the main thread to spawn them, give each helper an independent lane, and combine their results.

Example:

> Use 3 sub-agents for this review: one to check the mobile layout, one to check accessibility, and one to review the copy. Keep them read-only, then combine their findings into one prioritized list.

| Decision | Separate thread | Sub-agent |
| --- | --- | --- |
| Best for | A durable project outcome | A bounded parallel check |
| Context | Independent task history | Parent context and shared files |
| Examples | Build a feature; repair production | Compare designs; scan tests; research variants |
| Lifecycle | Assign, inspect, accept, archive | Spawn, collect, integrate |
| Main risk | Duplicating an existing task | Multiple agents editing the same files |

Only parallelize work that is genuinely independent. Two or three narrow agents are usually more useful than a large swarm.

Good uses include comparing design directions, researching independent options, reviewing separate modules, and running different checks. Skip sub-agents when the task is small, the steps depend on one another, or several agents would edit the same file.

Parallelism reliably saves wall-clock time. It saves compute only when the scopes are small, non-duplicative, and assigned to the lightest capable worker. More agents can cost more.

## Guided setup

### Step 1: Create the workspace

Choose one parent directory, such as `~/Projects`. Keep each real project in its own child repository.

### Step 2: Add routing files

Add root instructions and an index. Start with one or two projects. Mark old checkouts, experiments, and linked worktrees as blocked rather than silently treating them as canonical.

### Step 3: Connect knowledge

Create one bootstrap file that explains where durable knowledge lives and how to retrieve the smallest relevant slice. Never paste secrets or private database IDs into a public template.

### Step 4: Create the manager

If routing is becoming repetitive, start one pinned thread using the manager template. Ask it to read the root instructions, validate the project index, and report readiness before delegating work. With only one or two projects, skip this step and work directly in project threads.

### Step 5: Run the first task

Give the manager a concrete outcome. It should reuse an existing owner if one exists or create one project-scoped execution thread with explicit done criteria.

### Step 6: Verify

A build, lint result, or confident message is evidence—not completion. Verify the actual artifact: live URL, production alias, API response, page state, generated file, or runtime behavior.

## Safety rules worth keeping

- Inspect before editing.
- Do not silently overwrite existing files.
- Use branches for normal changes and worktrees for dirty, risky, or parallel changes.
- Keep secrets out of repositories and prompts.
- Route to canonical projects only.
- Prevent multiple agents from editing the same files.
- Record exact blockers instead of reporting vague partial completion.
- Keep knowledge sources short and layered; load deeper context only when needed.

## Start simple

You do not need the complete system on day one.

1. Begin with one project and one `AGENTS.md`.
2. Add a workspace index when you have multiple projects.
3. Add a knowledge bootstrap when context lives outside the repository.
4. Add a manager when task routing becomes repetitive.
5. Add parallel agents only when the work has independent lanes.

The goal is not more process. The goal is to make the right context and the right project obvious, so you can ask for outcomes instead of repeatedly explaining your setup.
