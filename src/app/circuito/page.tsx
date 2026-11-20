// src/app/circuito/page.tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import headerStyles from '../page.module.css'
import styles from './circuito.module.css'

type Distanza = {
  tipo: string
  partenza: string
  km?: number
}

type Tappa = {
  numero: number
  nome: string
  data: string
  dataLabel: string
  luogo: string
  ritrovo: string
  distanze: Distanza[]
  km: number
  finale?: boolean
}

const tappe: Tappa[] = [
  {
    numero: 1,
    nome: "Vercelli che Corre",
    data: "2026-03-29",
    dataLabel: "29 Marzo 2026",
    luogo: "Vercelli (VC)",
    ritrovo: "ore 9:00",
    distanze: [
      { tipo: "Corsa competitiva", partenza: "ore 10:30" },
      { tipo: "Non competitiva",   partenza: "ore 10:35" },
      { tipo: "Camminata",         partenza: "ore 10:35" },
    ],
    km: 5.1,
  },
  {
    numero: 2,
    nome: "Rive Run",
    data: "2026-05-24",
    dataLabel: "24 Maggio 2026",
    luogo: "Rive (VC)",
    ritrovo: "ore 8:30",
    distanze: [
      { tipo: "Corsa",     partenza: "ore 10:00", km: 8.5 },
      { tipo: "Camminata", partenza: "ore 10:00", km: 5 },
    ],
    km: 8.5,
  },
  {
    numero: 3,
    nome: "Prarolo Run",
    data: "2026-06-05",
    dataLabel: "5 Giugno 2026",
    luogo: "Prarolo (VC)",
    ritrovo: "ore 18:00",
    distanze: [
      { tipo: "Corsa",     partenza: "ore 20:00" },
      { tipo: "Camminata", partenza: "ore 19:30" },
    ],
    km: 6.5,
  },
  {
    numero: 4,
    nome: "Borgo di Notte",
    data: "2026-07-07",
    dataLabel: "7 Luglio 2026",
    luogo: "Borgovercelli (VC)",
    ritrovo: "ore 18:00",
    distanze: [
      { tipo: "Corsa",     partenza: "ore 20:00" },
      { tipo: "Camminata", partenza: "ore 19:30" },
    ],
    km: 6,
  },
  {
    numero: 5,
    nome: "Strapagiun",
    data: "2026-08-16",
    dataLabel: "16 Agosto 2026",
    luogo: "Stroppiana (VC)",
    ritrovo: "ore 18:00",
    distanze: [
      { tipo: "Corsa",     partenza: "ore 19:30" },
      { tipo: "Camminata", partenza: "ore 19:00" },
    ],
    km: 6,
  },
  {
    numero: 6,
    nome: "Corriparco",
    data: "2026-08-27",
    dataLabel: "27 Agosto 2026",
    luogo: "Albano Vercellese (VC)",
    ritrovo: "ore 18:00",
    distanze: [
      { tipo: "Corsa",     partenza: "ore 19:30" },
      { tipo: "Camminata", partenza: "ore 19:00" },
    ],
    km: 6,
  },
  {
    numero: 7,
    nome: "Lungo le Vie d'Acqua",
    data: "2026-09-11",
    dataLabel: "11 Settembre 2026",
    luogo: "Formigliana (VC)",
    ritrovo: "ore 18:00",
    distanze: [
      { tipo: "Corsa",     partenza: "ore 19:30" },
      { tipo: "Camminata", partenza: "ore 19:00" },
    ],
    km: 6,
    finale: true,
  },
]

export default function CircuitoPage() {
  const [archivioOpen, setArchivioOpen] = useState(false)

  return (
    <div className={headerStyles.wrapper}>
      <header className={headerStyles.header}>
        <div className={headerStyles.headerLogo}>
          <Image src="/logo.png" alt="Sesia Running Vercelli" width={52} height={52} className={headerStyles.logoImg} />
          <div>
            <div className={headerStyles.headerTitle}>Sesia Running Vercelli</div>
            <div className={headerStyles.headerSub}>Circuito 2027</div>
          </div>
        </div>
        <nav className={headerStyles.nav}>
          <Link href="/"          className={headerStyles.navLink}>Home</Link>
          <Link href="/classifica" className={headerStyles.navLink}>Classifica</Link>
          <Link href="/gare" className={headerStyles.navLink}>Gare</Link>
          <Link href="/circuito"  className={`${headerStyles.navLink} ${headerStyles.navActive}`}>Circuito</Link>
          <Link href="/regole"    className={headerStyles.navLink}>Regole</Link>
          <Link href="/societa"    className={headerStyles.navLink}>Società</Link>
          <Link href="/statuto"   className={headerStyles.navLink}>Statuto</Link>
          <Link href="/gallery"   className={headerStyles.navLink}>Galleria</Link>
          <Link href="/admin"     className={headerStyles.navLink}>Admin</Link>
        </nav>
      </header>

      {/* HERO */}
      <div className={styles.hero}>
        <span className={styles.heroBadge}>CSR27</span>
        <h1 className={styles.heroTitle}>3° CIRCUITO SESIA RUNNING</h1>
        <p className={styles.heroSub}>In preparazione · tappe e date in arrivo</p>
      </div>

      <div className={styles.content}>

        {/* CSR27 IN ARRIVO */}
        <div className={styles.nextBox}>
          <div className={styles.nextLabel}>CSR27 IN ARRIVO</div>
          <div className={styles.nextName}>Stiamo preparando il 3° Circuito</div>
          <div className={styles.nextMeta}>
            Tappe, località e date saranno pubblicate qui appena confermate.
            Per restare aggiornato segui i nostri canali o scrivi a{' '}
            <a href="mailto:asdsesiarunning@libero.it" className={styles.regolamentoLink}>asdsesiarunning@libero.it</a>.
          </div>
        </div>

        {/* ARCHIVIO CSR26 */}
        <div className={styles.regolamento}>
          <button
            className={styles.regolamentoToggle}
            onClick={() => setArchivioOpen((o) => !o)}
          >
            RIVEDI IL CSR26 · 7 TAPPE {archivioOpen ? '▴' : '▾'}
          </button>
        </div>

        {archivioOpen && (
          <div className={styles.timeline}>
            {tappe.map((tappa) => (
              <div key={tappa.numero} className={`${styles.card} ${styles.past}`}>
                <div className={`${styles.cardNum} ${styles.numPast}`}>{tappa.numero}</div>
                <div className={styles.cardBody}>
                  <div className={styles.cardHeader}>
                    <span className={styles.tappaNome}>{tappa.nome}</span>
                    <div className={styles.badges}>
                      {tappa.finale && <span className={styles.finaleBadge}>FINALE</span>}
                      <span className={styles.kmBadge}>{tappa.km} km</span>
                    </div>
                  </div>
                  <div className={styles.tappaData}>{tappa.dataLabel}</div>
                  <div className={styles.tappaMeta}>📍 {tappa.luogo}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* FOOTER NOTE */}
        <p className={styles.footerNote}>
          Le manifestazioni si svolgono con qualsiasi condizione meteorologica.
        </p>

      </div>
    </div>
  )
}
