// Data helper in a private folder (_lib). Same rule: not routable, import-only.

export const privateFolderFacts: string[] = [
  "A leading underscore (_folder) opts the folder AND its subfolders out of routing.",
  "Use it for components, hooks, utilities, and other non-route code.",
  "Colocation already prevents routing — private folders add intent + grouping.",
  "Need a literal underscore in a URL? Use the encoded form %5Ffolder.",
];
