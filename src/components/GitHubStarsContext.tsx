"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { projects, fetchGitHubMeta } from "../data/projects";

interface GitHubStarsContextType {
  starsData: Record<string, number>;
}

const GitHubStarsContext = createContext<GitHubStarsContextType | undefined>(undefined);

const CACHE_KEY = "github-stars-batch-cache";
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

export function GitHubStarsProvider({ children }: { children: React.ReactNode }) {
  const [starsData, setStarsData] = useState<Record<string, number>>({});

  useEffect(() => {
    async function initStars() {
      try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const { data, timestamp } = JSON.parse(cached);
          if (Date.now() - timestamp < CACHE_TTL) {
            setStarsData(data);
            return;
          }
        }
      } catch {
      }

      const uniqueRepos = Array.from(new Set(projects.map(p => p.repo)));
      const newStarsData: Record<string, number> = {};

      await Promise.all(
        uniqueRepos.map(async (repo) => {
          try {
            const meta = await fetchGitHubMeta(repo);
            if (meta) {
              newStarsData[repo] = meta.stars;
            }
          } catch (e) {
            console.error(`Failed to fetch stars for ${repo}:`, e);
          }
        })
      );

      setStarsData(newStarsData);
      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify({
          data: newStarsData,
          timestamp: Date.now()
        }));
      } catch {
      }
    }

    initStars();
  }, []);

  return (
    <GitHubStarsContext.Provider value={{ starsData }}>
      {children}
    </GitHubStarsContext.Provider>
  );
}

export function useGitHubStars() {
  const context = useContext(GitHubStarsContext);
  if (context === undefined) {
    throw new Error("useGitHubStars must be used within a GitHubStarsProvider");
  }
  return context;
}
