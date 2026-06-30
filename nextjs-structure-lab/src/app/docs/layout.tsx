import type { ReactNode } from "react";
import { ConceptLayout } from "../_components/ConceptLayout";

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <ConceptLayout
      title="Optional catch-all — [[...slug]]"
      subtitle="Like [...slug], but the double brackets also match the base path. One file, every depth."
      guidePath="src/app/docs/GUIDE.md"
    >
      {children}
    </ConceptLayout>
  );
}
