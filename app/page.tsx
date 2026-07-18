import { CopySetupPrompt } from "./CopySetupPrompt";

const architecture = [
  ["01", "Knowledge", "Notion, Obsidian, or Markdown holds durable context."],
  ["02", "Workspace index", "A small map tells Codex which project is canonical."],
  ["03", "Manager", "One pinned thread routes work and checks completion."],
  ["04", "Execution", "Threads own tasks; sub-agents parallelize bounded work."],
];

const setupSteps = [
  ["Create the workspace", "Use one parent folder. Keep each real project in its own Git repository."],
  ["Add the routing files", "Give the root and every project concise instructions, ownership, and done criteria."],
  ["Connect knowledge", "Point Codex to a small bootstrap page instead of dumping your entire notes system."],
  ["Start the manager", "Pin one orchestration thread that delegates, verifies, and keeps the task list clean."],
  ["Use parallelism carefully", "Create separate threads for durable ownership and sub-agents for independent checks."],
  ["Verify the outcome", "Builds are evidence, not completion. Check the real page, endpoint, file, or runtime."],
];

export default function Home() {
  return (
    <main>
      <header className="masthead shell">
        <a className="brand" href="#top" aria-label="Codex Workspace Playbook home">
          <span className="brand-mark">CWP</span><span>Codex Workspace Playbook</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#architecture">System</a><a href="#setup">Setup</a><a href="#roles">Agents</a><a href="#starter-kit">Starter kit</a>
        </nav>
      </header>

      <section className="hero shell" id="top">
        <div className="hero-copy">
          <p className="eyebrow">A field guide for beginners</p>
          <h1>Turn one folder into a working AI team.</h1>
          <p className="lede">Connect your projects, notes, and instructions once. Then use one Workspace Manager to route work into focused threads and bounded sub-agents—without choosing a model every time.</p>
          <div className="hero-actions"><CopySetupPrompt /><a className="button secondary" href="/downloads/codex-workspace-starter.zip" download>Download starter kit</a></div>
          <p className="microcopy">No account, installer, or specific note-taking app required.</p>
        </div>
        <aside className="case-card" aria-label="Case study summary">
          <p className="case-number">CASE STUDY / 01</p><h2>Artem&apos;s pattern, sanitized</h2>
          <p>The real system uses a workspace-level project map, project runbooks, a pinned manager, and verification gates. This guide keeps the useful architecture while removing private paths, names, IDs, and links.</p>
          <div className="tree" aria-label="Example workspace tree">
            <span>~/Projects/</span><span>├── AGENTS.md</span><span>├── WORKSPACE_INDEX.md</span><span>├── workspace-manager.md</span><span>├── knowledge-bootstrap.md</span><span>└── project-a/</span><span>&nbsp;&nbsp;&nbsp;&nbsp;├── .git/</span><span>&nbsp;&nbsp;&nbsp;&nbsp;└── AGENTS.md</span>
          </div>
        </aside>
      </section>

      <section className="architecture shell" id="architecture" aria-labelledby="architecture-title">
        <div className="section-heading"><p className="eyebrow">The four-layer system</p><h2 id="architecture-title">Give Codex a map, not a memory dump.</h2></div>
        <div className="architecture-grid">
          {architecture.map(([number, title, copy], index) => <article className="architecture-step" key={title}><div className="step-topline"><span>{number}</span>{index < architecture.length - 1 ? <span aria-hidden="true">→</span> : null}</div><h3>{title}</h3><p>{copy}</p></article>)}
        </div>
      </section>

      <section className="setup shell" id="setup" aria-labelledby="setup-title">
        <div className="section-heading narrow"><p className="eyebrow">Guided setup</p><h2 id="setup-title">Start small. Add orchestration when it earns its place.</h2><p>You can finish the first version in one session. The downloadable prompt inspects before writing and asks only for your root folder and knowledge system.</p></div>
        <ol className="setup-list">{setupSteps.map(([title, copy], index) => <li key={title}><span className="setup-number">{String(index + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{copy}</p></div></li>)}</ol>
      </section>

      <section className="roles shell" id="roles" aria-labelledby="roles-title">
        <div className="section-heading"><p className="eyebrow">Two kinds of parallel work</p><h2 id="roles-title">Threads own outcomes. Sub-agents shorten the path.</h2></div>
        <div className="comparison" role="table" aria-label="Threads and sub-agents comparison">
          <div className="comparison-row comparison-head" role="row"><span role="columnheader">Decision</span><span role="columnheader">Separate thread</span><span role="columnheader">Sub-agent</span></div>
          {[["Best for", "A durable project outcome", "A bounded parallel check"], ["Context", "Independent task history", "Parent context and shared files"], ["Examples", "Build a feature; repair production", "Compare designs; scan tests; research variants"], ["Lifecycle", "Assign, inspect, accept, archive", "Spawn, collect results, integrate"], ["Main risk", "Duplicating an existing task", "Agents editing the same files"]].map((row) => <div className="comparison-row" role="row" key={row[0]}>{row.map((cell, index) => <span role="cell" key={cell} data-label={index === 1 ? "Thread" : index === 2 ? "Sub-agent" : undefined}>{cell}</span>)}</div>)}
        </div>
        <p className="cost-note"><strong>About cost:</strong> parallelism reliably saves wall-clock time. It saves compute only when tasks are independent, tightly scoped, and assigned to the lightest capable worker.</p>
      </section>

      <section className="starter shell" id="starter-kit" aria-labelledby="starter-title">
        <div><p className="eyebrow">Take the system with you</p><h2 id="starter-title">Let Codex set up the safe first version.</h2><p>The prompt previews changes, preserves existing files, and adapts the knowledge layer to Notion, Obsidian, or plain Markdown. The templates remain readable and editable.</p><div className="hero-actions"><CopySetupPrompt compact /><a className="text-link" href="https://github.com/avkotds/codex-workspace-playbook">View on GitHub →</a></div></div>
        <ul className="file-list" aria-label="Starter kit files">{[["AGENTS.md", "Workspace-wide rules"], ["WORKSPACE_INDEX.md", "Canonical project map"], ["project-AGENTS.md", "Per-project contract"], ["workspace-manager.md", "Orchestration prompt"], ["knowledge-bootstrap.md", "Notes-system adapter"], ["setup-prompt.md", "Safe guided installer prompt"]].map(([file, purpose]) => <li key={file}><a href={`/downloads/${file}`}>{file}</a><span>{purpose}</span></li>)}</ul>
      </section>

      <footer className="shell"><span>Codex Workspace Playbook</span><span>Built as a portable pattern—not a prescription.</span><a href="https://github.com/avkotds/codex-workspace-playbook/blob/main/LICENSE">MIT License</a></footer>
    </main>
  );
}
