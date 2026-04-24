// src/lib/types.ts

export interface Atleta {
  nome: string
  punti: number
  gare: number
  ritrovi: number
}

export interface Classifica {
  atleti: Atleta[]
  aggiornatoIl: string
  stagione: string
}
