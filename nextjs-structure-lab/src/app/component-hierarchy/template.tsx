// Present so this segment's hierarchy is complete. A template sits just inside
// the layout. Here it just passes children through.

import type { ReactNode } from "react";

export default function ComponentHierarchyTemplate({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
