// src/app/admin/page.tsx
'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import headerStyles from '../page.module.css'
import styles from './admin.module.css'

const ADMIN_SECRET = process.env.NEXT_PUBLIC_ADMIN_SECRET ?? ''

type UploadState = 'idle' | 'loading' | 'success' | 'error'

export default function AdminPage() {
  const [dragOver, setDragOver] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [state, setState] = useState<UploadState>('idle')
  const [result, setResult] = useState<{ atletiImportati?: number; aggiornatoIl?: string; error?: string } | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  function handleFileSelect(f: File) {
    setFile(f)
    setState('idle')
    setResult(null)
  }

  async function handleUpload() {
    if (!file) return
    setState('loading')
    const fd = new FormData()
    fd.append('file', file)
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'x-admin-secret': ADMIN_SECRET },
        body: fd,
      })
      const json = await res.json()
      if (res.ok) {
        setState('success')
        setResult(json)
      } else {
        setState('error')
        setResult(json)
      }
    } catch {
      setState('error')
      setResult({ error: 'Errore di rete' })
    }
  }

  return (
    <div className={headerStyles.wrapper}>
      <header className={headerStyles.header}>
        <div className={headerStyles.headerLogo}>
          <div className={headerStyles.logoBadge}>SR</div>
          <div>
            <div className={headerStyles.headerTitle}>Sesia Running Vercelli</div>
            <div className={headerStyles.headerSub}>Pannello Admin</div>
          </div>
        </div>
        <nav className={headerStyles.nav}>
          <Link href="/" className={headerStyles.navLink}>Classifica</Link>
          <Link href="/regole" className={headerStyles.navLink}>Regole</Link>
          <Link href="/admin" className={`${headerStyles.navLink} ${headerStyles.navActive}`}>Admin</Link>
        </nav>
      </header>

      <div className={styles.content}>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Carica nuova classifica</h2>
          <p className={styles.hint}>
            Il file Excel deve avere le colonne: <code>Nome</code>, <code>Punti</code>, <code>Numero Gare</code>, <code>Numero Ritrovi</code>
          </p>

          <div
            className={`${styles.dropZone} ${dragOver ? styles.dragOver : ''}`}
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault()
              setDragOver(false)
              const f = e.dataTransfer.files[0]
              if (f) handleFileSelect(f)
            }}
          >
            <div className={styles.dropIcon}>↑</div>
            <div className={styles.dropText}>
              {file ? file.name : 'Trascina il file .xlsx qui, oppure clicca per selezionarlo'}
            </div>
            {file && <div className={styles.dropSub}>{(file.size / 1024).toFixed(1)} KB</div>}
          </div>

          <input
            ref={inputRef}
            type="file"
            accept=".xlsx,.xls,.csv"
            style={{ display: 'none' }}
            onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFileSelect(f) }}
          />

          {state === 'success' && result && (
            <div className={styles.alertSuccess}>
              ✓ Classifica pubblicata — {result.atletiImportati} atleti importati ({result.aggiornatoIl})
            </div>
          )}
          {state === 'error' && result && (
            <div className={styles.alertError}>✗ {result.error}</div>
          )}

          <div className={styles.actions}>
            <button
              className={styles.btnPrimary}
              onClick={handleUpload}
              disabled={!file || state === 'loading'}
            >
              {state === 'loading' ? 'Pubblicazione…' : 'Pubblica classifica'}
            </button>
            <a
              href="/template_classifica.xlsx"
              className={styles.btnSecondary}
              download
            >
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
            <li>La classifica viene salvata in <code>data/classifica.json</code> nel repository.</li>
            <li>Per produzione con persistenza permanente: connettere Supabase e aggiornare <code>src/lib/store.ts</code>.</li>
            <li>L&apos;accesso admin è protetto dalla variabile d&apos;ambiente <code>ADMIN_SECRET</code> da impostare su Vercel.</li>
            <li>Gare FIDAL non sono conteggiate secondo il regolamento UISP.</li>
          </ul>
        </section>

      </div>
    </div>
  )
}
