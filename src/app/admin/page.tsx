// src/app/admin/page.tsx
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import headerStyles from '../page.module.css'
import styles from './admin.module.css'
import { Classifica } from '@/lib/types'

const ADMIN_SECRET = process.env.NEXT_PUBLIC_ADMIN_SECRET ?? ''

type RevalState = 'idle' | 'loading' | 'success' | 'error'

export default function AdminPage() {
  const [revalState, setRevalState] = useState<RevalState>('idle')
  const [classifica, setClassifica] = useState<Classifica | null>(null)

  useEffect(() => {
    fetch('/api/classifica')
      .then((r) => r.json())
      .then((json) => { if (json?.atleti) setClassifica(json) })
  }, [])

  async function handleRevalidate() {
    setRevalState('loading')
    try {
      const res = await fetch('/api/revalidate', {
        method: 'POST',
        headers: { 'x-admin-secret': ADMIN_SECRET },
      })
      setRevalState(res.ok ? 'success' : 'error')
      if (res.ok) {
        const updated = await fetch('/api/classifica').then((r) => r.json())
        if (updated?.atleti) setClassifica(updated)
      }
    } catch {
      setRevalState('error')
    }
  }

  const stats = classifica ? {
    gratuiti: classifica.atleti.filter((a) => a.punti >= 60).length,
    mediaPunti: classifica.atleti.length
      ? Math.round(classifica.atleti.reduce((s, a) => s + a.punti, 0) / classifica.atleti.length)
      : 0,
    piuAttivo: classifica.atleti.reduce(
      (best, a) => (a.gare + a.ritrovi > best.gare + best.ritrovi ? a : best),
      classifica.atleti[0]
    ),
  } : null

  return (
    <div className={headerStyles.wrapper}>
      <header className={headerStyles.header}>
        <div className={headerStyles.headerLogo}>
          <Image src="/logo.png" alt="Sesia Running Vercelli" width={52} height={52} className={headerStyles.logoImg} />
          <div>
            <div className={headerStyles.headerTitle}>Sesia Running Vercelli</div>
            <div className={headerStyles.headerSub}>Pannello Admin</div>
          </div>
        </div>
        <nav className={headerStyles.nav}>
          <Link href="/" className={headerStyles.navLink}>Home</Link>
          <Link href="/classifica" className={headerStyles.navLink}>Classifica</Link>
          <Link href="/circuito"   className={headerStyles.navLink}>Circuito</Link>
          <Link href="/regole" className={headerStyles.navLink}>Regole</Link>
          <Link href="/statuto" className={headerStyles.navLink}>Statuto</Link>
          <Link href="/gallery" className={headerStyles.navLink}>Galleria</Link>
          <Link href="/admin" className={`${headerStyles.navLink} ${headerStyles.navActive}`}>Admin</Link>
        </nav>
      </header>

      <div className={styles.content}>

        {stats && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Stats rapide</h2>
            <table className={styles.historyTable}>
              <tbody>
                <tr>
                  <td>Atleti con ≥ 60 punti (tessera gratuita)</td>
                  <td className={styles.statusOk}>{stats.gratuiti}</td>
                </tr>
                <tr>
                  <td>Media punti per atleta</td>
                  <td>{stats.mediaPunti}</td>
                </tr>
                <tr>
                  <td>Atleta più attivo (gare + ritrovi)</td>
                  <td>{stats.piuAttivo?.nome ?? '—'}</td>
                </tr>
              </tbody>
            </table>
          </section>
        )}

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Aggiorna classifica da Google Drive</h2>
          <p className={styles.hint}>Forza il refresh immediato senza aspettare l&apos;ora</p>

          {revalState === 'success' && (
            <div className={styles.alertSuccess}>✓ Classifica aggiornata!</div>
          )}
          {revalState === 'error' && (
            <div className={styles.alertError}>✗ Errore durante l&apos;aggiornamento</div>
          )}

          <div className={styles.actions}>
            <button
              className={styles.btnPrimary}
              onClick={handleRevalidate}
              disabled={revalState === 'loading'}
            >
              {revalState === 'loading' ? 'Aggiornamento…' : 'Aggiorna classifica da Google Drive'}
            </button>
          </div>
        </section>

      </div>
    </div>
  )
}
