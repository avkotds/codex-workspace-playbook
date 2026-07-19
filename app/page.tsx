import { CopySetupPrompt } from "./CopySetupPrompt";
import { CopyPrompt } from "./CopyPrompt";

const architecture = [
  ["01", "Knowledge", "Notion, Obsidian, or Markdown holds durable context."],
  ["02", "Workspace index", "A small map tells Codex which project is canonical."],
  ["03", "Manager", "A strong reasoning model plans, routes, and reviews."],
  ["04", "Execution", "Fast, lower-cost models handle clear, bounded work."],
];

const setupSteps = [
  ["Create the workspace", "Use one parent folder. Keep each real project in its own Git repository."],
  ["Add the routing files", "Give the root and every project concise instructions, ownership, and done criteria."],
  ["Connect knowledge", "Point Codex to a small bootstrap page instead of dumping your entire notes system."],
  ["Add a manager if needed", "With three or more active projects, pin one thread to route work and check results."],
  ["Use parallelism carefully", "Create separate threads for durable ownership and sub-agents for independent checks."],
  ["Verify the outcome", "Builds are evidence, not completion. Check the real page, endpoint, file, or runtime."],
];

const managerChoices = [
  ["01", "Read the workflow", "Start with the relevant skill, runbook, or source of truth. It explains how the workflow operates."],
  ["02", "Select the interface", "Choose the strongest reliable execution route before choosing a model."],
  ["03", "Select the worker", "Match model and reasoning to ambiguity, consequence, and work shape."],
  ["04", "Send a bounded contract", "Define the outcome, scope, rules, done criteria, and expected return."],
  ["05", "Review and verify", "Inspect targeted evidence, then check the real artifact or runtime."],
];

const modelExample = [
  ["Manager", "gpt-5.6-sol", "High"],
  ["Basic bounded worker", "gpt-5.6-terra", "Medium"],
  ["Ordinary worker", "gpt-5.6-sol", "Low"],
  ["Complex worker", "gpt-5.6-sol", "Medium"],
];

const managerPrompt = `Create a pinned Workspace Manager for this workspace. Read the root instructions and project index first. For each request, choose the right project, reuse an existing thread when possible, and verify the result before calling it done.`;

const subAgentPrompt = `Use 3 sub-agents for this review: one to check the mobile layout, one to check accessibility, and one to review the copy. Keep them read-only, then combine their findings into one prioritized list.`;

