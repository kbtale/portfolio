"use client";

import { useEffect, useRef } from "react";
import styles from "../app/page.module.css";

type ProjectVideoProps = {
  src: string;
  isVisible: boolean; // Based on carousel position
  sectionInView: boolean; // Based on intersection observer
};

export default function ProjectVideo({ src, isVisible, sectionInView }: ProjectVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    const shouldPlay = isVisible && sectionInView;

    if (shouldPlay) {
      // Attempt to play if not already playing
      if (videoRef.current.paused) {
        videoRef.current.play().catch(() => {
          // Autoplay might be blocked or failed, ignore
        });
      }
    } else {
      // Pause to save resources
      if (!videoRef.current.paused) {
        videoRef.current.pause();
      }
    }
  }, [isVisible, sectionInView]);

  return (
    <video
      ref={videoRef}
      src={src}
      className={styles.projectVideo}
      muted
      loop
      playsInline
      preload="auto" 
    />
  );
}
