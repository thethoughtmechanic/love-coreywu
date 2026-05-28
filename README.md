# Wired for Love Learning App

A desktop-first React learning guide for Stan Tatkin's `Wired for Love`, with a mobile companion (Learn · Practice · Mirror) below 768px.

## Run

```bash
npm install
npm run dev
```

## Mobile and Mirror

- **Breakpoint:** Viewport under 768px shows the mobile shell (`Learn`, `Practice`, `Mirror` bottom nav). Wider viewports keep the full chapter desktop experience.
- **Mirror (Project Mirror hackathon MVP):** Embedded in the Mirror tab, with intent presets from WFL/fight-well language, optional off-limit phrases (localStorage), then a live session where the **full-screen background color follows real microphone amplitude** (green / amber / red). One optional **demo** boundary toast may appear after about 18s if off-limit phrases were set (labeled, not real STT).
- **Microphone and HTTPS:** `getUserMedia` requires a [secure context](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia#privacy_and_security). `localhost` works for dev; on a phone use HTTPS (for example, `vite --host` behind ngrok, or deploy to HTTPS). Denied permission shows a clear message and returns to intent.
- **Deferred:** Speech-to-text, recording, cloud upload, and LLM post-session synthesis. The post-session screen is a static/mock snapshot for demo.

## Structure

- `src/data/wiredForLove.ts` — chapter content, principles, practices.
- `src/data/mobileSummaries.ts` — mobile learn pages (from chapter spine) and practice list.
- `src/desktop/DesktopApp.tsx` — desktop chapter navigation and full scroll.
- `src/mobile/` — mobile shell, Learn, Practice tabs.
- `src/mirror/` — Mirror intent, live mic session, post-session (WFL integration).
- `src/App.tsx` — `matchMedia` switch between mobile and desktop.
- `src/styles/global.css` — desktop visual system; `src/styles/mobile.css` — mobile + Mirror.
- `content/wired-for-love-extract.txt` is the local raw PDF text extraction workspace and is intentionally ignored from public git.

## Test on mobile

1. `npm run dev`, then open DevTools and toggle device toolbar under 768px, or use a real device on the same network with HTTPS if testing the mic.
2. **Learn:** Tap chapter cards; expand for Tatkin one-liner and detail bullets.
3. **Practice:** Check “Today” rotation; tap rows for step lists.
4. **Mirror:** Select 1–3 goals → Begin → allow mic → speak at different volumes; End session → mock summary.
