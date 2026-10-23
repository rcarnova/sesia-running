// src/data/gare.ts
// Catalogo delle gare frequentate dalla società, ricostruito dalla chat sociale
// (nov 2024 - ott 2026) e dai volantini condivisi. Nessun dato personale degli atleti.
// Per aggiungere un'edizione: inserire la data in `edizioni`. La regola viene
// verificata automaticamente sulle edizioni passate (vedi src/lib/catalogo.ts).

import type { Regola } from '@/lib/ricorrenza'

export type Tipo = 'strada' | 'trail' | 'camminata' | 'multisport'
export type RuoloSesia = 'organizza' | 'collabora' | 'ritrovo' | 'partecipa'
export type Momento = 'mattina' | 'pomeriggio' | 'sera'

export interface Edizione {
  data: string        // YYYY-MM-DD
  numero?: number     // numero di edizione, se noto
  nota?: string
}

export interface Gara {
  id: string
  nome: string
  luogo: string
  organizzatore?: string
  tipo: Tipo
  distanze: string[]
  momento: Momento
  sesia: RuoloSesia
  circuito?: string
  benefica?: boolean
  regola: Regola
  edizioni: Edizione[]
  affidabilita?: 'alta' | 'media' | 'bassa'  // forza il livello calcolato
  nota?: string
}

const DOM = 0, MAR = 2, MER = 3, GIO = 4, VEN = 5, SAB = 6

