export type Tech = {
  id: string;
  name: string;
  icon: string;
  category: "language" | "framework" | "database" | "platform" | "tool";
};

export type Project = {
  id: string
  title: string
  githubUrl: string
  repo: string
  stars: number | null
  description: string
  tech: string[]
  additionalLinks: { type: string; link: string }
};

export const techStack: Tech[] = [
  { id: "c", name: "C", icon: "c", category: "language" },
  { id: "css", name: "CSS", icon: "css", category: "language" },
  { id: "html", name: "HTML", icon: "html", category: "language" },
  { id: "js", name: "JavaScript", icon: "javascript", category: "language" },
  { id: "php", name: "PHP", icon: "php", category: "language" },
  { id: "python", name: "Python", icon: "python", category: "language" },
  { id: "typescript", name: "TypeScript", icon: "typescript", category: "language" },
  { id: "flutter", name: "Flutter", icon: "flutter", category: "framework" },
  { id: "gsap", name: "GSAP", icon: "gsap", category: "framework" },
  { id: "laravel", name: "Laravel", icon: "laravel", category: "framework" },
  { id: "nestjs", name: "NestJS", icon: "nestjs", category: "framework" },
  { id: "nextjs", name: "Next.js", icon: "nextjs", category: "framework" },
  { id: "reactjs", name: "React", icon: "react", category: "framework" },
  { id: "tailwind", name: "Tailwind CSS", icon: "tailwind", category: "framework" },
  { id: "three", name: "Three.js", icon: "three", category: "framework" },
  { id: "vue", name: "Vue", icon: "vue", category: "framework" },
  { id: "mysql", name: "MySQL", icon: "mysql", category: "database" },
  { id: "postgresql", name: "PostgreSQL", icon: "postgresql", category: "database" },
  { id: "firebase", name: "Firebase", icon: "firebase", category: "platform" },
  { id: "supabase", name: "Supabase", icon: "supabase", category: "platform" },
  { id: "chrome-extensions", name: "Chrome Extensions", icon: "chrome", category: "platform" },
  { id: "nodejs", name: "Node.js", icon: "node", category: "platform" },
  { id: "ai", name: "AI Integration", icon: "ai", category: "tool" },
  { id: "docker", name: "Docker", icon: "docker", category: "tool" },
  { id: "apicalypse", name: "Apicalypse", icon: "apicalypse", category: "tool" },
  { id: "make", name: "Make", icon: "make", category: "tool" },
  { id: "swagger", name: "Swagger", icon: "swagger", category: "tool" },
];

export const projects: Project[] = [
  {
    id: "findthagame",
    title: "FindThaGame",
    githubUrl: "https://github.com/kbtale/findthagame",
    repo: "kbtale/findthagame",
    stars: null,
    description: "",
    tech: ["typescript", "reactjs", "tailwind", "ai", "apicalypse"],
    additionalLinks: {
      type: "website",
      link: "findthagame.vercel.app",
    },
  },
  {
    id: "ocr-to-txt",
    title: "OCR to TXT",
    githubUrl: "https://github.com/kbtale/ocr-to-txt",
    repo: "kbtale/ocr-to-txt",
    stars: null,
    description: "",
    tech: ["python"],
    additionalLinks: {
      type: "installer",
      link: "https://github.com/kbtale/ocr-to-txt/releases/tag/v1.0"
    },
  },
  {
    id: "lease-sentinel",
    title: "Lease Sentinel",
    githubUrl: "https://github.com/kbtale/lease-sentinel",
    repo: "kbtale/lease-sentinel",
    stars: null,
    description: "",
    tech: ["nextjs", "typescript", "firebase", "make", "ai", "tailwind"],
    additionalLinks: {
      type: "website",
      link: "https://lease-sentinel.vercel.app/",
    },
  },
  {
    id: "palindot",
    title: "Palindot",
    githubUrl: "https://github.com/kbtale/Palindot",
    repo: "kbtale/Palindot",
    stars: null,
    description: "",
    tech: ["vue", "php", "laravel", "mysql", "swagger"],
    additionalLinks: {
      type: "none",
      link: "",
    },
  },
  {
    id: "shell-c",
    title: "Shell C",
    githubUrl: "https://github.com/kbtale/shell-c",
    repo: "kbtale/shell-c",
    stars: null,
    description: "",
    tech: ["c"],
    additionalLinks: {
      type: "none",
      link: "",
    },
  },
  {
    id: "retro-notes",
    title: "Retro Notes",
    githubUrl: "https://github.com/kbtale/retro-notes",
    repo: "kbtale/retro-notes",
    stars: null,
    description: "",
    tech: ["reactjs", "typescript", "tailwind", "nestjs", "postgresql", "docker"],
    additionalLinks: {
      type: "none",
      link: "",
    },
  },
  {
    id: "exhale-app",
    title: "Exhale App",
    githubUrl: "https://github.com/kbtale/exhale-app",
    repo: "kbtale/exhale-app",
    stars: null,
    description: "",
    tech: ["flutter"],
    additionalLinks: {
      type: "installer",
      link: "https://github.com/kbtale/exhale-app/releases/tag/v1.1.0"
    },
  },
  {
    id: "useless-polymath",
    title: "Useless Polymath",
    githubUrl: "https://github.com/kbtale/Useless-Polymath",
    repo: "kbtale/Useless-Polymath",
    stars: null,
    description: "",
    tech: ["reactjs", "typescript", "css"],
    additionalLinks: {
      type: "none",
      link: "",
    },
  },
  {
    id: "civy",
    title: "Civy",
    githubUrl: "https://github.com/openrise-hub/civy",
    repo: "openrise-hub/civy",
    stars: null,
    description: "",
    tech: ["typescript", "reactjs", "tailwind", "nestjs", "postgresql", "docker"],
    additionalLinks: {
      type: "none",
      link: "",
    },
  },
  {
    id: "react-three-text-fx",
    title: "React Three Text FX",
    githubUrl: "https://github.com/openrise-hub/react-three-text-fx",
    repo: "openrise-hub/react-three-text-fx",
    stars: null,
    description: "",
    tech: ["three", "gsap","reactjs"],
    additionalLinks: {
      type: "webiste",
      link: "https://www.npmjs.com/package/react-three-text-fx",
    },
  },
  {
    id: "openrise-www",
    title: "Openrise Landing Page",
    githubUrl: "https://github.com/openrise-hub/www",
    repo: "openrise-hub/www",
    stars: null,
    description: "",
    tech: ["three", "gsap","nextjs", "typescript", "tailwind"],
    additionalLinks: {
      type: "website",
      link: "https://openrise.tech/",
    },
  },
  {
    id: "te-filter",
    title: "TE Filter",
    githubUrl: "https://github.com/kbtale/TE-Filter",
    repo: "kbtale/TE-Filter",
    stars: null,
    description: "",
    tech: ["chrome-extensions", "css", "js"],
    additionalLinks: {
      type: "none",
      link: ""
    },
  },
];

export async function fetchGitHubMeta(repo: string) {
  const response = await fetch(`https://api.github.com/repos/${repo}`);
  if (!response.ok) return null;
  const data = (await response.json()) as {
    stargazers_count?: number;
  };
  return {
    stars: data.stargazers_count ?? 0,
  };
}
