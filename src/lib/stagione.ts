// src/lib/stagione.ts
// Stagione sociale in corso e tab del Google Sheet della classifica.
// Ogni stagione ha il suo tab nello stesso file (GOOGLE_DRIVE_FILE_ID), così lo storico resta.
// A inizio stagione: aggiorna STAGIONE e aggiungi il gid del nuovo tab
// (è il numero dopo "gid=" nel link del tab aperto nel browser).

export const STAGIONE = '2026-27'        // formato lungo, es. "Stagione 2026-27"
export const STAGIONE_BREVE = '26-27'    // formato breve, es. "Regolamento 26-27"

export const GID_PER_STAGIONE: Record<string, string | null> = {
  '2025-26': '1508135863',
  '2026-27': null, // da inserire quando Manuel crea il tab 26/27
}

export const SOGLIA_GRATUITO = 100
