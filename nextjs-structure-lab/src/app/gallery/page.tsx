// PAGE for /gallery — the photo grid. Each tile links to /gallery/photo/[id].
// On soft navigation, the (.)photo interceptor turns that into a modal.

import Link from "next/link";
import { photos } from "./_lib/photos";

export default function GalleryPage() {
  return (
    <div className="demo-box">
      <h4>Photo grid</h4>
      <p className="muted">Click any tile.</p>
      <div className="photo-grid">
        {photos.map((p) => (
          <Link
            key={p.id}
            href={`/gallery/photo/${p.id}`}
            className="photo-tile"
            style={{ background: p.color }}
          >
            {p.id}
          </Link>
        ))}
      </div>
    </div>
  );
}
