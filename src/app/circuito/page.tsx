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

function getToday() {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  return d
}

function daysUntil(isoDate: string) {
  const target = new Date(isoDate)
  target.setHours(0, 0, 0, 0)
  return Math.ceil((target.getTime() - getToday().getTime()) / 86400000)
}

type Status = 'past' | 'next' | 'future'

function computeStatuses(): Status[] {
  const today = getToday()
  let nextFound = false
  return tappe.map((t) => {
    const d = new Date(t.data)
    d.setHours(0, 0, 0, 0)
    if (d < today) return 'past'
    if (!nextFound) { nextFound = true; return 'next' }
    return 'future'
  })
}

export default function CircuitoPage() {
  const [regolaOpen, setRegolaOpen] = useState(false)
  const statuses = computeStatuses()
  const nextIdx = statuses.indexOf('next')
  const nextTappa = nextIdx >= 0 ? tappe[nextIdx] : null

  return (
    <div className={headerStyles.wrapper}>
      <header className={headerStyles.header}>
        <div className={headerStyles.headerLogo}>
          <Image src="/logo.png" alt="Sesia Running Vercelli" width={52} height={52} className={headerStyles.logoImg} />
          <div>
            <div className={headerStyles.headerTitle}>Sesia Running Vercelli</div>
            <div className={headerStyles.headerSub}>Circuito 2026</div>
          </div>
        </div>
        <nav className={headerStyles.nav}>
          <Link href="/"          className={headerStyles.navLink}>Home</Link>
          <Link href="/classifica" className={headerStyles.navLink}>Classifica</Link>
          <Link href="/circuito"  className={`${headerStyles.navLink} ${headerStyles.navActive}`}>Circuito</Link>
          <Link href="/regole"    className={headerStyles.navLink}>Regole</Link>
          <Link href="/statuto"   className={headerStyles.navLink}>Statuto</Link>
          <Link href="/gallery"   className={headerStyles.navLink}>Galleria</Link>
          <Link href="/admin"     className={headerStyles.navLink}>Admin</Link>
        </nav>
      </header>

      {/* HERO */}
      <div className={styles.hero}>
        <span className={styles.heroBadge}>CSR26</span>
        <h1 className={styles.heroTitle}>2° CIRCUITO SESIA RUNNING 2026</h1>
        <p className={styles.heroSub}>7 tappe nella Provincia di Vercelli · Marzo — Settembre 2026</p>
      </div>

      <div className={styles.content}>

        {/* PROSSIMA TAPPA */}
        {nextTappa && (
          <div className={styles.nextBox}>
            <div className={styles.nextLabel}>PROSSIMA TAPPA</div>
            <div className={styles.nextName}>{nextTappa.nome}</div>
            <div className={styles.nextMeta}>
              {nextTappa.dataLabel} · {nextTappa.luogo} · Ritrovo {nextTappa.ritrovo}
            </div>
            <div className={styles.countdown}>
              <span className={styles.countdownNum}>{daysUntil(nextTappa.data)}</span>
              <span className={styles.countdownLabel}>tra {daysUntil(nextTappa.data) === 1 ? 'domani' : `${daysUntil(nextTappa.data)} giorni`}</span>
            </div>
          </div>
        )}

        {/* TIMELINE */}
        <div className={styles.timeline}>
          {tappe.map((tappa, i) => {
            const status = statuses[i]
            return (
              <div key={tappa.numero} className={`${styles.card} ${styles[status]}`}>
                <div className={`${styles.cardNum} ${styles[`num${status.charAt(0).toUpperCase() + status.slice(1)}`]}`}>
                  {tappa.numero}
                </div>
                <div className={styles.cardBody}>
                  <div className={styles.cardHeader}>
                    <span className={styles.tappaNome}>{tappa.nome}</span>
                    <div className={styles.badges}>
                      {tappa.finale && <span className={styles.finaleBadge}>FINALE</span>}
                      <span className={styles.kmBadge}>{tappa.km} km</span>
                    </div>
                  </div>
                  <div className={`${styles.tappaData} ${status === 'past' ? styles.dataStrike : ''}`}>
                    {tappa.dataLabel}
                  </div>
                  <div className={styles.tappaMeta}>
                    📍 {tappa.luogo} &nbsp;·&nbsp; 🕗 Ritrovo {tappa.ritrovo}
                  </div>
                  <ul className={styles.distanze}>
                    {tappa.distanze.map((d) => (
                      <li key={d.tipo} className={styles.distanzaItem}>
                        <span className={styles.distanzaTipo}>{d.tipo}</span>
                        <span className={styles.distanzaPartenza}>Partenza {d.partenza}</span>
                        {d.km && <span className={styles.distanzaKm}>{d.km} km</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>

        {/* REGOLAMENTO */}
        <div className={styles.regolamento}>
          <button
            className={styles.regolamentoToggle}
            onClick={() => setRegolaOpen((o) => !o)}
          >
            REGOLAMENTO CSR26 {regolaOpen ? '▴' : '▾'}
          </button>
          {regolaOpen && (
            <div className={styles.regolamentoBody}>
              Il CSR26 si compone di 7 tappe tra marzo e settembre 2026 nella Provincia di Vercelli.
              È possibile partecipare a una o più tappe, scegliendo liberamente tra corsa e camminata.
              Per la classifica finale verranno considerati i 5 punteggi migliori per atleta.
              Premiazioni alla 7ª tappa a Formigliana l&apos;11 settembre 2026.
              <br /><br />
              Per info: <a href="mailto:asdsesiarunning@libero.it" className={styles.regolamentoLink}>asdsesiarunning@libero.it</a>
              &nbsp;·&nbsp;
              <a href="tel:+393206437356" className={styles.regolamentoLink}>320 6437356</a>
            </div>
          )}
        </div>

        {/* FOOTER NOTE */}
        <p className={styles.footerNote}>
          Le manifestazioni si svolgono con qualsiasi condizione meteorologica.
        </p>

      </div>
    </div>
  )
}
