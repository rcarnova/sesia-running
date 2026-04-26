// src/app/gallery/page.tsx
import fs from 'fs'
import path from 'path'
import Image from 'next/image'
import Link from 'next/link'
import headerStyles from '../page.module.css'
import styles from './gallery.module.css'
import GalleryClient from './GalleryClient'

function getGalleryPhotos() {
  const dir = path.join(process.cwd(), 'public', 'gallery')
  const files = fs.readdirSync(dir)
  return files
    .filter((f) => /\.(jpg|jpeg|png|webp|heic)$/i.test(f))
    .map((filename) => {
      const name = filename.replace(/\.[^.]+$/, '')
      const alt = name.charAt(0).toUpperCase() + name.slice(1).replace(/[_-]/g, ' ')
      return {
        src: `/gallery/${encodeURIComponent(filename)}`,
        alt,
      }
    })
    .sort((a, b) => b.src.localeCompare(a.src))
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
