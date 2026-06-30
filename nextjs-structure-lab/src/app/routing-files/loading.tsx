// LOADING UI (special file: `loading`).
// Next wraps the segment in a React <Suspense> boundary and shows this instantly
// while an async page (e.g. /routing-files/slow) is streaming in.

export default function Loading() {
  return (
    <div className="panel">
      <p style={{ margin: 0 }}>
        ⏳ <strong>loading.tsx</strong> — this is the Suspense fallback shown while
        the segment loads…
      </p>
    </div>
  );
}
