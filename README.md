# GirleeBag Boutique Store

A premium boutique e-commerce site for GirleeBag, hosted on Vercel with Stripe checkout.

---

## ⚠️ CRITICAL: File Structure & Deployment Workflow

This project has **two folders** that must be kept in sync. **Always read this before making changes.**

### Folder Structure

```
GirleeBag rebuild/          ← WORKING DIRECTORY (edit files here)
│   index.html
│   script.js
│   style.css
│   thebunker.html
│   contact.html
│   products.js
│   success.html
│   package.json
│   api/
│       create-checkout.js
│
└── GirleeBag/              ← VERCEL DEPLOYMENT REPO (must be kept in sync)
        index.html          ← Vercel serves THIS copy
        script.js           ← Vercel serves THIS copy
        style.css
        thebunker.html
        contact.html
        products.js
        success.html
        package.json
        api/
            create-checkout.js
```

### Why Two Folders?

- All edits are made in the **`GirleeBag rebuild/`** root (the working directory)
- **`GirleeBag/`** is a separate git repository connected to Vercel at `https://github.com/JaceBillion/GirleeBag.git`
- Vercel auto-deploys from the `GirleeBag/` repo whenever it receives a push
- The outer folder (`GirleeBag rebuild/`) is connected to `https://github.com/JaceBillion/GirleeBag-rebuild.git` (not used by Vercel)

---

## 🔄 Deployment Workflow (MUST FOLLOW EVERY TIME)

### Step 1 — Make edits in `GirleeBag rebuild/` root (as normal)

### Step 2 — Copy changed files to the `GirleeBag/` subfolder

```bash
# Copy individual files you changed, for example:
cp script.js GirleeBag/script.js
cp index.html GirleeBag/index.html
cp style.css GirleeBag/style.css
cp thebunker.html GirleeBag/thebunker.html
cp -r api/ GirleeBag/api/
```

Or copy everything at once:
```bash
cp script.js index.html style.css thebunker.html contact.html products.js success.html package.json GirleeBag/ && cp -r api/ GirleeBag/api/
```

### Step 3 — Commit and push via GitHub Desktop

1. Open **GitHub Desktop**
2. Switch **Current Repository** to **"GirleeBag"** (not "GirleeBag rebuild")
3. You'll see the changed files listed
4. Add a commit summary and click **"Commit to main"**
5. Click **"Push origin"**

### Step 4 — Vercel auto-deploys

Vercel detects the push and deploys in ~60 seconds. Watch for ✅ **Ready** status at vercel.com.

---

## 🔐 Admin Access (The Bunker)

- **URL:** `/thebunker.html`
- **Password:** stored in `thebunker.html` inline login button onclick handler
- **Recovery Key:** `GIRLEE-RESCUE-2026-HQ`
- Login is fully self-contained in the HTML — does not depend on `script.js`

## 💳 Stripe Checkout

- **Method:** Vercel Serverless Function at `/api/create-checkout.js`
- **Environment Variables required in Vercel:**
  - `STRIPE_SECRET_KEY` — Stripe secret key (`sk_test_...` or `sk_live_...`)
  - `SITE_URL` — Live URL e.g. `https://girleebag.vercel.app`
- Uses inline `price_data` — no Stripe Price IDs needed in `products.js`
- Individual "Buy Now" links on products use `stripeLink` in `products.js`

## 🛍️ Adding / Editing Products

Edit `products.js` in the working directory root. Each product has:
- `name`, `description`, `price` — display info
- `stripeLink` — individual buy.stripe.com link for "Buy Now"
- `images[]` — array of image paths from `assets/images/`
- `category` — comma-separated tags

After editing, copy `products.js` to `GirleeBag/products.js` and push.

---

## 🚀 Tech Stack

- **Frontend:** Vanilla HTML, CSS, JavaScript
- **Hosting:** Vercel (free tier)
- **Payments:** Stripe Checkout (via Vercel serverless function)
- **Database:** Supabase (VIP email capture)
- **Fonts:** Google Fonts (Outfit)
- **Icons:** Font Awesome 6

---

*Last updated: April 2026*
