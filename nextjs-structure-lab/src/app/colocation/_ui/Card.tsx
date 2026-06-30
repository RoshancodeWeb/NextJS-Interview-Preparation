// A component colocated under colocation/_ui. Imports the sibling helper.

import { formatPrice } from "../helpers";

export function Card({ title, price }: { title: string; price: number }) {
  return (
    <div className="panel">
      <h4 style={{ marginBottom: 4 }}>{title}</h4>
      <p className="tag" style={{ margin: 0 }}>
        {formatPrice(price)}
      </p>
    </div>
  );
}
