'use client'
// src/app/gare/GareClient.tsx

import { useMemo, useState } from 'react'
import type { GaraPrevista, Affidabilita } from '@/lib/catalogo'
import { formattaData, nomeMese } from '@/lib/ricorrenza'
import styles from './gare.module.css'

type Vista = 'calendario' | 'archivio'
type Filtro = 'tutte' | 'nostre' | 'ritrovi' | 'strada' | 'trail' | 'camminata' | 'sera'

const FILTRI: { id: Filtro; label: string }[] = [
  { id: 'tutte', label: 'Tutte' },
  { id: 'nostre', label: 'Organizzate da noi' },
  { id: 'ritrovi', label: 'Ritrovi societari' },
  { id: 'strada', label: 'Strada' },
  { id: 'trail', label: 'Trail' },
  { id: 'camminata', label: 'Camminate' },
  { id: 'sera', label: 'In notturna' },
]

const AFF_LABEL: Record<Affidabilita, string> = {
  alta: 'Data affidabile',
  media: 'Probabile, da confermare',
  bassa: 'Stima su una sola edizione',
  nessuna: 'Data non prevedibile',
}

const RUOLO: Record<GaraPrevista['sesia'], string | null> = {
  organizza: 'Organizza Sesia',
  collabora: 'Con Sesia',
  ritrovo: 'Ritrovo societario',
  partecipa: null,
}

function passa(g: GaraPrevista, f: Filtro) {
  switch (f) {
    case 'tutte': return true
    case 'nostre': return g.sesia === 'organizza' || g.sesia === 'collabora'
    case 'ritrovi': return g.sesia !== 'partecipa'
    case 'sera': return g.momento === 'sera'
    default: return g.tipo === f
  }
}

function Badges({ g }: { g: GaraPrevista }) {
  const ruolo = RUOLO[g.sesia]
  return (
    <span className={styles.badges}>
      {g.circuito === 'CSR' && <span className={`${styles.badge} ${styles.badgeCsr}`}>Circuito Sesia</span>}
      {ruolo && <span className={`${styles.badge} ${styles.badgeRuolo}`}>{ruolo}</span>}
      {g.benefica && <span className={`${styles.badge} ${styles.badgeBenefica}`}>Benefica</span>}
      <span className={styles.badge}>{g.tipo}</span>
    </span>
  )
}

