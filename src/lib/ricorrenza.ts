// src/lib/ricorrenza.ts
// Motore delle ricorrenze: dalla regola di una gara calcola la data in un dato anno.
// Giorni della settimana: 0 = domenica ... 6 = sabato. Mesi: 1-12.

export type Regola =
  | { k: 'fissa'; mese: number; giorno: number }                          // es. 26 dicembre
  | { k: 'ennesimo'; mese: number; dow: number; n: number }               // n = 1,2,3,4 oppure -1 ultimo, -2 penultimo
  | { k: 'vicino'; mese: number; giorno: number; dow: number }            // il <dow> più vicino a <giorno>/<mese>
  | { k: 'dopo'; mese: number; giorno: number; dow: number }              // il primo <dow> dopo <giorno>/<mese>
  | { k: 'variabile' }                                                    // data non prevedibile

const GIORNI = ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato']
const MESI = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre']
const ORDINALI: Record<number, string> = { 1: 'prima', 2: 'seconda', 3: 'terza', 4: 'quarta', [-1]: 'ultima', [-2]: 'penultima' }

const ymd = (y: number, m: number, d: number) => new Date(Date.UTC(y, m - 1, d))
const iso = (d: Date) => d.toISOString().slice(0, 10)

export function dataPerAnno(r: Regola, anno: number): string | null {
  switch (r.k) {
    case 'fissa':
      return iso(ymd(anno, r.mese, r.giorno))
    case 'ennesimo': {
      if (r.n > 0) {
        const first = ymd(anno, r.mese, 1)
        const off = (r.dow - first.getUTCDay() + 7) % 7
        return iso(ymd(anno, r.mese, 1 + off + (r.n - 1) * 7))
      }
      const last = ymd(anno, r.mese + 1, 0)
      const off = (last.getUTCDay() - r.dow + 7) % 7
      return iso(ymd(anno, r.mese, last.getUTCDate() - off + (r.n + 1) * 7))
    }
    case 'vicino': {
      const base = ymd(anno, r.mese, r.giorno)
      const diff = (r.dow - base.getUTCDay() + 7) % 7 // giorni in avanti
      const delta = diff <= 3 ? diff : diff - 7
      return iso(ymd(anno, r.mese, r.giorno + delta))
    }
    case 'dopo': {
      const base = ymd(anno, r.mese, r.giorno)
      const diff = (r.dow - base.getUTCDay() + 7) % 7 || 7
      return iso(ymd(anno, r.mese, r.giorno + diff))
    }
    case 'variabile':
      return null
  }
}

// Articoli e preposizioni davanti a una data: "il 26", "l'11", "all'8", "al 1°".
const num = (g: number) => (g === 1 ? '1°' : String(g))
const art = (g: number) => (g === 8 || g === 11 ? `l’${g}` : `il ${num(g)}`)
const artAl = (g: number) => (g === 8 || g === 11 ? `all’${g}` : `al ${num(g)}`)
const femm = (dow: number) => dow === 0 // domenica

export function descriviRegola(r: Regola): string {
  switch (r.k) {
    case 'fissa':
      return `ogni anno ${art(r.giorno)} ${MESI[r.mese - 1]}`
    case 'ennesimo': {
      let o = ORDINALI[r.n]
      if (!femm(r.dow)) o = o.replace(/a$/, 'o')
      return `${o} ${GIORNI[r.dow]} di ${MESI[r.mese - 1]}`
    }
    case 'vicino':
      return `${femm(r.dow) ? 'la' : 'il'} ${GIORNI[r.dow]} più ${femm(r.dow) ? 'vicina' : 'vicino'} ${artAl(r.giorno)} ${MESI[r.mese - 1]}`
    case 'dopo':
      return `${femm(r.dow) ? 'la prima' : 'il primo'} ${GIORNI[r.dow]} dopo ${art(r.giorno)} ${MESI[r.mese - 1]}`
    case 'variabile':
      return 'data variabile da un anno all’altro'
  }
}

// Pasqua (algoritmo di Meeus/Butcher), per segnalare sovrapposizioni.
export function pasqua(anno: number): string {
  const a = anno % 19, b = Math.floor(anno / 100), c = anno % 100
  const d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25)
  const g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30
  const i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7
  const m = Math.floor((a + 11 * h + 22 * l) / 451)
  const mese = Math.floor((h + l - 7 * m + 114) / 31), giorno = ((h + l - 7 * m + 114) % 31) + 1
  return iso(ymd(anno, mese, giorno))
}

export function formattaData(isoDate: string, conAnno = true): string {
  const d = new Date(isoDate + 'T00:00:00Z')
  const s = `${GIORNI[d.getUTCDay()]} ${d.getUTCDate()} ${MESI[d.getUTCMonth()]}`
  return conAnno ? `${s} ${d.getUTCFullYear()}` : s
}

export const nomeMese = (m: number) => MESI[m - 1]
