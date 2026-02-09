"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import WhooshButton from "./WhooshButton";
import styles from "./StickyNavbar.module.css";

export default function StickyNavbar() {
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

  useEffect(() => {
    let rafId: number | null = null;

    const updateActive = () => {
      // Use a threshold line (e.g., 30% from the top of the viewport)
      // The active section is the one that crosses this line.
      // If multiple cross, pick the one that started most recently (visually lowest top value that is above threshold).
      
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
          
          // Check if the element overlaps the threshold range slightly or at least is "active"
          // Conditions:
          // 1. Top is above the threshold (rect.top <= threshold)
          // 2. Bottom is below the nav height (rect.bottom > navHeight) - ensures it hasn't scrolled off top fully
          //    Actually, simpler: rect.bottom > threshold. ensuring it's still covering the line.
          
          if (rect.top <= threshold && rect.bottom > threshold) {
            // This section is currently covering the threshold line.
            // If multiple sections cover the line (e.g. nested or overlapping),
            // we typically want the one that started *last* (highest top value),
            // as that corresponds to the most specific/recent section scrolled into.
            // OR in standard document flow, they might not overlap much.
            // Let's take the one with the largest 'top' value that is still <= threshold.
            
            if (rect.top > maxTop) {
              maxTop = rect.top;
              bestCandidateId = item.id;
            }
          }
        });
      });

      // Fallback: If nothing intersects the threshold (e.g. fast scroll in giant gap?), 
      // check if we are at the very top or bottom? 
      // Or just keep previous? 
      // Let's add a "closest to threshold" fallback if null? 
      // Actually, if we are at top of page (scrollY=0), Home should be active.
      // Home top is ~80px. Threshold is 300px. 80 <= 300. Matches.
      
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
        <button
          type="button"
          className={styles.navToggle}
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
          aria-controls="primary-navigation"
          onClick={() => setIsOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  );
}
