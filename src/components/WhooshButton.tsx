'use client'

import styles from './WhooshButton.module.css'

type WhooshButtonProps = {
    label: string
    href?: string
}

export default function WhooshButton({ label, href = '#' }: WhooshButtonProps) {
    return (
        <a href={href} className={styles.buttonColorSwoosh}>
            <span className={styles.buttonColorSwooshBg}>
                <span
                    style={{ ['--index' as string]: 0 }}
                    className={`${styles.buttonColorSwooshBgInner} ${styles.isFirst}`}
                ></span>
                <span
                    style={{ ['--index' as string]: 1 }}
                    className={`${styles.buttonColorSwooshBgInner} ${styles.isSecond}`}
                ></span>
            </span>
            <span data-text={label} className={styles.buttonColorSwooshInner}>
                <span className={styles.buttonColorSwooshText}>{label}</span>
                <span className={styles.buttonColorSwooshDot} />
            </span>
        </a>
    )
}

