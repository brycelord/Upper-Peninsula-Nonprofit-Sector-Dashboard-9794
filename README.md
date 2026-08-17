# Upper Peninsula Nonprofit Sector Dashboard

A regional data dashboard tracking the nonprofit sector across Michigan's Upper Peninsula — built for researchers, funders, policymakers, and nonprofit leaders.

Developed by the [Helen Bader Institute for Nonprofit Management](https://uwm.edu/hbi) at the University of Wisconsin–Milwaukee.

---

## Features

- **Dashboard** — high-level KPIs: total organizations, revenue, employment, and assets across the UP
- **Sector Overview** — nonprofit distribution by NTEE sector category
- **Sector Deep Dive** — granular breakdown within each sector
- **Employment Impact** — workforce data including paid staff contributions by county
- **Geographic Analysis** — UP county-level comparisons across all 15 counties
- **Compensation Insights** — executive and staff wage benchmarks vs. state averages
- **Historical Trends** — multi-year sector growth patterns (2012–2022)
- **Data Explorer** — filterable, searchable organization-level table
- **Impact Calculator** — economic impact estimation tool for advocacy use
- **Advocacy Portal** — sector advocacy resources and legislative district data
- **Data Integrity** — data sourcing, methodology, and confidence scoring notes

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite |
| Styling | Tailwind CSS |
| Backend / DB | Supabase (PostgreSQL) |
| Charts | Recharts |
| Routing | React Router v6 |

---

## Getting Started

### Prerequisites

- Node.js 18+
- A Supabase project (free tier works) with the schema applied from `/supabase/`

### Installation

```bash
git clone https://github.com/brycelord/Upper-Peninsula-Nonprofit-Sector-Dashboard-9794.git
cd Upper-Peninsula-Nonprofit-Sector-Dashboard-9794
npm install
```

### Environment Setup

Copy `.env.example` to `.env` and fill in your Supabase credentials:

```bash
cp .env.example .env
```

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Run Locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

---

## Project Structure

```
src/
├── components/        # Reusable UI: Header, Footer, GlobalFilterHeader, charts
├── pages/             # One file per dashboard view (11 pages)
├── services/
│   ├── dataService.js # Core data aggregation, filtering, and county/sector logic
│   ├── realData.js    # Verified ProPublica organization records by county
│   └── syncService.js # Supabase sync and ProPublica cache management
├── supabase/          # Supabase client configuration
├── context/           # React context providers (filters, state)
└── common/            # Shared utilities and hooks
supabase/              # Database migrations and schema definitions
public/                # Static assets
```

---

## Data Sources

| Source | Used For |
|---|---|
| IRS Tax Exempt Organization Search | Organization registry and EIN validation |
| ProPublica Nonprofit Explorer | Form 990 financial data (revenue, assets, employees) |
| NCCS Data Archive — Urban Institute | State benchmark comparisons |
| Michigan Nonprofit Association (MNA) | State-level context and UP sector initiatives |
| U.S. Census Bureau | County population figures for density calculations |

**Data coverage:** 2012–2022 · 15 UP counties · ~865 verified organizations

> Note: Financial figures for non-verified organizations are modeled estimates using a seeded PRNG (mulberry32) for deterministic, reproducible output. Verified organizations are sourced directly from ProPublica 990 filings. See the Data Integrity page in the dashboard for confidence scores by county.

---

## Key Filters

The Global Filter Header (persistent across all pages) supports:

- **Year** — 2012 through 2022
- **County** — All 15 UP counties or statewide
- **Sector** — 10 NTEE sector categories
- **Revenue Tier** — Grassroots (<$50K), Small, Mid-Size, Enterprise ($1M+)
- **FTE Tier** — 1–5, 6–20, 21–50, 51+
- **Verified Only** — Toggle to show only ProPublica-confirmed filings

---

## License

© University of Wisconsin–Milwaukee — Helen Bader Institute for Nonprofit Management. All rights reserved.

For research collaboration or data inquiries, contact [HBI](https://uwm.edu/hbi).
