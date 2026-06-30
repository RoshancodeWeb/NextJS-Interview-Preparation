export type Photo = { id: string; label: string; color: string };

export const photos: Photo[] = [
  { id: "1", label: "Azure", color: "#4c8dff" },
  { id: "2", label: "Violet", color: "#7c5cff" },
  { id: "3", label: "Mint", color: "#29d3a3" },
  { id: "4", label: "Amber", color: "#ffb454" },
  { id: "5", label: "Coral", color: "#ff6b6b" },
  { id: "6", label: "Slate", color: "#64748b" },
];

export function getPhoto(id: string): Photo | undefined {
  return photos.find((p) => p.id === id);
}
