# 🚀 SVS Fitness Deployment Guide (Production & Free Hosting)

Follow this step-by-step guide to deploy your **SVS Fitness** website (Frontend, Backend, and Database) so anyone on the internet can access it with a live URL.

---

## 🏗️ Architecture Overview

| Component | Technology | Recommended Free / Low-Cost Hosting |
| :--- | :--- | :--- |
| **Frontend** | HTML, CSS, JavaScript / React | **Vercel**, **Netlify**, or **GitHub Pages** |
| **Backend API** | Node.js + Express | **Render.com**, **Railway.app**, or **Fly.io** |
| **Database** | MySQL | **Aiven.io**, **PlanetScale**, or **Railway MySQL** |

---

## Method 1: The Easiest Free Deployment (Render + Vercel + Aiven)

### Step 1: Push Code to GitHub
1. Create a free account on [GitHub](https://github.com).
2. Create a new repository named `svs-fitness-portal`.
3. In your local terminal, run:
```bash
cd "c:\Users\HP\Desktop\web development\gym-portal"
git init
git add .
git commit -m "Initial commit for SVS Fitness"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/svs-fitness-portal.git
git push -u origin main
```

---

### Step 2: Deploy Backend to [Render.com](https://render.com) (FREE)
1. Sign up on **Render.com** (sign in with GitHub).
2. Click **"New +"** ➔ **"Web Service"**.
3. Select your `svs-fitness-portal` GitHub repository.
4. Fill in the service configuration:
   - **Name**: `svs-fitness-api`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Instance Type**: `Free`
5. Click **"Create Web Service"**.
6. Render will generate your live backend URL (e.g., `https://svs-fitness-api.onrender.com`).

---

### Step 3: Deploy Frontend to [Vercel](https://vercel.com) (FREE)
1. Sign up on **Vercel** with GitHub.
2. Click **"Add New..."** ➔ **"Project"**.
3. Import your `svs-fitness-portal` repository.
4. Set **Root Directory** to `frontend`.
5. Click **"Deploy"**.
6. Vercel will give you a live website URL (e.g., `https://svs-fitness.vercel.app`).

---

### Step 4: Setup Free Cloud MySQL Database (Aiven / Railway)
1. Sign up on [Aiven.io](https://aiven.io) or [Railway.app](https://railway.app).
2. Create a **Free MySQL Service**.
3. Copy the database connection URL (`Host`, `User`, `Password`, `Port`).
4. In MySQL Workbench or terminal, connect using these credentials and run `database/schema.sql`.
5. Add the DB environment variables to your Render Backend settings:
   - `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`.

---

## Method 2: All-in-One Single Server Deployment (Full Stack on Render or VPS)

If you prefer hosting Frontend and Backend together in one single service, simply configure Express to serve the static frontend:

In `backend/server.js`:
```javascript
const path = require('path');
// Serve static frontend files
app.use(express.static(path.join(__dirname, '../frontend')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});
```

With this, you only need to deploy the **Backend Web Service**, and visiting `https://svs-fitness-api.onrender.com` will serve the entire frontend application.

---

## 🌐 Custom Domain Setup (e.g. `www.svsfitness.com`)
1. Purchase a domain from **Namecheap**, **GoDaddy**, or **Hostinger**.
2. In Vercel / Netlify dashboard, go to **Settings ➔ Domains**.
3. Add `svsfitness.com` and update the DNS **CNAME** / **A records** provided by Vercel.

