"use client";

import { TechFilterProvider } from "./TechFilterContext";

export default function TechFilterWrapper({ children }: { children: React.ReactNode }) {
  return <TechFilterProvider>{children}</TechFilterProvider>;
}
