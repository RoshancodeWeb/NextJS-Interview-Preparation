// LAYOUT for /gallery. Combines a PARALLEL slot (@modal) with INTERCEPTING
// routes. It renders the page (children, the grid) AND the modal slot together,
// so the intercepted route can appear as an overlay on top of the grid.

import type { ReactNode } from "react";
import { ConceptLayout } from "../_components/ConceptLayout";

export default function GalleryLayout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  return (
    <ConceptLayout
      title="Intercepting routes — (.)folder"
      subtitle="Open a route as a modal over the current page on soft navigation; a full page on hard load."
      guidePath="src/app/gallery/GUIDE.md"
    >
      <div className="panel">
        <p style={{ marginTop: 0 }}>
          Click a photo → it opens as a <strong>modal</strong> (soft navigation,
          intercepted by <code>@modal/(.)photo</code>). Copy that URL and{" "}
          <strong>refresh</strong> → the same URL loads as a <strong>full page</strong>{" "}
          (<code>photo/[id]</code>), because interception only happens on
          client-side navigation.
        </p>
      </div>
      {children}
      {modal}
    </ConceptLayout>
  );
}
