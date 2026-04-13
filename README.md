# PrabalBytes — Portfolio Website

Personal developer portfolio built with React and Vite. Features smooth animations, a terminal-inspired design system, and a fully functional contact form connected to a Node.js backend.

🌐 **Live:** [prabalbytes.vercel.app](https://prabalbytes.vercel.app)

---

## Preview

![Portfolio Preview](./preview.png)

---

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | React 18 |
| Build Tool | Vite |
| Styling | Tailwind CSS + Custom CSS |
| Animations | Framer Motion |
| Icons | Lucide React |
| Font | Syne, DM Sans, JetBrains Mono |
| Deployment | Vercel |

---

## Features

- Animated hero section with falling dev icons
- Smooth scroll navigation with active link tracking
- Terminal-style About section with skill bars
- Skills section with traveling dot animation connecting all cards
- Project cards with animated moving borders
- Contact form connected to live backend API
- Fully responsive — mobile, tablet, desktop
- Dark theme with layered gradient background
- Framer Motion scroll-triggered animations throughout

---

## Project Structure

```
frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx        # Fixed navbar with active link tracking
│   │   └── Footer.jsx        # Footer with nav + social links
│   ├── sections/
│   │   ├── Hero.jsx          # Animated hero with falling icons
│   │   ├── About.jsx         # Two-column about with terminal card
│   │   ├── Skills.jsx        # Skill cards with SVG traveling dot
│   │   ├── Projects.jsx      # Project showcase cards
│   │   └── Contact.jsx       # Contact form + info
│   ├── App.jsx               # Root component
│   ├── main.jsx
│   └── index.css             # Global styles + fonts
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

---

## Local Setup

```bash
# 1. Clone the repo
git clone https://github.com/yourname/portfolio.git
cd portfolio/frontend

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

App runs at `http://localhost:5173`

---

## Backend Connection

The contact form sends data to a separate Node.js backend.

For local development, the backend runs at `http://localhost:5000`.
For production, update the fetch URL in `Contact.jsx`:

```js
// src/sections/Contact.jsx
const res = await fetch("https://your-backend.onrender.com/contact", {
```

Backend repo setup → see `/backend/README.md`

---

## Sections

### Hero
- Falling developer icons animation (`{}`, `</>`, `npm`, `git` etc.)
- Gradient name text with blinking cursor
- Moving border buttons linked to Projects and Contact sections
- Available for work badge with pulse animation

### About
- Two-column layout — bio + terminal card
- Terminal displays `cat profile.json` and `./interests --list`
- Stats cards — Projects, Experience, Coffee
- CSE core subject tags (DSA, OOP, DBMS, COA, OS, CN, ML)

### Skills
- Four categories — Programming, Web Development, Tools, Libraries
- SVG dashed line connects all skill cards
- Glowing dot travels the path in a loop
- Active card highlights as dot passes through

### Projects
- Blood Donation App — React, Tailwind, JavaScript, API
- Portfolio Website — React, Tailwind, Framer Motion
- Animated card borders on hover
- Live + Code links (update with real URLs)

### Contact
- Left — contact info with icon cards
- Right — terminal-style form card with moving border
- Connected to Node.js + MongoDB backend
- Shows success / error feedback after submission

---

## Deployment (Vercel)

1. Push to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your repo with these settings:

```
Framework Preset:  Vite
Root Directory:    frontend
Build Command:     npm run build
Output Directory:  dist
```

4. Click Deploy

---

## Customization

**Update your personal info:**

| File | What to change |
|------|---------------|
| `Hero.jsx` | Name, tagline |
| `About.jsx` | Bio, stats, tags, terminal JSON |
| `Skills.jsx` | Skill categories and items |
| `Projects.jsx` | Project titles, descriptions, links |
| `Contact.jsx` | Email, location, GitHub, LinkedIn links |
| `Footer.jsx` | GitHub, LinkedIn, email links |
| `Navbar.jsx` | Brand name |

---

## Scripts

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build locally
```

---

## Author

**Prabal Das** — CS Student & Developer

- 📧 prabaldas421@gmail.com
- 🐙 [github.com/yourname](https://github.com/Prabalbytes)
- 💼 [linkedin.com/in/yourname](https://www.linkedin.com/in/prabal-das-a89604296)
- 🌐 [prabalbytes.vercel.app](https://prabalbytes.vercel.app)

---

## License

MIT — feel free to use this as inspiration for your own portfolio.
If you do, a credit or star would be appreciated! ⭐
