# Requested Changes & Progress

## ✅ Completed Changes

- [x] **Header Brand**: Changed `our chapter` ➔ `our story till now`
  - *Files updated*: [`index.html`](file:///home/kirito/Projects/birthday/gemini/index.html#L34), [`js/config.js`](file:///home/kirito/Projects/birthday/gemini/js/config.js#L11), [`js/main.js`](file:///home/kirito/Projects/birthday/gemini/js/main.js#L16-L18)
- [x] **Hero Recipient Name & Title**: Changed `Happy Birthday, My Love` ➔ `Happy Birthday, My Baccccchaa`
  - *Files updated*: [`index.html`](file:///home/kirito/Projects/birthday/gemini/index.html#L6-L59) (title & hero heading), [`js/config.js`](file:///home/kirito/Projects/birthday/gemini/js/config.js#L20)
- [x] **Hero CTA Button**: Changed `Explore Our Journey` ➔ `Us, From Start`
  - *Files updated*: [`index.html`](file:///home/kirito/Projects/birthday/gemini/index.html#L75), [`js/config.js`](file:///home/kirito/Projects/birthday/gemini/js/config.js#L25), [`js/main.js`](file:///home/kirito/Projects/birthday/gemini/js/main.js#L28-L30)
- [x] **Milestone Counter Days**: Calculated dynamically between Start Date (`2025-06-26`) and End Date (`2026-09-27`) ➔ **458 Days**
  - *Files updated*: [`js/config.js`](file:///home/kirito/Projects/birthday/gemini/js/config.js#L28-L34), [`js/timeline.js`](file:///home/kirito/Projects/birthday/gemini/js/timeline.js#L15-L18)
  - *Calculation*: 26th June 2025 to 27th September 2026 is exactly 458 days (188 days in 2025 + 270 days in 2026).
- [x] **Cherished Memories Section Subtitle**: Changed description text under Cherished Memories ➔ `Every moment by your side is etched into my heart and I remember every single one of them. Here are just a few of my favorite chapters.`
  - *Files updated*: [`index.html`](file:///home/kirito/Projects/birthday/gemini/index.html#L99), [`js/config.js`](file:///home/kirito/Projects/birthday/gemini/js/config.js#L37), [`js/main.js`](file:///home/kirito/Projects/birthday/gemini/js/main.js#L31-L33)
- [x] **All 6 Memories & Images Updated**:
  - *Files updated*: [`js/config.js`](file:///home/kirito/Projects/birthday/gemini/js/config.js#L41-L91), [`js/timeline.js`](file:///home/kirito/Projects/birthday/gemini/js/timeline.js#L83)
  - **Memory 1**: *June 26th - July 20th* • `You and me, became Us` (`images/image1.jpg`)
  - **Memory 2**: *16th August* • `Gf, no you are my wife` (`images/image2.jpg`)
  - **Memory 3**: *27th September* • `First Movie, on ur bday` (`images/image3.jpg`)
  - **Memory 4**: *22nd March* • `With you, life is full of sukoon` (`images/image4.jpg`)
  - **Memory 5**: *3rd July* • `Our First Trip` (`images/image5.jpg`)
  - **Memory 6**: *Today & Always* • `Celebrating You` (`images/image6.jpg`)
- [x] **Darker Background & Night/Day Mode Toggle**:
  - *Files updated*: [`index.html`](file:///home/kirito/Projects/birthday/gemini/index.html#L17-L50), [`css/style.css`](file:///home/kirito/Projects/birthday/gemini/css/style.css#L30-L50), [`js/main.js`](file:///home/kirito/Projects/birthday/gemini/js/main.js#L51-L84), [`js/config.js`](file:///home/kirito/Projects/birthday/gemini/js/config.js#L14-L17)
  - Added **Romantic Twilight Mode** (default): A deep espresso/blackberry charcoal (`#141014`) with glowing rose gold accents, soft ivory text, and midnight polaroid/envelope textures.
  - Added an interactive **Night / Day Mode toggle button** in the header so she can toggle between the dreamy night mode and soft daytime cream anytime.
  - Persistent preference saved in `localStorage` with zero-flash early initialization.

---

## 💡 Suggestions & Ideas for Enhancement

1. **Letter Personalization**:
   - The salutation in the wax-sealed letter (`js/config.js`) currently reads: *"To the most wonderful person in my world,"*. We can customize it with her nickname (e.g., *"To my dearest Baccccchaa,"*) or personalize the closing signature (currently *"Your Favorite Person"*).
2. **Music Selection**:
   - You can provide your couple's song by placing an MP3 in an `audio/` folder or setting `customAudioUrl` in `js/config.js`. If left blank, the soothing procedural piano lullaby will play automatically.
