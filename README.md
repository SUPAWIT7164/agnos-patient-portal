# Agnos Patient Portal

Real-time patient registration portal built for the Agnos Front-end Developer candidate assignment.

Patients enter data on the **Patient Form**. Staff see every field update instantly on the **Staff View** through **Socket.IO** — no page refresh and no polling.

---

## Installation

```bash
npm install
```

Copy environment variables:

```bash
cp .env.example .env.local
```

Default values:

```env
NEXT_PUBLIC_WS_URL=http://localhost:3001
SOCKET_PORT=3001
CLIENT_ORIGIN=http://localhost:3000
```

---

## Run project

### Development (recommended)

Starts **Next.js** and the **Socket.IO server** together:

```bash
npm run dev
```

- Web app: http://localhost:3000
- Patient Form: http://localhost:3000/patient
- Staff View: http://localhost:3000/staff
- WebSocket server: http://localhost:3001
- Health check: http://localhost:3001/health

### Run separately

```bash
npm run dev:web      # Next.js only
npm run dev:socket   # Socket.IO only
```

### Production (local)

```bash
npm run build
npm start            # next start + socket server
```

---

## Deploy on Netlify

Netlify hosts the **Next.js frontend**.  
The **Socket.IO server cannot run on Netlify** (no persistent WebSocket process), so host it separately (Render is free and works well).

### Architecture in production

```text
Browser  →  Netlify (Next.js)  →  Socket.IO server (Render)
```

### 1) Deploy Socket.IO server (Render)

