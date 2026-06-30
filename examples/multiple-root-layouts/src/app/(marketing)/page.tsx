// Home "/" — lives in the (marketing) group, so it uses the marketing root
// layout (blue shell).

export default function Home() {
  return (
    <div>
      <h1>Home (/)</h1>
      <p>
        This page is in the <strong>(marketing)</strong> group, so it&apos;s wrapped
        by the blue marketing root layout. Click the footer link to see a page
        with a completely different root layout.
      </p>
    </div>
  );
}
