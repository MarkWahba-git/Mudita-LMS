"use client";

import { useSession } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { locales, localeNames, type Locale } from "@/i18n/config";
import { Menu, Bell, Search, Globe } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";

interface TopbarProps {
  onMenuClick: () => void;
}

export function Topbar({ onMenuClick }: TopbarProps) {
  const { data: session } = useSession();
  const t = useTranslations("nav");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const userName = session?.user?.name ?? "";
  const userImage = session?.user?.image ?? undefined;

  function handleLocaleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newLocale = e.target.value as Locale;
    router.replace(pathname, { locale: newLocale });
  }

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b bg-white px-4 md:px-6">
      {/* Hamburger menu - mobile only */}
      <button
        onClick={onMenuClick}
        className="rounded-md p-2 hover:bg-muted md:hidden"
        aria-label="Toggle sidebar"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Search */}
      <div className="flex flex-1 items-center">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder={t("search")}
            className="h-9 w-full rounded-lg border bg-muted/40 pl-9 pr-4 text-sm outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <button
          className="relative rounded-md p-2 hover:bg-muted"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5 text-muted-foreground" />
        </button>

        {/* Locale switcher */}
        <div className="relative flex items-center">
          <Globe className="pointer-events-none absolute left-2 h-4 w-4 text-muted-foreground" />
          <select
            value={locale}
            onChange={handleLocaleChange}
            className="h-9 cursor-pointer appearance-none rounded-lg border bg-transparent py-1 pl-7 pr-3 text-sm outline-none hover:bg-muted focus:border-primary"
          >
            {locales.map((loc) => (
              <option key={loc} value={loc}>
                {localeNames[loc]}
              </option>
            ))}
          </select>
        </div>

        {/* User avatar */}
        {session?.user && (
          <div className="flex items-center gap-2">
            <Avatar
              src={userImage}
              alt={userName}
              fallback={getInitials(userName || "U")}
              size="sm"
            />
            <span className="hidden text-sm font-medium md:inline-block">
              {userName}
            </span>
          </div>
        )}
      </div>
    </header>
  );
}
