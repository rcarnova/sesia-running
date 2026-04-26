// src/app/admin/page.tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import headerStyles from '../page.module.css'
import styles from './admin.module.css'

const ADMIN_SECRET = process.env.NEXT_PUBLIC_ADMIN_SECRET ?? ''

type RevalState = 'idle' | 'loading' | 'success' | 'error'

export default function AdminPage() {
  const [revalState, setRevalState] = useState<RevalState>('idle')

  async function handleRevalidate() {
    setRevalState('loading')
    try {
      const res = await fetch('/api/revalidate', {
        method: 'POST',
        headers: { 'x-admin-secret': ADMIN_SECRET },
      })
      setRevalState(res.ok ? 'success' : 'error')
    } catch {
      setRevalState('error')
    }
  }

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

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Aggiornamento classifica</h2>
          <div className={styles.driveInfo}>
            <p>La classifica viene caricata automaticamente da Google Drive.</p>
            <p>
              Per aggiornare: modifica il file Excel su Google Drive e attendi massimo 1 ora,
              oppure forza il refresh qui sotto.
            </p>
          </div>

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
              {revalState === 'loading' ? 'Aggiornamento…' : 'Forza aggiornamento'}
            </button>
            <a href="/template_classifica.xlsx" className={styles.btnSecondary} download>
              Scarica template .xlsx
            </a>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Storico aggiornamenti</h2>
          <table className={styles.historyTable}>
            <tbody>
              <tr>
                <td>01/03/2026</td>
                <td>Classifica_Sesia_Running_01_03_26.xlsx</td>
                <td className={styles.statusOk}>Pubblicata</td>
              </tr>
              <tr>
                <td>15/01/2026</td>
                <td>Classifica_Sesia_Running_15_01_26.xlsx</td>
                <td className={styles.statusOk}>Pubblicata</td>
              </tr>
              <tr>
                <td>10/11/2025</td>
                <td>Classifica_Sesia_Running_10_11_25.xlsx</td>
                <td className={styles.statusOk}>Pubblicata</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Note tecniche</h2>
          <ul className={styles.noteList}>
            <li>La classifica viene letta dal file Excel su Google Drive ogni ora (cache TTL 3600s).</li>
            <li>Il file deve avere le colonne: <code>Nome</code>, <code>Punti</code>, <code>Numero Gare</code>, <code>Numero Ritrovi</code>.</li>
            <li>L&apos;accesso admin è protetto dalla variabile d&apos;ambiente <code>ADMIN_SECRET</code> da impostare su Vercel.</li>
            <li>L&apos;ID del file Google Drive si imposta nella variabile <code>GOOGLE_DRIVE_FILE_ID</code> su Vercel.</li>
          </ul>
        </section>

      </div>
    </div>
  )
}