export default function GareClient({ catalogo, anno, oggi }: { catalogo: GaraPrevista[]; anno: number; oggi: string }) {
  const [vista, setVista] = useState<Vista>('calendario')
  const [filtro, setFiltro] = useState<Filtro>('tutte')
  const [aperta, setAperta] = useState<string | null>(null)

  const filtrate = useMemo(() => catalogo.filter((g) => passa(g, filtro)), [catalogo, filtro])

  const perMese = useMemo(() => {
    const m = new Map<number, GaraPrevista[]>()
    filtrate
      .filter((g) => g.previsione)
      .sort((a, b) => a.previsione!.localeCompare(b.previsione!))
      .forEach((g) => {
        const k = Number(g.previsione!.slice(5, 7))
        m.set(k, [...(m.get(k) ?? []), g])
      })
    return Array.from(m.entries())
  }, [filtrate])

  const variabili = filtrate.filter((g) => !g.previsione)
  const archivio = [...filtrate].sort((a, b) => a.nome.localeCompare(b.nome, 'it'))

  return (
    <div className={styles.content}>
      <div className={styles.tabs} role="tablist">
        <button role="tab" aria-selected={vista === 'calendario'} className={`${styles.tab} ${vista === 'calendario' ? styles.tabOn : ''}`} onClick={() => setVista('calendario')}>
          Calendario {anno}
        </button>
        <button role="tab" aria-selected={vista === 'archivio'} className={`${styles.tab} ${vista === 'archivio' ? styles.tabOn : ''}`} onClick={() => setVista('archivio')}>
          Archivio gare
        </button>
      </div>

      <div className={styles.filtri}>
        {FILTRI.map((f) => (
          <button key={f.id} className={`${styles.chip} ${filtro === f.id ? styles.chipOn : ''}`} onClick={() => setFiltro(f.id)}>
            {f.label}
          </button>
        ))}
      </div>

      {vista === 'calendario' && (
        <>
          <div className={styles.legenda}>
            {(['alta', 'media', 'bassa'] as Affidabilita[]).map((a) => (
              <span key={a} className={styles.legendaItem}><span className={`${styles.dot} ${styles['dot_' + a]}`} />{AFF_LABEL[a]}</span>
            ))}
          </div>

          {perMese.length === 0 && <p className={styles.vuoto}>Nessuna gara per questo filtro.</p>}

          {perMese.map(([mese, lista]) => (
            <section key={mese} className={styles.mese}>
              <h2 className={styles.meseTitolo}>{nomeMese(mese)}</h2>
              <ul className={styles.lista}>
                {lista.map((g) => {
                  const d = new Date(g.previsione! + 'T00:00:00Z')
                  const passata = g.previsione! < oggi
                  return (
                    <li key={g.id} className={`${styles.riga} ${passata ? styles.passata : ''}`}>
                      <div className={styles.data}>
                        <span className={styles.dataGiorno}>{d.getUTCDate()}</span>
                        <span className={styles.dataDow}>{formattaData(g.previsione!, false).slice(0, 3)}</span>
                      </div>
                      <div className={styles.corpo}>
                        <div className={styles.nomeRiga}>
                          <span className={styles.nome}>{g.nome}</span>
                          <Badges g={g} />
                        </div>
                        <div className={styles.meta}>📍 {g.luogo} · {g.distanze.join(' · ')}</div>
                        <div className={styles.regola}>
                          <span className={`${styles.dot} ${styles['dot_' + g.affidabilitaCalcolata]}`} title={AFF_LABEL[g.affidabilitaCalcolata]} />
                          {g.regolaTesto}
                          {g.edizioni.length > 0 && <span className={styles.storico}>{' · '}ultima edizione {formattaData(g.ultimaEdizione)}</span>}
                        </div>
                        {g.avvisi.map((a) => <div key={a} className={styles.avviso}>⚠ {a}</div>)}
                        {g.nota && <div className={styles.nota}>{g.nota}</div>}
                      </div>
                    </li>
                  )
                })}
              </ul>
            </section>
          ))}

          {variabili.length > 0 && (
            <section className={styles.mese}>
              <h2 className={styles.meseTitolo}>Date da verificare</h2>
              <ul className={styles.lista}>
                {variabili.map((g) => (
                  <li key={g.id} className={styles.riga}>
                    <div className={styles.data}><span className={styles.dataGiorno}>?</span></div>
                    <div className={styles.corpo}>
                      <div className={styles.nomeRiga}><span className={styles.nome}>{g.nome}</span><Badges g={g} /></div>
                      <div className={styles.meta}>📍 {g.luogo} · ultime edizioni: {g.edizioni.map((e) => formattaData(e.data)).join(', ')}</div>
                      {g.nota && <div className={styles.nota}>{g.nota}</div>}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </>
      )}

      {vista === 'archivio' && (
        <div className={styles.archivio}>
          {archivio.map((g) => {
            const open = aperta === g.id
            return (
              <article key={g.id} className={styles.scheda}>
                <button className={styles.schedaHead} onClick={() => setAperta(open ? null : g.id)} aria-expanded={open}>
                  <span>
                    <span className={styles.nome}>{g.nome}</span>
                    <span className={styles.metaInline}>{g.luogo} · {g.edizioni.length} {g.edizioni.length === 1 ? 'edizione' : 'edizioni'} in archivio</span>
                  </span>
                  <span className={styles.chev}>{open ? '▴' : '▾'}</span>
                </button>
                {open && (
                  <div className={styles.schedaBody}>
                    <Badges g={g} />
                    <dl className={styles.dl}>
                      {g.organizzatore && (<><dt>Organizza</dt><dd>{g.organizzatore}</dd></>)}
                      <dt>Distanze</dt><dd>{g.distanze.join(' · ')}</dd>
                      <dt>Quando</dt><dd>{g.regolaTesto}, {g.momento}</dd>
                      {g.previsione && (<><dt>Nel {anno}</dt><dd>{formattaData(g.previsione)} <span className={styles.storico}>({AFF_LABEL[g.affidabilitaCalcolata].toLowerCase()})</span></dd></>)}
                    </dl>
                    <ol className={styles.edizioni}>
                      {[...g.edizioni].sort((a, b) => b.data.localeCompare(a.data)).map((e) => (
                        <li key={e.data}>
                          <strong>{formattaData(e.data)}</strong>{e.numero ? ` · ${e.numero}ª edizione` : ''}
                          {e.nota && <span className={styles.storico}> · {e.nota}</span>}
                        </li>
                      ))}
                    </ol>
                    {g.nota && <p className={styles.nota}>{g.nota}</p>}
                  </div>
                )}
              </article>
            )
          })}
        </div>
      )}

      <p className={styles.disclaimer}>
        Le date {anno} sono stime ricavate dalle edizioni passate: fa sempre fede il volantino ufficiale.
        Conosci una gara che manca o una data già confermata? Scrivi a{' '}
        <a href="mailto:asdsesiarunning@libero.it">asdsesiarunning@libero.it</a>.
      </p>
    </div>
  )
}
