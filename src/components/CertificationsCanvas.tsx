"use client";

import React from "react";
import Image from "next/image";
import { certifications } from "../data/certifications";
import styles from "../app/page.module.css";

interface CertificationsCanvasProps {
  progress: number;
}

export default function CertificationsCanvas({ progress }: CertificationsCanvasProps) {

  const titleScale = Math.min(progress / 0.4, 1) * 0.7;
  
  // Phase 2: The Rise (Progress 0.2 to 0.95)
  const phase2Progress = Math.max(0, Math.min((progress - 0.2) / 0.75, 1));
  // Increased range: 120vh start, -250vh base end to ensure last card (at +240vh stagger) clears
  const cardY = 120 - (phase2Progress * 450); 

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>
      {/* Centered Title */}
      <div className={styles.certTitleContainer}>
        <h1 
          className={styles.certTitle}
          style={{ 
            transform: `scale(${titleScale})`,
            opacity: 1
          }}
        >
          CERTIFICATIONS
        </h1>
      </div>

      {/* Cards */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {certifications.slice(0, 5).map((cert, index) => {
          const isLeft = index % 2 === 0;
          const leftPos = isLeft ? "15%" : "55%";
          
          const stagger = index * 60;
          
          return (
            <div 
              key={index}
              className={styles.certCard}
              style={{
                position: "absolute",
                left: leftPos,
                top: `${cardY + stagger}vh`,
                pointerEvents: "auto"
              }}
            >
              <div className={styles.certCardImageContainer}>
                <Image 
                  src={cert.CertImage} 
                  alt={cert.CertificationName} 
                  className={styles.certCardImage}
                  fill
                  sizes="400px"
                  style={{ objectFit: "contain" }}
                />
              </div>
              <div className={styles.certCardInfo}>
                <div className={styles.certCardHeader}>
                  <div className={styles.certInstituteLogoContainer}>
                    <Image 
                      src={cert.InstituteLogo} 
                      alt={cert.InstituteName} 
                      className={styles.certInstituteLogo}
                      width={24}
                      height={24}
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                  <span className={styles.certCardDate}>{cert.Date}</span>
                </div>
                <h3 className={styles.certCardRole}>{cert.CertificationName}</h3>
                <p className={styles.certCardIssuer}>{cert.InstituteName}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
