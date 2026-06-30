// PAGE for /private-folders. It imports from sibling private folders to show
// they work as normal modules while being invisible to the router.

import { ConceptLayout } from "../_components/ConceptLayout";
import { Banner } from "./_components/Banner";
import { privateFolderFacts } from "./_lib/data";

export default function PrivateFoldersPage() {
  return (
    <ConceptLayout
      title="Private folders — _folder"
      subtitle="A leading underscore opts a folder (and everything inside) out of routing."
      guidePath="src/app/private-folders/GUIDE.md"
    >
      <Banner />

      <div className="demo-box">
        <h4>Facts (imported from _lib/data.ts)</h4>
        <ul className="clean">
          {privateFolderFacts.map((fact) => (
            <li key={fact}>{fact}</li>
          ))}
        </ul>
      </div>

      <div className="callout warn">
        <span className="label">Try it</span>
        <p>
          Navigate to <code>/private-folders/_components</code> in the address bar —
          it 404s, because <code>_components</code> is not part of the route tree.
        </p>
      </div>
    </ConceptLayout>
  );
}
