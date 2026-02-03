'use client'

import type { MouseEventHandler } from 'react'
import styles from './WhooshButton.module.css'

type WhooshButtonProps = {
    label: string
    href?: string
    className?: string
    innerClassName?: string
    showDot?: boolean
    transparentBase?: boolean
    onClick?: MouseEventHandler<HTMLAnchorElement>
}

export default function WhooshButton({
    label,
    href = '#',
    className,
    innerClassName,
    showDot = true,
    transparentBase = false,
    onClick,
}: WhooshButtonProps) {
    const classes = [styles.buttonColorSwoosh]
    if (transparentBase) classes.push(styles.transparentBase)
    if (!showDot) classes.push(styles.noDot)
    if (className) classes.push(className)

    return (
        <a href={href} className={classes.join(' ')} onClick={onClick}>
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
            <span
                data-text={label}
                className={[styles.buttonColorSwooshInner, innerClassName]
                    .filter(Boolean)
                    .join(' ')}
            >
                <span className={styles.buttonColorSwooshText}>{label}</span>
                {showDot ? <span className={styles.buttonColorSwooshDot} /> : null}
            </span>
        </a>
    )
}

