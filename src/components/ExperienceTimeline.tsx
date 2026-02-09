'use client';

import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { Draggable } from 'gsap/all';
import { InertiaPlugin } from 'gsap/InertiaPlugin'; 
// Note: Depending on GSAP version/bundle, InertiaPlugin might be a default or named export.
// If 'gsap/all' was used, it's usually named. 
// But Draggable is often default from 'gsap/Draggable'.
// Let's try the safest "dist" approach or check if 'all' works best. 
// actually, let's use the UMD/Global approach for safety if registered.
// But imports are standard. Let's try removing Destructuring for plugins if possible or just use gsap.custom options.

import styles from './ExperienceTimeline.module.css';

// Register plugins safely
if (typeof window !== 'undefined') {
  gsap.registerPlugin(Draggable, InertiaPlugin);
}

export interface ExperienceItem {
  date: string;
  company: string;
  role: string;
  description: string;
}

interface ExperienceTimelineProps {
  items: ExperienceItem[];
}

export default function ExperienceTimeline({ items }: ExperienceTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const container = containerRef.current;
      if (!track || !container) return;

      const cards = gsap.utils.toArray(`.${styles.card}`, container) as HTMLElement[];

      const updateTilt = () => {
        // Fallback or safe tracking
        let velocity = 0;
        
        // Check if InertiaPlugin is available and tracking the target
        // InertiaPlugin tracks the property "x" on the Draggable target
        try {
             // getVelocity returns 0 if not tracked or plugin missing
             velocity = InertiaPlugin.getVelocity(track, "x");
        } catch {
            // Fallback: If plugin acts up, ignore tilt
            velocity = 0;
        }

        // Clamp rotation
        const rotation = gsap.utils.clamp(-10, 10, velocity / -150);
        
        gsap.to(cards, {
          rotateY: rotation,
          duration: 0.5,
          ease: "power2.out",
          overwrite: "auto"
        });
      };

      const resetTilt = () => {
        gsap.to(cards, {
          rotateY: 0,
          duration: 1,
          ease: "elastic.out(1, 0.5)"
        });
      };

      // Calculate bounds so the last item (Footer) stops at the center of the screen
      // minX (max scroll left) = 
      //   (containerCenter) - (footerCenter relative to track start)
      //   (containerWidth / 2) - (trackWidth - paddingRight - footerWidth / 2)
      
      const footer = container.querySelector(`.${styles.footerBox}`) as HTMLElement;
      
      let minX = container.clientWidth - track.scrollWidth; // Default fallback
      
      if (footer) {
        const containerWidth = container.clientWidth;
        
        // Footer position relative to the track's start
        // Using offsetLeft is more reliable in a flex container than scrollWidth math
        const footerCenterInTrack = footer.offsetLeft + (footer.offsetWidth / 2);
        
        // We want that center point to align with container center (containerWidth / 2)
        // Translation needed = TargetPos - CurrentPos
        // If footer is at 2000px, and center is 500px, we need -1500px translation.
        minX = (containerWidth / 2) - footerCenterInTrack;
        
        // Ensure we don't pull it positively (gap at start) - clamp to 0 max
        if (minX > 0) minX = 0;
      }
      
      Draggable.create(track, {
        type: "x",
        inertia: true,
        bounds: { 
            minX: minX, 
            maxX: 0 
        },
        edgeResistance: 0.65,
        dragClickables: true,
        zIndexBoost: false, 
        onDrag: updateTilt,
        onThrowUpdate: updateTilt,
        onThrowComplete: resetTilt,
      });
    }, containerRef);

    return () => ctx.revert();
  }, [items]);

  return (
    <div 
      className={styles.container} 
      ref={containerRef}
      id="experience"
      data-section="experience"
    >
      
      {/* HTML Draggable Layer */}
      <div className={styles.track} ref={trackRef}>
        
        {/* TITLE BLOCK */}
        <div className={styles.titleWrapper}>
           <div className={styles.titleMy}>My</div>
           <div className={styles.titleExperience}>Experience</div>
        </div>
        
        {/* Spacer between Title and First Item */}
        <div className={styles.lineSpacer} />

        {items.map((item, index) => {
          const isTop = index % 2 === 0;
          
          return (
            <div 
              key={`${item.company}-${index}`} 
              className={styles.itemWrapper}
              data-position={isTop ? 'top' : 'bottom'}
            >
              {/* Modular Axis Line running through this item's slot */}
              <div className={styles.axisLine} />
              
              {/* Dot: Absolute Centered */}
              <div className={styles.connectorDot} />

              {/* Content: Positioned Absolute relative to center */}
              <div className={styles.itemContent}>
                 
                 {/* Top Item: Card first, then line down to center */
                  isTop && (
                    <>
                      <div className={styles.card}>
                        <div className={styles.cardHeader}>
                          <div className={styles.cardDate}>{item.date}</div>
                          <h3>{item.role}</h3>
                          <h4>{item.company}</h4>
                        </div>
                        <p className={styles.cardDesc}>{item.description}</p>
                      </div>
                      <div className={styles.connectorLine} />
                    </>
                  )
                 }

                 {/* Bottom Item: Line up from center, then card */
                  !isTop && (
                    <>
                      <div className={styles.connectorLine} />
                      <div className={styles.card}>
                        <div className={styles.cardHeader}>
                          <div className={styles.cardDate}>{item.date}</div>
                          <h3>{item.role}</h3>
                          <h4>{item.company}</h4>
                        </div>
                        <p className={styles.cardDesc}>{item.description}</p>
                      </div>
                    </>
                  )
                 }
              </div>

            </div>
          );
        })}

        {/* Spacer between Last Item and Footer */}
        <div className={styles.lineSpacer} style={{ minWidth: '60px' }} />

        {/* FOOTER BLOCK */}
        <div className={styles.footerBox}>
           <p className={styles.footerText}>Want to know more about my experience?</p>
           <a 
             href="https://www.linkedin.com/in/carlos-alejandro-bolivar" 
             target="_blank" 
             rel="noopener noreferrer"
             className={styles.footerLink}
             onPointerDown={(e) => e.stopPropagation()} // Prevent drag start on link click
           >
             Add me on LinkedIn
           </a>
        </div>
      </div>
    
    {/* Hint */}
     <div className={styles.dragHint} style={{ 
        position: 'absolute', 
        bottom: '20px', 
        left: '50%', 
        transform: 'translateX(-50%)', 
        fontFamily: 'var(--font-averia)',
        opacity: 0.6,
        pointerEvents: 'none',
        zIndex: 5
      }}>
        <span>DRAG TO EXPLORE</span>
      </div>

    </div>
  );
}
