export type Tech = {
  id: string;
  name: string;
  icon: string;
  category: "languages" | "frontend_mobile" | "backend_cloud" | "tools";
};

export type Project = {
  id: string
  githubUrl: string
  repo: string
  stars: number | null
  tech: string[]
  categories: ProjectCategoryId[]
  additionalLinks: { type: string; link: string }
  media?: {
    type: "image" | "video";
    url: string;
  };
};

export type ProjectCategoryId =
  | "websites"
  | "webapps"
  | "desktop"
  | "mobile"
  | "extensions"
  | "libraries"
  | "tools";

export type ProjectCategory = {
  id: ProjectCategoryId;
  name: string;
};

export const projectCategories: ProjectCategory[] = [
  { id: "websites", name: "Websites" },
  { id: "webapps", name: "Web Apps" },
  { id: "desktop", name: "Desktop" },
  { id: "mobile", name: "Mobile" },
  { id: "extensions", name: "Extensions" },
  { id: "libraries", name: "Libraries" },
  { id: "tools", name: "Tools" },
];

export const techStack: Tech[] = [
  // Languages
  { id: "c", name: "C", icon: "c", category: "languages" },
  { id: "python", name: "Python", icon: "python", category: "languages" },
  { id: "php", name: "PHP", icon: "php", category: "languages" },
  { id: "js", name: "JavaScript", icon: "javascript", category: "languages" },
  { id: "typescript", name: "TypeScript", icon: "typescript", category: "languages" },
  { id: "html", name: "HTML", icon: "html", category: "languages" },
  { id: "css", name: "CSS", icon: "css", category: "languages" },

  // Frontend & Mobile
  { id: "reactjs", name: "React", icon: "react", category: "frontend_mobile" },
  { id: "vue", name: "Vue", icon: "vue", category: "frontend_mobile" },
  { id: "nextjs", name: "Next.js", icon: "nextjs", category: "frontend_mobile" },
  { id: "tailwind", name: "Tailwind CSS", icon: "tailwind", category: "frontend_mobile" },
  { id: "gsap", name: "GSAP", icon: "gsap", category: "frontend_mobile" },
  { id: "three", name: "Three.js", icon: "three", category: "frontend_mobile" },
  { id: "flutter", name: "Flutter", icon: "flutter", category: "frontend_mobile" },

  // Backend & Cloud
  { id: "nodejs", name: "Node.js", icon: "node", category: "backend_cloud" },
  { id: "laravel", name: "Laravel", icon: "laravel", category: "backend_cloud" },
  { id: "nestjs", name: "NestJS", icon: "nestjs", category: "backend_cloud" },
  { id: "mysql", name: "MySQL", icon: "mysql", category: "backend_cloud" },
  { id: "postgresql", name: "PostgreSQL", icon: "postgresql", category: "backend_cloud" },
  { id: "firebase", name: "Firebase", icon: "firebase", category: "backend_cloud" },
  { id: "supabase", name: "Supabase", icon: "supabase", category: "backend_cloud" },
  { id: "docker", name: "Docker", icon: "docker", category: "backend_cloud" },
  { id: "apicalypse", name: "Apicalypse", icon: "apicalypse", category: "backend_cloud" },

  // Tools
  { id: "git", name: "Git", icon: "git", category: "tools" },
  { id: "make", name: "Make", icon: "make", category: "tools" },
  { id: "swagger", name: "Swagger", icon: "swagger", category: "tools" },
  { id: "ai", name: "AI Integration", icon: "ai", category: "tools" },
];

