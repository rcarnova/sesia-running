// src/app/page.tsx
'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './home.module.css'

export default function HomePage() {
  useEffect(() => {
    const reveals = document.querySelectorAll<HTMLElement>(`.${styles.reveal}`)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add(styles.visible)
            observer.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12 }
    )
    reveals.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* NAV */}
      <nav className={styles.nav}>
        <div className={styles.navLogo}>
          <Image src="/logo.png" alt="Sesia Running Vercelli" width={36} height={36} className={styles.navLogoImg} />
          A.S.D. SESIA RUNNING
        </div>
        <ul className={styles.navLinks}>
          <li><Link href="/" className={`${styles.navLink} ${styles.navActive}`}>HOME</Link></li>
          <li><Link href="/classifica" className={styles.navLink}>CLASSIFICA</Link></li>
          <li><Link href="/regole" className={styles.navLink}>REGOLE</Link></li>
          <li><Link href="/statuto" className={styles.navLink}>STATUTO</Link></li>
          <li><Link href="/gallery" className={styles.navLink}>GALLERIA</Link></li>
          <li><Link href="/admin" className={styles.navLink}>ADMIN</Link></li>
        </ul>
      </nav>

      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroDiagonal} />
        <div className={styles.heroGreenStripe} />
        <div className={styles.heroFrog}>
          <svg width="420" height="420" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="30" cy="36" rx="18" ry="14" fill="#4a9a3f"/>
            <circle cx="20" cy="20" r="9" fill="#4a9a3f"/>
            <circle cx="40" cy="20" r="9" fill="#4a9a3f"/>
            <circle cx="20" cy="19" r="5" fill="white"/>
            <circle cx="40" cy="19" r="5" fill="white"/>
            <circle cx="21" cy="19" r="3" fill="#111"/>
            <circle cx="41" cy="19" r="3" fill="#111"/>
            <path d="M22 42 Q30 49 38 42" stroke="#1a4f8a" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
            <path d="M13 44 L5 52 L10 54" stroke="#4a9a3f" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            <path d="M47 44 L55 52 L50 54" stroke="#4a9a3f" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
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
