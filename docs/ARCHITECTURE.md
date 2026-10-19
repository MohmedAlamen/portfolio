# Architecture — Portfolio (Vue 3 + Bootstrap 5 + Vite)

## 1. Principles
- **Data separated from UI:** all personal info, texts and skills live in `config/`, `i18n/`, `data/`. Components only render.
- **Logic in composables, I/O in services:** components never call `fetch` directly.
- **One direction of dependency:** `components → composables → services → config/utils`. Never the reverse.
- **No runtime CDN, no `unsafe-eval`:** templates are compiled at build time; fonts, Bootstrap and icons are bundled. CSP is `script-src 'self'`.

## 2. Layers
```mermaid
flowchart TD
  subgraph UI["Presentation (components/)"]
    APP[App.vue] --> NAV[layout/AppNavbar]
    APP --> SEC[sections/*]
    APP --> FOOT[layout/AppFooter]
    SEC --> HERO[HeroSection] --> ARCH[ui/ArchDiagram]
    SEC --> PROJ[ProjectsSection] --> CARD[ui/RepoCard]
    SEC --> ABOUT[AboutSection]
    SEC --> SERV[ServicesSection]
    SEC --> SKILL[SkillsSection]
    SEC --> CONT[ContactSection]
  end
  subgraph LOGIC["Application logic (composables/ + i18n/)"]
    UR[useRepos]; UT[useTyping]; UC[useContactForm]; UI18[useI18n]
  end
  subgraph IO["Services (services/)"]
    GH[github.js]; CT[contact.js]
  end
  subgraph DATA["Config & data"]
    CFG[config/site.js]; TXT[i18n/ar.js, en.js]; SK[data/skills.js]
  end
  PROJ --> UR --> GH
  HERO --> UT
  CONT --> UC --> CT
  UI --> UI18 --> TXT
  SKILL --> SK
  GH --> CFG
  CT --> CFG
  GH -.->|1 cache 2 projects.json 3 API| EXT[(GitHub)]
  CT -.-> FS[(Formspree)]
```

## 3. Folder structure
```
src/
  main.js                  entry: global CSS/fonts/Bootstrap JS, mounts App
  App.vue                  page composition only
  components/
    layout/   AppNavbar, AppFooter
    sections/ Hero, About, Services, Skills, Projects, Contact   (one per page section)
    ui/       ArchDiagram, RepoCard                              (reusable pieces)
  composables/ useRepos, useTyping, useContactForm               (state + behaviour)
  services/    github.js, contact.js                             (network, caching, sanitising)
  i18n/        index.js (useI18n, RTL/LTR switch), ar.js, en.js
  data/        skills.js                                         (skills + layer keys)
  config/      site.js                                           (identity, flags, endpoints)
  utils/       url.js (safeUrl), langColors.js
  styles/      base.css (tokens + shared); component CSS lives beside its component
tests/         app.spec.js (Vitest + Vue Test Utils)
public/        projects.json (generated in CI), assets/images/profile.jpg
.github/workflows/deploy.yml   test → build → GitHub Pages (daily refresh)
```

## 4. Data flow — projects
1. `ProjectsSection` calls `useRepos()` (state: repos, filters, featured, rest).
2. `useRepos` → `services/github.fetchRepos()`: session cache (10 min) → `projects.json` (built by CI, no rate limit) → GitHub API (fallback).
3. The service drops forks and hidden repos, runs every URL through `safeUrl` (https only) and sorts by stars then recency.
4. `RepoCard` renders; Vue escapes all text (no `v-html` anywhere).

## 5. Where to change what
| I want to… | Edit |
|---|---|
| Change name, email, links, feature repos, form endpoint | `config/site.js` |
| Edit any text (AR/EN) | `i18n/ar.js`, `i18n/en.js` |
| Add / re-level a skill | `data/skills.js` |
| Change colours | CSS variables at top of `styles/base.css` |
| Add a new page section | new file in `components/sections/` + one line in `App.vue` |
| Add a language | new `i18n/xx.js` + register in `i18n/index.js` |

## 6. Security & quality notes
- CSP in `index.html`: `script-src 'self'`, connections only to GitHub API and Formspree.
- Contact form: validation, honeypot field, endpoint configurable; falls back to `mailto:`.
- CI runs tests before build; the GitHub token is the ephemeral `GITHUB_TOKEN`, never shipped to the browser.
- Next steps: Playwright e2e, Lighthouse CI, per-project case-study pages (vue-router), prerendering for SEO.
