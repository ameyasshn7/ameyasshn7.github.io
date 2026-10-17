# ameyasshn7.github.io

Personal site, served by GitHub Pages from this `docs/` folder. Plain HTML/CSS, no build step.

## Files

- `index.html` – all page content
- `style.css` – layout and colors (colors are the variables at the top)
- `app.js` – the photo viewer (arrows, ← / → keys, swipe, and the Play slideshow button)
- `assets/img/` – photos
- `files/Ameyassh_Nagarajan_Resume.pdf` – the CV linked from the page

## Adding photos

To change a photo, overwrite its file in `assets/img/` with your photo **using the same file name**, then edit its caption in `index.html`.

| File | Where it shows | Best shape |
|---|---|---|
| `headshot.jpg` | Top right, next to your name | Portrait, about 4:5 |
| `research-slug.jpg` | Research: slug monitoring | Landscape, 4:3 |
| `research-seed.jpg` | Research: seed identification | Landscape, 4:3 |
| `research-dirt.jpg` | Research: DIRT | Landscape, 4:3 |
| `field-01.jpg` … `field-05.jpg` | Gallery: In the field (`field-02` is the big tile) | Any |
| `talk-hyslop-farm-day.jpg` | Gallery: Hyslop Farm Day (big tile) | Wide, 16:9 |
| `talk-seed-ai-poster-2025.jpg` | Gallery: Seed AI poster, Albany, Jan 2025 | Landscape |
| `milestone-ms-commencement.jpg` | Gallery: Master's commencement | Wide, 16:9 |
| `milestone-scholarship-board.jpg` | Gallery: Kent Wiley scholarship board | Portrait, 4:5 |
| `conf-asabe-2025.jpg` | Gallery: ASABE 2025, Toronto | Landscape |

The gallery is laid out as mosaics: in each group the photo marked `class="feature"` is the large tile and the rest fill in beside it. Photos are cropped to fill their tile, and the full uncropped photo opens when clicked. Captions appear when you hover over a photo, and always in the viewer.

Tips:
- Resize to about 1600 px on the long side before adding (keeps the page fast). On a Mac: open in Preview, Tools → Adjust Size.
- Keep the `.jpg` names. If you use a `.png`, change the matching `src="..."` in `index.html` too.
- To choose which part of a photo stays visible in its tile, add `style="object-position: center 70%"` to the `<img>` (0% shows the top, 100% the bottom).
- To make a different photo the big one, move `class="feature"` to its `<figure>` and put that `<figure>` first in the group.
- "In the field" fits 5 photos exactly (1 big + 4 small). A 6th, 7th, 8th or 9th photo starts a new row of 4 small squares, so add them in fours to keep the rows full.
- To remove a photo, delete its `<figure>...</figure>` line.

## Updating the CV

Replace `files/Ameyassh_Nagarajan_Resume.pdf` with the new PDF (same name).

## Publishing

```
git add docs
git commit -m "Redesign site"
git push
```

GitHub Pages picks it up within a minute or two.
