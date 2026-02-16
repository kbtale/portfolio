"use client";

import { useLayoutEffect, useMemo, useRef, useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import ParallaxTitle from "./ParallaxTitle";
import WhooshButton from "./WhooshButton";
import Image from "next/image";
import ProjectVideo from "./ProjectVideo";
import GitHubStars from "./GitHubStars";
import { useTechFilter } from "./TechFilterContext";
import { useTheme } from "./ThemeContext";
import type { Project } from "../data/projects";
import { projectCategories, techStack } from "../data/projects";
import styles from "../app/page.module.css";
import TechSearchFilter from "./TechSearchFilter";

type ProjectsSectionProps = {
  projects: Project[];
};

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const t = useTranslations();
  const { selectedTech, activeCategories, setActiveCategories, setTechFilter } = useTechFilter();
  const { triggerToast } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (selectedTech === "git") {
      triggerToast("message", t.raw("work.gitToast"));
    }
  }, [selectedTech, triggerToast, t]);
  const [filterVersion, setFilterVersion] = useState(0);
  const currentIndexRef = useRef(currentIndex);
  useLayoutEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);
  const dragStartX = useRef<number | null>(null);
  const dragHasMoved = useRef(false);
  const lastShiftTime = useRef(0);
  const [lastActiveProjectId, setLastActiveProjectId] = useState<string | null>(null);

  // Detail view state
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [viewMode, setViewMode] = useState<"carousel" | "detail" | "transitioning">("carousel");
  const [isExiting, setIsExiting] = useState(false);

  const filteredProjects = useMemo(() => {
    let base =
      activeCategories.length === 0
        ? projects
        : projects.filter((project) =>
            project.categories.some((category) => activeCategories.includes(category))
          );
          
    if (selectedTech && selectedTech !== "html" && selectedTech !== "css" && selectedTech !== "git") {
      base = base.filter((project) => project.tech.includes(selectedTech));
    }

    return Array.from(new Map(base.map((project) => [project.id, project])).values());
  }, [activeCategories, projects, selectedTech]);


  // Track previous filtered projects to detect changes during render
  const [prevFilteredProjects, setPrevFilteredProjects] = useState(filteredProjects);

  // When filters change (resulting in a new filteredProjects array), adjust currentIndex
  if (filteredProjects !== prevFilteredProjects) {
    setPrevFilteredProjects(filteredProjects);
    
    // Use the snapshot ID from the previous stable render to find our place
    const prevId = lastActiveProjectId;
    let newIndex = -1;

    if (filteredProjects.length > 0) {
      if (prevId) {
        newIndex = filteredProjects.findIndex(p => p.id === prevId);
      }
      
      if (newIndex !== -1) {
        setCurrentIndex(newIndex);
        setLastActiveProjectId(filteredProjects[newIndex].id);
      } else {
        const total = filteredProjects.length;
        const startIndex = total <= 6 ? Math.floor(total / 2) : 0;
        setCurrentIndex(startIndex);
        setLastActiveProjectId(filteredProjects[startIndex]?.id || null);
      }
    } else {
      setCurrentIndex(0);
      setLastActiveProjectId(null);
    }
  } else {
    // Stable render phase (filters match)
    const currentProject = filteredProjects[currentIndex];
    const currentId = currentProject?.id || null;
    
    if (currentId !== lastActiveProjectId) {
      setLastActiveProjectId(currentId);
    }
  }

  const techNameById = useMemo(() => {
    const entries = techStack.map((tech) => [tech.id, t(`projects.tech.${tech.id}`)] as const);
    return Object.fromEntries(entries) as Record<string, string>;
  }, [t]);

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

    // With exactly 7 items, unique keys are required for each virtual position.
    if (total === 7) {
      const count = 7;
      const midpoint = 3;
      const offsets = Array.from({ length: count }, (_, index) => index - midpoint);
      
      const mappedItems = offsets.map((offset) => {
        const virtualIndex = currentIndex + offset;
        const dataIndex = ((virtualIndex % total) + total) % total;
        return {
          project: filteredProjects[dataIndex],
          key: `${filteredProjects[dataIndex].id}-${virtualIndex}`
        };
      });

      const mappedPositions = offsets.map((offset) => offset + 3);

      return {
        visibleProjects: mappedItems, // Returns { project, key } objects
        activePositionIndex: 3,
        positionMap: mappedPositions,
      };
    }

    const count = 7;
    const midpoint = Math.floor(count / 2);
    const offsets = Array.from({ length: count }, (_, index) => index - midpoint);
    const baseIndices = offsets.map(
      (offset) => (currentIndex + offset + total) % total
    );

    const mappedPositions = offsets.map((offset) => offset + 3);
    const activeIndex = offsets.indexOf(0);

    return {
      visibleProjects: baseIndices.map((index) => filteredProjects[index]), // Returns Project[]
      activePositionIndex: activeIndex === -1 ? midpoint : activeIndex,
      positionMap: mappedPositions,
    };
  }, [currentIndex, filteredProjects]);

  const shiftIndex = (direction: 1 | -1) => {
    const now = Date.now();
    if (now - lastShiftTime.current < 600) return;
    lastShiftTime.current = now;

    setCurrentIndex((current) => {
      const total = filteredProjects.length;
      if (total === 0) return 0;
      
      if (total <= 6) {
        const next = current + direction;
        return Math.max(0, Math.min(next, total - 1));
      }

      if (total === 7) {
        return current + direction;
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

  // Open the detail view for a project
  const openDetailView = (project: Project) => {
    setSelectedProject(project);
    setIsExiting(true); // Start carousel exit animation
    setViewMode("transitioning");

    // Smooth scroll to top of section on mobile
    if (window.innerWidth < 768 && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    
    // After carousel exits, show detail
    setTimeout(() => {
      setIsExiting(false);
      setViewMode("detail");
    }, 500); // Match CSS animation duration
  };

  // Close detail view and return to carousel
  const closeDetailView = () => {
    setIsExiting(true); // Detail exits
    
    setTimeout(() => {
      setSelectedProject(null);
      setIsExiting(false);
      setViewMode("carousel");
    }, 400); // Match riseOut animation
  };

  // Track if the section is in view to pause all videos when scrolled away
  const sectionRef = useRef<HTMLElement>(null);
  const [sectionInView, setSectionInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setSectionInView(entry.isIntersecting);
      },
      { threshold: 0.1 } // 10% visibility is enough to start prepping
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className={styles.workFilter} 
      id="projects" 
      data-section="projects"
    >
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
      
      <div className={styles.projectsContentWrapper}>
        {/* Carousel content - hidden when detail view is open */}
        {viewMode !== "detail" && (
          <div className={`${styles.carouselWrapper} ${isExiting && viewMode === "transitioning" ? styles.exiting : ""}`}>
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
                      // Clear tech filter when manually changing categories to avoid confusion
                      setTechFilter(null);
                      setFilterVersion(v => v + 1);
                    }}
                  />
                );
              })}
              <div className={styles.mobileSearchRow}>
                <TechSearchFilter />
                <WhooshButton
                  label={t("work.clearFilters") || "Clear"}
                  href="#"
                  showDot={false}
                  className={!(activeCategories.length > 0 || selectedTech) ? styles.clearButtonDisabled : undefined}
                  innerClassName={styles.clearFiltersInner}
                  onClick={(e) => {
                    e.preventDefault();
                    if (!(activeCategories.length > 0 || selectedTech)) return;
                    setActiveCategories([]);
                    setTechFilter(null);
                    setFilterVersion(v => v + 1);
                  }}
                />
              </div>
            </div>
            <div
              className={styles.projectsCarousel}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
            >
          <div key={filterVersion} className={styles.projectsStage}>
            {visibleProjects.map((item, index) => {
              // Handle both "Simple Project" (<=6) and "Wrapped Project" (7+) structures
              let project: Project;
              let uniqueKey: string;

              if ('project' in item) {
                // 7+ items structure
                project = item.project;
                uniqueKey = item.key;
              } else {
                // <=6 items structure
                project = item as Project;
                uniqueKey = project.id;
              }

              const position = positionMap[index];
              // Positions 1, 2, 3, 4, 5 are visible. 0 and 6 are opacity 0.
              const isVisible = position >= 1 && position <= 5;

              return (
              <article
                key={uniqueKey}
                className={styles.projectCard}
                data-position={positionMap[index]}
                data-active={index === activePositionIndex}
              >
                <div className={styles.projectMedia} aria-hidden="true">
                  {project.media && project.media.url ? (
                    project.media.type === "video" ? (
                      <ProjectVideo 
                        src={project.media.url}
                        isVisible={isVisible}
                        sectionInView={sectionInView}
                      />
                    ) : (
                      <Image
                        src={project.media.url}
                        alt={t(`projects.items.${project.id}.title`)}
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
                  <div className={styles.projectBadges}>
                    <a 
                      href={project.githubUrl}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={styles.repoBadge}
                      onPointerDown={(e) => e.stopPropagation()}
                    >
                      <svg
                        height="16"
                        aria-hidden="true"
                        viewBox="0 0 16 16"
                        version="1.1"
                        width="16"
                        fill="currentColor"
                      >
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                      </svg>
                      <GitHubStars repo={project.repo} variant="carousel" />
                    </a>
                  </div>
                </div>
                <div className={styles.projectBody}>
                  <h3>{t(`projects.items.${project.id}.title`)}</h3>
                  <p className={styles.projectDescription}>{t(`projects.items.${project.id}.description`) || "—"}</p>
                  <div className={styles.projectStack}>
                    {project.tech.length
                      ? project.tech.map((tech) => (
                          <span key={tech} className={styles.techBadge}>
                            {techNameById[tech] ?? tech}
                          </span>
                        ))
                      : "—"}
                  </div>
                  <div className={styles.projectActions}>
                     <div className={styles.projectActionRow}>
                       <div className={styles.wideWhooshWrapper} onPointerDown={(e) => e.stopPropagation()}>
                         <WhooshButton 
                           label={t("projects.viewDetails")}
                           href="#"
                           showDot={false}
                           onClick={(e) => {
                             e.preventDefault();
                             openDetailView(project);
                           }}
                         />
                       </div>
                      {project.additionalLinks.type !== "none" && (
                        <div className={styles.wideWhooshWrapper} onPointerDown={(e) => e.stopPropagation()}>
                          <WhooshButton 
                             label={project.additionalLinks.type === "installer" ? t("projects.download") : t("projects.viewSite")}
                             href={project.additionalLinks.link}
                             target="_blank"
                             rel="noopener noreferrer"
                             showDot={false}
                          />
                        </div>
                      )}
                     </div>
                  </div>
                </div>
              </article>
              );
            })}
          </div>
            </div>
          </div>
        )}

        {/* Detail View - shown when a project is selected */}
        {selectedProject && viewMode !== "carousel" && (
          <div 
            className={`${styles.projectDetail} ${
              viewMode === "detail" && isExiting ? styles.exiting : styles.entering
            }`}
          >
            <div className={styles.projectDetailHeader}>
              <WhooshButton 
                label={t("projects.back")}
                href="#"
                showDot={false}
                className={styles.detailBackButton}
                onClick={(e) => {
                  e.preventDefault();
                  closeDetailView();
                }}
              />
              <h3 className={styles.projectDetailTitle}>{t(`projects.items.${selectedProject.id}.title`)}</h3>
              <GitHubStars repo={selectedProject.repo} variant="detail" />
            </div>
            <div className={styles.projectDetailContent}>
              {/* Left: Video/Image */}
              <div className={styles.projectDetailMedia}>
                {selectedProject.media && selectedProject.media.url ? (
                  selectedProject.media.type === "video" ? (
                    <video
                      src={selectedProject.media.url}
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                  ) : (
                    <Image
                      src={selectedProject.media.url}
                      alt={t(`projects.items.${selectedProject.id}.title`)}
                      fill
                      style={{ objectFit: "contain" }}
                    />
                  )
                ) : (
                  <Image
                    src="/images/placeholder.jpeg"
                    alt=""
                    fill
                    style={{ objectFit: "contain" }}
                  />
                )}
              </div>
              {/* Right: Info */}
              <div className={styles.projectDetailInfo}>
                <div className={styles.detailSection}>
                  <h4 className={styles.projectDetailAboutTitle}>{t("projects.about")}</h4>
                  <p className={styles.projectDetailDescription}>
                    {t(`projects.items.${selectedProject.id}.description`) || t("projects.noDescription")}
                  </p>
                </div>
                
                <div className={styles.detailSection}>
                  <h5 className={styles.projectDetailTechTitle}>{t("projects.techStack")}</h5>
                  <div className={styles.projectDetailTechList}>
                    {selectedProject.tech.map((techId) => (
                      <span key={techId} className={styles.techBadge}>
                        {techNameById[techId] ?? techId}
                      </span>
                    ))}
                  </div>
                </div>
                <div className={styles.projectDetailActions}>
                  {selectedProject.additionalLinks.type !== "none" && (
                    <WhooshButton 
                      label={selectedProject.additionalLinks.type === "installer" ? t("projects.download") : t("projects.viewSite")}
                      href={selectedProject.additionalLinks.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      showDot={false}
                    />
                  )}
                  <WhooshButton 
                    icon={
                       <svg height="16" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="16" fill="currentColor">
                         <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                       </svg>
                    }
                    label={t("projects.githubRepo")}
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    showDot={false}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
