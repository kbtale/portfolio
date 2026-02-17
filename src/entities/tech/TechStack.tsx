"use client";

import { useTranslations } from "next-intl";
import { techStack, Tech } from "@/data/projects";
import { TechIcon } from "@/shared/ui/icons/TechIcons";
import { useTechFilter } from "@/app/providers/TechFilterContext";
import styles from "./TechStack.module.css";

export default function TechStack() {
  const tAbout = useTranslations("about.sections");
  const tTech = useTranslations("projects.tech");
  const { selectedTech, setTechFilter } = useTechFilter();
  const categories = ["languages", "frontend_mobile", "backend_cloud", "tools"] as const;

  const groupedTech = categories.reduce((acc, cat) => {
    acc[cat] = techStack.filter((t) => t.category === cat);
    return acc;
  }, {} as Record<string, Tech[]>);

  const getRows = (items: Tech[]) => {
    const rows: { tech: Tech; span: number }[][] = [];
    const remaining = [...items];

    while (remaining.length > 0) {
      const count = remaining.length;

      if (count >= 3) {
        if (count === 4) {
          const pair = remaining.splice(0, 2);
          rows.push(pair.map(t => ({ tech: t, span: 3 })));
        } else {
          const trio = remaining.splice(0, 3);
          rows.push(trio.map(t => ({ tech: t, span: 2 })));
        }
      } 
      else if (count === 2) {
        const pair = remaining.splice(0, 2);
        rows.push(pair.map(t => ({ tech: t, span: 3 })));
      }
      else {
        const solo = remaining.splice(0, 1);
        rows.push(solo.map(t => ({ tech: t, span: 6 })));
      }
    }
    return rows;
  };

  return (
    <div className={styles.techStack}>
      <div className={styles.blocksContainer}>
        {categories.map((cat) => {
          const items = groupedTech[cat];
          if (items.length === 0) return null;

          const rows = getRows(items);

          return (
            <div key={cat} className={styles.categoryBlock}>
              <span className={styles.blockLabel}>{tAbout(cat)}</span>
              <div className={styles.iconsGridBento}>
                {rows.flat().map(({ tech, span }) => {
                  const isActive = selectedTech === tech.id;
                  const spanClass = span === 2 ? styles.span2 : span === 3 ? styles.span3 : styles.span6;
                  
                  return (
                    <div 
                      key={tech.id} 
                      className={`${styles.techItemBento} ${isActive ? styles.activeTechItem : ""} ${spanClass}`}
                      onClick={() => setTechFilter(tech.id)}
                    >
                      <TechIcon id={tech.id} className={styles.techIconBento} />
                      <span className={styles.techNameBento}>{tTech(tech.id)}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
