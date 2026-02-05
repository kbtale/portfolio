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
      { id: "projects", label: t("projects") },
      { id: "experience", label: t("experience") },
      { id: "about", label: t("about") },
      { id: "contact", label: t("contact") },
    ],
    [t]
  );

  useEffect(() => {
    let rafId: number | null = null;

    const updateActive = () => {
      const viewportHeight = window.innerHeight || 1;
      const viewportWidth = window.innerWidth || 1;
      const viewportArea = viewportHeight * viewportWidth;

      const candidates = items
        .map((item) => {
          const elements = Array.from(
            document.querySelectorAll(`[data-section="${item.id}"]`)
          ) as HTMLElement[];

          if (!elements.length) return null;

          let top = Infinity;
          let bottom = -Infinity;
          let left = Infinity;
          let right = -Infinity;

          elements.forEach((element) => {
            const rect = element.getBoundingClientRect();
            top = Math.min(top, rect.top);
            bottom = Math.max(bottom, rect.bottom);
            left = Math.min(left, rect.left);
            right = Math.max(right, rect.right);
          });

          const visibleHeight = Math.min(bottom, viewportHeight) - Math.max(top, 0);
          const visibleWidth = Math.min(right, viewportWidth) - Math.max(left, 0);
          const area = Math.max(0, visibleHeight) * Math.max(0, visibleWidth);

          return { id: item.id, ratio: area / viewportArea };
        })
        .filter(Boolean) as Array<{ id: string; ratio: number }>;

      if (!candidates.length) {
        setActiveId(null);
        return;
      }

      candidates.sort((a, b) => b.ratio - a.ratio);
      const topCandidate = candidates[0];
      setActiveId(topCandidate.id);
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
