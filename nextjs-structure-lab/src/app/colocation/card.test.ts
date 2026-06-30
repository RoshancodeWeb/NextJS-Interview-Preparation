// An example COLOCATED TEST sitting right next to the code it tests. No test
// runner is wired up in this lab, so it uses a tiny inline assert (and thus
// type-checks cleanly). The point is only that this file is safe here: it can
// never accidentally become a route.

import { formatPrice } from "./helpers";

function expectEqual(actual: string, expected: string): void {
  if (actual !== expected) {
    throw new Error(`Expected "${actual}" to equal "${expected}"`);
  }
}

expectEqual(formatPrice(1999), "$19.99");
expectEqual(formatPrice(0), "$0.00");
expectEqual(formatPrice(500), "$5.00");
