"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroller() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenis.on("scroll", ScrollTrigger.update);
    window.lenis = lenis;

    // Intercept all internal anchor clicks
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");

      if (anchor && anchor.getAttribute("href")?.startsWith("#")) {
        const id = anchor.getAttribute("href")?.slice(1);
        const element = id ? document.getElementById(id) : null;
        
        if (element) {
          e.preventDefault();
          lenis.scrollTo(element, {
            offset: -80, // Match scroll-padding-top
            duration: 1.5,
          });
          // Update URL hash without jumping
          window.history.pushState(null, "", `#${id}`);
        }
      }
    };

    window.addEventListener("click", handleAnchorClick);

    function update(time: number) {
      lenis.raf(time * 1000);
    }

    gsap.ticker.add(update);

    gsap.ticker.lagSmoothing(0);

    return () => {
      window.removeEventListener("click", handleAnchorClick);
      lenis.destroy();
      gsap.ticker.remove(update);
    };
  }, []);

  return null;
}
