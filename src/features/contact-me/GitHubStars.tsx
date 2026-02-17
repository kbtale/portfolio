"use client";

import { useGitHubStars } from "@/app/providers/GitHubStarsContext";

interface GitHubStarsProps {
  repo: string;
  variant?: "carousel" | "detail";
}

export default function GitHubStars({ repo, variant = "carousel" }: GitHubStarsProps) {
  const { starsData } = useGitHubStars();
  const stars = starsData[repo];

  if (stars === undefined || stars === 0) return null;

  if (variant === "detail") {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        padding: '2px 8px',
        background: 'rgba(var(--foreground-rgb), 0.1)',
        fontSize: '0.75rem',
        fontWeight: 600,
        color: 'var(--text-primary)'
      }}>
        <svg aria-hidden="true" height="14" viewBox="0 0 16 16" version="1.1" width="14" fill="currentColor">
          <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"></path>
        </svg>
        <span>{stars} Stars</span>
      </div>
    );
  }

  return (
    <>
      <span style={{ 
        width: '1px', 
        height: '12px', 
        background: 'rgba(var(--foreground-rgb), 0.2)', 
        margin: '0 8px' 
      }}></span>
      <svg
        aria-hidden="true"
        height="16"
        viewBox="0 0 16 16"
        version="1.1"
        width="16"
        fill="currentColor"
      >
        <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"></path>
      </svg>
      <span>{stars}</span>
    </>
  );
}
