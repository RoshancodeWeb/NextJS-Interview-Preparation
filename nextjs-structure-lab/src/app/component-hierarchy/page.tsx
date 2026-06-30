// PAGE for /component-hierarchy. Draws the nesting order as a set of nested
// boxes so the abstract list becomes concrete. All six files referenced here
// (layout, template, error, loading, not-found, page) really exist in this
// folder.

const LEVELS = [
  { file: "layout.tsx", note: "shared shell, persists across navigation", color: "#4c8dff" },
  { file: "template.tsx", note: "shared shell, re-mounts each navigation", color: "#7c5cff" },
  { file: "error.tsx", note: "React error boundary for this segment", color: "#ff6b6b" },
  { file: "loading.tsx", note: "React Suspense boundary", color: "#ffb454" },
  { file: "not-found.tsx", note: "boundary for notFound() in this segment", color: "#29d3a3" },
  { file: "page.tsx", note: "the actual route UI (innermost)", color: "#9fb0c8" },
];

function NestedBoxes({ index = 0 }: { index?: number }) {
  const level = LEVELS[index];
  if (!level) {
    return <div className="muted">↳ children render here</div>;
  }
  return (
    <div
      style={{
        border: `2px solid ${level.color}`,
        borderRadius: 12,
        padding: "12px 14px",
        background: "rgba(255,255,255,0.02)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 10 }}>
        <code style={{ color: level.color, borderColor: level.color }}>{level.file}</code>
        <span className="muted" style={{ fontSize: "0.82rem" }}>
          {level.note}
        </span>
      </div>
      <NestedBoxes index={index + 1} />
    </div>
  );
}

export default function ComponentHierarchyPage() {
  return (
    <div className="stack">
      <div className="demo-box">
        <h4>Render order — outermost wraps innermost</h4>
        <NestedBoxes />
      </div>

      <div className="panel">
        <p style={{ marginTop: 0 }}>
          For nested routes this repeats recursively: a child segment&apos;s whole
          stack renders inside its parent segment&apos;s <code>page</code> slot
          (where a nested <code>layout</code> would sit).
        </p>
        <p style={{ marginBottom: 0 }} className="muted">
          Order: layout → template → error → loading → not-found → page.
        </p>
      </div>
    </div>
  );
}
