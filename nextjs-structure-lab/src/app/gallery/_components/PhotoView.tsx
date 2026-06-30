// Shared presentation of a single photo, used by BOTH the full page and the
// intercepted modal — so the two stay visually consistent.

import type { Photo } from "../_lib/photos";

export function PhotoView({ photo }: { photo: Photo }) {
  return (
    <div>
      <div
        className="photo-tile"
        style={{ background: photo.color, height: 180, fontSize: "2.4rem" }}
      >
        {photo.id}
      </div>
      <h4 style={{ marginBottom: 2 }}>{photo.label}</h4>
      <p className="muted" style={{ marginTop: 0 }}>
        Photo #{photo.id}
      </p>
    </div>
  );
}
