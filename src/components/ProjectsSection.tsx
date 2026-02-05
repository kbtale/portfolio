"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import ParallaxTitle from "./ParallaxTitle";
import WhooshButton from "./WhooshButton";
import type { Project, ProjectCategoryId } from "../data/projects";
import { projectCategories, techStack } from "../data/projects";
import styles from "../app/page.module.css";

type ProjectsSectionProps = {
  projects: Project[];
};

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const t = useTranslations();
  const [activeCategories, setActiveCategories] = useState<ProjectCategoryId[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const dragStartX = useRef<number | null>(null);
  const dragHasMoved = useRef(false);

  const filteredProjects = useMemo(() => {
    const base =
      activeCategories.length === 0
        ? projects
        : projects.filter((project) =>
            project.categories.some((category) => activeCategories.includes(category))
          );
    return Array.from(new Map(base.map((project) => [project.id, project])).values());
  }, [activeCategories, projects]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [filteredProjects.length]);

  const techNameById = useMemo(() => {
    const entries = techStack.map((tech) => [tech.id, tech.name] as const);
    return Object.fromEntries(entries) as Record<string, string>;
  }, []);

  const { visibleProjects, activePositionIndex, positionMap } = useMemo(() => {
    if (filteredProjects.length === 0) {
      return {
        visibleProjects: [] as Project[],
        activePositionIndex: 0,
        positionMap: [] as number[],
      };
    }

    const total = filteredProjects.length;
    const count = Math.min(total, 7);
    const midpoint = Math.floor(count / 2);
    const offsets = Array.from({ length: count }, (_, index) => index - midpoint);
    const baseIndices = offsets.map(
      (offset) => (currentIndex + offset + total) % total
    );

    const mappedPositions = offsets.map((offset) => offset + 3);
    const activeIndex = offsets.indexOf(0);

    return {
      visibleProjects: baseIndices.map((index) => filteredProjects[index]),
      activePositionIndex: activeIndex === -1 ? midpoint : activeIndex,
      positionMap: mappedPositions,
    };
  }, [currentIndex, filteredProjects]);

  const shiftIndex = (direction: 1 | -1) => {
    setCurrentIndex((current) => {
      const total = filteredProjects.length;
      if (total === 0) return 0;
      const next = (current + direction + total) % total;
      return next;
    });
  };

  const handlePointerDown: React.PointerEventHandler<HTMLDivElement> = (event) => {
    if (event.button !== 0) return;
    dragStartX.current = event.clientX;
    dragHasMoved.current = false;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove: React.PointerEventHandler<HTMLDivElement> = (event) => {
    if (dragStartX.current === null) return;
    if (dragHasMoved.current) return;
    const deltaX = event.clientX - dragStartX.current;
    if (Math.abs(deltaX) < 50) return;
    shiftIndex(deltaX < 0 ? 1 : -1);
    dragHasMoved.current = true;
  };

  const handlePointerUp: React.PointerEventHandler<HTMLDivElement> = (event) => {
    dragStartX.current = null;
    dragHasMoved.current = false;
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  return (
    <section className={styles.workFilter} id="projects" data-section="projects">
      <h2>
        <ParallaxTitle
          text={t("work.animatedTitle")}
          triggerId="projects"
          className={styles.projectsTitle}
          letterClassName={styles.projectsTitleLetter}
          innerClassName={styles.projectsTitleInner}
          glyphClassName={styles.projectsTitleGlyph}
          spaceClassName={styles.projectsTitleSpace}
        />
      </h2>
      <div className={styles.workCategories} aria-label={t("work.categoriesLabel")}>
        {projectCategories.map((category) => {
          const isActive = activeCategories.includes(category.id);
          const label = t(`work.categories.${category.id}`);
          return (
            <WhooshButton
              key={category.id}
              label={label}
              href="#"
              showDot={false}
              className={isActive ? styles.categoryActive : undefined}
              onClick={(event) => {
                event.preventDefault();
                setActiveCategories((current) =>
                  current.includes(category.id)
                    ? current.filter((item) => item !== category.id)
                    : [...current, category.id]
                );
              }}
            />
          );
        })}
      </div>
      <div
        className={styles.projectsCarousel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        <div className={styles.projectsStage}>
          {visibleProjects.map((project, index) => (
            <article
              key={project.id}
              className={styles.projectCard}
              data-position={positionMap[index]}
              data-active={index === activePositionIndex}
            >
              <div className={styles.projectMedia} aria-hidden="true" />
              <div className={styles.projectBody}>
                <h3>{project.title}</h3>
                <p className={styles.projectDescription}>{project.description || "—"}</p>
                <p className={styles.projectStack}>
                  {project.tech.length
                    ? project.tech.map((tech) => techNameById[tech] ?? tech).join(" · ")
                    : "—"}
                </p>
                <WhooshButton label={t("projects.viewProject")} href={project.githubUrl} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
