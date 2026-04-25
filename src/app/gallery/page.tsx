// src/app/gallery/page.tsx
'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import headerStyles from '../page.module.css'
import styles from './gallery.module.css'

const photos = [
  { src: '/gallery/foto1.jpg', alt: 'Ritrovo di gruppo' },
  { src: '/gallery/foto2.jpg', alt: 'Gara podistica' },
  { src: '/gallery/foto3.jpg', alt: 'Atleti Sesia Running' },
]

export default function GalleryPage() {
  const [active, setActive] = useState<number | null>(null)

  const close = useCallback(() => setActive(null), [])
  const prev = useCallback(
    () => setActive((i) => (i !== null ? (i - 1 + photos.length) % photos.length : null)),
    []
  )
  const next = useCallback(
    () => setActive((i) => (i !== null ? (i + 1) % photos.length : null)),
    []
  )

  useEffect(() => {
    if (active === null) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [active, close, prev, next])

  return (
    <>
      <div className={headerStyles.wrapper}>
        <header className={headerStyles.header}>
          <div className={headerStyles.headerLogo}>
            <Image src="/logo.png" alt="Sesia Running Vercelli" width={52} height={52} className={headerStyles.logoImg} />
            <div>
              <div className={headerStyles.headerTitle}>Sesia Running Vercelli</div>
              <div className={headerStyles.headerSub}>Galleria</div>
            </div>
          </div>
          <nav className={headerStyles.nav}>
            <Link href="/" className={headerStyles.navLink}>Home</Link>
            <Link href="/classifica" className={headerStyles.navLink}>Classifica</Link>
            <Link href="/regole" className={headerStyles.navLink}>Regole</Link>
            <Link href="/statuto" className={headerStyles.navLink}>Statuto</Link>
            <Link href="/gallery" className={`${headerStyles.navLink} ${headerStyles.navActive}`}>Galleria</Link>
            <Link href="/admin" className={headerStyles.navLink}>Admin</Link>
          </nav>
        </header>

        <div className={styles.hero}>
          <h1 className={styles.heroTitle}>LA NOSTRA COMMUNITY</h1>
          <p className={styles.heroSub}>Corse, ritrovi e qualche chilometro in più — la vita di Sesia Running</p>
        </div>

        <div className={styles.grid}>
          {photos.map((photo, i) => (
            <div key={photo.src} className={styles.item} onClick={() => setActive(i)}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo.src} alt={photo.alt} className={styles.photo} loading="lazy" />
            </div>
          ))}
        </div>
      </div>

      {active !== null && (
        <div className={styles.overlay} onClick={close}>
          <button className={styles.closeBtn} onClick={close}>✕</button>
          <button
            className={styles.prevBtn}
            onClick={(e) => { e.stopPropagation(); prev() }}
          >←</button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photos[active].src}
            alt={photos[active].alt}
            className={styles.lightboxImg}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className={styles.nextBtn}
            onClick={(e) => { e.stopPropagation(); next() }}
          >→</button>
          <div className={styles.counter}>{active + 1} / {photos.length}</div>
        </div>
      )}
    </>
  )
}
