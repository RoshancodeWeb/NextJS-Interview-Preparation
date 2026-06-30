// A small labelled box used across demos. Server Component (no interactivity).
// Lives in the app-root `_components/` private folder.

import type { ReactNode } from "react";

type Variant = "info" | "tip" | "warn" | "danger";

const LABELS: Record<Variant, string> = {
  info: "Note",
  tip: "Tip",
  warn: "Watch out",
  danger: "Gotcha",
};

export function Callout({
  variant = "info",
  title,
  children,
}: {
  variant?: Variant;
  title?: string;
  children: ReactNode;
}) {
  return (
    <div className={`callout ${variant}`}>
      <span className="label">{title ?? LABELS[variant]}</span>
      {children}
    </div>
  );
}
