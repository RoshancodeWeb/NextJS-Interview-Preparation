"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="callout danger">
      <span className="label">error.tsx</span>
      <p>This segment&apos;s error boundary — sits inside template, around loading/page.</p>
      <button className="btn danger" onClick={() => reset()}>
        Try again
      </button>
    </div>
  );
}
