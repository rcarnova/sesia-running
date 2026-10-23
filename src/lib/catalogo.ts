// src/lib/catalogo.ts
import { gare, type Gara } from '@/data/gare'
import { dataPerAnno, descriviRegola, pasqua } from '@/lib/ricorrenza'

export type Affidabilita = 'alta' | 'media' | 'bassa' | 'nessuna'

export interface GaraPrevista extends Gara {
  previsione: string | null      // data stimata nell'anno richiesto
  regolaTesto: string
  confermate: number             // edizioni passate coerenti con la regola
  affidabilitaCalcolata: Affidabilita
  avvisi: string[]
  ultimaEdizione: string
}

function calcolaAffidabilita(g: Gara, confermate: number): Affidabilita {
  if (g.regola.k === 'variabile') return 'nessuna'
  if (g.affidabilita) return g.affidabilita
  if (confermate >= 2 && confermate === g.edizioni.length) return 'alta'
  if (confermate >= 2) return 'media'
  return 'bassa'
}

export function catalogoPerAnno(anno: number): GaraPrevista[] {
  const base = gare.map((g) => {
    const confermate = g.edizioni.filter(
      (e) => dataPerAnno(g.regola, Number(e.data.slice(0, 4))) === e.data,
    ).length
    const ordinate = [...g.edizioni].sort((a, b) => a.data.localeCompare(b.data))
    return {
      ...g,
      previsione: dataPerAnno(g.regola, anno),
      regolaTesto: descriviRegola(g.regola),
      confermate,
      affidabilitaCalcolata: calcolaAffidabilita(g, confermate),
      avvisi: [] as string[],
      ultimaEdizione: ordinate[ordinate.length - 1].data,
    }
  })

  const p = pasqua(anno)
  const perData = new Map<string, GaraPrevista[]>()
  for (const g of base) {
    if (!g.previsione) continue
    if (g.previsione === p) g.avvisi.push('Cade il giorno di Pasqua')
    perData.set(g.previsione, [...(perData.get(g.previsione) ?? []), g])
  }
  perData.forEach((lista) => {
    if (lista.length < 2) return
    for (const g of lista) {
      const altre = lista.filter((x) => x.id !== g.id).map((x) => x.nome)
      g.avvisi.push(`Stesso giorno di: ${altre.join(', ')}`)
    }
  })
  return base
}
