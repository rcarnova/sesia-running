// src/app/regole/page.tsx
import Image from 'next/image'
import Link from 'next/link'
import styles from './regole.module.css'
import headerStyles from '../page.module.css'

const REGOLE = [
  { pts: '1', desc: 'Per ogni anno di anzianità (da stagione 22/23)' },
  { pts: '1', desc: 'Gara conclusa ≤ 5 km' },
  { pts: '2', desc: 'Gara conclusa 5,1 – 10 km' },
  { pts: '2', desc: 'Partecipazione a ritrovo societario' },
  { pts: '2', desc: 'Piazzamento sul podio di categoria' },
  { pts: '4', desc: 'Gara conclusa 10,1 – 15 km' },
  { pts: '6', desc: 'Gara conclusa 15,1 – 21,1 km (mezza maratona)' },
  { pts: '8', desc: 'Gara conclusa 21,2 – 30 km' },
  { pts: '15', desc: 'Gara conclusa 30,1 – 42,2 km (maratona)' },
  { pts: '20', desc: 'Gara conclusa 42,3 – 60 km' },
  { pts: '25', desc: 'Gara conclusa 60,1 – 100 km (ultra)' },
]

const BONUS = [
  { pts: '+10', desc: 'Al raggiungimento della 10ª gara annua' },
  { pts: '+20', desc: 'Al raggiungimento della 20ª gara annua' },
  { pts: '+30', desc: 'Al raggiungimento della 30ª gara annua' },
  { pts: '+40', desc: 'Al raggiungimento della 40ª gara annua' },
]

export default function RegolePage() {
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
          <Link href="/circuito"   className={headerStyles.navLink}>Circuito</Link>
          <Link href="/regole" className={`${headerStyles.navLink} ${headerStyles.navActive}`}>Regole</Link>
          <Link href="/statuto" className={headerStyles.navLink}>Statuto</Link>
          <Link href="/gallery" className={headerStyles.navLink}>Galleria</Link>
          <Link href="/admin" className={headerStyles.navLink}>Admin</Link>
        </nav>
      </header>

      <div className={styles.content}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Sistema a punti</h2>
          <div className={styles.grid}>
            {REGOLE.map((r) => (
              <div key={r.desc} className={styles.ruleCard}>
                <div className={styles.rulePts}>{r.pts}</div>
                <div className={styles.ruleDesc}>{r.desc}</div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Bonus gare cumulate</h2>
          <div className={styles.grid}>
            {BONUS.map((b) => (
              <div key={b.desc} className={styles.ruleCard}>
                <div className={`${styles.rulePts} ${styles.ptsBonus}`}>{b.pts}</div>
                <div className={styles.ruleDesc}>{b.desc}</div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Premio stagionale</h2>
          <div className={styles.rewardCard}>
            <div className={styles.rewardPts}>60 punti</div>
            <div className={styles.rewardText}>
              Chi raggiunge 60 punti ottiene il <strong>tesseramento gratuito</strong> per la stagione successiva.
              Le gare corse con tessera FIDAL non sono conteggiate.
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
