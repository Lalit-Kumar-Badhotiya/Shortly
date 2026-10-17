# Shortly
URL shortener

Express 5 + Drizzle (PostgreSQL) backend, React + Tailwind frontend, JWT auth with email/password and "Continue with Google".

## Setup

### Backend (`Backend/`)
1. `npm install`
2. Copy `.env.example` to `.env` and fill in the values
3. `npm run db:push` — creates/updates the tables (applies the Google OAuth columns)
4. `npm run dev`

### Frontend (`Frontend/`)
1. `npm install`
2. Copy `.env.example` to `.env` and set `REACT_APP_GOOGLE_CLIENT_ID`
3. `npm start` — runs on http://localhost:3000

### Google sign-in setup
1. Open the [Google Cloud Console credentials page](https://console.cloud.google.com/apis/credentials)
2. Create an **OAuth client ID** → type **Web application**
3. Under **Authorized JavaScript origins** add `http://localhost:3000` (add your production origin later)
4. No redirect URI is needed — the Google button returns its token on-page
5. Paste the client ID in both `.env` files:
   - `Frontend/.env` → `REACT_APP_GOOGLE_CLIENT_ID=...`
   - `Backend/.env` → `GOOGLE_CLIENT_ID=...`
6. Restart both dev servers (CRA bakes env vars at startup)

## How Google auth works
- The frontend loads Google Identity Services and renders the official button
- Google returns an ID token → sent to `POST /user/auth/google`
- The backend verifies the token with `google-auth-library`, then:
  - creates a new user if none exists (no password — Google accounts have `password/salt = null`),
  - links the Google id to the existing account if the email already signed up,
  - issues your app JWT in both cases