export const projects: Project[] = [
  {
    id: "findthagame",
    githubUrl: "https://github.com/kbtale/findthagame",
    repo: "kbtale/findthagame",
    stars: null,
    tech: ["typescript", "reactjs", "tailwind", "ai", "apicalypse"],
    categories: ["websites", "webapps"],
    additionalLinks: {
      type: "website",
      link: "https://findthagame.vercel.app",
    },
    media: {
      type: "video",
      url: "/videos/findthagame_compressed_2.mp4"
    }
  },
  {
    id: "ocr-to-txt",
    githubUrl: "https://github.com/kbtale/ocr-to-txt",
    repo: "kbtale/ocr-to-txt",
    stars: null,
    tech: ["python"],
    categories: ["desktop"],
    additionalLinks: {
      type: "installer",
      link: "https://github.com/kbtale/ocr-to-txt/releases/tag/v1.0"
    },
    media: {
      type: "image",
      url: "/images/ocr-to-txt_compressed.png"
    }
  },
  {
    id: "lease-sentinel",
    githubUrl: "https://github.com/kbtale/lease-sentinel",
    repo: "kbtale/lease-sentinel",
    stars: null,
    tech: ["nextjs", "typescript", "firebase", "make", "ai", "tailwind"],
    categories: ["webapps"],
    additionalLinks: {
      type: "website",
      link: "https://lease-sentinel.vercel.app/",
    },
    media: {
      type: "video",
      url: "/videos/leasesentinel_compressed.mp4"
    }
  },
  {
    id: "palindot",
    githubUrl: "https://github.com/kbtale/Palindot",
    repo: "kbtale/Palindot",
    stars: null,
    tech: ["vue", "php", "laravel", "mysql", "swagger"],
    categories: ["webapps"],
    additionalLinks: {
      type: "none",
      link: "",
    },
    media: {
      type: "image",
      url: ""
    }
  },
  {
    id: "shell-c",
    githubUrl: "https://github.com/kbtale/shell-c",
    repo: "kbtale/shell-c",
    stars: null,
    tech: ["c"],
    categories: ["tools", "desktop"],
    additionalLinks: {
      type: "none",
      link: "",
    },
    media: {
      type: "video",
      url: "/videos/shellc_compressed_4.mp4"
    }
  },
  {
    id: "retro-notes",
    githubUrl: "https://github.com/kbtale/retro-notes",
    repo: "kbtale/retro-notes",
    stars: null,
    tech: ["reactjs", "typescript", "tailwind", "nestjs", "postgresql", "docker"],
    categories: ["webapps"],
    additionalLinks: {
      type: "none",
      link: "",
    },
    media: {
      type: "video",
      url: "/videos/retronotes_compressed.mp4"
    }
  },
  {
    id: "exhale-app",
    githubUrl: "https://github.com/kbtale/exhale-app",
    repo: "kbtale/exhale-app",
    stars: null,
    tech: ["flutter"],
    categories: ["mobile"],
    additionalLinks: {
      type: "installer",
      link: "https://github.com/kbtale/exhale-app/releases/tag/v1.1.0"
    },
    media: {
      type: "image",
      url: ""
    }
  },
  {
    id: "useless-polymath",
    githubUrl: "https://github.com/kbtale/Useless-Polymath",
    repo: "kbtale/Useless-Polymath",
    stars: null,
    tech: ["reactjs", "typescript", "css"],
    categories: ["webapps", "websites"],
    additionalLinks: {
      type: "none",
      link: "",
    },
    media: {
      type: "image",
      url: ""
    }
  },
  {
    id: "civy",
    githubUrl: "https://github.com/openrise-hub/civy",
    repo: "openrise-hub/civy",
    stars: null,
    tech: ["typescript", "reactjs", "tailwind", "nestjs", "postgresql", "docker"],
    categories: ["webapps", "websites"],
    additionalLinks: {
      type: "none",
      link: "",
    },
    media: {
      type: "video",
      url: "/videos/civy_compressed.mp4"
    }
  },
  {
    id: "react-three-text-fx",
    githubUrl: "https://github.com/openrise-hub/react-three-text-fx",
    repo: "openrise-hub/react-three-text-fx",
    stars: null,
    tech: ["three", "gsap","reactjs"],
    categories: ["libraries"],
    additionalLinks: {
      type: "webiste",
      link: "https://www.npmjs.com/package/react-three-text-fx",
    },
    media: {
      type: "video",
      url: "/videos/threejs-react-text_compressed.mp4"
    }
  },
  {
    id: "openrise-www",
    githubUrl: "https://github.com/openrise-hub/www",
    repo: "openrise-hub/www",
    stars: null,
    tech: ["three", "gsap","nextjs", "typescript", "tailwind"],
    categories: ["websites"],
    additionalLinks: {
      type: "website",
      link: "https://openrise.tech/",
    },
    media: {
      type: "video",
      url: "/videos/openrise-landing_compressed.mp4"
    }
  },
  {
    id: "te-filter",
    githubUrl: "https://github.com/kbtale/TE-Filter",
    repo: "kbtale/TE-Filter",
    stars: null,
    tech: ["chrome-extensions", "css", "js"],
    categories: ["extensions"],
    additionalLinks: {
      type: "none",
      link: ""
    },
    media: {
      type: "image",
      url: ""
    }
  },
];

export async function fetchGitHubMeta(repo: string) {
  try {
    const response = await fetch(`https://api.github.com/repos/${repo}`);
    if (!response.ok) return null;
    const data = (await response.json()) as { stargazers_count?: number };
    return { stars: data.stargazers_count ?? 0 };
  } catch {
    return null;
  }
}