export const gare: Gara[] = [
  // ── Organizzate da Sesia Running: Circuito Sesia Running ──
  {
    id: 'vercelli-che-corre', nome: 'Vercelli che Corre', luogo: 'Vercelli (VC)',
    tipo: 'strada', distanze: ['5,1 km Fidal', '5,1 km non competitiva UISP', 'camminata'], momento: 'mattina',
    sesia: 'organizza', circuito: 'CSR',
    regola: { k: 'ennesimo', mese: 3, dow: DOM, n: -1 },
    edizioni: [{ data: '2026-03-29', numero: 2, nota: '1ª tappa del 2° Circuito, circa 200 partecipanti' }],
    nota: 'Partenza e arrivo al Campo CONI.',
  },
  {
    id: 'rive-run', nome: 'Rive Run', luogo: 'Rive (VC)',
    tipo: 'strada', distanze: ['8,5 km corsa', '5 km camminata'], momento: 'mattina',
    sesia: 'organizza', circuito: 'CSR',
    regola: { k: 'ennesimo', mese: 5, dow: DOM, n: 4 },
    edizioni: [{ data: '2026-05-24', nota: '2ª tappa del 2° Circuito' }],
  },
  {
    id: 'prarolo-run', nome: 'Prarolo Run', luogo: 'Prarolo (VC)',
    tipo: 'strada', distanze: ['6,5 km corsa', '6,5 km camminata'], momento: 'sera',
    sesia: 'organizza', circuito: 'CSR',
    regola: { k: 'ennesimo', mese: 6, dow: VEN, n: 1 },
    edizioni: [
      { data: '2025-04-13', numero: 2, nota: 'Domenica mattina, 12,3 km. 1ª tappa del 1° Circuito' },
      { data: '2026-06-05', nota: 'Venerdì sera con la Sagra dell’Asino. 3ª tappa del 2° Circuito' },
    ],
    affidabilita: 'media',
    nota: 'Nel 2026 è passata al formato serale legato alla Sagra dell’Asino. Percorso misto asfalto e sterrato, Panissa della Pro Loco.',
  },
  {
    id: 'livorno-run', nome: 'Livorno Run', luogo: 'Livorno Ferraris (VC)', organizzatore: 'con MST',
    tipo: 'strada', distanze: ['5,5 km corsa', 'camminata'], momento: 'sera',
    sesia: 'organizza', circuito: 'CSR',
    regola: { k: 'ennesimo', mese: 5, dow: VEN, n: 2 },
    edizioni: [{ data: '2025-05-09', numero: 2, nota: '2ª tappa del 1° Circuito' }],
    nota: 'Non inserita nel circuito 2026.',
  },
  {
    id: 'borgo-di-notte', nome: 'Borgo di Notte', luogo: 'Borgo Vercelli (VC)', organizzatore: 'GP Dilettantistico Borgo Vercelli',
    tipo: 'strada', distanze: ['6 km corsa', 'camminata'], momento: 'sera',
    sesia: 'organizza', circuito: 'CSR',
    regola: { k: 'vicino', mese: 7, giorno: 7, dow: MAR },
    edizioni: [
      { data: '2025-07-08', nota: 'Ritorno dopo alcuni anni. 3ª tappa del 1° Circuito' },
      { data: '2026-07-07', nota: 'Edizione record, quasi 270 partecipanti. 4ª tappa del 2° Circuito' },
    ],
    nota: 'Storico appuntamento del podismo locale, sempre di martedì sera.',
  },
  {
    id: 'strapagiun', nome: 'Strapagiun', luogo: 'Stroppiana (VC)', organizzatore: 'Pro Loco Stroppiana',
    tipo: 'strada', distanze: ['6 km (2 giri)', 'camminata'], momento: 'sera',
    sesia: 'organizza', circuito: 'CSR',
    regola: { k: 'dopo', mese: 8, giorno: 15, dow: DOM },
    edizioni: [
      { data: '2025-08-17', numero: 3, nota: '4ª tappa del 1° Circuito' },
      { data: '2026-08-16', numero: 4, nota: '5ª tappa del 2° Circuito' },
    ],
    affidabilita: 'media',
    nota: 'Legata alla sagra di paese. Nel 2027 Ferragosto cade di domenica: da confermare se si corre il 15 o il 22.',
  },
  {
    id: 'corriparco', nome: 'Corriparco', luogo: 'Albano Vercellese (VC)',
    tipo: 'strada', distanze: ['6 km sterrato', 'camminata'], momento: 'sera',
    sesia: 'organizza', circuito: 'CSR',
    regola: { k: 'ennesimo', mese: 8, dow: GIO, n: -1 },
    edizioni: [
      { data: '2025-08-28', numero: 15, nota: 'Tappa finale del 1° Circuito, con premiazioni' },
      { data: '2026-08-27', numero: 16, nota: '180 partecipanti. 6ª tappa del 2° Circuito' },
    ],
    nota: 'Nel Parco Lame del Sesia, Panissa per tutti a fine gara.',
  },
  {
    id: 'vie-d-acqua', nome: 'Lungo le Vie d’Acqua', luogo: 'Formigliana (VC)',
    tipo: 'strada', distanze: ['6 km', 'camminata'], momento: 'sera',
    sesia: 'organizza', circuito: 'CSR',
    regola: { k: 'fissa', mese: 9, giorno: 11 },
    edizioni: [
      { data: '2025-09-11', numero: 1, nota: 'Nuova gara, lungo il Canale Cavour (Casanova Elvo - Formigliana)' },
      { data: '2026-09-11', numero: 2, nota: 'Tappa finale del 2° Circuito, percorso al contrario' },
    ],
    affidabilita: 'media',
    nota: 'Entrambe le edizioni l’11 settembre, ma nel 2027 cade di sabato: probabile spostamento in settimana.',
  },

  // ── Altre iniziative organizzate o co-organizzate ──
  {
    id: 'brarola-natale', nome: 'Corsa di Santo Stefano a Brarola', luogo: 'Cascina Brarola, Vercelli',
    tipo: 'camminata', distanze: ['anello di 6 km, uno o più giri'], momento: 'mattina',
    sesia: 'organizza',
    regola: { k: 'fissa', mese: 12, giorno: 26 },
    edizioni: [
      { data: '2024-12-26' },
      { data: '2025-12-26', nota: 'Spostata alla Fit Active per i sentieri allagati' },
    ],
    nota: 'Ritrovo natalizio a gruppi di passo, poi panettone e tè caldo.',
  },
  {
    id: 'brarola-nastro-viola', nome: 'Camminata benefica Nastro Viola', luogo: 'Cascina Brarola, Vercelli', organizzatore: 'con Nastro Viola',
    tipo: 'camminata', distanze: ['6 km sterrato'], momento: 'mattina',
    sesia: 'organizza', benefica: true,
    regola: { k: 'ennesimo', mese: 10, dow: DOM, n: -1 },
    edizioni: [{ data: '2026-10-25', numero: 1, nota: 'In ricordo di Luciano Montella, lungo la Via Francigena' }],
  },
  {
    id: 'vercelli-in-rosa', nome: 'Vercelli in Rosa', luogo: 'Vercelli (VC)', organizzatore: 'Atletica Vercelli 78',
    tipo: 'camminata', distanze: ['7,3 km corsa e camminata'], momento: 'mattina',
    sesia: 'collabora', benefica: true,
    regola: { k: 'vicino', mese: 3, giorno: 8, dow: DOM },
    edizioni: [
      { data: '2025-03-09', nota: 'Sesia Running tra gli organizzatori e i volontari' },
      { data: '2026-03-08' },
    ],
    nota: 'Intorno alla Festa della Donna, partenza e arrivo in Piazza Cavour.',
  },
  {
    id: 'run4hope', nome: 'Run4Hope', luogo: 'Olcenengo - Vercelli',
    tipo: 'strada', distanze: ['staffetta di circa 13 km'], momento: 'mattina',
    sesia: 'collabora', benefica: true,
    regola: { k: 'variabile' },
    edizioni: [{ data: '2025-04-06', nota: 'Testimone ricevuto da Atletica Santhià, arrivo in Piazza Cavour. Donazione ad AIRC' }],
    nota: 'Staffetta nazionale: la data della tappa piemontese cambia ogni anno.',
  },
  {
    id: 'mergozzo-staffetta', nome: 'Triathlon Medio di Mergozzo (staffette)', luogo: 'Mergozzo (VB)',
    tipo: 'multisport', distanze: ['1,9 km nuoto', '90 km bici', '21 km corsa'], momento: 'mattina',
    sesia: 'ritrovo',
    regola: { k: 'dopo', mese: 9, giorno: 6, dow: DOM },
    edizioni: [
      { data: '2025-09-07', nota: 'Prime staffette Sesia Running' },
      { data: '2026-09-13', nota: '5 squadre al via' },
    ],
    affidabilita: 'media',
    nota: 'Serve certificato agonistico con dicitura “Triathlon” e tesseramento giornaliero Fitri.',
  },
  {
    id: 'dynamo-12-ore', nome: 'Dynamo 12 ore', luogo: 'Casale Monferrato (AL)',
    tipo: 'multisport', distanze: ['nuoto a passo libero'], momento: 'mattina',
    sesia: 'ritrovo', benefica: true,
    regola: { k: 'ennesimo', mese: 9, dow: DOM, n: -1 },
    edizioni: [{ data: '2025-09-28' }, { data: '2026-09-27' }],
    nota: 'Raccolta fondi per Dynamo Camp, la società partecipa con un contributo.',
  },

  // ── Mezze maratone e classiche ──
  {
    id: 'novara-half', nome: 'Novara Half Marathon', luogo: 'Novara (NO)', organizzatore: 'Circuito Running',
    tipo: 'strada', distanze: ['21,097 km', '10 km'], momento: 'mattina',
    sesia: 'ritrovo',
    regola: { k: 'ennesimo', mese: 1, dow: DOM, n: -1 },
    edizioni: [{ data: '2025-01-26' }, { data: '2026-01-25', nota: 'Oltre 1.900 iscritti, trasferta societaria' }],
    nota: 'Sconto sulla quota per iscrizioni di società (minimo 11 iscritti).',
  },
  {
    id: 'mezza-vercelli', nome: 'Mezza Maratona di Vercelli', luogo: 'Vercelli (VC)', organizzatore: 'Circuito Running',
    tipo: 'strada', distanze: ['21,097 km', '7 km'], momento: 'mattina',
    sesia: 'collabora',
    regola: { k: 'ennesimo', mese: 2, dow: DOM, n: 2 },
    edizioni: [
      { data: '2025-02-09', nota: 'Sesia Running 3° gruppo più numeroso, volontari ai ristori' },
      { data: '2026-02-08', nota: 'Prevista, poi rinviata per iscrizioni insufficienti' },
    ],
    affidabilita: 'media',
    nota: 'Arrivo in Piazza Cavour. Dopo il rinvio 2026 la data 2027 è da confermare.',
  },
  {
    id: 'mezza-trino', nome: 'Mezza Maratona Terre d’Acqua', luogo: 'Trino (VC)', organizzatore: 'GP Trinese',
    tipo: 'strada', distanze: ['21,097 km Fidal', '21 km non competitiva', '6 km Trino che Corre'], momento: 'mattina',
    sesia: 'ritrovo',
    regola: { k: 'vicino', mese: 12, giorno: 1, dow: DOM },
    edizioni: [{ data: '2024-12-01' }, { data: '2025-11-30', numero: 19 }],
    nota: 'Campionato regionale Fidal. Si corre a cavallo tra novembre e dicembre, non sempre la prima domenica di dicembre.',
  },
  {
    id: 'pella-orta', nome: 'Pella-Orta', luogo: 'Pella (NO)', organizzatore: 'Circuito Running',
    tipo: 'strada', distanze: ['14,5 km'], momento: 'mattina',
    sesia: 'ritrovo',
    regola: { k: 'ennesimo', mese: 11, dow: DOM, n: 1 },
    edizioni: [{ data: '2025-11-02', nota: 'Torna dopo alcuni anni, rientro in battello' }],
  },
  {
    id: 'busto-arsizio', nome: 'Busto Arsizio, mezza e 10 km', luogo: 'Busto Arsizio (VA)',
    tipo: 'strada', distanze: ['21 km', '10 km'], momento: 'mattina',
    sesia: 'ritrovo',
    regola: { k: 'ennesimo', mese: 11, dow: DOM, n: 2 },
    edizioni: [{ data: '2024-11-10', nota: 'Prima trasferta della stagione 24/25, oltre 1.600 iscritti' }],
  },
  {
    id: 'mezza-due-laghi', nome: 'Mezza dei Due Laghi', luogo: 'Lago Maggiore',
    tipo: 'strada', distanze: ['21,097 km'], momento: 'mattina',
    sesia: 'partecipa',
    regola: { k: 'ennesimo', mese: 3, dow: DOM, n: 1 },
    edizioni: [{ data: '2025-03-02' }],
  },
  {
    id: 'maratona-milano', nome: 'Maratona di Milano', luogo: 'Milano (MI)',
    tipo: 'strada', distanze: ['42,195 km', 'staffetta'], momento: 'mattina',
    sesia: 'partecipa',
    regola: { k: 'variabile' },
    edizioni: [{ data: '2025-04-06' }, { data: '2026-04-12' }],
    nota: 'Domenica di aprile, data fissata ogni anno dall’organizzazione.',
  },

  // ── Corse serali e di paese del territorio ──
  {
    id: 'san-nazzaro', nome: 'Corsa di San Nazzaro Sesia', luogo: 'San Nazzaro Sesia (NO)',
    tipo: 'strada', distanze: ['corsa', 'camminata'], momento: 'mattina',
    sesia: 'ritrovo',
    regola: { k: 'fissa', mese: 4, giorno: 25 },
    edizioni: [{ data: '2025-04-25' }, { data: '2026-04-25' }],
  },
  {
    id: 'santhia-1-maggio', nome: 'Maratona del Riso e Corri-Santhià', luogo: 'Santhià (VC)', organizzatore: 'Atletica Santhià',
    tipo: 'strada', distanze: ['42,195 km', '21 km', '10 km', 'camminata benefica'], momento: 'mattina',
    sesia: 'partecipa',
    regola: { k: 'fissa', mese: 5, giorno: 1 },
    edizioni: [{ data: '2025-05-01' }, { data: '2026-05-01' }],
  },
  {
    id: 'quattro-cantoni', nome: 'I 4 Cantoni', luogo: 'Asigliano Vercellese (VC)', organizzatore: 'GP Trinese',
    tipo: 'strada', distanze: ['6 km Fidal', 'non competitiva'], momento: 'sera',
    sesia: 'partecipa',
    regola: { k: 'ennesimo', mese: 5, dow: MAR, n: 2 },
    edizioni: [{ data: '2026-05-12', numero: 20 }],
  },
  {
    id: 'trino-gp-trinese', nome: 'Corsa di Trino (Circuito GP Trinese)', luogo: 'Trino (VC)', organizzatore: 'GP Trinese',
    tipo: 'strada', distanze: ['5 km'], momento: 'sera',
    sesia: 'ritrovo', circuito: 'GP Trinese',
    regola: { k: 'ennesimo', mese: 5, dow: VEN, n: 3 },
    edizioni: [{ data: '2026-05-15', nota: '1ª tappa del circuito GP Trinese' }],
    nota: 'Il circuito premia i gruppi più numerosi: iscriversi sempre come Sesia Running.',
  },
  {
    id: 'stra-crova', nome: 'Stra Crova Salasc', luogo: 'Salasco (VC)', organizzatore: 'Olimpia Runners',
    tipo: 'strada', distanze: ['5,5 km'], momento: 'sera',
    sesia: 'partecipa',
    regola: { k: 'ennesimo', mese: 5, dow: VEN, n: 4 },
    edizioni: [{ data: '2025-05-23' }],
  },
  {
    id: 'tricerro', nome: 'Camminata Alpina di Tricerro', luogo: 'Tricerro (VC)',
    tipo: 'strada', distanze: ['4,5 km'], momento: 'sera',
    sesia: 'ritrovo',
    regola: { k: 'ennesimo', mese: 6, dow: MER, n: 1 },
    edizioni: [{ data: '2025-06-04', numero: 35 }, { data: '2026-06-03' }],
    nota: 'Panissa a fine gara. Obiettivo storico: gruppo più numeroso.',
  },
  {
    id: 'balzola-run', nome: 'Balzola Run', luogo: 'Balzola (AL)',
    tipo: 'strada', distanze: ['5 km'], momento: 'sera',
    sesia: 'partecipa',
    regola: { k: 'vicino', mese: 6, giorno: 9, dow: VEN },
    edizioni: [{ data: '2025-06-06' }, { data: '2026-06-12' }],
  },
  {
    id: 'palestro', nome: 'Corsa di Palestro', luogo: 'Palestro (PV)',
    tipo: 'strada', distanze: ['6,5 km'], momento: 'sera',
    sesia: 'partecipa',
    regola: { k: 'ennesimo', mese: 6, dow: VEN, n: 2 },
    edizioni: [{ data: '2025-06-13' }, { data: '2026-06-12' }],
  },
  {
    id: 'moncrivello', nome: 'Corsa di Moncrivello', luogo: 'Moncrivello (VC)',
    tipo: 'strada', distanze: ['7 km'], momento: 'sera',
    sesia: 'partecipa',
    regola: { k: 'ennesimo', mese: 6, dow: GIO, n: 2 },
    edizioni: [{ data: '2025-06-12' }],
  },
  {
    id: 'spinetta', nome: 'Spinetta Marengo 10 km', luogo: 'Spinetta Marengo (AL)',
    tipo: 'strada', distanze: ['10 km'], momento: 'mattina',
    sesia: 'partecipa',
    regola: { k: 'ennesimo', mese: 6, dow: DOM, n: 3 },
    edizioni: [{ data: '2025-06-15' }],
    nota: 'Percorso piatto e veloce, segnalato per chi cerca il personale sui 5 e 10 km.',
  },
  {
    id: 'grano-run', nome: 'Grano Run', luogo: 'Ticineto (AL)',
    tipo: 'strada', distanze: ['5,2 km'], momento: 'sera',
    sesia: 'partecipa',
    regola: { k: 'ennesimo', mese: 6, dow: GIO, n: -1 },
    edizioni: [{ data: '2025-06-26' }, { data: '2026-06-25' }],
  },
  {
    id: 'asigliano-di-corsa', nome: 'Asigliano di Corsa', luogo: 'Asigliano Vercellese (VC)', organizzatore: 'GP Trinese',
    tipo: 'strada', distanze: ['5,5 km Fidal', 'camminata'], momento: 'sera',
    sesia: 'partecipa',
    regola: { k: 'ennesimo', mese: 7, dow: MER, n: -1 },
    edizioni: [{ data: '2025-07-30', numero: 5 }],
  },
  {
    id: 'san-lorenzo-ronsecco', nome: 'San Lorenzo Running', luogo: 'Ronsecco (VC)', organizzatore: 'Atletica Vercelli 78 e Pro Loco',
    tipo: 'strada', distanze: ['5,5 km'], momento: 'sera',
    sesia: 'ritrovo',
    regola: { k: 'vicino', mese: 8, giorno: 8, dow: VEN },
    edizioni: [{ data: '2025-08-08', numero: 4 }, { data: '2026-08-07', numero: 5 }],
    affidabilita: 'media',
    nota: 'Il venerdì prima di San Lorenzo. Premio alle tre società più numerose.',
  },
  {
    id: 'calliano-cavaglia', nome: 'Per le strade di Calliano', luogo: 'Cavaglià (BI)', organizzatore: 'Atletica Santhià',
    tipo: 'strada', distanze: ['7 km asfalto e sterrato'], momento: 'sera',
    sesia: 'partecipa',
    regola: { k: 'fissa', mese: 8, giorno: 12 },
    edizioni: [{ data: '2025-08-12', numero: 19 }, { data: '2026-08-12', numero: 20 }],
  },
  {
    id: 'panissa-vercelli', nome: 'Corsa della Sagra della Panissa', luogo: 'Vercelli (VC)',
    tipo: 'strada', distanze: ['corsa', 'camminata'], momento: 'sera',
    sesia: 'ritrovo',
    regola: { k: 'ennesimo', mese: 8, dow: VEN, n: -2 },
    edizioni: [{ data: '2025-08-22' }, { data: '2026-08-21', nota: 'Iscrizione dei tesserati a carico della società' }],
    nota: 'La corsa di casa: obiettivo primo gruppo più numeroso, poi cena insieme.',
  },
  {
    id: 'palazzolo', nome: 'Corsa di Palazzolo', luogo: 'Palazzolo Vercellese (VC)',
    tipo: 'strada', distanze: ['corsa'], momento: 'sera',
    sesia: 'partecipa',
    regola: { k: 'vicino', mese: 9, giorno: 1, dow: VEN },
    edizioni: [{ data: '2025-08-29' }, { data: '2026-09-04' }],
    affidabilita: 'media',
  },
  {
    id: 'palazzolo-trino', nome: 'Palazzolo-Trino (Circuito GP Trinese)', luogo: 'Trino (VC)', organizzatore: 'GP Trinese',
    tipo: 'strada', distanze: ['corsa'], momento: 'mattina',
    sesia: 'ritrovo', circuito: 'GP Trinese',
    regola: { k: 'ennesimo', mese: 9, dow: DOM, n: 1 },
    edizioni: [{ data: '2026-09-06', nota: '2ª tappa del circuito GP Trinese' }],
  },
  {
    id: 'biellese-di-corsa', nome: 'Il Biellese di corsa', luogo: 'Cossato - Biella (BI)',
    tipo: 'strada', distanze: ['17 km'], momento: 'mattina',
    sesia: 'partecipa',
    regola: { k: 'ennesimo', mese: 9, dow: DOM, n: 1 },
    edizioni: [{ data: '2026-09-06', numero: 17 }],
  },
  {
    id: 'cameri-aeroporto', nome: 'Corri in aeroporto', luogo: 'Cameri (NO)',
    tipo: 'strada', distanze: ['10 km', '18 km'], momento: 'mattina',
    sesia: 'partecipa',
    regola: { k: 'ennesimo', mese: 9, dow: DOM, n: 3 },
    edizioni: [{ data: '2026-09-20' }],
    nota: 'Tutta dentro l’aeroporto militare: si esce solo a fine gara.',
  },
  {
    id: 'cross-natale-trino', nome: 'Cross di Natale', luogo: 'Trino (VC)',
    tipo: 'trail', distanze: ['5,8 km'], momento: 'mattina',
    sesia: 'partecipa',
    regola: { k: 'vicino', mese: 12, giorno: 21, dow: DOM },
    edizioni: [{ data: '2025-12-21' }],
  },
  {
    id: 'babbo-run-busto', nome: 'Babbo Run', luogo: 'Busto Arsizio (VA)',
    tipo: 'strada', distanze: ['corsa non competitiva'], momento: 'mattina',
    sesia: 'partecipa',
    regola: { k: 'vicino', mese: 12, giorno: 21, dow: DOM },
    edizioni: [{ data: '2025-12-21' }],
  },
  {
    id: 'camminata-rosa-caresanablot', nome: 'Camminata in Rosa AIRC', luogo: 'Caresanablot (VC)',
    tipo: 'camminata', distanze: ['passeggiata'], momento: 'pomeriggio',
    sesia: 'partecipa', benefica: true,
    regola: { k: 'ennesimo', mese: 10, dow: SAB, n: 3 },
    edizioni: [{ data: '2025-10-18' }],
  },

  // ── Trail ──
  {
    id: 'castelli-bruciati', nome: 'Trail dei Castelli Bruciati (UTCB)', luogo: 'Gabiano (AL)',
    tipo: 'trail', distanze: ['25 km', '10 km'], momento: 'mattina',
    sesia: 'partecipa',
    regola: { k: 'ennesimo', mese: 3, dow: SAB, n: -1 },
    edizioni: [{ data: '2026-03-28' }],
  },
  {
    id: 'brutal-trail', nome: 'Brutal Trail', luogo: 'Gattinara (VC)',
    tipo: 'trail', distanze: ['21 km', 'distanze brevi'], momento: 'mattina',
    sesia: 'partecipa',
    regola: { k: 'variabile' },
    edizioni: [{ data: '2025-05-18' }, { data: '2026-04-26' }],
    nota: 'Primavera, ma la data è cambiata di tre settimane tra un anno e l’altro.',
  },
  {
    id: 'trail-diga', nome: 'Trail della Diga', luogo: 'Biellese',
    tipo: 'trail', distanze: ['32 km 900 D+', 'distanze brevi'], momento: 'mattina',
    sesia: 'partecipa',
    regola: { k: 'ennesimo', mese: 5, dow: DOM, n: 2 },
    edizioni: [{ data: '2026-05-10' }],
  },
  {
    id: 'tavian-trophy', nome: 'Tavian Tourist Trophy', luogo: 'Tavigliano (BI)', organizzatore: 'Atletica Santhià',
    tipo: 'trail', distanze: ['6 km corsa in montagna, staffetta o individuale'], momento: 'mattina',
    sesia: 'partecipa',
    regola: { k: 'ennesimo', mese: 6, dow: DOM, n: 4 },
    edizioni: [{ data: '2025-06-22', numero: 3 }],
  },
  {
    id: 'trail-ruscalla', nome: 'Trail della Ruscalla', luogo: 'Camino (AL)',
    tipo: 'trail', distanze: ['10 km'], momento: 'mattina',
    sesia: 'partecipa',
    regola: { k: 'ennesimo', mese: 10, dow: DOM, n: 3 },
    edizioni: [{ data: '2025-10-19' }],
  },
  {
    id: 'martinaska', nome: 'Martinaska Trail', luogo: 'San Martino Canavese (TO)',
    tipo: 'trail', distanze: ['15 km 400 D+'], momento: 'mattina',
    sesia: 'partecipa',
    regola: { k: 'ennesimo', mese: 11, dow: SAB, n: 2 },
    edizioni: [{ data: '2025-11-08' }],
  },
]
