// src/lib/types.ts

export interface Atleta {
  nome: string
  punti: number
  gare: number
  ritrovi: number
  allenamenti?: number
}

export interface Classifica {
  atleti: Atleta[]
  aggiornatoIl: string
  stagione: string
  inPartenza?: boolean       // tab della stagione non ancora disponibile
  nonDisponibile?: boolean   // foglio non raggiungibile
  conAllenamenti?: boolean   // il foglio ha la colonna degli allenamenti collettivi
}
