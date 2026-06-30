// A plain helper colocated next to the page. It is NOT prefixed with `_` and is
// NOT a special file — yet it still can't become a URL, because only `page` and
// `route` files are routable. That's "colocation".

export function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}
