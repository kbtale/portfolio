'use client';

import React from 'react';
import styles from './AboutHeader.module.css';

interface AboutHeaderProps {
  title: string;
  subtitle: string;
}

export default function AboutHeader({ title, subtitle }: AboutHeaderProps) {
  return (
    <div className={styles.header}>
      <h2 className={styles.title}>{title}</h2>
      <h3 className={styles.subtitle}>{subtitle}</h3>
    </div>
  );
}
