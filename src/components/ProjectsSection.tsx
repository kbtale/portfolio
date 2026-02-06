"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import ParallaxTitle from "./ParallaxTitle";
import WhooshButton from "./WhooshButton";
import Image from "next/image";
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
  const [filterVersion, setFilterVersion] = useState(0);
  const currentIndexRef = useRef(currentIndex);
  useLayoutEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);
  const dragStartX = useRef<number | null>(null);
  const dragHasMoved = useRef(false);
  const lastShiftTime = useRef(0);
  const [prevFilteredProjects, setPrevFilteredProjects] = useState<Project[]>([]);
  // Store active project ID in state to safely access during render for derived state updates
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [prevCurrentIndex, setPrevCurrentIndex] = useState(-1);

  const filteredProjects = useMemo(() => {
    const base =
      activeCategories.length === 0
        ? projects
        : projects.filter((project) =>
            project.categories.some((category) => activeCategories.includes(category))
          );
    return Array.from(new Map(base.map((project) => [project.id, project])).values());
  }, [activeCategories, projects]);

  // Track the currently active project ID to preserve focus
  // Use ref to avoid re-renders when filteredProjects doesn't change
  // Sync activeProjectId when currentIndex changes (during render)
  if (currentIndex !== prevCurrentIndex) {
    setPrevCurrentIndex(currentIndex);
    if (filteredProjects[currentIndex]) {
       // Only update if actually different to minimize updates (though React handles same-value bailouts)
       if (activeProjectId !== filteredProjects[currentIndex].id) {
          setActiveProjectId(filteredProjects[currentIndex].id);
       }
    }
  }

  // Adjust index when filtered list changes (during render to fix lint error and avoid cascade)
  if (filteredProjects !== prevFilteredProjects) {
    setPrevFilteredProjects(filteredProjects);
    if (filteredProjects.length === 0) {
      if (currentIndex !== 0) setCurrentIndex(0);
    } else {
      const prevId = activeProjectId;
      const newIndex = prevId 
        ? filteredProjects.findIndex(p => p.id === prevId)
        : -1;

      if (newIndex !== -1) {
        if (newIndex !== currentIndex) setCurrentIndex(newIndex);
      } else {
        const total = filteredProjects.length;
        const startIndex = total <= 6 ? Math.floor(total / 2) : 0;
        if (startIndex !== currentIndex) setCurrentIndex(startIndex);
      }
    }
  }

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
    
    // For small counts (≤6), keep cards in original array order for stable animations
    // Positions shift based on which card is selected
    if (total <= 6) {
      const clampedIndex = Math.max(0, Math.min(currentIndex, total - 1));
      const midpoint = Math.floor(total / 2);
      
      // Positions shift so the selected card is at position 3 (center)
      const shift = midpoint - clampedIndex;
      const positions = filteredProjects.map((_, i) => {
        return 3 + (i - midpoint) + shift;
      });
      
      return {
        visibleProjects: filteredProjects,
        activePositionIndex: clampedIndex,
        positionMap: positions,
      };
    }

    // For 7+ cards, use modulo wrapping
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
    // Throttle navigation to prevent rapid changes
    const now = Date.now();
    if (now - lastShiftTime.current < 600) return;
    lastShiftTime.current = now;

    setCurrentIndex((current) => {
      const total = filteredProjects.length;
      if (total === 0) return 0;
      
      // For small counts, clamp to prevent wrap-around
      if (total <= 6) {
        const next = current + direction;
        return Math.max(0, Math.min(next, total - 1));
      }
      
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
                setFilterVersion(v => v + 1);
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
        <div key={filterVersion} className={styles.projectsStage}>
          {visibleProjects.map((project, index) => (
            <article
              key={project.id}
              className={styles.projectCard}
              data-position={positionMap[index]}
              data-active={index === activePositionIndex}
            >
              <div className={styles.projectMedia} aria-hidden="true">
                {project.media && project.media.url ? (
                  project.media.type === "video" ? (
                    <video
                      src={project.media.url}
                      className={styles.projectVideo}
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                  ) : (
                    <Image
                      src={project.media.url}
                      alt={project.title}
                      className={styles.projectImage}
                      draggable={false}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  )
                ) : (
                  <Image
                    src="/images/placeholder.jpeg"
                    alt=""
                    className={styles.projectImage}
                    draggable={false}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                )}
              </div>
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
