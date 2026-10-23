#!/usr/bin/env node
// scripts/importa-whatsapp.mjs
//
// Importa nella galleria le foto dall'export della chat WhatsApp della società.
// Si lavora in due passaggi, così nessuna foto finisce online senza essere scelta:
//
// 1) PREPARA: legge la chat e crea un foglio CSV con una riga per foto,
//    con data, autore e una didascalia suggerita presa dal messaggio.
//      node scripts/importa-whatsapp.mjs prepara "<cartella export>" --da 2026-09-01 [--a 2026-10-31]
//
// 2) Apri import-galleria.csv (Excel, Numbers, Google Sheets):
//    scrivi "si" nella colonna "tieni" per le foto da pubblicare e correggi la didascalia.
//    La didascalia diventa il nome del file, cioè il testo mostrato nella galleria.
//
// 3) IMPORTA: ridimensiona le foto scelte (lato lungo 1600 px) e le mette in
//    public/gallery/AAAA/MM/ con la didascalia come nome.
//      node scripts/importa-whatsapp.mjs importa "<cartella export>" [import-galleria.csv]

import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const [, , comando, cartella, ...resto] = process.argv
const opz = (nome) => { const i = resto.indexOf(nome); return i >= 0 ? resto[i + 1] : undefined }
const CSV = 'import-galleria.csv'
const LATO = 1600

if (!comando || !cartella || !['prepara', 'importa'].includes(comando)) {
  console.log('Uso:\n  node scripts/importa-whatsapp.mjs prepara "<cartella export>" --da AAAA-MM-GG [--a AAAA-MM-GG]\n  node scripts/importa-whatsapp.mjs importa "<cartella export>" [file.csv]')
  process.exit(1)
}

// ── CSV minimale (separatore ;, campi tra virgolette) ──
const q = (s) => `"${String(s ?? '').replace(/"/g, '""')}"`
function leggiCsv(testo) {
  const sep = testo.split(/\r?\n/)[0].includes(';') ? ';' : ','  // Excel italiano usa ;, Google Sheets ,
  const righe = []
  let campo = '', riga = [], virg = false
  for (let i = 0; i < testo.length; i++) {
    const c = testo[i]
    if (virg) {
      if (c === '"' && testo[i + 1] === '"') { campo += '"'; i++ }
      else if (c === '"') virg = false
      else campo += c
    } else if (c === '"') virg = true
    else if (c === sep) { riga.push(campo); campo = '' }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && testo[i + 1] === '\n') i++
      riga.push(campo); campo = ''
      if (riga.some((x) => x !== '')) righe.push(riga)
      riga = []
    } else campo += c
  }
  riga.push(campo); if (riga.some((x) => x !== '')) righe.push(riga)
  const [intest, ...dati] = righe
  return dati.map((r) => Object.fromEntries(intest.map((h, i) => [h.trim(), (r[i] ?? '').trim()])))
}

// ── Lettura della chat ──
function leggiChat(dir) {
  const testo = fs.readFileSync(path.join(dir, '_chat.txt'), 'utf8')
  const re = /^‎?\[(\d\d)\/(\d\d)\/(\d\d), ([\d:]+)\] ([^:]+): ([\s\S]*?)(?=^‎?\[\d\d\/\d\d\/\d\d, |(?![\s\S]))/gm
  const msg = []
  for (const m of testo.matchAll(re)) {
    msg.push({ data: `20${m[3]}-${m[2]}-${m[1]}`, ora: m[4], autore: m[5].replace(/^[~\s ]+/, '').trim(), testo: m[6] })
  }
  return msg
}

const pulisci = (t) => t
  .replace(/‎?<allegato:[^>]+>/g, '')
  .replace(/@⁨[^⁩]*⁩/g, '')
  .replace(/[‎⁨⁩]/g, '')
  .replace(/\s+/g, ' ').trim()

function prepara() {
  const da = opz('--da') ?? '0000-00-00', a = opz('--a') ?? '9999-12-31'
  const msg = leggiChat(cartella)
  const righe = []
  msg.forEach((m, i) => {
    for (const f of m.testo.matchAll(/<allegato: ([^>]+-PHOTO-[^>]+\.(?:jpe?g|png|webp))>/gi)) {
      if (m.data < da || m.data > a) continue
      let didascalia = pulisci(m.testo)
      // Se la foto non ha testo, cerca un messaggio vicino dello stesso autore.
      for (const j of [i + 1, i - 1, i + 2]) {
        if (didascalia) break
        const v = msg[j]
        if (v && v.autore === m.autore && v.data === m.data && !v.testo.includes('<allegato')) didascalia = pulisci(v.testo)
      }
      righe.push({ file: f[1], data: m.data, autore: m.autore, didascalia: didascalia.slice(0, 90), tieni: '' })
    }
  })
  const out = ['file;data;autore;tieni;didascalia', ...righe.map((r) => [r.file, r.data, r.autore, r.tieni, r.didascalia].map(q).join(';'))]
  fs.writeFileSync(CSV, '﻿' + out.join('\n'))
  console.log(`${righe.length} foto trovate. Ora apri ${CSV}, metti "si" in "tieni" e sistema le didascalie.`)
}

async function importa() {
  const file = resto[0] ?? CSV
  const righe = leggiCsv(fs.readFileSync(file, 'utf8').replace(/^﻿/, ''))
  const scelte = righe.filter((r) => /^(si|sì|x|1|ok)$/i.test(r.tieni))
  let n = 0
  for (const r of scelte) {
    const [anno, mese] = r.data.split('-')
    const dir = path.join('public', 'gallery', anno, mese)
    fs.mkdirSync(dir, { recursive: true })
    const base = (r.didascalia || `Foto del ${r.data}`).replace(/[\\/:*?"<>|]/g, '').replace(/\s+/g, ' ').trim()
    let nome = `${base}.jpeg`, k = 2
    while (fs.existsSync(path.join(dir, nome))) nome = `${base} ${k++}.jpeg`
    await sharp(path.join(cartella, r.file))
      .rotate()
      .resize({ width: LATO, height: LATO, fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 80, mozjpeg: true })
      .toFile(path.join(dir, nome))
    n++
    console.log(`+ ${anno}/${mese}/${nome}`)
  }
  console.log(`\n${n} foto importate su ${righe.length}.`)
}

if (comando === 'prepara') prepara()
else await importa()
