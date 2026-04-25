// src/app/gallery/page.tsx
'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import headerStyles from '../page.module.css'
import styles from './gallery.module.css'

const photos = [
  { src: '/gallery/A%20Vercelli%20campo%20coni%2029%20marzo.jpeg',                              alt: 'A Vercelli campo coni 29 marzo' },
  { src: '/gallery/Alex%20a%20Rimini%2019%20aprile%202026.jpeg',                                alt: 'Alex a Rimini 19 aprile 2026' },
  { src: '/gallery/Allenamento%20di%20gruppo%2012%20aprile%202026.jpeg',                        alt: 'Allenamento di gruppo 12 aprile 2026' },
  { src: '/gallery/Allenamento%20di%20gruppo%206%20aprile%202026.jpeg',                         alt: 'Allenamento di gruppo 6 aprile 2026' },
  { src: '/gallery/Allenamento%20di%20gruppo%206%20gennaio%202026.jpeg',                        alt: 'Allenamento di gruppo 6 gennaio 2026' },
  { src: '/gallery/Allenamento%20di%20gruppo%208%20febbraio%202026.jpeg',                       alt: 'Allenamento di gruppo 8 febbraio 2026' },
  { src: '/gallery/Camminata%20in%20Rosa%20per%20la%20festa%20della%20donna%202026%20Vercelli.jpeg', alt: 'Camminata in Rosa per la festa della donna 2026 Vercelli' },
  { src: '/gallery/Denis%20al%20trail%20della%20Gallinara.jpeg',                                alt: 'Denis al trail della Gallinara' },
  { src: '/gallery/Diego%20al%20trail%20del%20Mottarone.jpeg',                                  alt: 'Diego al trail del Mottarone' },
  { src: '/gallery/Enri%20al%20Trail%20di%20Lenta%2022%20febbraio%202026.jpeg',                 alt: 'Enri al Trail di Lenta 22 febbraio 2026' },
  { src: '/gallery/Enrico%20alla%20Maratona%20di%20Milano%2012%20aprile%202026.jpeg',           alt: 'Enrico alla Maratona di Milano 12 aprile 2026' },
  { src: '/gallery/Enrico%20e%20Dani.jpeg',                                                     alt: 'Enrico e Dani' },
  { src: '/gallery/I%20pacchi%20gara%20per%20la%20Vercelli%20che%20corre%2029%20marzo%202026.jpeg', alt: 'I pacchi gara per la Vercelli che corre 29 marzo 2026' },
  { src: '/gallery/Il%20Dani%20al%20Winter%20Brich.jpeg',                                       alt: 'Il Dani al Winter Brich' },
  { src: '/gallery/Il%20Dani%20alla%20San%20Giorgio%20Sky.jpeg',                                alt: 'Il Dani alla San Giorgio Sky' },
  { src: '/gallery/Il%20Dani.jpeg',                                                              alt: 'Il Dani' },
  { src: '/gallery/Il%20Nino%20a%20Moncrivello.jpeg',                                           alt: 'Il Nino a Moncrivello' },
  { src: '/gallery/Locandina%20Vercelli%20che%20corre%202026.jpeg',                             alt: 'Locandina Vercelli che corre 2026' },
  { src: '/gallery/San%20Nazzaro%20Sesia%2025%20aprile%202026.jpeg',                            alt: 'San Nazzaro Sesia 25 aprile 2026' },
  { src: '/gallery/allenamento%20di%20capodanno.jpeg',                                          alt: 'Allenamento di capodanno' },
  { src: '/gallery/allenamento%20di%20gruppo%202%20aprile%202026.jpeg',                         alt: 'Allenamento di gruppo 2 aprile 2026' },
  { src: '/gallery/allenamento%20di%20gruppo%2025%20gennaio%202026.jpeg',                       alt: 'Allenamento di gruppo 25 gennaio 2026' },
  { src: '/gallery/il%20fonsa%20a%20terdobbiate%2021%20aprile%202026.jpeg',                     alt: 'Il fonsa a terdobbiate 21 aprile 2026' },
  { src: '/gallery/presenti%20a%20novara%2025%20gennaio%202026.jpeg',                           alt: 'Presenti a novara 25 gennaio 2026' },
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
              <div className={styles.caption}>{photo.alt}</div>
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
