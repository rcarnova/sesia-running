// src/app/societa/page.tsx
// Shop ufficiale, convenzioni per i tesserati e partner della stagione.
// Fonte: documenti societari 26-27 inviati da Manuel il 18/11/2026.
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import headerStyles from '../page.module.css'
import styles from './societa.module.css'
import { STAGIONE_BREVE } from '@/lib/stagione'

export const metadata: Metadata = {
  title: 'Società: shop, convenzioni e partner | Sesia Running Vercelli',
  description: 'Lo shop ufficiale Erreà, le convenzioni riservate ai tesserati e i partner di Sesia Running Vercelli.',
}

type Voce = { nome: string; ruolo: string; dove?: string }

// Recapiti telefonici volutamente non pubblicati: si ottengono dalla società.
const CONVENZIONI: Voce[] = [
  { nome: 'Sebastiano Di Pasquale', ruolo: 'Osteopata', dove: 'Via Calatafimi 18, Vercelli · su appuntamento' },
  { nome: 'Manuela Genti', ruolo: 'Massaggiatrice sportiva', dove: 'Via Guala Bicheri 4, Vercelli · su appuntamento' },
  { nome: 'Michele Rodighiero', ruolo: 'Massaggiatore sportivo' },
  { nome: 'Francesca Archero', ruolo: 'Biologa nutrizionista', dove: 'Via Adua 9, Vercelli · su appuntamento' },
  { nome: 'Marco Donelli', ruolo: 'Tecnico FIDAL' },
  { nome: 'Luca Alfonso', ruolo: 'Tecnico FIDAL, FIN, FITRI · Personal trainer' },
]

const PARTNER: Voce[] = [
  { nome: 'Erreà Play Vercelli', ruolo: 'Abbigliamento tecnico ufficiale' },
  { nome: 'Tipografia Gallo Arti Grafiche', ruolo: 'Stampa' },
  { nome: 'Riseria Baucero', ruolo: 'Riseria' },
  { nome: 'Riseria Cascina Brarola', ruolo: 'Riseria' },
  { nome: 'Farmacia Gallo', ruolo: 'Farmacia' },
  { nome: 'Salus Vercelli', ruolo: 'Fisioterapia e visite medico sportive' },
  { nome: "Osteria dal Cantune'", ruolo: 'Ristorazione' },
]

export default function SocietaPage() {
  return (
    <div className={headerStyles.wrapper}>
      <header className={headerStyles.header}>
        <div className={headerStyles.headerLogo}>
          <Image src="/logo.png" alt="Sesia Running Vercelli" width={52} height={52} className={headerStyles.logoImg} />
          <div>
            <div className={headerStyles.headerTitle}>Sesia Running Vercelli</div>
            <div className={headerStyles.headerSub}>Shop, convenzioni e partner</div>
          </div>
        </div>
        <nav className={headerStyles.nav}>
          <Link href="/"          className={headerStyles.navLink}>Home</Link>
          <Link href="/classifica" className={headerStyles.navLink}>Classifica</Link>
          <Link href="/gare"      className={headerStyles.navLink}>Gare</Link>
          <Link href="/circuito"  className={headerStyles.navLink}>Circuito</Link>
          <Link href="/regole"    className={headerStyles.navLink}>Regole</Link>
          <Link href="/societa"   className={`${headerStyles.navLink} ${headerStyles.navActive}`}>Società</Link>
          <Link href="/statuto"   className={headerStyles.navLink}>Statuto</Link>
          <Link href="/gallery"   className={headerStyles.navLink}>Galleria</Link>
          <Link href="/admin"     className={headerStyles.navLink}>Admin</Link>
        </nav>
      </header>

      <div className={styles.hero}>
        <span className={styles.heroBadge}>STAGIONE {STAGIONE_BREVE}</span>
        <h1 className={styles.heroTitle}>La società</h1>
        <p className={styles.heroSub}>
          <a href="#shop">Shop ufficiale</a> · <a href="#convenzioni">Convenzioni</a> · <a href="#partner">Partner</a>
        </p>
      </div>

      <div className={styles.content}>

        {/* SHOP */}
        <section id="shop" className={styles.section}>
          <h2 className={styles.sectionTitle}>Shop ufficiale Erreà</h2>
          <div className={styles.shop}>
            <a href="/documenti/shop-errea-teamsmart.pdf" target="_blank" rel="noopener" className={styles.shopImgWrap}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/documenti/errea-teamsmart.jpg" alt="Locandina dello shop ufficiale Sesia Running su Erreà Team Smart" className={styles.shopImg} />
            </a>
            <div className={styles.shopText}>
              <p>
                Tutto l&apos;abbigliamento ufficiale della società, dalla divisa da gara alla tuta di rappresentanza,
                si acquista online su Erreà Team Smart. Ti registri una volta e ordini quando vuoi.
              </p>
              <ol className={styles.steps}>
                <li>Vai su <strong>teamsmart.errea.com</strong> e registrati</li>
                <li>Inserisci il codice società <span className={styles.code}>AVOAEC</span></li>
                <li>Scegli i prodotti, paga online e scegli la consegna</li>
              </ol>
              <a href="https://teamsmart.errea.com" target="_blank" rel="noopener" className={styles.cta}>
                VAI ALLO SHOP →
              </a>
              <p className={styles.small}>
                Showroom Vercelli: Piazza Palazzo Vecchio (Piazza dei Pesci).
                Assistenza: <a href="mailto:customercare-at@sport-point.it">customercare-at@sport-point.it</a> · 0141 1808197.
                <br />
                <a href="/documenti/shop-errea-teamsmart.pdf" target="_blank" rel="noopener">Istruzioni e tabella taglie (PDF)</a>
              </p>
            </div>
          </div>
        </section>

        {/* CONVENZIONI */}
        <section id="convenzioni" className={styles.section}>
          <h2 className={styles.sectionTitle}>Convenzioni per i tesserati</h2>
          <p className={styles.intro}>
            Professionisti che offrono ai tesserati Sesia Running servizi a condizioni agevolate.
            Presentati come tesserato Sesia Running.
          </p>
          <div className={styles.grid}>
            {CONVENZIONI.map((v) => (
              <div key={v.nome} className={styles.card}>
                <div className={styles.cardRuolo}>{v.ruolo}</div>
                <div className={styles.cardNome}>{v.nome}</div>
                {v.dove && <div className={styles.cardDove}>📍 {v.dove}</div>}
              </div>
            ))}
          </div>
          <p className={styles.small}>
            I recapiti dei professionisti sono nel documento convenzioni inviato ai tesserati.
            Se non lo trovi scrivi a <a href="mailto:asdsesiarunning@libero.it">asdsesiarunning@libero.it</a>.
          </p>
        </section>

        {/* PARTNER */}
        <section id="partner" className={styles.section}>
          <h2 className={styles.sectionTitle}>I nostri partner</h2>
          <p className={styles.intro}>
            Le realtà che collaborano con l&apos;associazione nelle attività della stagione. Grazie!
          </p>
          <div className={styles.grid}>
            {PARTNER.map((v) => (
              <div key={v.nome} className={`${styles.card} ${styles.cardPartner}`}>
                <div className={styles.cardRuolo}>{v.ruolo}</div>
                <div className={styles.cardNome}>{v.nome}</div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}
