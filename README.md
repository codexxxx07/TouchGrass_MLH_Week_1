# Touch Grass 🌿 — AI-Powered Outdoor Exploration Platform

> **Core Principle: Plan on the screen. Experience it in the real world.**

Touch Grass is an open-source AI-powered web application that encourages people to disconnect from their screens and reconnect with nature. Instead of keeping users glued to a display, Touch Grass generates personalized outdoor missions, step-by-step adventure cards, and nature challenges that are designed to be printed or downloaded so you can leave your phone behind.

---

## 🌟 Major Features

### 🤖 Feature A: AI Nature Guide
An intelligent conversational nature assistant powered by open-weight language models (Local Ollama, Open-Weight Remote API, or built-in Offline Nature Engine).
* Discover outdoor activities based on available time and location setting.
* Learn about bird songs, leaf shapes, soil biomes, and balcony gardening.
* Receive practical, concise suggestions instead of generic motivational fluff.
* **Transparent Source Disclosure**: Every AI response displays a badge showing the active inference engine.

### 🧭 Feature B: AI Outdoor Adventure Planner
Personalized micro-expedition generator.
* **Inputs**: Available time, activity type, difficulty, location setting, focus interests, accessibility requirements.
* **Output**: Structured adventure card with Title, Description, Required Items Checklist, Step-by-Step Activities, Observation Challenges, Safety Recommendations, and Real-World Completion Goal.
* **Printable / Downloadable Card**: One-click print window formatted cleanly for paper or TXT file download so users can step outside screen-free.

### 🎯 Feature C: Nature Missions & Challenges
Interactive real-world challenge board.
* Categories: Mindfulness & Screen-Free, Flora & Plants, Birds & Wildlife, Micro-Gardening, Outdoor Walking.
* **Daily Challenge**: Highlighted daily outdoor mission.
* **Manual Completion**: Self-reported completion toggle with interactive celebration confetti.
* Environmental impact tips & Leave No Trace guidelines.

### 📖 Feature D: Personal Nature Journal
Private observation diary stored 100% locally in your browser (`localStorage`).
* Record date, title, location, activity, weather notes, and mood state.
* Optional photograph attachment with instant image preview.
* Filter, search, edit, and delete entries.
* **Export Entries**: One-click JSON export to back up your nature discoveries.

### 📊 Feature E: Touch Grass Dashboard
Interactive activity dashboard tracking real user progress.
* Calculates total outdoor time, completed adventures, completed missions, and active exploration streak.
* Calculated strictly from actual user activity (with explicit notice that statistics are self-reported).
* Explorer Tier progress bar & suggested next adventure.

---

## 🚀 Tech Stack

* **Frontend**: React.js (v19)
* **Build Tool**: Vite (v6)
* **Styling**: Tailwind CSS (v4 CLI / `@tailwindcss/vite`) & Vanilla CSS design tokens
* **Icons**: Lucide React
* **Effects**: Canvas Confetti
* **Routing**: React Router DOM (v7)

---

## 🤖 Open-Source AI Architecture

Touch Grass supports 3 flexible inference backends configured seamlessly via the UI:

1. **Offline Nature Engine (Built-in Fallback)**:
   * 100% deterministic, instant, rule-based generator requiring no internet or external services.
2. **Local Ollama Inference**:
   * Connect to your local Ollama instance running open-weight models (e.g. `llama3.2`, `phi3`, `gemma2`, `mistral`).
   * Default endpoint: `http://localhost:11434`
3. **Open-Weight Remote API**:
   * Connect to any OpenAI-compatible open-weight inference endpoint (e.g., Groq, HuggingFace Inference API).

### 🔒 Privacy & Safety Guarantee
* **No Secret Key Exposure**: All credentials and journal entries remain in local browser storage.
* **Foraging Safety Warning**: Touch Grass explicitly warns users never to consume wild plants or mushrooms identified solely by AI responses.
* **Wildlife Respect**: Encourages observing wildlife from a safe 15-foot distance.

---

## ⚙️ Installation & Running Locally

### Prerequisites
* Node.js (v18+ recommended)
* npm or yarn

### 1. Clone & Install Dependencies
```bash
# Clone the repository
git clone https://github.com/your-username/touch-grass.git
cd touch-grass

# Install dependencies
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

### 3. (Optional) Run Local Ollama for AI Inference
To use local open-weight AI models:
1. Install [Ollama](https://ollama.com).
2. Run your preferred model:
   ```bash
   ollama run llama3.2
   ```
3. In Touch Grass, click the **AI Status Badge** in the top navbar, select **Local Ollama Model**, set model to `llama3.2`, and click **Save Configuration**.

### 4. Build for Production
```bash
npm run build
```

---

## 📜 License & Attributions

* **Code License**: [MIT License](LICENSE)
* **Model Attributions**: Meta Llama 3.2 (Meta Open Model License)
* **Iconography**: Lucide Icons (ISC License)
