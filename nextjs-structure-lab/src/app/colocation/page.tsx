// PAGE for /colocation. The folder also holds a component, a helper, a test, and
// this concept's GUIDE — none of which are routable. Only this page.tsx is.

import { ConceptLayout } from "../_components/ConceptLayout";
import { Card } from "./_ui/Card";
import { formatPrice } from "./helpers";

export default function ColocationPage() {
  return (
    <ConceptLayout
      title="Colocation"
      subtitle="Because only page/route files map to URLs, you can safely keep related files in the same folder."
      guidePath="src/app/colocation/GUIDE.md"
    >
      <div className="demo-box">
        <h4>This route folder also contains (none of them routable):</h4>
        <ul className="clean">
          <li>
            <code>_ui/Card.tsx</code> — a component (rendered below)
          </li>
          <li>
            <code>helpers.ts</code> — a util ({formatPrice(1999)} via{" "}
            <code>formatPrice(1999)</code>)
          </li>
          <li>
            <code>card.test.ts</code> — a colocated test
          </li>
          <li>
            <code>GUIDE.md</code> / <code>GUIDE.pdf</code> — this concept&apos;s guide
          </li>
        </ul>
      </div>

      <Card title="Demo product" price={1999} />
    </ConceptLayout>
  );
}
