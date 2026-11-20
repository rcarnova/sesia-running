// src/lib/store.ts
import { Classifica } from './types'
import * as XLSX from 'xlsx'
import { STAGIONE, GID_PER_STAGIONE } from './stagione'

// Fallback quando il foglio non è raggiungibile o il tab della stagione non esiste ancora:
// classifica vuota, così non si mostrano mai i punti di una stagione con l'etichetta di un'altra.
const VUOTA: Classifica = {
  aggiornatoIl: '',
  stagione: STAGIONE,
  atleti: [],
  inPartenza: true,
}

export async function fetchClassificaFromDrive(): Promise<Classifica> {
  const fileId = process.env.GOOGLE_DRIVE_FILE_ID
  const gid = GID_PER_STAGIONE[STAGIONE]
  if (!fileId || !gid) return VUOTA

  try {
    // Il formato xlsx esporta l'intero file (e il parser leggerebbe sempre il primo tab):
    // il csv esporta solo il tab indicato dal gid, cioè la stagione giusta.
    const url = `https://docs.google.com/spreadsheets/d/${fileId}/export?format=csv&gid=${gid}`
    const res = await fetch(url, { next: { revalidate: 3600 } })

    if (!res.ok) throw new Error(`Drive responded ${res.status}`)

    const csv = await res.text()
    const wb = XLSX.read(csv, { type: 'string', raw: false })
    const ws = wb.Sheets[wb.SheetNames[0]]
    const rows = XLSX.utils.sheet_to_json(ws, { defval: 0 }) as Record<string, unknown>[]

    const atleti = rows
      .map((row) => ({
        nome: String(row['Nome'] ?? row['nome'] ?? row['Nome Classifica'] ?? '').trim(),
        punti: Number(row['Punti'] ?? row['PUNTI'] ?? 0),
        gare: Number(row['Numero Gare'] ?? row['Gare'] ?? row['NUMERO GARE'] ?? 0),
        ritrovi: Number(row['Numero Ritrovi'] ?? row['Ritrovi'] ?? row['NUMERO RITROVI'] ?? 0),
        allenamenti: Number(row['Numero Allenamenti'] ?? row['Allenamenti'] ?? row['NUMERO ALLENAMENTI'] ?? 0),
      }))
      .filter((a) => a.nome.length > 0)

    atleti.sort((a, b) => b.punti - a.punti)

    // Tab appena creato: ci sono solo i nomi, nessun punto ancora assegnato.
    if (atleti.every((a) => a.punti === 0)) return VUOTA

    const conAllenamenti = rows.some((r) =>
      ['Numero Allenamenti', 'Allenamenti', 'NUMERO ALLENAMENTI'].some((k) => k in r))

    const aggiornatoIl = new Date().toLocaleDateString('it-IT', {
      day: '2-digit', month: '2-digit', year: 'numeric',
    })

    return { atleti, aggiornatoIl, stagione: STAGIONE, conAllenamenti }
  } catch (err) {
    console.error('Drive fetch failed, using default data:', err)
    return { ...VUOTA, inPartenza: false, nonDisponibile: true }
  }
}
