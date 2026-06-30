// INTERCEPTING ROUTE: gallery/@modal/(.)photo/[id]/page.tsx
//
// `(.)photo` means "intercept the route `photo` at the SAME level as this slot's
// parent (gallery)". On soft navigation to /gallery/photo/[id], Next renders
// THIS into the @modal slot — over the grid — instead of navigating away.
//
// `(.)`  = same level   ·   `(..)` = one level up
// `(..)(..)` = two levels up   ·   `(...)` = from the app root
//
// Imports use the `@/` alias to avoid fragile deep relative paths.

import { notFound } from "next/navigation";
import { getPhoto } from "@/app/gallery/_lib/photos";
import { Modal } from "@/app/gallery/_components/Modal";
import { PhotoView } from "@/app/gallery/_components/PhotoView";

export default async function PhotoModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const photo = getPhoto(id);
  if (!photo) notFound();

  return (
    <Modal>
      <PhotoView photo={photo} />
    </Modal>
  );
}
