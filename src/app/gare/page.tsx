// src/app/gare/page.tsx
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import headerStyles from '../page.module.css'
import styles from './gare.module.css'
import GareClient from './GareClient'
import { catalogoPerAnno } from '@/lib/catalogo'

export const revalidate = 86400

export const metadata: Metadata = {
  title: 'Gare e calendario | Sesia Running Vercelli',
  description: 'Le gare che Sesia Running corre ogni anno e il calendario previsto per la prossima stagione.',
  // Pagina in revisione: raggiungibile da link diretto, fuori dal menu e dai motori di ricerca.
  robots: { index: false, follow: false },
}

// La stagione sociale parte il 1° novembre: da ottobre in poi si programma già l'anno successivo.
function annoCalendario() {
  const oggi = new Date()
  return oggi.getMonth() >= 9 ? oggi.getFullYear() + 1 : oggi.getFullYear()
}

export default function GarePage() {
  const anno = annoCalendario()
  const catalogo = catalogoPerAnno(anno)
  const oggi = new Date().toISOString().slice(0, 10)

  return (
    <div className={headerStyles.wrapper}>
      <header className={headerStyles.header}>
        <div className={headerStyles.headerLogo}>
          <Image src="/logo.png" alt="Sesia Running Vercelli" width={52} height={52} className={headerStyles.logoImg} />
          <div>
            <div className={headerStyles.headerTitle}>Sesia Running Vercelli</div>
            <div className={headerStyles.headerSub}>Gare e calendario</div>
          </div>
        </div>
        <nav className={headerStyles.nav}>
          <Link href="/" className={headerStyles.navLink}>Home</Link>
          <Link href="/classifica" className={headerStyles.navLink}>Classifica</Link>
          <Link href="/circuito" className={headerStyles.navLink}>Circuito</Link>
          <Link href="/regole" className={headerStyles.navLink}>Regole</Link>
          <Link href="/statuto" className={headerStyles.navLink}>Statuto</Link>
          <Link href="/gallery" className={headerStyles.navLink}>Galleria</Link>
          <Link href="/admin" className={headerStyles.navLink}>Admin</Link>
        </nav>
      </header>

      <div className={styles.hero}>
        <span className={styles.heroBadge}>PREVISIONE {anno}</span>
        <h1 className={styles.heroTitle}>Le nostre gare, anno dopo anno</h1>
        <p className={styles.heroSub}>
          {catalogo.length} appuntamenti che la società corre, organizza o frequenta.
          Per ognuno la data probabile del {anno}, calcolata da come si è svolto negli anni passati.
        </p>
      </div>

      <GareClient catalogo={catalogo} anno={anno} oggi={oggi} />
    </div>
  )
}
