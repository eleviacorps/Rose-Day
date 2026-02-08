# Rose Day / Valentine Week Web Page

A single-file interactive gift page built with plain HTML, CSS, and JavaScript.
You can fork this and customize it for Rose Day, Propose Day, Chocolate Day, or full Valentine Week.

## What This Project Includes

- Animated opening bouquet scene
- Tap-to-reveal "soft thoughts" scene
- Envelope + letter reveal scene
- Built-in mini audio players
- Expandable "Just For You" message cards
- 2 image sections with click-to-open compliment popups
- Final quote screen
- Mobile-friendly layout

## Tech Stack

- HTML
- CSS
- Vanilla JavaScript

## Project Structure

```text
.
|-- rose-day.html
|-- audio/
|   |-- bargad.mp3
|   `-- chaandni.mp3
`-- images/
    |-- cuteness.png
    |-- eyes.png
    |-- faveyes.png
    |-- hawt.png
    |-- shocked.png
    |-- smiles.png
    `-- softsmile.png
```

## Quick Start

1. Clone/fork this repository.
2. Open `rose-day.html` in your browser.
3. Edit content in the `CONFIG` object inside `rose-day.html`.
4. Replace files in `images/` and `audio/` as needed.

## Where To Customize Content

Most personal content is controlled by the `CONFIG` object in `rose-day.html`.

### 1) Main Letter Text

Edit:

- `CONFIG.loveLetter`

This controls the full envelope letter message.

### 2) Tap Flower Messages (Scene 2)

Edit:

- `CONFIG.tapMessages` (array of short lines)

Each tap reveals the next line.

### 3) "Just For You" Expandable Notes (Scene 5)

Edit:

- `CONFIG.notes` (array)

Each item becomes one expandable card.

### 4) Final Quote (Scene 8)

Edit:

- `CONFIG.quote.text`
- `CONFIG.quote.author`

### 5) Songs Section (Scene 4)

Edit:

- `CONFIG.songs`

Each song object uses:

- `title`
- `artist`
- `file` (path inside `audio/`)

Example:

```js
{ title: "My Song", artist: "Artist Name", file: "audio/my-song.mp3" }
```

### 6) "What I Adore" Image Cards (Scene 6)

Edit:

- `CONFIG.features`

Each item uses:

- `image` (path inside `images/`)
- `caption`
- `compliments` (array of popup lines)

### 7) "Favorite Gallery" Cards (Scene 7)

Edit:

- `CONFIG.gallery`

Each item uses:

- `image`
- `caption`
- `compliments`

Important: the compliment popup uses these arrays directly, so keep `compliments` as an array of strings.

## How To Change Page Headings and Labels

Some text is outside `CONFIG` and lives directly in HTML:

- Hero line/title in Scene 1
- Section tags like "Playful playlist", "Everyday magic"
- Button labels like "Next" / "Continue"

Search in `rose-day.html` for:

- `sceneTag`
- `sceneTitle`
- `nextBtn`

## How To Replace Images and Audio

### Images

1. Put your files in `images/`.
2. Update matching paths in `CONFIG.features` and `CONFIG.gallery`.
3. Keep filenames simple (letters, numbers, dashes).

### Audio

1. Put your tracks in `audio/`.
2. Update `CONFIG.songs[*].file`.
3. Prefer compressed MP3 for faster loading.

## Add or Remove Cards

You can safely add/remove entries in:

- `CONFIG.songs`
- `CONFIG.notes`
- `CONFIG.features`
- `CONFIG.gallery`

The UI is generated dynamically, so card counts are not hardcoded.

## Popup Compliments (7 Images)

Clicking any image card in Scene 6/7 opens a modal with:

- The same image
- The same caption
- The item's `compliments` list

So if you want custom popup content, edit each card's `compliments` array.

## Mobile Performance Notes

The page has an automatic lightweight mode for weaker devices (`perf-lite`) that reduces expensive visual effects.
If you still want it lighter, you can reduce:

- Particle count in `createParticles()`
- Heart count in `createHearts()`
- Number of bouquet roses in `buildFirstBouquet()` / `buildTapFlower()`

## Deploy

This is a static site. You can deploy with:

- GitHub Pages
- Netlify
- Vercel

When deploying, upload:

- `rose-day.html`
- `images/`
- `audio/`

## Typical Valentine Week Reuse Flow

1. Duplicate this repo.
2. Replace all media files in `images/` and `audio/`.
3. Update all `CONFIG` text.
4. Change scene labels/headings in HTML.
5. Test on phone + desktop.
6. Deploy and share the link.
