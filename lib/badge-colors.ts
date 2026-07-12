import type { BadgeColor } from "./content";

export const badgeBg: Record<BadgeColor, string> = {
  red: "rgba(239, 68, 68, 0.15)",
  amber: "rgba(245, 158, 11, 0.15)",
  green: "rgba(34, 197, 94, 0.15)",
};

export const badgeText: Record<BadgeColor, string> = {
  red: "#f87171",
  amber: "#fbbf24",
  green: "#4ade80",
};
