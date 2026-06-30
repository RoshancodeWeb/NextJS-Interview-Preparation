// FULL-PAGE photo view at /gallery/photo/[id].
// This is what renders on a HARD load/refresh (no interception). On SOFT
// navigation from the grid, the sibling (.)photo interceptor renders the modal
// instead, and this file is what the modal "really" points at.

import Link from "next/link";
import { notFound } from "next/navigation";
import { getPhoto } from "../../_lib/photos";
import { PhotoView } from "../../_components/PhotoView";

export default async function PhotoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const photo = getPhoto(id);
  if (!photo) notFound();

  return (
    <div className="demo-box">
      <span className="badge">full page · /gallery/photo/{id}</span>
      <div style={{ marginTop: 12 }}>
        <PhotoView photo={photo} />
      </div>
      <Link className="btn ghost" href="/gallery">
        ← Back to gallery
      </Link>
    </div>
  );
}
