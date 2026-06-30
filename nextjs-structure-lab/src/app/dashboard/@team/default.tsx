// DEFAULT for the @team slot (special file: `default`).
// Rendered when the slot has no match for the current URL (e.g. after a hard
// navigation to a sub-route the slot doesn't define). Returning null = render
// nothing. Without a default.tsx, an unmatched slot would 404.

export default function TeamDefault() {
  return null;
}
