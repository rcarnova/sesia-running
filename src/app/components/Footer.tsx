import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.col}>
        <div className={styles.name}>A.S.D. Sesia Running Vercelli</div>
        <div className={styles.detail}>Corso Avogadro di Quaregna 49/C — Vercelli</div>
        <div className={styles.detail}>C.F. 94028730029</div>
      </div>
      <div className={styles.col}>
        <div className={styles.detail}>📧 asdsesiarunning@libero.it</div>
        <div className={styles.detail}>📞 320 6437356</div>
        <div className={styles.detail}>Affiliata UISP · Stagione 2025-26</div>
      </div>
      <div className={styles.col}>
        <a href="https://www.facebook.com/people/ASD-Sesia-Running/61550875047800/"
           target="_blank" rel="noopener noreferrer" className={styles.social}>
          Facebook
        </a>
        <a href="https://www.instagram.com/asd_sesia_running/"
           target="_blank" rel="noopener noreferrer" className={styles.social}>
          Instagram
        </a>
        <a href="/statuto" className={styles.social}>Statuto</a>
      </div>
    </footer>
  )
}
