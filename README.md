# Sesia Running Vercelli — Portale Classifica

Sito ufficiale dell'A.S.D. Sesia Running Vercelli.  
Classifica societaria stagione 2024-25, aggiornabile via upload Excel dal pannello admin.

## Stack

- **Next.js 14** (App Router) + TypeScript
- **Vercel** per deploy e hosting
- **xlsx** per parsing dei file Excel
- Persistenza su file JSON (swappabile con Supabase)

## Setup locale

```bash
npm install
npm run dev
# → http://localhost:3000
```

## Deploy su Vercel

1. Crea repo su GitHub e fai push di questo progetto
2. Vai su [vercel.com](https://vercel.com) → **Add New Project** → importa il repo
3. Imposta le variabili d'ambiente:

| Variabile | Valore |
|-----------|--------|
| `ADMIN_SECRET` | una stringa segreta a scelta (es. `sesia2425!`) |
| `NEXT_PUBLIC_ADMIN_SECRET` | stessa stringa (usata dal client admin) |

4. Deploy → il sito è live

## Come aggiornare la classifica

1. Vai su `https://tuosito.vercel.app/admin`
2. Carica il file `.xlsx` con le colonne: `Nome`, `Punti`, `Numero Gare`, `Numero Ritrovi`
3. Clicca **Pubblica classifica** — la classifica pubblica si aggiorna istantaneamente

## Struttura colonne Excel attesa

```
| Nome Classifica      | PUNTI | NUMERO GARE | NUMERO RITROVI |
|----------------------|-------|-------------|----------------|
| Daniele Fiorentino   | 48    | 4           | 7              |
```

Il parser riconosce varianti delle intestazioni (es. `nome`, `Nome`, `punti`, `Punti`).

## Roadmap futura

- [ ] Connessione Supabase per persistenza permanente (no file system)
- [ ] Autenticazione admin con NextAuth
- [ ] Storico aggiornamenti persistente
- [ ] Sezione eventi/calendario gare
- [ ] Pagina singolo atleta con storico personale
- [ ] Versione mobile ottimizzata
