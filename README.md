# Pennywise — Personal Finance Manager

A modern, minimal, professional, and visually appealing personal finance web application built with **Next.js 16**, **React 19**, **Tailwind CSS v4**, and **TypeScript**.

---

## ✨ Features

- **Financial Health Dashboard**: Real-time summary of net worth, monthly cash flow, savings rate, and quick-look previews across all modules.
- **Transactions Management**: Filterable, searchable transaction feed with category tags, accounts, notes, and inflow/outflow balance statistics.
- **Monthly Budgets**: Visual budget progress bars with automatic color alerts (green for on-track, amber for nearing limit, red for over-budget), remaining amounts, and cycle status.
- **Savings Goals**: Milestone tracking with progress bars, target dates, monthly contribution recommendations, and completed goal badges.
- **Responsive Layout**: Designed mobile-first with a desktop persistent sidebar, sticky header with quick actions, and mobile bottom navigation bar.
- **Minimal & Zero-Dependency UI Primitives**: Fast, custom-built UI primitives (`Card`, `Button`, `Badge`, `StatCard`, `ProgressBar`, `Modal`, `Icons`) styled directly with Tailwind CSS.

---

## 🏗️ Architecture & Project Structure

```text
pennywise/
├── app/
│   ├── layout.tsx                # App-wide root layout & font setup
│   ├── page.tsx                  # Dashboard / Overview page
│   ├── transactions/page.tsx     # Transactions listing & filters
│   ├── budgets/page.tsx          # Monthly budgets & categories
│   ├── savings/page.tsx          # Savings goals & milestones
│   └── globals.css               # Tailwind v4 theme & typography
├── components/
│   ├── ui/                       # Reusable minimal design primitives
│   │   ├── Card.tsx
│   │   ├── Button.tsx
│   │   ├── Badge.tsx
│   │   ├── StatCard.tsx
│   │   ├── ProgressBar.tsx
│   │   ├── Modal.tsx
│   │   └── Icons.tsx
│   ├── layout/                   # Structural navigation shell
│   │   ├── AppShell.tsx
│   │   ├── Sidebar.tsx
│   │   ├── Header.tsx
│   │   └── MobileNav.tsx
│   └── modules/                  # Domain-specific UI blocks
│       ├── dashboard/
│       ├── transactions/
│       ├── budgets/
│       └── savings/
├── types/                        # Strongly typed domain models
│   ├── transaction.ts
│   ├── budget.ts
│   ├── savings.ts
│   ├── account.ts
│   └── index.ts
└── lib/                          # Helpers & data
    ├── utils.ts                  # Currency & date formatters, cn()
    ├── constants.ts              # Categories, colors & nav items
    └── mock-data.ts              # Realistic financial datasets
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 3. Build for Production
```bash
npm run build
```
