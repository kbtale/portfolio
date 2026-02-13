"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import WhooshButton from "./WhooshButton";
import LanguageSwitcher from "./LanguageSwitcher";
import StaggeredMenu from "./StaggeredMenu";
import styles from "./StickyNavbar.module.css";
import { useTheme } from "./ThemeContext";

export default function StickyNavbar() {
  const { currentPalette } = useTheme();
  const t = useTranslations("nav");
  const [activeId, setActiveId] = useState<string | null>("home");
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const items = useMemo(
    () => [
      { id: "home", label: t("home") },
      { id: "about", label: t("about") },
      { id: "projects", label: t("projects") },
      { id: "experience", label: t("experience") },
      { id: "contact", label: t("contact") },
    ],
    [t]
  );

  const staggeredItems = useMemo(() => items.map(item => ({
    label: item.label,
    link: `#${item.id}`,
    ariaLabel: `Go to ${item.label} section`
  })), [items]);

  const socialItems = [
    { label: 'GitHub', link: 'https://github.com/kbtale' },
    { label: 'LinkedIn', link: 'https://linkedin.com/in/carlos-alejandro-bolivar' }
  ];

  useEffect(() => {
    let rafId: number | null = null;

    const updateActive = () => {
      // Update active section based on threshold intersection
      const viewportHeight = window.innerHeight || 1;
      const threshold = viewportHeight * 0.3;

      let bestCandidateId: string | null = null;
      let maxTop = -Infinity;

      items.forEach((item) => {
        const elements = Array.from(
          document.querySelectorAll(`[data-section="${item.id}"]`)
        ) as HTMLElement[];

        elements.forEach((element) => {
          const rect = element.getBoundingClientRect();
          
          if (rect.top <= threshold && rect.bottom > threshold) {
            // Pick the section starting closest to the threshold without passing it
            if (rect.top > maxTop) {
              maxTop = rect.top;
              bestCandidateId = item.id;
            }
          }
        });
      });
      
      setActiveId(bestCandidateId);
    };

    const scheduleUpdate = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        updateActive();
      });
    };

    updateActive();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [items]);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={styles.navbar}
      data-open={isOpen ? "true" : "false"}
      data-scrolled={isScrolled ? "true" : "false"}
      aria-label="Primary"
    >
      <div className={styles.navInner}>
        <div className={styles.navMenu} id="primary-navigation">
          <ul className={styles.navList}>
            {items.map((item) => (
              <li
                key={item.id}
                className={`${styles.navItem} ${
                  activeId === item.id ? styles.navItemActive : ""
                }`}
              >
                <WhooshButton
                  label={item.label}
                  href={`#${item.id}`}
                  className={`${styles.navWhoosh} ${
                    activeId === item.id ? "activeSection" : ""
                  }`}
                  innerClassName={styles.navWhooshInner}
                  transparentBase
                  showDot={false}
                  onClick={() => setIsOpen(false)}
                />
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.mobileMenuWrapper}>
          <StaggeredMenu
            items={staggeredItems}
            socialItems={socialItems}
            displaySocials
            displayItemNumbering={true}
            menuButtonColor={currentPalette.text}
            openMenuButtonColor={currentPalette.text}
            changeMenuColorOnOpen={false}
            colors={[currentPalette.background, currentPalette.accent_1, currentPalette.accent_2, currentPalette.sub_neutral]}
            accentColor={currentPalette.accent_1}
            logoUrl={undefined}
          />
        </div>
        <LanguageSwitcher />
      </div>
    </nav>
  );
}
