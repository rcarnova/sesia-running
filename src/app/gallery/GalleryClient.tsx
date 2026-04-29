// src/app/gallery/GalleryClient.tsx
'use client'

import { useState, useEffect, useCallback, Fragment } from 'react'
import styles from './gallery.module.css'

type Photo = { src: string; alt: string }

const mesi = ['', 'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
               'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre']

function getMonthKey(src: string): string {
  const m = src.match(/\/gallery\/(\d{4})\/(\d{2})\//)
  return m ? `${m[1]}/${m[2]}` : '0000/00'
}

function getMonthLabel(key: string): string {
  const [year, month] = key.split('/')
  const m = parseInt(month, 10)
  return m > 0 ? `${mesi[m]} ${year}` : ''
}

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

  // Group photos by YYYY/MM, preserving original flat index for lightbox
  const groups: { key: string; items: { photo: Photo; index: number }[] }[] = []
  const seen = new Map<string, number>()
  photos.forEach((photo, i) => {
    const key = getMonthKey(photo.src)
    if (!seen.has(key)) {
      seen.set(key, groups.length)
      groups.push({ key, items: [] })
    }
    groups[seen.get(key)!].items.push({ photo, index: i })
  })

  return (
    <>
      <div className={styles.grid}>
        {groups.map((group) => (
          <Fragment key={group.key}>
            {group.key !== '0000/00' && (
              <div className={styles.monthLabel}>{getMonthLabel(group.key)}</div>
            )}
            {group.items.map(({ photo, index }) => (
              <div key={photo.src} className={styles.item} onClick={() => setActive(index)}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photo.src} alt={photo.alt} className={styles.photo} loading="lazy" />
                <div className={styles.caption}>{photo.alt}</div>
              </div>
            ))}
          </Fragment>
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
