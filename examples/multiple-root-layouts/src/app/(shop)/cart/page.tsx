// "/cart" — lives in the (shop) group, so it uses the shop root layout (green,
// monospace). Note: no two pages across the groups resolve to the same URL.

export default function Cart() {
  return (
    <div>
      <h1>/cart</h1>
      <p>
        This page is in the <strong>(shop)</strong> group — wrapped by the green
        root layout, a totally separate shell from the home page. That&apos;s the
        whole point of multiple root layouts.
      </p>
    </div>
  );
}