1. Push this repo to GitHub
2. Go to [https://render.com](https://render.com) → **New Web Service** → connect the repo
3. Settings:
   - **Build Command:** `npm install`
   - **Start Command:** `node server/index.mjs`
   - **Health Check Path:** `/health`
4. Environment variables on Render:
   - `CLIENT_ORIGIN` = `https://YOUR-SITE.netlify.app`  
     (add local too if needed: `http://localhost:3000,https://YOUR-SITE.netlify.app`)
5. Copy the Render URL, e.g. `https://agnos-patient-portal-socket.onrender.com`

> Tip: free Render services may sleep after idle. First reconnect can take ~30–60s.

### 2) Deploy Next.js on Netlify

1. Go to [https://app.netlify.com](https://app.netlify.com) → **Add new site** → **Import an existing project**
2. Connect the GitHub repo
3. Build settings (auto-detected via `netlify.toml`):
   - **Build command:** `npm run build`
   - **Node version:** `20`
4. Site environment variables (Netlify → Site configuration → Environment variables):
   - `NEXT_PUBLIC_WS_URL` = `https://YOUR-SOCKET-SERVER.onrender.com`
5. Deploy site
6. Update Render `CLIENT_ORIGIN` with your final Netlify URL, then redeploy the socket service if needed

### 3) Verify

1. Open the Netlify URL
2. Open `/patient` and `/staff` in two tabs
3. Confirm connection badge is **Live**
4. Type in the form — Staff View updates instantly

### Demo realtime sync (local)

1. Open `/patient` in one browser tab
2. Open `/staff` in another tab or window
3. Type in the Patient Form — Staff View updates within ~300ms
4. Confirm the **Live** connection badge is green
5. Wait ~5 seconds without typing — Staff View shows **Inactive**
6. Click **Save Patient** — Staff View shows **Submitted**

---

## Folder Structure

```text
agnos-patient-portal/
├── server/                 # Node.js Socket.IO server
│   └── index.mjs
├── shared/                 # Shared constants (client + server)
│   └── socketEvents.mjs
├── public/
│   └── agnos.jpg           # Brand logo
├── src/
│   ├── app/                # Next.js App Router pages
│   │   ├── patient/        # Patient Form page
│   │   └── staff/          # Staff View page
│   ├── components/
│   │   ├── layout/         # Header, Footer, AppShell, BrandLogo
│   │   ├── patient/        # PatientForm
│   │   ├── providers/      # Client providers
│   │   ├── staff/          # Staff dashboard + status badges
│   │   └── ui/             # Reusable UI primitives
│   ├── hooks/              # usePatientStore
│   ├── lib/                # config, constants, validations
│   ├── services/           # socket client + local store
│   ├── styles/             # design tokens
│   ├── types/              # TypeScript interfaces
│   └── utils/              # helpers (cn, format, debounce, patient)
├── .env.example
└── package.json
```

---

## Technology

| Area | Stack |
|------|--------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| UI | React 19 + Tailwind CSS v4 |
| Forms | React Hook Form + Zod |
| Realtime | Socket.IO |
| Tooling | ESLint, concurrently |

---

## Architecture

```text
Patient Form (watch + debounce)
        │
        │  emit patient:update
        ▼
Socket.IO Server (in-memory latest payload)
        │
        │  broadcast patient:update / patient:sync
        ▼
Staff View (instant UI update, no polling)
```

### Real-time synchronization flow

1. Patient types in the form.
2. React Hook Form `watch()` detects changes.
3. Client debounces 300ms, then emits `patient:update` with the latest draft + `activityStatus`.
4. Socket.IO server stores the payload in memory and broadcasts to all clients.
5. Staff View receives the event through `usePatientStore` and re-renders immediately.
6. New Staff clients receive current state on connect via `patient:sync`.
7. After 5 seconds idle, Patient Form emits `inactive`.
8. On Save, Patient Form emits `submitted`.

### Component architecture

| Component | Purpose |
|-----------|---------|
| `AppShell` / `Header` / `Footer` | Shared layout chrome and navigation |
| `BrandLogo` | Agnos logo branding |
| `PatientForm` | Validated registration form + live broadcast |
| `StaffDashboard` | Live staff monitor with connection/activity status |
| `PatientDetails` / `DetailField` | Read-only field display for all patient data |
| `PatientStatusBadge` | Shows submitted / actively filling / inactive |
| `ConnectionBadge` | WebSocket connection state |
| `Card` / `SectionCard` / `Alert` / `Skeleton` | Dashboard UI primitives |
| `FormField` / `Input` / `Select` / `Textarea` / `Button` | Reusable form controls |
| `usePatientStore` | Shared patient state + Socket.IO sync hook |
| `patientLocalStore` | Local cache + cross-tab sync helper |
| `socket` service | Socket.IO client singleton |

### Design decisions (UI/UX by screen size)

- **Mobile:** single-column form/detail grids, full-width actions, compact header wordmark (`Agnos`), horizontally scrollable nav
- **Tablet:** 2-column form and detail layouts, comfortable card spacing
- **Desktop:** up to 3-column personal info grid, wider content (`max-w-4xl`), sticky header with full brand name
- **Visual language:** teal/navy healthcare palette, soft shadows, rounded cards, clear status colors for live/error/success/warning
- **Interaction feedback:** connection badge, patient activity badge, loading skeleton, empty state, validation alerts

---

## Assumptions

- Demo-oriented portal (no authentication / role guards)
- Socket server keeps state in memory (cleared on process restart)
- Browser localStorage caches the last patient for UX continuity
- All connected clients receive the same live patient payload
- Phone numbers accept common international formats (e.g. `+66 81 234 5678`)
- Preferred language / nationality / relationship use predefined options plus “Other”
- Inactive timeout is 5 seconds without form interaction

---

## Features

- Patient registration form with required + optional fields
- Emergency Contact split into **name** + **relationship** (per assignment PDF)
- Email, phone, and date-of-birth validation
- Responsive healthcare dashboard UI
- Staff View showing every patient field
- Instant realtime sync via Socket.IO
- Patient status indicators: **Actively filling / Inactive / Submitted**
- Connection status badge (Live / Connecting / Offline)
- Loading skeleton, empty, success, warning, and error states
- Form hydration from shared store + remote clear sync
- Agnos brand logo integrated into layout

### Bonus features

- Debounced live typing sync (not only on submit)
- LocalStorage cache + cross-tab fallback
- Shared socket event constants between Node server and Next client
- Automatic reconnect handling via Socket.IO
- Dashboard loading skeleton while connecting
- Global Next.js `error.tsx` recovery UI

---

## Requirements checklist (from assignment PDF)

| # | Requirement | Status |
|---|-------------|--------|
| 1 | Patient Form with all specified fields | ✅ Implemented |
| 2 | Middle Name optional | ✅ Implemented |
| 3 | Emergency Contact optional (**name + relationship**) | ✅ Implemented |
| 4 | Religion optional | ✅ Implemented |
| 5 | Required-field validation | ✅ Implemented |
| 6 | Email validation | ✅ Implemented |
| 7 | Phone validation | ✅ Implemented |
| 8 | Responsive Patient Form (mobile + desktop) | ✅ Implemented |
| 9 | Staff View displays every form field | ✅ Implemented |
| 10 | Staff View updates in realtime while typing | ✅ Implemented |
| 11 | Responsive Staff View | ✅ Implemented |
| 12 | Patient status: actively filling | ✅ Implemented |
| 13 | Patient status: inactive | ✅ Implemented |
| 14 | Patient status: submitted | ✅ Implemented |
| 15 | Realtime sync via WebSockets (Socket.IO) | ✅ Implemented |
| 16 | Tech stack: Next.js | ✅ Implemented |
| 17 | Tech stack: TailwindCSS | ✅ Implemented |
| 18 | README with overview + setup | ✅ Implemented |
| 19 | README project structure | ✅ Implemented |
| 20 | README design decisions | ✅ Implemented |
| 21 | README component architecture | ✅ Implemented |
| 22 | README realtime sync flow | ✅ Implemented |
| 23 | Bonus features documented | ✅ Implemented |
| 24 | Code repository (GitHub) | ⏳ In progress / see links below |
| 25 | Deployed application (Netlify live URL) | ⏳ Deploy via steps above |

---

## Deliverable links

> Fill after GitHub push + Netlify/Render deploy:

- **GitHub repository:** https://github.com/SUPAWIT7164/agnos-patient-portal
- **Live application (Netlify):** _pending_
- **Socket server (Render):** _pending_

---

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Next.js + Socket.IO (development) |
| `npm run dev:web` | Next.js only |
| `npm run dev:socket` | Socket.IO only |
| `npm run build` | Production build |
| `npm start` | Production Next.js + Socket.IO |
| `npm run lint` | ESLint |
