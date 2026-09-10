# B.A.M.B.I. Peer Support Services

> **"No judgment. No lectures. Just people helping people."**  
> *Belonging • Acceptance • Meaning • Balance • Inspiration*

Official web platform and interactive peer-support portal for **B.A.M.B.I. Peer Support Services**, founded by **Bambi** in Phoenix, Arizona.

This project delivers real-world recovery resources, product ordering for the **Pathway Domino Effect Recovery Game** and the **B.A.M.B.I. Participant Workbook**, community navigation (Housing, Work, Treatment, Legal Help), and **Tom**—an interactive, voice-driven AI peer support avatar running the **TOM CORE RUNTIME**.

---

## 🌟 Key Features

### 1. The 4 Support Pillars
- **Housing Assistance**: Emergency shelter bed access, Coordinated Entry via 2-1-1 Arizona, and CASS (Central Arizona Shelter Services).
- **Work Resources**: Resume rebuilding, second-chance employer connections, bus passes, and work attire.
- **Treatment Navigation**: 24/7 medical detox routing (Community Bridges Inc.), outpatient circles, and non-punitive peer groups.
- **Legal Navigation**: Resolving warrants, court payment plans, and driver’s license reinstatement to remove barriers to stability.

### 2. Featured Recovery Products
- **PATHWAY: The Domino Effect Recovery Game ($34)**  
  *Build the chain. Break the chain. Change the outcome.*  
  A hands-on board game for 2–8 players designed for treatment centers, sober living houses, and peer circles. Visualizes how pressure chains build (Barriers, Awareness, Mindsets, Behaviors) and how a single Intervention tile stops the fall.
- **B.A.M.B.I. Participant Workbook ($19 PDF / $24 Print)**  
  *Behavioral Adaptation & Mobility-Based Integration.*  
  A 6-session roadmap exploring the "Backpack and Load" exercise (identifying unspoken trauma and internal weight) and the "See → Sit → Move" impulse reset.

### 3. Recovery Video Library (`#videos`)
- **Multi-Source Embed Engine**: Watch recovery videos directly on the site, hosted on **YouTube**, **Google Drive** (`/preview`), or **GitHub Releases / Direct MP4s**.
- **In-App Theater Player**: 16:9 responsive playback with full-screen support, categories, and keyword search.
- **Interactive Discussion with Tom**: One-click "Discuss with Tom" sends the video topic directly to Tom's curb avatar for instant peer reflection.
- **Dynamic "+ Add Video" Form**: Allows Bambi to paste any YouTube or Google Drive share link anytime, with persistent local browser storage (`localStorage`).

### 4. Tom: AI Peer Support Avatar
- **Persona Archetype**: "The guy sitting on the curb at 2 A.M." A man of few words who notices patterns without drama, clinical jargon, or unearned advice.
- **TOM CORE RUNTIME**:
  - *Companionship Patch*: Space to process; companionship before guidance.
  - *Venting Detection*: Allows processing without prematurely offering fixes.
  - *Recognition Model*: Surfaces patterns gently so the user discovers their own answers.
  - *Stabilization First*: Grounds spiraling moments in present reality.
  - *Invisible B.A.M.B.I. Directive*: Guides naturally without clinical announcements.
  - *Sudo Tom*: Developer inspect mode activated by the phrase `"Sudo Tom"`.
