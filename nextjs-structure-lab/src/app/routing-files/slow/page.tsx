// An async Server Component that deliberately takes 1.5s to render. While it
// streams, the nearest `loading.tsx` (in the parent /routing-files segment) is
// shown automatically.

export default async function SlowPage() {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return (
    <div className="panel">
      <p style={{ margin: 0 }}>
        ✅ Loaded after 1.5s. While you waited, <code>loading.tsx</code> was shown
        as the Suspense fallback.
      </p>
    </div>
  );
}
