import type { IconName } from "@components/ui/Icon.astro";

export const DOCUMENT_CATEGORIES = {
  satzungen: {
    label: "Satzungen",
    icon: "document" as IconName,
    badgeClasses: "bg-slate-500/10 text-slate-600 dark:text-slate-400"
  },
  bekanntmachungen: {
    label: "Bekanntmachungen",
    icon: "megaphone" as IconName,
    badgeClasses: "bg-orange-500/10 text-orange-700 dark:text-orange-300"
  },
  ausschreibungen: {
    label: "Ausschreibungen",
    icon: "search" as IconName,
    badgeClasses: "bg-blue-500/10 text-blue-600 dark:text-blue-300"
  },
  bauleitplanung: {
    label: "Bauleitplanung",
    icon: "plan" as IconName,
    badgeClasses: "bg-teal-500/10 text-teal-700 dark:text-teal-400"
  },
  formulare: {
    label: "Formulare",
    icon: "form" as IconName,
    badgeClasses: "bg-amber-500/10 text-amber-700 dark:text-amber-400"
  },
  informationen: {
    label: "Informationen",
    icon: "info" as IconName,
    badgeClasses: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
  },
  einladungen: {
    label: "Einladungen",
    icon: "calendar" as IconName,
    badgeClasses: "bg-purple-500/10 text-purple-600 dark:text-purple-300"
  },
  umwelt: {
    label: "Umwelt",
    icon: "droplet" as IconName,
    badgeClasses: "bg-cyan-500/10 text-cyan-700 dark:text-cyan-400"
  }
} satisfies Record<string, { label: string; icon: IconName; badgeClasses: string }>;

export type DocumentCategory = keyof typeof DOCUMENT_CATEGORIES;
