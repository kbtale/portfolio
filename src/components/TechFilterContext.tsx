"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { ProjectCategoryId } from "../data/projects";

interface TechFilterContextType {
  selectedTech: string | null;
  activeCategories: ProjectCategoryId[];
  setTechFilter: (techId: string | null) => void;
  setActiveCategories: React.Dispatch<React.SetStateAction<ProjectCategoryId[]>>;
}

const TechFilterContext = createContext<TechFilterContextType | undefined>(undefined);

export function TechFilterProvider({ children }: { children: React.ReactNode }) {
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [activeCategories, setActiveCategories] = useState<ProjectCategoryId[]>([]);
  const [lastScrollTrigger, setLastScrollTrigger] = useState<number>(0);

  const setTechFilter = useCallback((techId: string | null) => {
    const isAlreadySet = selectedTech === techId;

    if (techId === "html" || techId === "css") {
      if (isAlreadySet) {
        setSelectedTech(null);
        setActiveCategories([]);
      } else {
        setSelectedTech(techId);
        setActiveCategories(["webapps", "websites"]);
        setLastScrollTrigger(Date.now());
      }
    } 
    else if (techId === "git") {
      if (isAlreadySet) {
        setSelectedTech(null);
      } else {
        setSelectedTech(techId);
        setActiveCategories([]);
        setLastScrollTrigger(Date.now());
      }
    }
    else {
      if (isAlreadySet) {
        setSelectedTech(null);
      } else {
        setSelectedTech(techId);
        if (techId) {
          setActiveCategories([]);
          setLastScrollTrigger(Date.now());
        }
      }
    }
  }, [selectedTech]);

  useEffect(() => {
    if (lastScrollTrigger > 0) {
      const projectsSection = document.getElementById("projects");
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [lastScrollTrigger]);

  return (
    <TechFilterContext.Provider 
      value={{ 
        selectedTech, 
        activeCategories, 
        setTechFilter, 
        setActiveCategories 
      }}
    >
      {children}
    </TechFilterContext.Provider>
  );
}

export function useTechFilter() {
  const context = useContext(TechFilterContext);
  if (context === undefined) {
    throw new Error("useTechFilter must be used within a TechFilterProvider");
  }
  return context;
}
