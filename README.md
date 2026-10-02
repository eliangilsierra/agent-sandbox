# 💪 Gym Routine Tracker

A fast, offline-first web app for managing gym routines and tracking workout sessions in your browser.

**Live Demo:** (Deploy to GitHub Pages or Vercel)

## Features

- 📋 **Routine Management:** Create, edit, and delete custom workout routines
- 🏋️ **35 Exercises:** Pre-loaded catalog (strength, cardio, mobility) + custom exercises
- ⏱️ **Smart Timers:** Rest timer with countdown + session elapsed time
- 📱 **Responsive:** Works on mobile (375px), tablet (768px), and desktop
- 💾 **Offline First:** All data stored in browser localStorage (no backend)
- 🔄 **Session Recovery:** Pause and resume sessions across page reloads
- 🔊 **Audio/Vibration:** Rest timer notification with sound and haptic feedback

## Quick Start

### Prerequisites
- Node.js 16+ and npm

### Installation

```bash
git clone https://github.com/eliangilsierra/agent-sandbox.git
cd agent-sandbox
npm install
```

### Development

```bash
npm run dev
```

Open [localhost:5173](http://localhost:5173) in your browser.

### Build

```bash
npm run build
npm run preview  # Preview production build
```

## Usage

### 1. Create a Routine

1. Click **New Routine**
2. Enter routine name (e.g., "Chest Day") and rest interval between sets (e.g., 60 seconds)
3. Click **Create**

### 2. Add Exercises

1. Select your routine and click **Edit**
2. Click **Add Exercise**
3. Pick an exercise from the catalog and specify sets/reps (e.g., 3 sets × 10 reps)
4. Click **Save**

### 3. Start a Session

1. Click **Start Session**
2. Complete each exercise:
   - Do all reps for the set
   - Click **Set Complete** to start rest timer
   - Timer counts down from your routine's rest interval
   - When rest finishes, move to next set or exercise
3. Click **Finish Session** when done

## Data Storage

- All data stored in browser `localStorage` (max 5 MB, typically < 100 KB)
- No server, no cloud sync, no login required
- Data persists across browser sessions
- Clear browser cache to reset (or manually delete `gym-app:*` localStorage entries)

## Technologies

- **React 18** + TypeScript (strict mode)
- **Vite** (fast dev server and builds)
- **localStorage** (persistent state)
- **CSS Grid + Flexbox** (responsive layout)
- **Web Audio API** (rest timer notifications)

## Browser Support

- ✓ Chrome 90+
- ✓ Firefox 88+
- ✓ Safari 13+ (iOS Safari on iPhone/iPad)
- ✓ Edge 90+

## Project Structure

```
src/
├── pages/               # React pages (RoutineList, Editor, Session)
├── context/             # Global state (AppContext)
├── storage/             # localStorage utilities
├── data/                # Exercise catalog
├── styles/              # CSS modules
├── types.ts             # TypeScript types
├── App.tsx              # Root component
└── main.tsx             # Entry point
```

## Roadmap

- [ ] Export/import routines (JSON)
- [ ] Workout history and statistics
- [ ] Dark mode
- [ ] PWA (install as app)
- [ ] Multi-language support
- [ ] Custom rest intervals per exercise

## Deployment

### GitHub Pages
```bash
npm run build
# Commit dist/ and enable GitHub Pages from settings
```

### Vercel
```bash
vercel
```

### Netlify
```bash
npm run build
# Connect repo to Netlify
```

## Testing

```bash
npm test              # Run unit tests
npm run lint          # Type check
npm run build         # Build verification
```

## License

MIT

## Support

For issues or feature requests, open a GitHub issue on this repository.

---

**Made with ❤️ for gym enthusiasts who want to track workouts offline.**
