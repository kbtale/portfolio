"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { techStack } from "@/data/projects";
import { TechIcon } from "@/shared/ui/icons/TechIcons";
import { useTechFilter } from "@/app/providers/TechFilterContext";
import WhooshButton from "@/shared/ui/WhooshButton/WhooshButton";
import projectStyles from "@/app/page.module.css";
import styles from "./TechSearchFilter.module.css";

export default function TechSearchFilter() {
  const t = useTranslations("projects.tech");
  const tUi = useTranslations("work");
  const { selectedTech, setTechFilter } = useTechFilter();
  
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [focusedIndex, setFocusedIndex] = useState(-1);
  
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Get localized names and sort them
  const searchableTech = techStack.map(tech => ({
    ...tech,
    localizedName: t(tech.id)
  })).sort((a, b) => a.localizedName.localeCompare(b.localizedName));

  const filteredTech = search.trim() === "" 
    ? searchableTech 
    : searchableTech.filter(tech => 
        tech.localizedName.toLowerCase().includes(search.toLowerCase()) ||
        tech.id.toLowerCase().includes(search.toLowerCase())
      );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearch("");
        setFocusedIndex(-1);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const toggleSearch = () => {
    if (isOpen) {
      setSearch("");
      setFocusedIndex(-1);
    }
    setIsOpen(!isOpen);
  };

  const handleSelect = (techId: string) => {
    setTechFilter(techId);
    setIsOpen(false);
  };

  const currentSelectedName = selectedTech ? searchableTech.find(t => t.id === selectedTech)?.localizedName : null;

  return (
    <div className={styles.searchWrapper} ref={wrapperRef}>
      <WhooshButton
        label={currentSelectedName || tUi("filterByTech") || "Filter by tech..."}
        showDot={false}
        className={selectedTech || isOpen ? projectStyles.categoryActive : undefined}
        onClick={(e) => {
          e.preventDefault();
          toggleSearch();
        }}
        icon={
          <svg 
            width="16" height="16" viewBox="0 0 24 24" fill="none" 
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        }
      />

      {isOpen && (
        <div className={styles.dropdown}>
          <div className={styles.searchInputWrapper}>
            <input
              ref={inputRef}
              type="text"
              className={styles.searchInput}
              placeholder={tUi("searchPlaceholder") || "Search technologies..."}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setFocusedIndex(-1);
              }}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") {
                  setFocusedIndex(prev => Math.min(prev + 1, filteredTech.length - 1));
                } else if (e.key === "ArrowUp") {
                  setFocusedIndex(prev => Math.max(prev - 1, 0));
                } else if (e.key === "Enter" && focusedIndex >= 0) {
                  handleSelect(filteredTech[focusedIndex].id);
                } else if (e.key === "Escape") {
                  setIsOpen(false);
                }
              }}
            />
          </div>
          
          <div className={styles.resultsList} data-lenis-prevent>
            {filteredTech.length > 0 ? (
              filteredTech.map((tech, index) => (
                <div 
                  key={tech.id}
                  className={`${styles.resultItem} ${focusedIndex === index ? styles.resultItemFocused : ""}`}
                  onClick={() => handleSelect(tech.id)}
                  onMouseEnter={() => setFocusedIndex(index)}
                >
                  <div className={styles.resultIcon}>
                    <TechIcon id={tech.id} />
                  </div>
                  <span className={styles.resultName}>{tech.localizedName}</span>
                </div>
              ))
            ) : (
              <div className={styles.noResults}>
                {tUi("noResults") || "No technologies found"}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
