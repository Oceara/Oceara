"use client";

import React, { createContext, useContext, useMemo, useState } from "react";

type Locale = "en" | "hi";
type Dictionary = Record<string, string>;

const en: Dictionary = {
  getStarted: "Get Started",
  uploadData: "Upload Data",
  review: "Review",
  submit: "Submit",
  marketplace: "Marketplace",
  buyNow: "Buy Now",
  connectWallet: "Connect Wallet",
  adminConsole: "Admin Console",
  projects: "Projects",
  registry: "Registry",
  reports: "Reports",
  export: "Export",
  audit: "Audit",
};

const hi: Dictionary = {
  getStarted: "शुरू करें",
  uploadData: "डेटा अपलोड करें",
  review: "समीक्षा",
  submit: "जमा करें",
  marketplace: "मार्केटप्लेस",
  buyNow: "अभी खरीदें",
  connectWallet: "वॉलेट कनेक्ट करें",
  adminConsole: "एडमिन कंसोल",
  projects: "परियोजनाएँ",
  registry: "रजिस्ट्री",
  reports: "रिपोर्ट्स",
  export: "निर्यात",
  audit: "ऑडिट",
};

const dictionaries: Record<Locale, Dictionary> = { en, hi };

type I18nContextType = {
  locale: Locale;
  t: (key: string) => string;
  setLocale: (l: Locale) => void;
};

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>((typeof window !== "undefined" && (localStorage.getItem("locale") as Locale)) || "en");
  const dict = dictionaries[locale] || en;
  const t = (key: string) => dict[key] || key;
  const value = useMemo(() => ({ locale, t, setLocale: (l: Locale) => { setLocale(l); if (typeof window !== "undefined") localStorage.setItem("locale", l); } }), [locale]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();
  return (
    <select
      value={locale}
      onChange={(e) => setLocale(e.target.value as Locale)}
      className="px-3 py-1 border border-gray-300 rounded-md text-sm"
      aria-label="Language"
    >
      <option value="en">EN</option>
      <option value="hi">HI</option>
    </select>
  );
}


