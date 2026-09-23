# 🌸 Minimalist Birthday Website for Her

An elegant, heartfelt, and interactive birthday website designed with a luxury editorial aesthetic, smooth animations, and memorable interactive touches.

---

## ✨ Features

- **Minimalist Luxury Aesthetic**: Soft warm cream, blush, and rose gold palette with editorial serif typography (*Cormorant Garamond* & *Plus Jakarta Sans*).
- **Ambient Canvas Background**: Floating warm bokeh orbs and twinkling stardust that gently react to mouse movement.
- **Custom Cursor & Trail**: Smooth custom follower ring, precision dot, and a trailing stream of twinkling hearts and sparkles.
- **Interactive Timeline**: Polaroid-style photo cards with organic tilt, smooth scroll reveal animations, and an instant lightbox view.
- **Days Together Counter**: Live animated milestone ticker.
- **3D Letter Opening Experience**:
  - Realistic 3D folded envelope with a deep burgundy wax seal.
  - Clicking the seal cracks the wax, flips open the top flap, and smoothly unfolds the heartfelt letter paper.
  - Automatic celebration confetti cannon with golden foil & rose petals!
  - Interactive "Make a Birthday Wish" button with instant sparkle bursts.
- **Ambient Sound**: Built-in procedural piano / music box lullaby using Web Audio API (zero audio file dependencies required, plus support for custom MP3s).

---

## 🚀 Quick Start (How to Run)

Open a terminal in this directory and start a local server:

```bash
python3 -m http.server 8080
```

Then open your browser to:
**[http://localhost:8080](http://localhost:8080)**

---

## 🎨 How to Personalize (In 2 Minutes)

All texts, dates, memories, photos, and letter paragraphs are cleanly organized in **`js/config.js`**:

1. **Her Name & Hero Subtitle**:
   Open `js/config.js` and modify:
   ```javascript
   recipient: {
     name: "Sarah", // Her name here
     nickname: "Beautiful",
     heroSubtitle: "..."
   }
   ```

2. **Milestone Date**:
   Change the anniversary/start date:
   ```javascript
   counter: {
     startDate: "2023-10-14",
     label: "Days of loving you and counting..."
   }
   ```

3. **Your Photos & Moments**:
   Drop your favorite pictures into the `images/` folder (e.g. `images/photo1.jpg`), then update the timeline items in `js/config.js`:
   ```javascript
   timeline: [
     {
       date: "October 14, 2023",
       title: "The First Date",
       tag: "Coffee & Smiles",
       description: "Your sweet description here...",
       image: "images/your-photo.jpg",
       location: "Central Park Cafe"
     },
     ...
   ]
   ```

4. **The Birthday Love Letter**:
   Edit the paragraphs, salutation, and signature in `js/config.js`:
   ```javascript
   letter: {
     salutation: "To my favorite person,",
     paragraphs: [
       "Happy Birthday! ...",
       "..."
     ],
     closing: "Forever yours,",
     author: "Your Name"
   }
   ```

5. **Optional Custom Song**:
   If you want a specific song (e.g. your couple's song), place an MP3 in `audio/` or provide a URL in:
   ```javascript
   music: {
     customAudioUrl: "audio/our-song.mp3"
   }
   ```
   *(If left blank, it automatically plays the built-in piano melody!)*

---

## 📦 How to Share It With Her

- **GitHub Pages**: Push this repo to GitHub, go to **Settings > Pages**, and select the `main` branch. It will generate a live URL in seconds!
- **Vercel / Netlify**: Simply drag and drop this project folder into [Netlify Drop](https://app.netlify.com/drop) or deploy via Vercel for free instant hosting.
- **Direct Zip**: Zip the folder and share it directly — it opens instantly in any browser.
