// src/app/gallery/page.tsx
import fs from 'fs'
import path from 'path'
import Image from 'next/image'
import Link from 'next/link'
import headerStyles from '../page.module.css'
import styles from './gallery.module.css'
import GalleryClient from './GalleryClient'

function getGalleryPhotos() {
  const galleryDir = path.join(process.cwd(), 'public', 'gallery')
  const photos: { src: string; alt: string }[] = []

  const years = fs.readdirSync(galleryDir)
    .filter(f => /^\d{4}$/.test(f))
    .sort((a, b) => b.localeCompare(a))

  for (const year of years) {
    const yearDir = path.join(galleryDir, year)
    const months = fs.readdirSync(yearDir)
      .filter(f => /^\d{2}$/.test(f))
      .sort((a, b) => b.localeCompare(a))

    for (const month of months) {
      const monthDir = path.join(yearDir, month)
      const files = fs.readdirSync(monthDir)
        .filter(f => /\.(jpg|jpeg|png|webp|heic)$/i.test(f))
        .sort((a, b) => a.localeCompare(b))

      for (const filename of files) {
        photos.push({
          src: `/gallery/${year}/${month}/${encodeURIComponent(filename)}`,
          alt: filename
            .replace(/\.(jpg|jpeg|png|webp|heic)$/i, '')
            .replace(/[-_]/g, ' ')
            .replace(/\b\w/g, c => c.toUpperCase()),
        })
      }
    }
  }

  return photos
}

export default function GalleryPage() {
  const photos = getGalleryPhotos()

  return (
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
          <Link href="/circuito"   className={headerStyles.navLink}>Circuito</Link>
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

      <GalleryClient photos={photos} />
    </div>
  )
}
