// Uso: npx tsx scripts/verifica-catalogo.ts 2027
// Controllo: ogni regola riproduce le edizioni passate? Stampa la proiezione.
import { catalogoPerAnno } from '../src/lib/catalogo'
const anno = Number(process.argv[2] ?? 2027)
const c = catalogoPerAnno(anno).sort((a, b) => (a.previsione ?? '9').localeCompare(b.previsione ?? '9'))
for (const g of c) {
  const ko = g.edizioni.length - g.confermate
  console.log(`${g.previsione ?? '   variabile '}  ${g.affidabilitaCalcolata.padEnd(7)} ${String(g.confermate)}/${g.edizioni.length}${ko && g.regola.k !== 'variabile' ? ' !' : '  '} ${g.nome}  [${g.regolaTesto}] ${g.avvisi.join(' | ')}`)
}
