// src/app/gallery/GalleryClient.tsx
'use client'

import { useState, useEffect, useCallback } from 'react'
import styles from './gallery.module.css'

type Photo = { src: string; alt: string }

export default function GalleryClient({ photos }: { photos: Photo[] }) {
  const [active, setActive] = useState<number | null>(null)

  const close = useCallback(() => setActive(null), [])
  const prev = useCallback(
    () => setActive((i) => (i !== null ? (i - 1 + photos.length) % photos.length : null)),
    [photos.length]
  )
  const next = useCallback(
    () => setActive((i) => (i !== null ? (i + 1) % photos.length : null)),
    [photos.length]
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
      <div className={styles.grid}>
        {photos.map((photo, i) => (
          <div key={photo.src} className={styles.item} onClick={() => setActive(i)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo.src} alt={photo.alt} className={styles.photo} loading="lazy" />
            <div className={styles.caption}>{photo.alt}</div>
          </div>
        ))}
      </div>

      {active !== null && (
        <div className={styles.overlay} onClick={close}>
          <button className={styles.closeBtn} onClick={close}>✕</button>
          <button
            className={styles.prevBtn}
            onClick={(e) => { e.stopPropagation(); prev() }}
          >←</button>
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photos[active].src}
              alt={photos[active].alt}
              className={styles.lightboxImg}
            />
            <p className={styles.lightboxCaption}>{photos[active].alt}</p>
          </div>
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
