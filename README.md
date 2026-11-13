# GitTrackr ⚡

A fast, unified developer cockpit for tracking assigned issues, pull requests, organization velocity, and developer activity in a single view.

Built with **Next.js 16**, **React 19**, **TypeScript**, and **Resend**.

---

## 🚀 Overview

Modern software engineering involves juggling multiple pull requests, reviews, and backlog tickets scattered across multiple repositories and organizations. Navigating back and forth between separate GitHub filter tabs leads to tab explosion, stalled reviews, and lost sprint context.

**GitTrackr** consolidates all your active GitHub work streams into a single, responsive command center.

### Core Features

- **⚡ Unified PR & Issue Triage Cockpit**:
  - Filter across assigned issues and authored pull requests in real time.
  - Multi-state filtering (**All**, **Open**, **Merged**, **Closed**) with dynamic count badges.
  - Instant text search with clear buttons.
- **📊 Velocity Telemetry & Analytics**:
  - Interactive lead-time and completion charts with selectable ranges (**Last 7 Days**, **Last 4 Weeks**, **Last Quarter**).
  - Open vs. Merged PR volume and throughput tracking.
- **👤 Developer Profile & Activity Heatmap**:
  - GitHub statistics, repository browser, and language distributions.
  - Dynamic contribution streak tracker (Current Streak, Longest Streak, Consistency Rate).
  - Layout-stable contribution calendar with hover tooltips.
- **🎮 Interactive Demo Cockpit**:
  - Full live demo mode (`/dashboard/octocat`) and landing page cockpit preview running real interactive components with zero login required.
- **📬 Inbound Contact via Resend**:
  - Built-in `/api/contact` endpoint powered by [Resend](https://resend.com) to receive inquiries, feedback, and support requests directly into your inbox with branded HTML templates and client loading spinners.
- **🎨 Modern Glassmorphism & Accessible UI**:
  - Dark mode design system (`#090d16`) with high-contrast accent glow.
  - Route navigation progress bars and shimmer skeletons.
  - Deterministic UTC date formatting preventing SSR hydration mismatches.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | Next.js 16 (Pages Router, Turbopack) |
| **UI Library** | React 19 |
| **Language** | TypeScript 5.9 |
| **Authentication** | NextAuth.js v4 (Scoped GitHub OAuth) |
| **Email Service** | Resend API (`resend`) |
| **Styling** | CSS Modules + Custom CSS Properties |
| **Icons** | React Icons (`react-icons/fi`) |
| **Testing** | Vitest + v8 Coverage + React Testing Library |
| **Package Manager** | npm |

---

## 🏁 Getting Started

### 1. Prerequisites

- **Node.js** `v20.x` or later (Tested with Node `v26.13.1`)
- **npm** `v10.x` or later

### 2. Clone & Install

```bash
git clone https://github.com/sahsisunny/gittrackr.git
cd gittrackr
npm install
```

### 3. Environment Variables

Create a `.env` file in the project root (see [`.env.example`](./.env.example)):

```bash
cp .env.example .env
```

Fill in your configuration:

```env
# GitHub OAuth App (https://github.com/settings/developers)
GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret

# NextAuth Configuration
NEXTAUTH_SECRET=your_generated_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# Resend Email Configuration (https://resend.com)
RESEND_API_KEY=re_your_resend_api_key
CONTACT_RECEIVER_EMAIL=your_email@domain.com
RESEND_FROM_EMAIL=GitTrackr Contact <onboarding@resend.dev>
```

> **Note**: In development mode, if `RESEND_API_KEY` is not provided, `/api/contact` safely simulates submission without failing.

### 4. Run the Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the application.

---

## 🧪 Available Scripts

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts local Next.js dev server with Turbopack |
| `npm run build` | Compiles optimized production build with TypeScript checking |
| `npm run start` | Starts Next.js production server |
| `npm run test` | Runs unit tests via Vitest |
| `npm run coverage` | Generates Vitest code coverage report |
| `npm run lint` | Runs ESLint checks and fixes |
| `npm run format` | Formats codebase using Prettier |

---

## 🔒 Privacy & Architecture

- **Zero Database**: GitTrackr does not persist your code, database rows, or OAuth secrets on disk.
- **Scoped In-Memory Tokens**: GitHub tokens are managed securely in session cookies via NextAuth and used directly for client-side API requests.
- **Direct GitHub Ingestion**: Queries GitHub's official Search and REST APIs directly with scoped permissions.

---

## 👨‍💻 Developer

Built by **Sunny Sahsi** — Software Engineer.

- **GitHub**: [@sahsisunny](https://github.com/sahsisunny)
- **LinkedIn**: [Sunny Sahsi](https://www.linkedin.com/in/sahsisunny/)
- **Repository**: [sahsisunny/gittrackr](https://github.com/sahsisunny/gittrackr)

---

## 📄 License

This project is open-source under the [MIT License](LICENSE).
