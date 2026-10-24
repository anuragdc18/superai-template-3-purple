import { Bot, Dribbble, FileText, GraduationCap, Instagram, PenTool, Printer } from "lucide-react";

/** Soft pastel tones used for rings, badges and icon circles. */
export const P = {
  violet: "#c4b5fd",
  orange: "#fdba74",
  green: "#86efac",
  pink: "#f9a8d4",
  blue: "#93c5fd",
  yellow: "#fde68a",
  cyan: "#a5f3fc",
};

/** Per-category look: ring colour, badge colour and icon (same order as CATEGORIES). */
const CAT_STYLE: Record<string, { ring: string; badge: string; pill: string; icon: typeof FileText }> = {
  registration: { ring: P.violet, badge: P.green, pill: P.violet, icon: FileText },
  branding: { ring: P.orange, badge: P.pink, pill: P.orange, icon: PenTool },
  design: { ring: P.green, badge: P.blue, pill: P.green, icon: Printer },
  "social-media": { ring: P.pink, badge: P.yellow, pill: P.pink, icon: Instagram },
  website: { ring: P.blue, badge: P.cyan, pill: P.blue, icon: Dribbble },
  "ai-tools": { ring: P.yellow, badge: P.violet, pill: P.yellow, icon: Bot },
  "microsoft-certifications": { ring: P.cyan, badge: P.orange, pill: P.cyan, icon: GraduationCap },
};
export const catStyle = (slug: string) => CAT_STYLE[slug] ?? { ring: P.violet, badge: P.green, pill: P.violet, icon: FileText };

export function IconDot({ color, icon: Icon, size = 40, iconSize = 18 }: { color: string; icon: typeof FileText; size?: number; iconSize?: number }) {
  return (
    <span className="grid shrink-0 place-items-center rounded-full text-navy" style={{ width: size, height: size, background: color }}>
      <Icon style={{ width: iconSize, height: iconSize }} strokeWidth={2} />
    </span>
  );
}

