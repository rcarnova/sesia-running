// src/app/page.tsx
import Image from 'next/image'
import Link from 'next/link'
import styles from './home.module.css'
import ScrollReveal from './ScrollReveal'
import photosJson from '../../public/gallery/photos.json'

export const dynamic = 'force-dynamic'

const tappe = [
  { numero: 1, nome: "Vercelli che Corre",    data: "2026-03-29", luogo: "Vercelli (VC)",          ritrovo: "ore 9:00" },
  { numero: 2, nome: "Rive Run",               data: "2026-05-24", luogo: "Rive (VC)",              ritrovo: "ore 8:30" },
  { numero: 3, nome: "Prarolo Run",            data: "2026-06-05", luogo: "Prarolo (VC)",           ritrovo: "ore 18:00" },
  { numero: 4, nome: "Borgo di Notte",         data: "2026-07-07", luogo: "Borgovercelli (VC)",     ritrovo: "ore 18:00" },
  { numero: 5, nome: "Strapagiun",             data: "2026-08-16", luogo: "Stroppiana (VC)",        ritrovo: "ore 18:00" },
  { numero: 6, nome: "Corriparco",             data: "2026-08-27", luogo: "Albano Vercellese (VC)", ritrovo: "ore 18:00" },
  { numero: 7, nome: "Lungo le Vie d'Acqua",   data: "2026-09-11", luogo: "Formigliana (VC)",       ritrovo: "ore 18:00" },
]

