import type { IconName } from "@components/ui/Icon.astro";

export const NEWS_CATEGORIES = {
  kinder: {
    label: "Kinder & Familie",
    icon: "kita" as IconName,
    badgeClasses: "bg-amber-500/10 text-amber-700 dark:text-amber-400"
  },
  senioren: {
    label: "Senioren & Pflege",
    icon: "helping-hand" as IconName,
    badgeClasses: "bg-purple-500/10 text-purple-600 dark:text-purple-300"
  },
  umwelt: {
    label: "Umwelt & Wasser",
    icon: "droplet" as IconName,
    badgeClasses: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
  },
  verkehr: {
    label: "Verkehr",
    icon: "bus" as IconName,
    badgeClasses: "bg-blue-500/10 text-blue-600 dark:text-blue-300"
  },
  verwaltung: {
    label: "Verwaltung",
    icon: "document" as IconName,
    badgeClasses: "bg-slate-500/10 text-slate-600 dark:text-slate-400"
  },
  gesundheit: {
    label: "Gesundheit",
    icon: "heart" as IconName,
    badgeClasses: "bg-rose-500/10 text-rose-700 dark:text-rose-300"
  }
} satisfies Record<string, { label: string; icon: IconName; badgeClasses: string }>;

export type NewsCategory = keyof typeof NEWS_CATEGORIES;
