import type { SVGProps } from "react";
import { C } from "./tech/C";
import { AI } from "./tech/ai";
import { Apicalypse } from "./tech/apicalypse";
import { CSS } from "./tech/css";
import { Docker } from "./tech/docker";
import { Firebase } from "./tech/firebase";
import { Flutter } from "./tech/flutter";
import { Git } from "./tech/git";
import { GSAP } from "./tech/gsap";
import { HTML5 } from "./tech/html";
import { JavaScript } from "./tech/js";
import { Laravel } from "./tech/laravel";
import { Make } from "./tech/make";
import { MySQL } from "./tech/mysql";
import { NestJS } from "./tech/nestjs";
import { Nextjs } from "./tech/nextjs";
import { Nodejs } from "./tech/nodejs";
import { Php } from "./tech/php";
import { PostgreSQL } from "./tech/postgresql";
import { Python } from "./tech/python";
import { React as ReactIcon } from "./tech/reactjs";
import { Supabase } from "./tech/supabase";
import { Swagger } from "./tech/swagger";
import { TailwindCSS } from "./tech/tailwind";
import { Threejs } from "./tech/three";
import { TypeScript } from "./tech/typescript";
import { Vue } from "./tech/vue";

const iconMap: Record<string, React.FC<SVGProps<SVGSVGElement>>> = {
  c: C,
  git: Git,
  ai: AI,
  apicalypse: Apicalypse,
  css: CSS,
  docker: Docker,
  firebase: Firebase,
  flutter: Flutter,
  gsap: GSAP,
  html: HTML5,
  js: JavaScript,
  laravel: Laravel,
  make: Make,
  mysql: MySQL,
  nestjs: NestJS,
  nextjs: Nextjs,
  nodejs: Nodejs,
  php: Php,
  postgresql: PostgreSQL,
  python: Python,
  reactjs: ReactIcon,
  supabase: Supabase,
  swagger: Swagger,
  tailwind: TailwindCSS,
  three: Threejs,
  typescript: TypeScript,
  vue: Vue,
};

export function TechIcon({ id, ...props }: { id: string } & SVGProps<SVGSVGElement>) {
  const Icon = iconMap[id];
  if (!Icon) return null;
  return <Icon {...props} />;
}
