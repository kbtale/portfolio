import { useLocale } from "next-intl";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./LanguageSwitcher.module.css";

type LocaleCode = "en" | "es" | "it";

const localeLabels: Record<LocaleCode, string> = {
  en: "EN",
  es: "ES",
  it: "IT",
};

import { useLanguageTransition } from "./LanguageTransition";
// ... existing code ...

export default function LanguageSwitcher() {
  const locale = useLocale() as LocaleCode;
  const router = useRouter();
  const { transition } = useLanguageTransition();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const switchLocale = (newLocale: LocaleCode) => {
    if (newLocale === locale) {
      setIsOpen(false);
      return;
    }
    
    setIsOpen(false);

    transition(newLocale, async () => {
      // Set cookie and refresh to switch language
      const date = new Date();
      date.setTime(date.getTime() + (365 * 24 * 60 * 60 * 1000));
      document.cookie = `locale=${newLocale}; expires=${date.toUTCString()}; path=/`;
      
      // Refresh the page data
      router.refresh();
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.container} ref={containerRef}>
      <button 
        className={styles.trigger} 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Change Language"
        aria-expanded={isOpen}
      >
        {localeLabels[locale]}
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          {(Object.keys(localeLabels) as LocaleCode[])
            .filter((code) => code !== locale)
            .map((code) => (
            <button
              key={code}
              className={styles.option}
              onClick={() => switchLocale(code)}
            >
              {localeLabels[code]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
