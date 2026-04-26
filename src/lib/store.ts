// src/lib/store.ts
import { Classifica } from './types'
import * as XLSX from 'xlsx'

const DEFAULT: Classifica = {
  aggiornatoIl: '24/04/2026',
  stagione: '2025-26',
  atleti: [
    { nome: 'Daniele Fiorentino', punti: 48, gare: 4, ritrovi: 7 },
    { nome: 'Paolo Gagnone', punti: 29, gare: 3, ritrovi: 7 },
    { nome: 'Manuel Lucchini', punti: 27, gare: 1, ritrovi: 9 },
    { nome: 'Marco Curella', punti: 19, gare: 3, ritrovi: 4 },
    { nome: 'Enrico Riva', punti: 17, gare: 1, ritrovi: 4 },
    { nome: 'Adam Bianchi', punti: 16, gare: 1, ritrovi: 4 },
    { nome: 'Alex Cardano', punti: 16, gare: 1, ritrovi: 0 },
    { nome: 'Diego Baraldi', punti: 16, gare: 6, ritrovi: 1 },
    { nome: 'Silvio Giroldi', punti: 15, gare: 0, ritrovi: 6 },
    { nome: 'Filippo Cannino', punti: 15, gare: 2, ritrovi: 2 },
    { nome: 'Marco Ghilardelli', punti: 15, gare: 0, ritrovi: 6 },
    { nome: 'Giorgio Leone', punti: 14, gare: 1, ritrovi: 4 },
    { nome: 'Paola Birolo', punti: 13, gare: 0, ritrovi: 5 },
    { nome: 'Antonino Grammatico', punti: 12, gare: 1, ritrovi: 5 },
    { nome: "Enrico Dall'Angelo", punti: 12, gare: 2, ritrovi: 1 },
    { nome: 'Paolo Felisatti', punti: 11, gare: 1, ritrovi: 3 },
    { nome: 'Stefano Allolio', punti: 11, gare: 1, ritrovi: 0 },
    { nome: 'Stefania Malinverni', punti: 11, gare: 1, ritrovi: 0 },
    { nome: 'Domenico Cavallaro', punti: 11, gare: 1, ritrovi: 2 },
    { nome: 'Marta Dellarolle', punti: 10, gare: 2, ritrovi: 0 },
    { nome: 'Renzo Belossi', punti: 10, gare: 1, ritrovi: 3 },
    { nome: 'Denis Cernuto', punti: 9, gare: 2, ritrovi: 0 },
    { nome: 'Maurizio Salerno', punti: 9, gare: 1, ritrovi: 1 },
    { nome: 'Alberto Frigato', punti: 9, gare: 1, ritrovi: 0 },
    { nome: 'Nazzareno Cavallaro', punti: 9, gare: 1, ritrovi: 1 },
    { nome: 'Simone Bendazzi', punti: 8, gare: 1, ritrovi: 0 },
    { nome: 'Stefano Carenzo', punti: 7, gare: 1, ritrovi: 1 },
    { nome: 'Silvia Lobascio', punti: 7, gare: 0, ritrovi: 2 },
    { nome: 'Emmerik Lucchini', punti: 7, gare: 0, ritrovi: 2 },
    { nome: 'Ilir Memaj', punti: 7, gare: 1, ritrovi: 1 },
    { nome: 'Paolo Veggi', punti: 7, gare: 0, ritrovi: 2 },
    { nome: 'Simone Aprile', punti: 7, gare: 0, ritrovi: 2 },
    { nome: 'Stefano Fonsato', punti: 7, gare: 1, ritrovi: 2 },
    { nome: 'Silvia Szego', punti: 6, gare: 0, ritrovi: 2 },
    { nome: 'Roberta Bellini', punti: 6, gare: 0, ritrovi: 3 },
    { nome: 'Giuseppe Sibilla', punti: 6, gare: 1, ritrovi: 0 },
    { nome: 'Marco Gennaro Canino', punti: 6, gare: 1, ritrovi: 0 },
    { nome: 'Piero Castello', punti: 5, gare: 0, ritrovi: 1 },
    { nome: 'Marzio Dan', punti: 5, gare: 1, ritrovi: 0 },
    { nome: 'Rosario Carnovale', punti: 5, gare: 0, ritrovi: 2 },
    { nome: 'Gianluca Lagiorgia', punti: 5, gare: 1, ritrovi: 0 },
    { nome: 'Luca Ranghino', punti: 4, gare: 0, ritrovi: 1 },
    { nome: 'Simone Lobascio', punti: 4, gare: 0, ritrovi: 2 },
    { nome: 'Marco Bernardi', punti: 4, gare: 0, ritrovi: 2 },
    { nome: 'Mauro Montella', punti: 4, gare: 1, ritrovi: 1 },
    { nome: 'Marco Ferraris', punti: 4, gare: 0, ritrovi: 2 },
    { nome: 'Manuel Leccese', punti: 4, gare: 1, ritrovi: 1 },
    { nome: 'Francesco Sola', punti: 3, gare: 0, ritrovi: 0 },
    { nome: 'Stefano Viazzo', punti: 3, gare: 0, ritrovi: 0 },
    { nome: 'Paolo Corradino', punti: 3, gare: 0, ritrovi: 0 },
    { nome: 'Annamaria Bertola', punti: 3, gare: 0, ritrovi: 0 },
    { nome: 'Joseph Robbiano', punti: 3, gare: 0, ritrovi: 0 },
    { nome: 'Simone Bertotti', punti: 3, gare: 0, ritrovi: 0 },
    { nome: 'Martino Codogno', punti: 3, gare: 0, ritrovi: 0 },
    { nome: 'Cristian Capuano', punti: 3, gare: 0, ritrovi: 0 },
    { nome: 'Mario Basiricò', punti: 3, gare: 0, ritrovi: 0 },
    { nome: 'Sebastiano Di Pasquale', punti: 3, gare: 0, ritrovi: 0 },
    { nome: 'Davide Pergianni', punti: 3, gare: 0, ritrovi: 0 },
    { nome: 'Nicolò Rosazza', punti: 3, gare: 0, ritrovi: 0 },
    { nome: 'Davide Bordonaro', punti: 3, gare: 0, ritrovi: 0 },
    { nome: 'Andrea Galbiati', punti: 3, gare: 0, ritrovi: 0 },
    { nome: 'Ilaria Boscaro', punti: 3, gare: 0, ritrovi: 0 },
    { nome: 'Stefano Trebò', punti: 3, gare: 0, ritrovi: 0 },
    { nome: 'Barbara Sarasso', punti: 3, gare: 0, ritrovi: 0 },
    { nome: 'Federico Bordonaro', punti: 3, gare: 0, ritrovi: 0 },
    { nome: 'Matteo Badino', punti: 3, gare: 0, ritrovi: 0 },
    { nome: 'Roberto Antona', punti: 3, gare: 0, ritrovi: 0 },
    { nome: 'Alessandro Barbero', punti: 3, gare: 0, ritrovi: 0 },
    { nome: 'Gennaro Viscardi', punti: 3, gare: 0, ritrovi: 0 },
    { nome: 'Maurizio Lione', punti: 3, gare: 0, ritrovi: 0 },
    { nome: 'Elisabetta Serra', punti: 3, gare: 0, ritrovi: 0 },
    { nome: 'Alessandro Cafasso', punti: 3, gare: 0, ritrovi: 0 },
    { nome: 'Edoardo Cardelli', punti: 3, gare: 0, ritrovi: 0 },
    { nome: 'Ileana Buffa', punti: 3, gare: 0, ritrovi: 1 },
    { nome: 'Alessandra Ferraris', punti: 2, gare: 0, ritrovi: 0 },
    { nome: 'Gianluca Boda', punti: 2, gare: 0, ritrovi: 0 },
    { nome: 'Lucia Ruzzante', punti: 2, gare: 0, ritrovi: 0 },
    { nome: 'Tatiana Ranghino', punti: 2, gare: 0, ritrovi: 0 },
    { nome: 'Veronica Platinetti', punti: 2, gare: 0, ritrovi: 0 },
    { nome: 'Marco Tagliabò', punti: 2, gare: 0, ritrovi: 0 },
    { nome: 'Giulia Giorgione', punti: 2, gare: 0, ritrovi: 1 },
    { nome: 'Sara Fizzotti', punti: 2, gare: 1, ritrovi: 0 },
    { nome: 'Luca Alfonso', punti: 2, gare: 0, ritrovi: 1 },
    { nome: 'Mattia Curci', punti: 1, gare: 0, ritrovi: 0 },
    { nome: 'Serena Piana', punti: 1, gare: 0, ritrovi: 0 },
    { nome: 'Luca Kotlar', punti: 1, gare: 0, ritrovi: 0 },
    { nome: 'Michele Proggia Caroselli', punti: 1, gare: 0, ritrovi: 0 },
    { nome: 'Thimoty Grosso', punti: 0, gare: 0, ritrovi: 0 },
    { nome: 'Simone Bordonaro', punti: 0, gare: 0, ritrovi: 0 },
    { nome: 'Costantino Pomato', punti: 0, gare: 0, ritrovi: 0 },
    { nome: 'John Paul Moore', punti: 0, gare: 0, ritrovi: 0 },
    { nome: 'Marco Piacco', punti: 0, gare: 0, ritrovi: 0 },
    { nome: 'Christian Ciliberto', punti: 0, gare: 0, ritrovi: 0 },
  ],
}

export async function fetchClassificaFromDrive(): Promise<Classifica> {
  const fileId = process.env.GOOGLE_DRIVE_FILE_ID
  if (!fileId) return DEFAULT

  try {
    const url = `https://drive.google.com/uc?export=download&id=${fileId}`
    const res = await fetch(url, { next: { revalidate: 3600 } })

    if (!res.ok) throw new Error(`Drive responded ${res.status}`)

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

    const aggiornatoIl = new Date().toLocaleDateString('it-IT', {
      day: '2-digit', month: '2-digit', year: 'numeric',
    })

    return { atleti, aggiornatoIl, stagione: '2025-26' }
  } catch (err) {
    console.error('Drive fetch failed, using default data:', err)
    return DEFAULT
  }
}
