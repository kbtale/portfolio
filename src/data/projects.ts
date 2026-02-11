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
  { id: "ai", name: "AI", icon: "ai", category: "tool" },
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
    description: "A website that helps you track down games using specific criteria like console, year, or genre. Far from a simple lookup, it leverages Apicalypse queries and a custom scoring algorithm (detailed in the README) to intelligently rank results from the IGDB database and find the exact title you're missing.",
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
    title: "OCR to TXT",
    githubUrl: "https://github.com/kbtale/ocr-to-txt",
    repo: "kbtale/ocr-to-txt",
    stars: null,
    description: "A desktop app that pulls text from images and screenshots using Tesseract OCR. It helps you get accurate results from unclear images by letting you adjust contrast and brightness before processing. You can convert, edit, and save text from multiple files at once.",
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
    title: "Lease Sentinel",
    githubUrl: "https://github.com/kbtale/lease-sentinel",
    repo: "kbtale/lease-sentinel",
    stars: null,
    description: "LeaseSentinel is an automated deadline monitoring system that leverages Google Gemini 1.5 Flash to parse natural language lease clauses into structured webhook alerts. Built on Next.js 16 and Firebase Firestore, the application implements a \"Deep Module\" architecture to encapsulate complex logic, such as AI prompt engineering and timestamp serialization, behind strict interfaces. It features a custom dual-authentication configuration to bridge NextAuth v5 with the Firestore adapter and utilizes type-safe Server Actions for robust error handling. The system runs a daily cron job to identify trigger dates, delegating final delivery to a serverless Make.com orchestration layer that routes notifications to Slack, Twilio, or Email based on user preferences.",
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
    title: "Palindot",
    githubUrl: "https://github.com/kbtale/Palindot",
    repo: "kbtale/Palindot",
    stars: null,
    description: "A URL shortener that adds a creative twist to link sharing. Instead of random characters, it generates \"palindromic\" codes sequences that read the same forwards and backwards. It processes the original link to create a symmetrical short address for every user.",
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
    title: "Shell C",
    githubUrl: "https://github.com/kbtale/shell-c",
    repo: "kbtale/shell-c",
    stars: null,
    description: "This project rebuilds the command line interface with expanded capabilities. Beyond basic file management, it includes utilities to view file internals, check the weather, and diagnose internet issues. It runs on Windows, Mac, and Linux.",
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
    title: "Retro Notes",
    githubUrl: "https://github.com/kbtale/retro-notes",
    repo: "kbtale/retro-notes",
    stars: null,
    description: "A note-taking app that brings back the nostalgia of 8-bit video games. It combines a retro, pixelated design with modern reliability, offering a secure place to write, categorize, and archive your thoughts. It automatically saves your drafts to your device so you never lose an idea.",
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
    title: "Exhale App",
    githubUrl: "https://github.com/kbtale/exhale-app",
    repo: "kbtale/exhale-app",
    stars: null,
    description: "Designed for mindfulness, this app provides a simple way to clear your head. Record your voice to express feelings, hear them one last time, and let them go as the recording is automatically discarded. It keeps nothing on the cloud or your device, creating a fleeting moment of release.",
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
    title: "Useless Polymath",
    githubUrl: "https://github.com/kbtale/Useless-Polymath",
    repo: "kbtale/Useless-Polymath",
    stars: null,
    description: "This project is a collection of drills for learning random knowledge. It helps you practice skills like reading electronic color codes, predicting moon phases, or using secret ciphers. It is designed to be a digital playground where you can learn interesting technical facts.",
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
    title: "Civy",
    githubUrl: "https://github.com/openrise-hub/civy",
    repo: "openrise-hub/civy",
    stars: null,
    description: "A SaaS to create multiple CVs and cover letters with a live previsualizer and automatic formatting by using multiple templates. You can also use YAML",
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
    title: "React Three Text FX",
    githubUrl: "https://github.com/openrise-hub/react-three-text-fx",
    repo: "openrise-hub/react-three-text-fx",
    stars: null,
    description: "A React component library of text effects built with GSAP and Three.js animations for easy integration into React Three Fiber projects.",
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
    title: "Openrise Landing Page",
    githubUrl: "https://github.com/openrise-hub/www",
    repo: "openrise-hub/www",
    stars: null,
    description: "Landing page for Openrise, an open source community that builds free and accessible tools for creators and developers.",
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
    title: "TE Filter",
    githubUrl: "https://github.com/kbtale/TE-Filter",
    repo: "kbtale/TE-Filter",
    stars: null,
    description: "A browser extension that simplifies finding classes on the Moodle platform. It replaces the long, hard-to-use list of groups with a searchable menu, letting staff find the right class instantly. It also saves time by automatically selecting the Excel format for downloads and copying the class name for easy file labeling.",
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
  const response = await fetch(`https://api.github.com/repos/${repo}`);
  if (!response.ok) return null;
  const data = (await response.json()) as {
    stargazers_count?: number;
  };
  return {
    stars: data.stargazers_count ?? 0,
  };
}
