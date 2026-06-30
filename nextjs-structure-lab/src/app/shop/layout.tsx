// Shared wrapper for the catch-all demo so both /shop and /shop/<...> get the
// concept heading + guide pointer.

import type { ReactNode } from "react";
import { ConceptLayout } from "../_components/ConceptLayout";

export default function ShopLayout({ children }: { children: ReactNode }) {
  return (
    <ConceptLayout
      title="Catch-all route — [...slug]"
      subtitle="A [...slug] segment captures one OR MORE path segments into an array."
      guidePath="src/app/shop/GUIDE.md"
    >
      {children}
    </ConceptLayout>
  );
}
