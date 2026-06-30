import type { ReactNode } from "react";
import { ConceptLayout } from "../_components/ConceptLayout";

export default function ComponentHierarchyLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ConceptLayout
      title="Component hierarchy"
      subtitle="Within one segment, Next nests the special files in a fixed order."
      guidePath="src/app/component-hierarchy/GUIDE.md"
    >
      {children}
    </ConceptLayout>
  );
}
