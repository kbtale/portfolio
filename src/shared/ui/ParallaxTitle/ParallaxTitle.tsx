"use client";

import type { CSSProperties } from "react";
import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type ParallaxTitleProps = {
  text: string;
  triggerId: string;
  className?: string;
  letterClassName?: string;
  innerClassName?: string;
  glyphClassName?: string;
  spaceClassName?: string;
};

export default function ParallaxTitle({
  text,
  triggerId,
  className,
  letterClassName,
  innerClassName,
  glyphClassName,
  spaceClassName,
}: ParallaxTitleProps) {
  const loopCount = 3;
  const rootRef = useRef<HTMLSpanElement>(null);
  const triggerSelector = useMemo(() => `#${triggerId}`, [triggerId]);

  useEffect(() => {
    const root = rootRef.current;
    const trigger = document.querySelector(triggerSelector);
    if (!root || !trigger) return;

    const letters = Array.from(root.querySelectorAll("[data-letter-stack]"));
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger,
        start: "top bottom",
        end: "top 10%",
        scrub: true,
      },
    });

    tl.to(letters, {
      y: `-${loopCount - 1}em`,
      ease: "none",
      stagger: {
        each: 0.06,
        from: "start",
      },
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [triggerSelector, text]); // Re-run when text changes (translation)

  return (
    <span
      ref={rootRef}
      className={className}
      aria-label={text}
      style={{ ["--loop-count" as string]: loopCount } as CSSProperties}
    >
      {text.split("").map((char, index) => {
        if (char === " ") {
          return (
            <span key={`space-${index}`} className={spaceClassName} aria-hidden="true">
              &nbsp;
            </span>
          );
        }

        return (
          <span key={`${char}-${index}`} className={letterClassName} data-letter>
            <span className={innerClassName} data-letter-stack>
              {Array.from({ length: loopCount }).map((_, loopIndex) => (
                <span
                  key={`${char}-${index}-${loopIndex}`}
                  className={glyphClassName ?? innerClassName}
                >
                  {char}
                </span>
              ))}
            </span>
          </span>
        );
      })}
    </span>
  );
}