export default function HomePage() {
  const today = new Date()
  const nextTappa = tappe.find(t => new Date(t.data) >= today) ?? null
  const daysTo = nextTappa
    ? Math.ceil((new Date(nextTappa.data).getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    : null

  const randomPhoto = photosJson[Math.floor(Math.random() * photosJson.length)]

  return (
    <>
      <ScrollReveal />

      {/* NAV */}
      <nav className={styles.nav}>
        <div className={styles.navLogo}>
          <Image src="/logo.png" alt="Sesia Running Vercelli" width={36} height={36} className={styles.navLogoImg} />
          A.S.D. SESIA RUNNING
        </div>
        <ul className={styles.navLinks}>
          <li><Link href="/" className={`${styles.navLink} ${styles.navActive}`}>HOME</Link></li>
          <li><Link href="/classifica" className={styles.navLink}>CLASSIFICA</Link></li>
          <li><Link href="/circuito"   className={styles.navLink}>CIRCUITO</Link></li>
          <li><Link href="/regole" className={styles.navLink}>REGOLE</Link></li>
          <li><Link href="/statuto" className={styles.navLink}>STATUTO</Link></li>
          <li><Link href="/gallery" className={styles.navLink}>GALLERIA</Link></li>
          <li><Link href="/admin" className={styles.navLink}>ADMIN</Link></li>
        </ul>
      </nav>

      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroDiagonal} />
        <div className={styles.heroImageWrap}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/gallery/${encodeURIComponent(randomPhoto.src)}`}
            alt={randomPhoto.caption}
            className={styles.heroImage}
          />
          <div className={styles.heroImageOverlay} />
        </div>
        <div className={styles.heroContent}>
          <p className={styles.heroEyebrow}>A.S.D. Sesia Running Vercelli</p>
          <h1 className={styles.heroHeadline}>
            <span>CORRI.</span>
            <span>SUDA.</span>
            <span className={styles.wordVinci}>VINCI.</span>
          </h1>
          <p className={styles.heroSub}>A.S.D. Sesia Running Vercelli — dal 2000</p>
          <a href="#iscriviti" className={styles.btnCta}>VIENI A CORRERE CON NOI →</a>
        </div>
        <div className={styles.heroSideText}>VERCELLI · PIEMONTE · ITALIA</div>
        <div className={styles.heroBottomStripe} />
      </section>

      {/* MANIFESTO */}
      <section className={styles.manifesto}>
        <div className={styles.manifestoBar}>
          <div className={styles.manifestoItem}>PODISMO</div>
          <div className={styles.manifestoItem}>SOCIALITÀ</div>
          <div className={styles.manifestoItem}>VERCELLI</div>
        </div>
      </section>

      {/* CHI SIAMO */}
      <section className={styles.chiSiamo}>
        <div className={styles.reveal}>
          <p className={styles.sectionLabel}>La nostra storia</p>
          <h2 className={styles.sectionTitle}>CHI SIAMO</h2>
        </div>
        <div className={styles.chiSiamoGrid}>
          <div className={styles.reveal}>
            <div className={styles.statHero}>
              <div className={styles.statBigNum}>96</div>
              <div className={styles.statBigLabel}>TESSERATI</div>
            </div>
            <p className={styles.chiSiamoText}>
              Siamo una società sportiva dilettantistica affiliata UISP, nata a Vercelli nell&apos;ottobre 2000.
              Organizziamo gare, ritrovi mensili di gruppo e promuoviamo la pratica del podismo per tutti i livelli.
              Nessun obbligo di gare minime — solo la voglia di correre insieme.
            </p>
          </div>
          <div className={`${styles.statCards} ${styles.reveal}`}>
            <div className={styles.statCard}>
              <div className={styles.statCardNum}>10€</div>
              <div className={styles.statCardLabel}>Quota annuale</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statCardNum}>1×</div>
              <div className={styles.statCardLabel}>Ritrovo al mese</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statCardNum}>2000</div>
              <div className={styles.statCardLabel}>Anno di fondazione</div>
            </div>
          </div>
        </div>
      </section>

      {/* ISCRIVITI */}
      <section id="iscriviti" className={styles.iscriviti}>
        <div className={styles.reveal}>
          <p className={styles.sectionLabelAqua}>Entra nel team</p>
          <h2 className={styles.sectionTitleWhite}>UNISCITI ALLA SQUADRA</h2>
        </div>
        <div className={styles.iscrivitiGrid}>
          <ol className={`${styles.stepsList} ${styles.reveal}`}>
            <li className={styles.stepItem}>
              <div className={styles.stepNum}>1</div>
              <div>
                <div className={styles.stepTitle}>CONTATTA IL PRESIDENTE</div>
                <div className={styles.stepDetail}>
                  Manuel Lucchini<br />
                  📞 <a href="tel:+393206437356" className={styles.stepLink}>320 6437356</a><br />
                  ✉ <a href="mailto:asdsesiarunning@libero.it" className={styles.stepLink}>asdsesiarunning@libero.it</a>
                </div>
              </div>
            </li>
            <li className={styles.stepItem}>
              <div className={styles.stepNum}>2</div>
              <div>
                <div className={styles.stepTitle}>FORNISCI I TUOI DATI</div>
                <div className={styles.stepDetail}>
                  Nome, cognome, residenza, data di nascita, codice fiscale, e-mail, taglia t-shirt
                </div>
              </div>
            </li>
            <li className={styles.stepItem}>
              <div className={styles.stepNum}>3</div>
              <div>
                <div className={styles.stepTitle}>EFFETTUA IL VERSAMENTO</div>
                <div className={styles.stepDetail}>
                  Bonifico di 10€ a:<br />
                  A.S.D. Sesia Running<br />
                  <span className={styles.iban}>IBAN IT04D0503410000000000941983</span>
                </div>
              </div>
            </li>
            <li className={styles.stepItem}>
              <div className={styles.stepNum}>4</div>
              <div>
                <div className={styles.stepTitle}>RICEVI IL TESSERINO UISP</div>
                <div className={styles.stepDetail}>
                  Via e-mail. Scarica l&apos;app UISP — valido per tutte le gare UISP d&apos;Italia
                </div>
              </div>
            </li>
          </ol>
          <div className={styles.reveal}>
            <div className={styles.cosaOttieni}>
              <div className={styles.cosaTitle}>COSA OTTIENI</div>
              <ul className={styles.cosaList}>
                <li><span className={styles.check}>✓</span> T-shirt con logo societario di benvenuto</li>
                <li><span className={styles.check}>✓</span> Chat WhatsApp e mailing list del club</li>
                <li><span className={styles.check}>✓</span> Ritrovi mensili di gruppo</li>
                <li><span className={styles.check}>✓</span> Classifica societaria di fine stagione</li>
                <li><span className={styles.check}>✓</span> Convenzione Campo CONI per allenamenti</li>
                <li><span className={styles.check}>✓</span> Convenzione SALUS Vercelli (fisioterapia e visite)</li>
                <li><span className={styles.check}>✓</span> Convenzione Osteopata (Dr. Sebastiano Di Pasquale)</li>
                <li><span className={styles.check}>✓</span> Accesso portale Errea per divise societarie</li>
              </ul>
              <p className={styles.iscrivitiNote}>
                Il tesseramento è valido dal 1 novembre al 31 ottobre.<br />
                È richiesto certificato medico sportivo agonistico.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CSR26 TEASER */}
      <section className={styles.csrTeaser}>
        <div className={styles.csrBadge}>CSR26</div>
        <h2 className={styles.csrTitle}>2° CIRCUITO SESIA RUNNING 2026</h2>
        <p className={styles.csrSub}>7 tappe nella Provincia di Vercelli · Marzo — Settembre 2026</p>

        {nextTappa && (
          <div className={styles.csrNextCard}>
            <div className={styles.csrNextLabel}>PROSSIMA TAPPA</div>
            <div className={styles.csrNextName}>{nextTappa.nome}</div>
            <div className={styles.csrNextDetail}>
              {new Date(nextTappa.data).toLocaleDateString('it-IT',
                { day: 'numeric', month: 'long', year: 'numeric' })} · {nextTappa.luogo} · Ritrovo {nextTappa.ritrovo}
            </div>
            <div className={styles.csrCountdown}>
              <span className={styles.csrDays}>{daysTo}</span>
              <span className={styles.csrDaysLabel}>giorni al via</span>
            </div>
          </div>
        )}

        <a href="/circuito" className={styles.csrCta}>
          VEDI IL PROGRAMMA COMPLETO →
        </a>
      </section>

      {/* CLASSIFICA TEASER */}
      <section className={styles.classificaTeaser}>
        <div className={styles.reveal}>
          <p className={styles.sectionLabel}>Stagione 2025–26</p>
          <h2 className={styles.sectionTitleSmall}>CLASSIFICA SOCIETARIA 2025–26</h2>
          <div className={styles.classificaDeco}>
            <span style={{ width: '80px' }} />
            <span style={{ width: '16px', background: 'var(--sr-green)' }} />
            <span style={{ width: '80px' }} />
          </div>
          <p className={styles.classificaSub}>Ogni gara conta. Ogni ritrovo conta. Chi si impegna viene premiato.</p>
          <Link href="/classifica" className={styles.btnClassifica}>VEDI LA CLASSIFICA COMPLETA →</Link>
        </div>
      </section>
    </>
  )
}
