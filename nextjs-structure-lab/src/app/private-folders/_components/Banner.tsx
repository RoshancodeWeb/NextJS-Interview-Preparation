// A component living in a PRIVATE FOLDER (_components). The leading underscore
// means the router ignores this folder, so this file can never become a URL —
// it's only ever reached by being imported.

export function Banner() {
  return (
    <div className="panel">
      👋 This Banner is rendered from{" "}
      <code>private-folders/_components/Banner.tsx</code> — colocated next to the
      page, imported normally, never routable.
    </div>
  );
}
