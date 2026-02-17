"use client";

import React from "react";
import Image from "next/image";
import { Certification, certifications } from "@/data/certifications";
import styles from "@/app/page.module.css";

interface CertificationsCanvasProps {
  title: string;
  progress: number;
}

export default function CertificationsCanvas({ title, progress }: CertificationsCanvasProps) {

  const titleScale = Math.min(progress / 0.4, 1) * 0.7;
  
  const phase2Progress = Math.max(0, Math.min((progress - 0.2) / 0.75, 1));
  const cardY = 120 - (phase2Progress * 450); 

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>

      <div className={styles.certTitleContainer}>
        <h1 
          className={styles.certTitle}
          style={{ 
            transform: `scale(${titleScale})`,
            opacity: 1
          }}
        >
          {title}
        </h1>
      </div>


      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {certifications.slice(0, 5).map((cert: Certification, index: number) => {
          const leftPos = index % 2 === 0 ? "calc(50% - 520px)" : "calc(50% + 20px)";
          
          return (
            <div 
              key={index}
              className={`${styles.certCard} cert-card-mobile-fix`}
              style={{
                position: "absolute",
                "--cert-left-desktop": leftPos,
                "--cert-index": index,
                top: `calc(${cardY}vh + var(--cert-index) * var(--cert-stagger))`,
                pointerEvents: "auto"
              } as React.CSSProperties}
            >
              <div className={styles.certCardTop}>
                <div className={styles.certCardImageContainer}>
                  <Image 
                    src={cert.CertImage} 
                    alt={cert.CertificationName} 
                    className={styles.certCardImage}
                    fill
                    sizes="320px"
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <div className={styles.certCardRightInfo}>
                  <div className={styles.certCardHeader}>
                    <div className={styles.certInstituteLogoContainer}>
                      <Image 
                        src={cert.InstituteLogo} 
                        alt={cert.InstituteName} 
                        className={styles.certInstituteLogo}
                        width={56}
                        height={56}
                        style={{ objectFit: "contain" }}
                      />
                    </div>
                    <span className={styles.certCardDate}>{cert.Date}</span>
                  </div>
                  <p className={styles.certCardIssuer}>{cert.InstituteName}</p>
                </div>
              </div>
              <div className={styles.certCardBottom}>
                <h3 className={styles.certCardRole}>{cert.CertificationName}</h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
