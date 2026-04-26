// src/lib/store.ts
import { Classifica } from './types'
import * as XLSX from 'xlsx'

export async function fetchClassificaFromDrive(): Promise<Classifica> {
  const fileId = process.env.GOOGLE_DRIVE_FILE_ID
  if (!fileId) throw new Error('GOOGLE_DRIVE_FILE_ID not set')

  const url = `https://drive.google.com/uc?export=download&id=${fileId}`
  const res = await fetch(url, { next: { revalidate: 3600 } })

  if (!res.ok) throw new Error('Failed to fetch from Google Drive')

  const buffer = Buffer.from(await res.arrayBuffer())
  const wb = XLSX.read(buffer, { type: 'buffer' })
  const ws = wb.Sheets[wb.SheetNames[0]]
  const rows = XLSX.utils.sheet_to_json(ws, { defval: 0 }) as Record<string, unknown>[]

  const atleti = rows
    .map((row) => ({
      nome: String(row['Nome'] ?? row['nome'] ?? row['Nome Classifica'] ?? '').trim(),
      punti: Number(row['Punti'] ?? row['PUNTI'] ?? 0),
      gare: Number(row['Numero Gare'] ?? row['Gare'] ?? row['NUMERO GARE'] ?? 0),
      ritrovi: Number(row['Numero Ritrovi'] ?? row['Ritrovi'] ?? row['NUMERO RITROVI'] ?? 0),
    }))
    .filter((a) => a.nome.length > 0)

  atleti.sort((a, b) => b.punti - a.punti)

  const oggi = new Date()
  const aggiornatoIl = oggi.toLocaleDateString('it-IT', {
    day: '2-digit', month: '2-digit', year: 'numeric',
  })

  return { atleti, aggiornatoIl, stagione: '2025-26' }
}