- **Voice & Visuals**:
  - Browser-native speech recognition & text-to-speech with audio-frequency lip-syncing.
  - Multi-tier backend: OpenAI API (`OPENAI_API_KEY`), Gemini Flash (`GEMINI_API_KEY`), or an offline recovery knowledge engine.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend UI** | [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS v4](https://tailwindcss.com/) |
| **Animations & Icons** | [Motion](https://motion.dev/) (`motion/react`), [Lucide React](https://lucide.dev/) |
| **Voice & Speech** | Web Speech API (`SpeechRecognition` & `SpeechSynthesis`) with real-time audio lip-sync |
| **Backend & Server** | [Express](https://expressjs.com/), [Node.js](https://nodejs.org/), [tsx](https://github.com/privatenumber/tsx), [esbuild](https://esbuild.github.io/) |
| **AI Integrations** | Google GenAI SDK (`@google/genai`), OpenAI Chat API (`gpt-4o-mini` / `gpt-4o`) |
| **Build & Deploy** | [Vite](https://vite.dev/), GitHub Actions CI/CD (`deploy.yml`), GitHub Pages (`CNAME`), Cloud Run |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: Version `18.x`, `20.x`, or higher installed.
- **npm** or **bun**: Package manager (`npm` is bundled with Node.js).
- **Git**: For source control.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/bambi-peer-support.git
   cd bambi-peer-support
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables (Optional)**:
   Copy the example environment configuration:
   ```bash
   cp .env.example .env
   ```
   Add any keys you wish to use:
   ```env
   # GEMINI_API_KEY: Optional for Gemini 3.8 Flash model
   GEMINI_API_KEY="your-gemini-api-key"

   # OPENAI_API_KEY: Optional if you want Tom to query OpenAI GPT-4o-mini directly
   OPENAI_API_KEY="your-openai-api-key"

   # APP_URL: Host URL for self-referential links
   APP_URL="http://localhost:3000"
   ```
   *(Note: The app will run smoothly even without API keys thanks to Tom's built-in peer support engine).*

4. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to:
   ```text
   http://localhost:3000
   ```

---

## 📦 Production Build & Deployment

### Local Production Build
To bundle the frontend with Vite and package the backend server into a single file with `esbuild`:

```bash
npm run build
npm start
```

### GitHub Pages Deployment (`bambiboy602.com`)
This repository includes an automated workflow at `.github/workflows/deploy.yml` and custom domain configuration at `public/CNAME`.

#### If you created a new repository after deleting the original:
1. **Link and push your files to the new repository**:
   ```bash
   git remote remove origin
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_NEW_REPO_NAME.git
   git branch -M main
   git add .
   git commit -m "Deploy B.A.M.B.I. Peer Support to new repository"
   git push -u origin main --force
   ```

2. **Crucial: Enable GitHub Pages in your new repository settings**:
   - Go to your repository on GitHub.com: `https://github.com/YOUR_USERNAME/YOUR_NEW_REPO_NAME`
   - Click the **Settings** tab (the gear icon at the top right).
   - In the left sidebar, click **Pages** (under *Code and automation*).
   - Under **Build and deployment > Source**, change the dropdown to **GitHub Actions** (this is required for `.github/workflows/deploy.yml` to automatically build and run the site).
   - Under **Custom domain**, enter `bambiboy602.com` and click **Save**.
   - Check the box for **Enforce HTTPS**.

3. **Check the Actions Tab**:
   - Click the **Actions** tab at the top of your repository.
   - You will see the **Deploy to GitHub Pages** workflow run and turn green.
   - Your site will immediately be live and running!

4. **DNS Records for `bambiboy602.com`** (at GoDaddy, Namecheap, Cloudflare, etc.):
   - **A Records** (pointing `@` to GitHub Pages IP addresses):
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - **CNAME Record**:
     - Host: `www`
     - Points to: `YOUR_GITHUB_USERNAME.github.io`

---

## 📁 Project Structure

```text
├── .github/
│   └── workflows/
│       └── deploy.yml          # Automated CI/CD for GitHub Pages
├── public/
│   ├── CNAME                   # bambiboy602.com custom domain
│   └── assets/                 # SVGs for Pathway game box, workbook, and cards
├── src/
│   ├── components/
│   │   ├── AIChatSection.tsx   # Tom's interactive chat & voice hub
│   │   ├── AnimatedAvatar.tsx  # Dynamic lip-syncing canvas avatar
│   │   ├── Footer.tsx          # Contact, crisis hotlines, and disclosures
│   │   ├── GitHubPublishModal.tsx # Step-by-step deploy & DNS modal
│   │   ├── Navbar.tsx          # Main navigation with dark mode toggle
│   │   ├── OrderModal.tsx      # Direct ordering modal for Pathway & Workbook
│   │   ├── ProductsSection.tsx # Product catalog & feature overviews
│   │   └── ProfileHeader.tsx   # Bambi's story, photo, and 4 pillars
│   ├── data/
│   │   └── creatorData.ts      # Profile, products, and resource data
│   ├── hooks/
│   │   └── useSpeech.ts        # Web Speech API recognition & audio synthesis
│   ├── App.tsx                 # Core application layout & view management
│   ├── index.css               # Tailwind CSS entry point
│   ├── main.tsx                # React DOM root mounting
│   └── types.ts                # TypeScript interfaces and shared types
├── .env.example                # Example environment variables
├── package.json                # Project dependencies and run scripts
├── server.ts                   # Express server, Tom Core Runtime, and AI endpoints
├── tsconfig.json               # TypeScript configuration
└── vite.config.ts              # Vite plugins and build parameters
```

---

## 🤝 How to Contribute

We welcome contributions that expand peer-support resources, improve accessibility, and refine the user experience!

1. **Fork the Repository**
2. **Create a Feature Branch**:
   ```bash
   git checkout -b feature/new-resource-card
   ```
3. **Commit Your Changes**:
   ```bash
   git commit -m "feat: add regional crisis center directory"
   ```
4. **Ensure TypeScript & Code Style Pass**:
   ```bash
   npm run lint
   npm run build
   ```
5. **Push to Your Branch**:
   ```bash
   git push origin feature/new-resource-card
   ```
6. **Open a Pull Request**: Provide a concise summary of the improvement, tests performed, and any visual changes.

---

## 📞 Crisis & Support Contacts

If you or someone you know is in immediate crisis, free and confidential support is available 24/7:

- **988 Suicide & Crisis Lifeline**: Call or text `988` (English & Spanish).
- **2-1-1 Arizona**: Dial `211` or visit [211arizona.org](https://211arizona.org) for shelter and food assistance.
- **Community Bridges (CBI)**: 24/7 Access to Care at `1-877-931-9142`.
- **Central Arizona Shelter Services (CASS)**: `(602) 256-6414`.
- **Direct Contact with Bambi**:
  - Phone / Text: `(602) 767-2147`
  - Email: `bambiboy602@gmail.com`
  - Website: [bambiboy602.com](https://bambiboy602.com)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
B.A.M.B.I., Pathway: The Domino Effect Recovery Game, and all related curriculum materials are proprietary concepts developed by Bambi.
