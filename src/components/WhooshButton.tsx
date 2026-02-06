'use client'

import type { MouseEventHandler } from 'react'
import styles from './WhooshButton.module.css'

type WhooshButtonProps = {
    label?: string
    icon?: React.ReactNode
    href?: string
    target?: string
    rel?: string
    className?: string
    innerClassName?: string
    showDot?: boolean
    transparentBase?: boolean
    onClick?: MouseEventHandler<HTMLAnchorElement>
}

export default function WhooshButton({
    label,
    icon,
    href = '#',
    target,
    rel,
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
    if (icon) classes.push(styles.hasIcon)

    return (
        <a href={href} target={target} rel={rel} className={classes.join(' ')} onClick={onClick}>
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
                data-text={!icon ? label : undefined}
                className={[styles.buttonColorSwooshInner, innerClassName]
                    .filter(Boolean)
                    .join(' ')}
            >
                <span className={styles.buttonColorSwooshText}>
                    {icon ? icon : label}
                </span>
                {showDot ? <span className={styles.buttonColorSwooshDot} /> : null}
            </span>
        </a>
    )
}

