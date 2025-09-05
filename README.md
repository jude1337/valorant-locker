
# jds — Valorant Locker (Static Site)

A clean, animated, Valorant-styled site to show off your inventory.

## Quick start
1. Upload the `/valorant-jds1337` folder to your web host under the path `/jds1337` on your `7udas.cc` domain.
   - Final URL: `https://7udas.cc/jds1337`
2. Replace the placeholder player card image:
   - Put your actual image at `assets/player-card.jpg` (keep the same filename).
3. (Optional) Edit `data.json` to change any text or add more skins.

## Local preview
Just open `index.html` in a browser or use any static server:
```bash
python3 -m http.server 8080
# then visit http://localhost:8080/valorant-jds1337/index.html
```

## Notes
- Fonts: Google Fonts (Teko + Rajdhani) for a Valorant vibe.
- Colors: Valorant red `#ff4655` + dark UI. Subtle animated grid/shards in background.
- No frameworks, just HTML/CSS/JS. Easy to host anywhere.
