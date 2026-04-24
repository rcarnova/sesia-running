// src/app/api/upload/route.ts
// Riceve un file Excel, lo parsa con xlsx, salva la classifica aggiornata.
// Protezione minimale con ADMIN_SECRET env var — da rafforzare in produzione.

import { NextRequest, NextResponse } from 'next/server'
import * as XLSX from 'xlsx'
import { writeClassifica } from '@/lib/store'
import { Atleta } from '@/lib/types'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  // Autenticazione semplice via header
  const secret = req.headers.get('x-admin-secret')
  if (secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 })
  }

  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null
    if (!file) {
      return NextResponse.json({ error: 'Nessun file ricevuto' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const wb = XLSX.read(buffer, { type: 'buffer' })
    const ws = wb.Sheets[wb.SheetNames[0]]
    const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(ws, { defval: 0 })

    // Normalizzazione colonne — gestisce varianti italiane/inglesi
    const atleti: Atleta[] = rows.map((row) => {
      const nome =
        (row['Nome'] as string) ||
        (row['nome'] as string) ||
        (row['Nome Classifica'] as string) ||
        ''
      const punti = Number(row['Punti'] ?? row['punti'] ?? row['PUNTI'] ?? 0)
      const gare = Number(
        row['Numero Gare'] ?? row['gare'] ?? row['NUMERO GARE'] ?? row['Gare'] ?? 0
      )
      const ritrovi = Number(
        row['Numero Ritrovi'] ??
          row['ritrovi'] ??
          row['NUMERO RITROVI'] ??
          row['Ritrovi'] ??
          0
      )
      return { nome: String(nome).trim(), punti, gare, ritrovi }
    }).filter((a) => a.nome.length > 0)

    atleti.sort((a, b) => b.punti - a.punti)

    const oggi = new Date()
    const aggiornatoIl = oggi.toLocaleDateString('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })

    writeClassifica({ atleti, aggiornatoIl, stagione: '2024-25' })

    return NextResponse.json({
      ok: true,
      atletiImportati: atleti.length,
      aggiornatoIl,
    })
  } catch (err) {
    console.error('Upload error:', err)
    return NextResponse.json({ error: 'Errore nel parsing del file' }, { status: 500 })
  }
}
