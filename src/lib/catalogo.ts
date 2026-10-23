// src/lib/catalogo.ts
import { gare, type Gara } from '@/data/gare'
import { dataPerAnno, descriviRegola, pasqua } from '@/lib/ricorrenza'

export type Affidabilita = 'confermata' | 'alta' | 'media' | 'bassa' | 'nessuna'

export interface GaraPrevista extends Gara {
  previsione: string | null      // data ufficiale o stimata nell'anno richiesto
  regolaTesto: string
  confermate: number             // edizioni passate coerenti con la regola
  affidabilitaCalcolata: Affidabilita
  avvisi: string[]
  ultimaEdizione: string | null
  disputate: number              // edizioni passate in archivio
}

function calcolaAffidabilita(g: Gara, confermate: number, passate: number): Affidabilita {
  if (g.regola.k === 'variabile') return 'nessuna'
  if (g.affidabilita) return g.affidabilita
  if (confermate >= 2 && confermate === passate) return 'alta'
  if (confermate >= 2) return 'media'
  return 'bassa'
}

export function catalogoPerAnno(anno: number): GaraPrevista[] {
  const base = gare.map((g) => {
    const passate = g.edizioni.filter((e) => !e.confermata)
    const ufficiale = g.edizioni.find((e) => e.confermata && e.data.startsWith(String(anno)))
    const confermate = passate.filter(
      (e) => dataPerAnno(g.regola, Number(e.data.slice(0, 4))) === e.data,
    ).length
    const ordinate = [...passate].sort((a, b) => a.data.localeCompare(b.data))
    return {
      ...g,
      previsione: ufficiale ? ufficiale.data : dataPerAnno(g.regola, anno),
      regolaTesto: descriviRegola(g.regola),
      confermate,
      affidabilitaCalcolata: ufficiale ? 'confermata' : calcolaAffidabilita(g, confermate, passate.length),
      avvisi: [] as string[],
      ultimaEdizione: ordinate.length ? ordinate[ordinate.length - 1].data : null,
      disputate: passate.length,
    } as GaraPrevista
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
