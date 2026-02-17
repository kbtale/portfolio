"use client";

import { TechFilterProvider } from "@/app/providers/TechFilterContext";

export default function TechFilterWrapper({ children }: { children: React.ReactNode }) {
  return <TechFilterProvider>{children}</TechFilterProvider>;
}