export default function Home() {
  return (
    <main>
      <header className="masthead shell">
        <a className="brand" href="#top" aria-label="Codex Workspace Playbook home">
          <span className="brand-mark">CWP</span><span>Codex Workspace Playbook</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#architecture">System</a><a href="#setup">Setup</a><a href="#roles">Manager &amp; agents</a><a href="#starter-kit">Starter kit</a>
        </nav>
      </header>

      <section className="hero shell" id="top">
        <div className="hero-copy">
          <p className="eyebrow">A field guide for beginners</p>
          <h1>Turn one folder into a working AI team.</h1>
          <p className="lede">Connect your projects, notes, and instructions once. Start with one project thread. Add a manager when your workspace grows, and use sub-agents when one task can split into independent parts.</p>
          <div className="hero-actions"><CopySetupPrompt /><a className="button secondary" href="/downloads/codex-workspace-starter.zip" download>Download starter kit</a></div>
          <p className="microcopy">GitHub is canonical. No account, installer, or specific note-taking app required.</p>
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
        <div className="section-heading"><p className="eyebrow">Use only what helps</p><h2 id="roles-title">Manager for routing. Sub-agents for parallel work.</h2><p>Neither is required to start. Add each one only when it removes work you are already repeating.</p></div>

        <div className="decision-strip" aria-label="When to use workspace orchestration">
          <article><span className="decision-count">1–2 projects</span><h3>Skip the manager</h3><p>Open the project thread and ask Codex directly. A routing layer would only add ceremony.</p></article>
          <article className="decision-highlight"><span className="decision-count">3+ active projects</span><h3>Add a manager</h3><p>Use one front-door thread when choosing the right project or finding the current task starts taking effort.</p></article>
          <article><span className="decision-count">Any workspace size</span><h3>Use sub-agents selectively</h3><p>Spawn them only when one task has two or more independent lanes that can run at the same time.</p></article>
        </div>

        <div className="manager-choice" aria-labelledby="manager-choice-title">
          <div className="choice-intro">
            <p className="role-label">How the manager chooses</p>
            <h3 id="manager-choice-title">Interface first. Model second.</h3>
            <p>A skill or runbook explains how a workflow operates. The manager reads it, chooses the most reliable way to act, then assigns a capable worker.</p>
          </div>
          <ol className="choice-steps">
            {managerChoices.map(([number, title, copy]) => <li key={number}><span>{number}</span><div><h4>{title}</h4><p>{copy}</p></div></li>)}
          </ol>
          <div className="reliability-ladder" aria-label="Execution interface reliability ladder">
            <p>Reliability ladder</p><strong>MCP/app/API <b>→</b> CLI/SDK/SSH <b>→</b> Browser/Chrome <b>→</b> Computer Use</strong>
          </div>
          <div className="interface-grid">
            <article><h4>MCP / app / API</h4><p>Structured actions with explicit inputs and outputs.</p></article>
            <article><h4>CLI / SDK / script / SSH</h4><p>Authoritative command workflows for a project or system.</p></article>
            <article><h4>Browser / Chrome</h4><p>Authenticated sessions, DOM, and rendered-web work.</p></article>
            <article><h4>Computer Use</h4><p>Genuinely visual desktop work with no reliable structured route.</p></article>
          </div>
          <div className="failure-rule">
            <strong>Never silently fall back.</strong>
            <p>If a structured call fails, diagnose identity, authentication, permissions, schema, target, and callability. Hybrid execution is welcome: make the mutation through API or CLI, then use the UI for visual verification.</p>
          </div>
          <div className="example-grid" aria-label="Beginner routing examples">
            <article><span>Notion schema or content</span><strong>Notion MCP</strong></article>
            <article><span>Web app mutation</span><strong>API/CLI + Browser verification</strong></article>
            <article><span>Windows GUI, no structured interface</span><strong>Computer Use</strong></article>
          </div>
        </div>

        <div className="model-strategy" aria-labelledby="model-strategy-title">
          <div className="strategy-copy">
            <p className="role-label">Why split the models?</p>
            <h3 id="model-strategy-title">Spend strong reasoning once. Keep execution lean.</h3>
            <p>Give the manager your most capable reasoning model. It turns a fuzzy request into a concrete plan, chooses the right project, writes a clear worker brief, and reviews the evidence. Faster, lower-cost models then handle bounded execution they can perform reliably.</p>
            <p className="strategy-guardrail"><strong>The goal is to minimize expensive reasoning use—not promise fewer total tokens.</strong> Clear scopes avoid repetition. Overlapping agents can still increase total usage.</p>
          </div>
          <div className="model-lanes" aria-label="Model routing example">
            <article className="model-lane manager-lane"><span>Strong reasoning</span><h4>Manager</h4><p>Understand → plan → assign → review</p></article>
            <b aria-hidden="true">→</b>
            <article className="model-lane worker-lane"><span>Fast + lower cost</span><h4>Worker thread</h4><p>Edit → test → return evidence</p></article>
          </div>
          <div className="handoff-example">
            <div><span>Example request</span><p>“Add CSV export to Reports.”</p></div>
            <div><span>The manager sends</span><dl><dt>Project</dt><dd>Reports</dd><dt>Goal</dt><dd>Export the currently filtered table.</dd><dt>Actions</dt><dd>Add the button, generate the file, preserve active filters.</dd><dt>Done when</dt><dd>Tests pass and the downloaded CSV matches the visible rows.</dd></dl></div>
          </div>
          <div className="current-models">
            <div><span>Current Codex example — July 2026</span><p>General capability guidance comes first; these model IDs are a dated example.</p></div>
            <table><thead><tr><th>Role</th><th>Model</th><th>Reasoning</th></tr></thead><tbody>{modelExample.map(([role, model, reasoning]) => <tr key={role}><td>{role}</td><td><code>{model}</code></td><td>{reasoning}</td></tr>)}</tbody></table>
            <p><strong>Workers never use High.</strong> The manager decomposes work or reviews the difficult evidence instead.</p>
          </div>
          <div className="token-discipline">
            <span>Manager token discipline</span>
            <p>Require concise worker returns: outcome, relevant changes, verification, exact references, and blockers. Keep full logs in the worker; ask for targeted diffs, test results, filtered excerpts, or live references. Inspect raw evidence only when needed—without global output limits or compaction hacks.</p>
          </div>
        </div>

        <div className="role-grid">
          <article className="role-card manager-card">
            <div className="role-card-heading"><p className="role-label">The manager</p><h3>A permanent front desk</h3></div>
            <p className="role-definition">A manager is simply one pinned Codex thread that knows your project map. You tell it the outcome; it routes the work to the right project thread and checks the result.</p>
            <div className="role-flow" aria-label="Manager workflow"><span>You</span><b aria-hidden="true">→</b><span>Manager</span><b aria-hidden="true">→</b><span>Project thread</span></div>
            <div className="plain-steps"><div><strong>Talk to it like this</strong><p>“Update the checkout flow in Shop. Reuse the existing task if there is one, and verify the live result.”</p></div><div><strong>Best when</strong><p>You have several active projects, duplicate tasks, or keep explaining where work belongs.</p></div><div><strong>Skip it when</strong><p>You have one or two projects and already know which thread should own the work.</p></div></div>
            <div className="prompt-box"><div className="prompt-topline"><span>Prompt to create one</span><CopyPrompt text={managerPrompt} /></div><pre>{managerPrompt}</pre></div>
          </article>

          <article className="role-card agent-card">
            <div className="role-card-heading"><p className="role-label">Sub-agents</p><h3>Temporary extra hands</h3></div>
            <p className="role-definition">A sub-agent is a short-lived helper created inside your current thread. You keep talking to the main thread; it gives each helper a narrow job, collects the results, and returns one answer.</p>
            <div className="role-flow split-flow" aria-label="Sub-agent workflow"><span>You</span><b aria-hidden="true">→</b><span>Main thread</span><b aria-hidden="true">→</b><span>2–3 helpers</span><b aria-hidden="true">→</b><span>One result</span></div>
            <div className="plain-steps"><div><strong>Trigger them in plain language</strong><p>Say how many helpers you want, give each one a separate lane, and say how their work should be combined.</p></div><div><strong>Best when</strong><p>Comparing designs, researching independent options, reviewing separate modules, or running different checks.</p></div><div><strong>Skip them when</strong><p>The task is small, steps depend on each other, or several agents would edit the same file.</p></div></div>
            <div className="prompt-box"><div className="prompt-topline"><span>Prompt to use them</span><CopyPrompt text={subAgentPrompt} /></div><pre>{subAgentPrompt}</pre></div>
          </article>
        </div>

        <p className="cost-note"><strong>Simple rule:</strong> the manager concentrates expensive reasoning; workers and sub-agents keep execution fast. Parallel agents usually save time, but save compute only when their jobs are independent and narrow.</p>
      </section>

      <section className="starter shell" id="starter-kit" aria-labelledby="starter-title">
        <div><p className="eyebrow">Take the system with you</p><h2 id="starter-title">Let Codex set up the safe first version.</h2><p>The prompt previews changes, preserves existing files, and adapts the knowledge layer to Notion, Obsidian, or plain Markdown. The templates remain readable and editable.</p><div className="hero-actions"><CopySetupPrompt compact /><a className="text-link" href="https://github.com/avkotds/codex-workspace-playbook">View on GitHub →</a></div></div>
        <ul className="file-list" aria-label="Starter kit files">{[["AGENTS.md", "Workspace-wide rules"], ["WORKSPACE_INDEX.md", "Canonical project map"], ["project-AGENTS.md", "Per-project contract"], ["workspace-manager.md", "Orchestration prompt"], ["knowledge-bootstrap.md", "Notes-system adapter"], ["setup-prompt.md", "Safe guided installer prompt"]].map(([file, purpose]) => <li key={file}><a href={`/downloads/${file}`}>{file}</a><span>{purpose}</span></li>)}</ul>
      </section>

      <footer className="shell"><span>Codex Workspace Playbook</span><span>Built as a portable pattern—not a prescription.</span><a href="https://github.com/avkotds/codex-workspace-playbook/blob/main/LICENSE">MIT License</a></footer>
    </main>
  );
}
