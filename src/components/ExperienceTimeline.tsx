"use client";

import React, { useLayoutEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import gsap from 'gsap';
import { ScrollTrigger, Draggable } from 'gsap/all';

import styles from './ExperienceTimeline.module.css';


if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, Draggable);
}

export interface ExperienceItem {
  date: string;
  company: string;
  role: string;
  description: string;
  url?: string;
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


      const getScrollAmount = () => {
        const footer = container.querySelector(`.${styles.footerBox}`) as HTMLElement;
        if (!footer) {
             const trackWidth = track.scrollWidth;
             const containerWidth = container.clientWidth;
             return -(trackWidth - containerWidth);
        }
        

        
        const containerWidth = container.clientWidth;
        const footerCenter = footer.offsetLeft + (footer.offsetWidth / 2);
        const containerCenter = containerWidth / 2;
        
        let targetX = containerCenter - footerCenter;
        
        if (targetX > 0) targetX = 0;
        
        return targetX;
      };


      const tween = gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "center center",
          pin: true,
          scrub: 1,
          end: () => `+=${Math.abs(getScrollAmount())}`,
          invalidateOnRefresh: true,
        }
      });
      

      const proxy = document.createElement("div");
      
      Draggable.create(proxy, {
        trigger: track,
        type: "x",
        inertia: true,
        onPress() {
          this.startScroll = window.scrollY;

          const st = tween.scrollTrigger;
          if (st) {
            this.minScroll = st.start;
            this.maxScroll = st.end;
          }
        },
        onDrag() {
          const st = tween.scrollTrigger;
          if (!st) return;


          const rawScroll = this.startScroll - (this.x - this.startX) * 1.5;
          

          const clampedScroll = gsap.utils.clamp(this.minScroll, this.maxScroll, rawScroll);
          
          window.scrollTo(0, clampedScroll);
        }
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
      

      <div className={styles.track} ref={trackRef}>
        

        <div className={styles.titleWrapper}>
           <div className={styles.titleMy}>{t('titleMy')}</div>
           <div className={styles.titleExperience}>{t('titleExperience')}</div>
        </div>
        

        <div className={styles.lineSpacer} />

        {items.map((item, index) => {
          const isTop = index % 2 === 0;
          
          return (
            <div 
              key={`${item.company}-${index}`} 
              className={styles.itemWrapper}
              data-position={isTop ? 'top' : 'bottom'}
            >

              <div className={styles.axisLine} />
              

              <div className={styles.connectorDot} />


              <div className={styles.itemContent}>
                 
                 {
                   isTop && (
                    <>
                      {item.url ? (
                        <a 
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.card}
                          onPointerDown={(e) => e.stopPropagation()}
                        >
                           <div className={styles.cardHeader}>
                             <div className={styles.cardDate}>{item.date}</div>
                             <h3>{item.role}</h3>
                             <h4>{item.company}</h4>
                           </div>
                           <p className={styles.cardDesc}>{item.description}</p>
                        </a>
                      ) : (
                        <div className={styles.card}>
                          <div className={styles.cardHeader}>
                            <div className={styles.cardDate}>{item.date}</div>
                            <h3>{item.role}</h3>
                            <h4>{item.company}</h4>
                          </div>
                          <p className={styles.cardDesc}>{item.description}</p>
                        </div>
                      )}
                      <div className={styles.connectorLine} />
                    </>
                  )
                 }


                 {
                   !isTop && (
                    <>
                      <div className={styles.connectorLine} />
                      {item.url ? (
                        <a 
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.card}
                          onPointerDown={(e) => e.stopPropagation()}
                        >
                           <div className={styles.cardHeader}>
                             <div className={styles.cardDate}>{item.date}</div>
                             <h3>{item.role}</h3>
                             <h4>{item.company}</h4>
                           </div>
                           <p className={styles.cardDesc}>{item.description}</p>
                        </a>
                      ) : (
                        <div className={styles.card}>
                          <div className={styles.cardHeader}>
                            <div className={styles.cardDate}>{item.date}</div>
                            <h3>{item.role}</h3>
                            <h4>{item.company}</h4>
                          </div>
                          <p className={styles.cardDesc}>{item.description}</p>
                        </div>
                      )}
                    </>
                  )
                 }
              </div>

            </div>
          );
        })}


        <div className={styles.lineSpacer} style={{ minWidth: '60px' }} />


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
