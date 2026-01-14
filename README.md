# 🔐 Cyber Security Tools Web App (Final)

Full-stack Cyber Security Tools Web App with:

- **Frontend:** React + Vite + TailwindCSS
- **Backend:** Node.js + Express
- **Database:** MongoDB (Atlas)
- **Auth:** Access Token + Refresh Token (auto refresh)
- **RBAC:** USER / ANALYST / ADMIN
- **Admin:** Dashboard + User Management + Settings
- **Tools:** Password strength, Hash generator, AES crypto, URL scan, Port scan (advanced), WHOIS, VirusTotal, PDF export
- **History:** Stores tool usage logs in MongoDB

---

## ✅ Local Run

### Backend
```bash
cd backend
npm install
npm run dev
```

Create `backend/.env` from `.env.example`.

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Create `frontend/.env` from `.env.example`.

---

## ✅ Deployment

### Backend (Render)
- Root directory: `backend`
- Build: `npm install`
- Start: `npm start`
- Add env vars (see `.env.example`)

### Frontend (Netlify)
- Base dir: `frontend`
- Build: `npm run build`
- Publish: `frontend/dist`
- Env var:
  - `VITE_API_BASE_URL=https://<your-render-backend>.onrender.com`

---

## ⚠️ Disclaimer
Use scanners responsibly. Do not scan targets without permission.
