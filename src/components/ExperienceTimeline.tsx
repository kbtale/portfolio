"use client";

import React, { useLayoutEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import gsap from 'gsap';
import { ScrollTrigger, Draggable } from 'gsap/all';

import styles from './ExperienceTimeline.module.css';

// Register plugins safely
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, Draggable);
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
  const t = useTranslations("timeline");
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const container = containerRef.current;
      if (!track || !container) return;

      // Calculate scroll amount
      const getScrollAmount = () => {
        const footer = container.querySelector(`.${styles.footerBox}`) as HTMLElement;
        if (!footer) {
             const trackWidth = track.scrollWidth;
             const containerWidth = container.clientWidth;
             return -(trackWidth - containerWidth);
        }
        
        // x + FooterCenter = ContainerCenter
        // x = ContainerCenter - FooterCenter
        
        const containerWidth = container.clientWidth;
        const footerCenter = footer.offsetLeft + (footer.offsetWidth / 2);
        const containerCenter = containerWidth / 2;
        
        let targetX = containerCenter - footerCenter;
        
        // Ensure we don't scroll past the start (positive x)
        if (targetX > 0) targetX = 0;
        
        return targetX;
      };

      // Horizontal Scroll via ScrollTrigger (Pin & Scrub)
      const tween = gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "center center",
          pin: true,
          scrub: 1,
          end: () => `+=${Math.abs(getScrollAmount())}`, // Scroll length matches the distance we move
          invalidateOnRefresh: true,
        }
      });
      
      // Drag Logic
      const proxy = document.createElement("div");
      
      Draggable.create(proxy, {
        trigger: track,
        type: "x",
        inertia: true, 
        onPress() {
          this.startScroll = window.scrollY;
          // Capture bounds of the pinning ScrollTrigger
          const st = tween.scrollTrigger;
          if (st) {
            this.minScroll = st.start;
            this.maxScroll = st.end;
          }
        },
        onDrag() {
          const st = tween.scrollTrigger;
          if (!st) return;

          // Dragging Left (negative delta) -> Scroll Down (positive)
          const rawScroll = this.startScroll - (this.x - this.startX) * 1.5;
          
          // Clamp to the section's scroll bounds
          const clampedScroll = gsap.utils.clamp(this.minScroll, this.maxScroll, rawScroll);
          
          window.scrollTo(0, clampedScroll);
        }
      });

      // Tilt effect (optional, hooked into the tween update if needed, or simple scroll velocity)
      
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
      
      {/* Track Layer */}
      <div className={styles.track} ref={trackRef}>
        
        {/* TITLE BLOCK */}
        <div className={styles.titleWrapper}>
           <div className={styles.titleMy}>{t('titleMy')}</div>
           <div className={styles.titleExperience}>{t('titleExperience')}</div>
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
             onPointerDown={(e) => e.stopPropagation()} 
           >
             Add me on LinkedIn
           </a>
        </div>
      </div>
    
    </div>
  );
}
