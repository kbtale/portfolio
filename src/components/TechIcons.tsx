import type { SVGProps } from "react";
import { C } from "./Techs SVGs/C";
import { AI } from "./Techs SVGs/ai";
import { Apicalypse } from "./Techs SVGs/apicalypse";
import { ChromeExtensions } from "./Techs SVGs/chrome-extensions";
import { CSS } from "./Techs SVGs/css";
import { Docker } from "./Techs SVGs/docker";
import { Firebase } from "./Techs SVGs/firebase";
import { Flutter } from "./Techs SVGs/flutter";
import { Git } from "./Techs SVGs/git";
import { GSAP } from "./Techs SVGs/gsap";
import { HTML5 } from "./Techs SVGs/html";
import { JavaScript } from "./Techs SVGs/js";
import { Laravel } from "./Techs SVGs/laravel";
import { Make } from "./Techs SVGs/make";
import { MySQL } from "./Techs SVGs/mysql";
import { NestJS } from "./Techs SVGs/nestjs";
import { Nextjs } from "./Techs SVGs/nextjs";
import { Nodejs } from "./Techs SVGs/nodejs";
import { Php } from "./Techs SVGs/php";
import { PostgreSQL } from "./Techs SVGs/postgresql";
import { Python } from "./Techs SVGs/python";
import { React as ReactIcon } from "./Techs SVGs/reactjs";
import { Supabase } from "./Techs SVGs/supabase";
import { Swagger } from "./Techs SVGs/swagger";
import { TailwindCSS } from "./Techs SVGs/tailwind";
import { Threejs } from "./Techs SVGs/three";
import { TypeScript } from "./Techs SVGs/typescript";
import { Vue } from "./Techs SVGs/vue";

const iconMap: Record<string, React.FC<SVGProps<SVGSVGElement>>> = {
  c: C,
  git: Git,
  ai: AI,
  apicalypse: Apicalypse,
  "chrome-extensions": ChromeExtensions,
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
