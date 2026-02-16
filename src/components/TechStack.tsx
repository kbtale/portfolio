"use client";

import { useTranslations } from "next-intl";
import { techStack, Tech } from "../data/projects";
import { TechIcon } from "./TechIcons";
import { useTechFilter } from "./TechFilterContext";
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

  return (
    <div className={styles.techStack}>
      <div className={styles.blocksContainer}>
        {categories.map((cat) => (
          groupedTech[cat].length > 0 && (
            <div key={cat} className={styles.categoryBlock}>
              <span className={styles.blockLabel}>{tAbout(cat)}</span>
              <div className={styles.iconsGridDense}>
                {groupedTech[cat].map((tech) => {
                  const isActive = selectedTech === tech.id;
                  return (
                    <div 
                      key={tech.id} 
                      className={`${styles.techItemTiny} ${isActive ? styles.activeTechItem : ""}`}
                      onClick={() => setTechFilter(tech.id)}
                    >
                      <TechIcon id={tech.id} className={styles.techIconSmall} />
                      <span className={styles.techNameTiny}>{tTech(tech.id)}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
}
