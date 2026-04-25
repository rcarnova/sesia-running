// src/app/classifica/page.tsx
'use client'

import { useEffect, useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Classifica, Atleta } from '@/lib/types'
import styles from '../page.module.css'

type SortKey = 'punti' | 'gare' | 'ritrovi' | 'nome'

const PAGE_SIZE = 25

export default function ClassificaPage() {
  const [data, setData] = useState<Classifica | null>(null)
  const [search, setSearch] = useState('')
  const [sortKey, setSortKey] = useState<SortKey>('punti')
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetch('/api/classifica')
      .then((r) => r.json())
      .then(setData)
  }, [])

  const sorted = useMemo<Atleta[]>(() => {
    if (!data) return []
    let list = data.atleti.filter((a) =>
      a.nome.toLowerCase().includes(search.toLowerCase())
    )
    if (sortKey === 'punti') list = [...list].sort((a, b) => b.punti - a.punti)
    else if (sortKey === 'gare') list = [...list].sort((a, b) => b.gare - a.gare)
    else if (sortKey === 'ritrovi') list = [...list].sort((a, b) => b.ritrovi - a.ritrovi)
    else list = [...list].sort((a, b) => a.nome.localeCompare(b.nome))
    return list
  }, [data, search, sortKey])

  const totalPages = Math.ceil(sorted.length / PAGE_SIZE)
  const slice = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const rankMap = useMemo(() => {
    if (!data) return new Map<string, number>()
    const byPts = [...data.atleti].sort((a, b) => b.punti - a.punti)
    return new Map(byPts.map((a, i) => [a.nome, i + 1]))
  }, [data])

  const stats = useMemo(() => {
    if (!data) return null
    return {
      atleti: data.atleti.length,
      gare: data.atleti.reduce((s, a) => s + a.gare, 0),
      ritrovi: data.atleti.reduce((s, a) => s + a.ritrovi, 0),
      gratuiti: data.atleti.filter((a) => a.punti >= 60).length,
    }
  }, [data])

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.headerLogo}>
          <Image src="/logo.png" alt="Sesia Running Vercelli" width={52} height={52} className={styles.logoImg} />
          <div>
            <div className={styles.headerTitle}>Sesia Running Vercelli</div>
            <div className={styles.headerSub}>Stagione {data?.stagione ?? ''}</div>
          </div>
        </div>
        <nav className={styles.nav}>
          <Link href="/" className={styles.navLink}>Home</Link>
          <Link href="/classifica" className={`${styles.navLink} ${styles.navActive}`}>Classifica</Link>
          <Link href="/regole" className={styles.navLink}>Regole</Link>
          <Link href="/statuto" className={styles.navLink}>Statuto</Link>
          <Link href="/admin" className={styles.navLink}>Admin</Link>
        </nav>
      </header>

      {stats && (
        <div className={styles.statsBar}>
          <div className={styles.statCell}>
            <div className={styles.statNum}>{stats.atleti}</div>
            <div className={styles.statLabel}>Atleti</div>
          </div>
          <div className={styles.statCell}>
            <div className={styles.statNum}>{stats.gare}</div>
            <div className={styles.statLabel}>Gare totali</div>
          </div>
          <div className={styles.statCell}>
            <div className={`${styles.statNum} ${styles.statGold}`}>{stats.gratuiti}</div>
            <div className={styles.statLabel}>Tesser. gratuiti</div>
          </div>
        </div>
      )}

      <div className={styles.toolbar}>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Cerca atleta…"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1) }}
        />
        <select
          className={styles.sortSelect}
          value={sortKey}
          onChange={(e) => { setSortKey(e.target.value as SortKey); setPage(1) }}
        >
          <option value="punti">Per punti</option>
          <option value="gare">Per gare</option>
          <option value="ritrovi">Per ritrovi</option>
          <option value="nome">Per nome</option>
        </select>
        {data && (
          <div className={styles.updateBadge}>Aggiornato {data.aggiornatoIl}</div>
        )}
      </div>

      <div className={styles.tableWrap}>
        {!data ? (
          <div className={styles.loading}>Caricamento…</div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.thRank}>#</th>
                <th>Atleta</th>
                <th className={styles.thCenter}>Punti</th>
                <th className={styles.thCenter}>Gare</th>
                <th className={styles.thCenter}>Ritrovi</th>
                <th className={styles.thBar}>Verso 60 Pt</th>
              </tr>
            </thead>
            <tbody>
              {slice.map((atleta) => {
                const rank = rankMap.get(atleta.nome) ?? 0
                const pct = Math.min(100, Math.round((atleta.punti / 60) * 100))
                return (
                  <tr key={atleta.nome} className={styles.row}>
                    <td className={styles.tdRank}>
                      <RankBadge rank={rank} />
                    </td>
                    <td className={styles.tdName}>
                      {atleta.nome}
                      {atleta.punti >= 60 && (
                        <span className={styles.freeBadge}>gratuito</span>
                      )}
                    </td>
                    <td className={styles.tdPts}>{atleta.punti}</td>
                    <td className={styles.tdNum}>{atleta.gare}</td>
                    <td className={styles.tdNum}>{atleta.ritrovi}</td>
                    <td className={styles.tdBar}>
                      <div className={styles.barWrap}>
                        <div
                          className={styles.barFill}
                          style={{ width: `${pct}%` }}
                          data-full={atleta.punti >= 60 ? 'true' : undefined}
                        />
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>

      {totalPages > 1 && (
        <div className={styles.paginator}>
          <button
            className={styles.pageBtn}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            ←
          </button>
          <span className={styles.pageInfo}>{page} / {totalPages}</span>
          <button
            className={styles.pageBtn}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            →
          </button>
        </div>
      )}
    </div>
  )
}

function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) return <span className={`${styles.badge} ${styles.badge1}`}>1</span>
  if (rank === 2) return <span className={`${styles.badge} ${styles.badge2}`}>2</span>
  if (rank === 3) return <span className={`${styles.badge} ${styles.badge3}`}>3</span>
  return <span className={`${styles.badge} ${styles.badgeN}`}>{rank}</span>
}
