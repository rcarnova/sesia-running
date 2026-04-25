// src/app/statuto/page.tsx
import Image from 'next/image'
import Link from 'next/link'
import headerStyles from '../page.module.css'
import styles from './statuto.module.css'

const STATUTO = [
  {
    titolo: 'Titolo I – Denominazione e Sede',
    articoli: [
      {
        num: 'Art. 1',
        text: 'Sede in Vercelli, Corso Avogadro di Quaregna 49/C. Denominazione: "Associazione Sportiva Dilettantistica Sesia Running", in breve "Asd Sesia Running". Si conforma alle norme CONI e delle Federazioni sportive nazionali.',
      },
    ],
  },
  {
    titolo: 'Titolo II – Scopo e Oggetto',
    articoli: [
      {
        num: 'Art. 2',
        text: 'Associazione senza fine di lucro, a carattere volontario e democratico, per fini sportivi, ricreativi e culturali.',
      },
      {
        num: 'Art. 3',
        text: 'Organizzazione di attività sportive dilettantistiche (podismo, atletica leggera e discipline affini). Attività culturali, turistiche e ricreative. Organizzazione eventi, gestione impianti sportivi.',
      },
    ],
  },
  {
    titolo: 'Titolo III – Soci',
    articoli: [
      {
        num: 'Art. 4',
        text: 'Numero illimitato di soci, persone fisiche che condividano gli scopi associativi.',
      },
      {
        num: 'Art. 5',
        text: 'Ammissione su richiesta al Consiglio Direttivo.',
      },
      {
        num: 'Art. 6',
        text: 'Diritti: partecipare alle attività, votare in assemblea (se maggiorenni), elettorato attivo e passivo. Doveri: osservare lo statuto, contribuire alle spese.',
      },
      {
        num: 'Art. 7',
        text: 'Quota associativa annuale deliberata dal Consiglio Direttivo. Non rimborsabile né trasmissibile.',
      },
    ],
  },
  {
    titolo: 'Titolo IV – Recesso e Esclusione',
    articoli: [
      {
        num: 'Art. 8',
        text: 'Rapporto associativo a tempo indeterminato.',
      },
      {
        num: 'Art. 9',
        text: 'Recesso per iscritto al Consiglio Direttivo. Esclusione per violazione statuto, attività contrarie agli interessi dell\'associazione, danni gravi. Decadenza per morosità oltre tre mesi.',
      },
      {
        num: 'Art. 10',
        text: 'Delibere di esclusione comunicate per iscritto. Il socio ha 15 giorni per contestare convocando l\'Assemblea.',
      },
    ],
  },
  {
    titolo: 'Titolo V – Risorse Economiche e Fondo Comune',
    articoli: [
      {
        num: 'Art. 11',
        text: 'Risorse da: quote associative, contributi per manifestazioni sportive, donazioni, contributi pubblici, proventi da servizi. Il fondo comune non è ripartibile tra i soci.',
      },
      {
        num: 'Art. 12',
        text: 'Esercizio sociale dal 01/11 al 31/10. Bilancio approvato dall\'Assemblea entro quattro mesi dalla chiusura.',
      },
    ],
  },
  {
    titolo: 'Titolo VI – Organi dell\'Associazione',
    articoli: [
      {
        num: 'Art. 13',
        text: 'Organi: Assemblea degli associati, Consiglio Direttivo, Presidente, Collegio dei Revisori dei Conti.',
      },
      {
        num: 'Art. 14–18',
        text: 'Assemblee ordinarie e straordinarie. Convocazione con 20 giorni di preavviso. Voto singolo per i maggiorenni in regola con la quota.',
      },
      {
        num: 'Art. 19–20',
        text: 'Consiglio Direttivo: da 3 a 7 membri, durata 4 anni, rieleggibili.',
      },
      {
        num: 'Art. 21',
        text: 'Presidente: rappresentanza legale e firma dell\'associazione.',
      },
      {
        num: 'Art. 22',
        text: 'Collegio dei Revisori dei Conti: 3 membri effettivi e 2 supplenti, controllo amministrativo.',
      },
      {
        num: 'Art. 23',
        text: 'Pubblicità e trasparenza degli atti. I soci hanno diritto di accesso ai libri sociali.',
      },
    ],
  },
  {
    titolo: 'Titolo VII – Scioglimento',
    articoli: [
      {
        num: 'Art. 24',
        text: 'In caso di scioglimento, beni residui devoluti a enti che promuovano l\'attività sportiva.',
      },
    ],
  },
  {
    titolo: 'Norma Finale',
    articoli: [
      {
        num: 'Art. 25',
        text: 'Per quanto non previsto, si applicano le norme del Codice civile e dell\'ordinamento sportivo.',
      },
    ],
  },
]

export default function StatutoPage() {
  return (
    <div className={headerStyles.wrapper}>
      <header className={headerStyles.header}>
        <div className={headerStyles.headerLogo}>
          <Image src="/logo.png" alt="Sesia Running Vercelli" width={52} height={52} className={headerStyles.logoImg} />
          <div>
            <div className={headerStyles.headerTitle}>Sesia Running Vercelli</div>
            <div className={headerStyles.headerSub}>Stagione 25-26</div>
          </div>
        </div>
        <nav className={headerStyles.nav}>
          <Link href="/" className={headerStyles.navLink}>Home</Link>
          <Link href="/classifica" className={headerStyles.navLink}>Classifica</Link>
          <Link href="/regole" className={headerStyles.navLink}>Regole</Link>
          <Link href="/statuto" className={`${headerStyles.navLink} ${headerStyles.navActive}`}>Statuto</Link>
          <Link href="/admin" className={headerStyles.navLink}>Admin</Link>
        </nav>
      </header>

      <div className={styles.content}>
        <h1 className={styles.pageTitle}>Statuto Associativo</h1>
        <p className={styles.pageSubtitle}>
          A.S.D. Sesia Running Vercelli — approvato dall&apos;Assemblea dei soci
        </p>

        <a href="/Statuto%20sesia%20running.pdf" download className={styles.downloadBtn}>
          ↓ Scarica PDF
        </a>

        {STATUTO.map((sezione) => (
          <section key={sezione.titolo} className={styles.titolo}>
            <div className={styles.titoloHeader}>{sezione.titolo}</div>
            {sezione.articoli.map((art) => (
              <div key={art.num} className={styles.articolo}>
                <div className={styles.artNum}>{art.num}</div>
                <p className={styles.artText}>{art.text}</p>
              </div>
            ))}
          </section>
        ))}
      </div>
    </div>
  )
}
