"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
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

  const setTechFilter = useCallback((techId: string | null) => {
    // Special case for HTML and CSS: Map to categories
    if (techId === "html" || techId === "css") {
      const isAlreadySet = selectedTech === techId;
      if (isAlreadySet) {
        setSelectedTech(null);
        setActiveCategories([]);
      } else {
        setSelectedTech(techId);
        setActiveCategories(["webapps", "websites"]);
      }
    } 
    // Special case for Git: Scroll but allow highlight (it exists in all projects now)
    else if (techId === "git") {
      const isAlreadySet = selectedTech === techId;
      setSelectedTech(isAlreadySet ? null : techId);
      setActiveCategories([]); // Clear category filters
    }
    else {
      const isAlreadySet = selectedTech === techId;
      if (isAlreadySet) {
        setSelectedTech(null);
      } else {
        setSelectedTech(techId);
        // Clear categories when a non-special tech is selected to avoid conflicting filters
        if (techId) setActiveCategories([]);
      }
    }
    
    // Auto-scroll to projects if any tech is selected
    if (techId) {
      setTimeout(() => {
        const projectsSection = document.getElementById("projects");
        if (projectsSection) {
          projectsSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [selectedTech]);

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
