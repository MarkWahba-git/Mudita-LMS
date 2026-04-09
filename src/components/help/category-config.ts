export interface CategoryConfig {
  icon: string;
  bg: string;
  label: string;
  labelAr: string;
  labelDe: string;
}

export const CATEGORY_CONFIG: Record<string, CategoryConfig> = {
  GETTING_STARTED: {
    icon: "🚀",
    bg: "bg-blue-50 text-blue-600",
    label: "Getting Started",
    labelAr: "البداية",
    labelDe: "Erste Schritte",
  },
  FEATURES_OVERVIEW: {
    icon: "✨",
    bg: "bg-purple-50 text-purple-600",
    label: "Features Overview",
    labelAr: "نظرة عامة على الميزات",
    labelDe: "Funktionsübersicht",
  },
  GUIDES: {
    icon: "📖",
    bg: "bg-green-50 text-green-600",
    label: "Step-by-step Guides",
    labelAr: "أدلة خطوة بخطوة",
    labelDe: "Schritt-für-Schritt-Anleitungen",
  },
  FAQ: {
    icon: "❓",
    bg: "bg-amber-50 text-amber-600",
    label: "FAQs",
    labelAr: "الأسئلة الشائعة",
    labelDe: "Häufige Fragen",
  },
  TROUBLESHOOTING: {
    icon: "🔧",
    bg: "bg-red-50 text-red-600",
    label: "Troubleshooting",
    labelAr: "استكشاف الأخطاء",
    labelDe: "Fehlerbehebung",
  },
  WHATS_COMING: {
    icon: "🔮",
    bg: "bg-pink-50 text-pink-600",
    label: "What's Coming",
    labelAr: "القادم قريباً",
    labelDe: "Was kommt",
  },
};

export const CATEGORIES = Object.keys(CATEGORY_CONFIG) as Array<
  keyof typeof CATEGORY_CONFIG
>;

export function getCategoryLabel(category: string, locale: string) {
  const config = CATEGORY_CONFIG[category];
  if (!config) return category;
  if (locale === "ar") return config.labelAr;
  if (locale === "de") return config.labelDe;
  return config.label;
}
