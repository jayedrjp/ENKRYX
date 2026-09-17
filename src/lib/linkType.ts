export type LinkType = "github" | "figma" | "drive" | "website";

export function detectLinkType(url: string): LinkType {
  try {
    const host = new URL(url).hostname.replace(/^www\./, "");
    if (host.includes("github.com")) return "github";
    if (host.includes("figma.com")) return "figma";
    if (host.includes("drive.google.com")) return "drive";
    return "website";
  } catch {
    return "website";
  }
}

export const LINK_TYPE_LABELS: Record<LinkType, string> = {
  github: "GitHub",
  figma: "Figma",
  drive: "Google Drive",
  website: "Live Website",
};
