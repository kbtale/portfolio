import React from 'react';
import ParallaxTitle from "@/shared/ui/ParallaxTitle/ParallaxTitle";
import styles from "./AboutHeader.module.css";
import pageStyles from "@/app/page.module.css";

interface AboutHeaderProps {
  title: string;
  subtitle: string;
}

export default function AboutHeader({ title, subtitle }: AboutHeaderProps) {
  return (
    <div className={styles.header}>
      {/* Wrapped in h2 to inherit global Kameron font and match ProjectsSection structure */}
      <h2>
        <ParallaxTitle
          text={title}
          triggerId="about"
          className={`${pageStyles.projectsTitle} ${styles.aboutTitleOverride}`}
          letterClassName={pageStyles.projectsTitleLetter}
          innerClassName={pageStyles.projectsTitleInner}
          glyphClassName={pageStyles.projectsTitleGlyph}
          spaceClassName={pageStyles.projectsTitleSpace}
        />
      </h2>
      <h3 className={styles.subtitle}>{subtitle}</h3>
    </div>
  );
}
