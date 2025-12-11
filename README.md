# ClearTerms

ClearTerms is a React web app that helps people **skim long privacy policies**.

Instead of reading pages of dense legal text, users can paste or upload a policy and get:

- A **keyword-based summary** of data collection, third-party sharing, retention, and user rights  
- A color-coded **Trust Meter** (0–100)  
- Plain-language **explanation notes** about what to watch out for  
- A **Highlights View** that marks risky and user-friendly phrases  
- A per-tab **History** of past analyses

👉 Live version: https://justinarhee.github.io/Clear-Terms/

> ⚠️ ClearTerms is a learning / research tool. It is *not* legal advice.

---

## Features

### 🔍 Policy Analysis (No External AI)

All analysis runs **entirely in the browser**:

- Paste raw policy text *or* upload a **PDF privacy policy**
- The app scans the text against a configurable list of keywords in four buckets:
  - `dataCollection`
  - `thirdPartySharing`
  - `dataRetention`
  - `userRights`
- It computes:
  - Category counts  
  - A **risk score** (based on collection/sharing/retention)  
  - A **positive score** (based on user rights)  
  - A combined **trust score from 0–100** with a label (`Low`, `Mixed`, or `High`)

All keyword sets live in [`src/config/keywordSets.js`](./src/config/keywordSets.js) and can be extended.

---

### 📊 Dashboard

After analyzing a policy, the **Dashboard** shows three main panels:

1. **Quick Summary**  
   - Shows counts for each category and total risk/positive signals  
   - Uses badges and short descriptions to explain what each metric means

2. **Trust Meter**  
   - Progress bar from 0–100  
   - Color-coded:
     - Red (`danger`) for low trust  
     - Yellow (`warning`) for mixed  
     - Green (`success`) for higher trust  
   - Includes a text label like “Low trust” so meaning is *not* color-only

3. **Explanation Panel**  
   - Plain-language notes such as:
     - “Heavy tracking & data collection”  
     - “Lots of third-party sharing”  
     - “User rights are emphasized”  
   - Notes are derived from thresholds on the category counts

4. **Highlights View**  
   - Original policy text with:
     - Soft red highlights for risky terms (collection/sharing/retention)  
     - Soft green highlights for user rights  
   - Expand/collapse toggle to avoid overwhelming the user

---

### 🕒 History (Per-Tab Session)

The **History** page keeps a list of analyses in the **current browser tab**:

- Each entry stores:
  - Timestamp
  - Short snippet of the policy
  - Risk score and full analysis
- Clicking an entry reloads its analysis on the Dashboard
- A **“Clear all”** button removes all history + current dashboard state  

Implementation details:

- State is stored in `window.sessionStorage` under:
  - `clearterms-history`
  - `clearterms-analysis`
  - `clearterms-policy-text`
- This means:
  - Refreshing the page **keeps** your dashboard + history for that tab
  - Closing the tab or restarting the app **resets** history and dashboard

The **Home** page input is *always* cleared after running an analysis, so you start fresh each time.

---

## Tech Stack

- **React** (Vite-based setup)
- **React Router** (`HashRouter`) for navigation  
- **React Bootstrap** for UI components and consistent styling  
- **PDF to text**: [`react-pdftotext`](https://www.npmjs.com/package/react-pdftotext)
- Browser storage:
  - `sessionStorage` for per-tab state

---

## Pages & Routing

Routing is handled in `App.jsx` using `react-router-dom` and a `HashRouter` wrapper in `main.jsx`.

Defined routes:

- `/` – **Home**
  - Paste or upload a policy and run analysis
- `/dashboard` – **Dashboard**
  - Quick Summary, Trust Meter, Explanation Panel, Highlights View
- `/history` – **History**
  - List of past analyses for this tab
- `/resources` – **Privacy Resources**
  - Cards with links to GDPR, FTC, CCPA, EFF, and practical tools/settings
- `/how-it-works` – **How It Works**
  - Explains the keyword buckets, scoring logic, and visual overview

The primary navigation bar lives in `src/components/ClearTermsNavbar.jsx`.

---

## Components (Partial List)

Some of the key React components:

- `App.jsx` – top-level app & routing
- `ClearTermsNavbar.jsx` – main navigation bar
- `HomePage.jsx` – hero + input + PDF upload
- `DashboardPage.jsx` – summary, trust meter, explanations, highlights
- `HistoryPage.jsx` – history view + “clear all”
- `ResourcesPage.jsx` – external links & guidance
- `HowItWorksPage.jsx` – explanation of the system
- `PolicyInput.jsx` – textarea + submit
- `PdfUpload.jsx` – file input + error handling
- `SummaryPanel.jsx` – category counts
- `TrustMeter.jsx` – trust score bar & labels
- `ExplanationPanel.jsx` – plain-language notes
- `HighlightsView.jsx` – color-coded policy text
- `HistoryList.jsx` – clickable history items with risk badges

---

## Design & Accessibility

### Visual Design

- **Color palette**:
  - Light blue gradient background (`body`) for a calm, trustworthy feel
  - White cards with dark text for readability
  - Red/yellow/green accents for risk levels
- **Typography & hierarchy**:
  - System UI font stack for familiarity and performance
  - Larger, bold headings for titles
  - Smaller, muted text for explanations and hints
- **Cards & shadows**:
  - Consistent use of `.card.shadow-sm` for major content blocks
  - Subtle hover elevation for interactive cards

### Accessibility

- No skipped heading levels on major pages
- Inputs use `<Form.Label>` and associated `controlId`
- Buttons and links are keyboard-focusable and operable
- Color is *always* paired with text labels (e.g., “Low trust”)
- Contrast is designed to meet **WCAG AA**:
  - Dark text on white / light backgrounds
  - No critical information placed in low-contrast areas
- Images/emojis include `aria-label` where relevant

---

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- npm or yarn

### Install

```bash
npm install
```

### Run Development Server
```bash
npm run dev
```
Then open the printed localhost URL (usually http://localhost:5173/).

### Build for Production
```bash
npm run build
```
This creates a production build in dist/.

### Deploying to GitHub Pages
Because the app uses HashRouter, it works well on GitHub Pages without extra server config:
1. Build the project: npm run build
2. Publish the dist folder to GitHub Pages (e.g., via gh-pages or your preferred method)
3. The app will be available at your https://<username>.github.io/<repo-name>/ URL, and routing will work via URL hashes.

### Customizing Keywords
To expand or adjust how ClearTerms interprets policies:
- Open src/config/keywordSets.js
- Add or remove phrases under:
  - dataCollection
  - thirdPartySharing
  - dataRetention
  - userRights
The analysis is entirely deterministic based on these lists, so updating them changes how the dashboard and explanations behave.

### Limitations
- Keyword-based only — doesn’t understand full legal context or nuance
- False positives/negatives are possible (e.g., words used in disclaimers)
- Does not perform any server-side processing or real legal interpretation
Use ClearTerms as a starting point to ask better questions about privacy, not as a definitive judgment.

License
This project was built as part of UW Madison CS571 by Cole Nelson. Reuse, modification, and redistribution are subject to instructor/course policies.

