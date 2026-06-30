// PAGE for /routing-files (special file: `page`). Makes the route public.

import { Callout } from "../_components/Callout";
import { ApiDemo } from "./_components/ApiDemo";

export default function RoutingFilesIndex() {
  return (
    <div className="stack">
      <Callout variant="info">
        <p>
          This section folder contains one of (almost) every special file. Use the
          buttons above to trigger each one and watch which file renders.
        </p>
      </Callout>

      <div className="demo-box">
        <h4>The special files in this folder</h4>
        <ul className="clean">
          <li>
            <code>layout.tsx</code> — shared shell, persists (the box above).
          </li>
          <li>
            <code>template.tsx</code> — shared shell, re-mounts each navigation.
          </li>
          <li>
            <code>page.tsx</code> — this page (the route&apos;s unique UI).
          </li>
          <li>
            <code>loading.tsx</code> — shown by <em>Slow page</em> while it streams.
          </li>
          <li>
            <code>error.tsx</code> — shown by <em>Crash</em> (a render error).
          </li>
          <li>
            <code>not-found.tsx</code> — shown by <em>Missing</em> (calls{" "}
            <code>notFound()</code>).
          </li>
          <li>
            <code>route.ts</code> — the API below (no UI).
          </li>
        </ul>
      </div>

      <ApiDemo />
    </div>
  );
}
