# CVMaker

Single-file, print-ready application documents for Ahmetcan Aksu. No build
step, no dependencies, no network requests.

| File | What it is |
| --- | --- |
| `cv.html` | Two-page CV, EN/TR |
| `letter.html` | One-page cover letter, EN/TR, tailorable per application |

Both follow the same editing model and share the same visual language.

## Editing

All content lives in one `DATA` object at the top of `cv.html` (search for
`CV DATA`). Every string is a `{ en, tr }` pair, so the two languages sit side
by side and cannot drift apart:

```js
title: { en: "Backend Developer", tr: "Backend Geliştirici" },
from: "2024-02", to: null,          // to: null renders as "Present" / "Devam Ediyor"
```

Nothing below the `RENDERING` divider needs to be touched.

## Exporting a PDF

1. Open `cv.html` in a browser.
2. Pick the language (EN / TR button, or open `cv.html#tr`).
3. `Cmd/Ctrl + P` → Save as PDF → **A4**, margins **Default**, scale **100%**,
   background graphics **on**.

The page carries its own print margins, so browser headers/footers should be off.

## Page count

`layout.baseFontPt` in the data block is the single lever for fitting content.
With the current content, **10.0–10.8pt renders on two A4 pages**; 11.0pt tips
onto a third. The on-screen `A−` / `A+` buttons nudge it live, and the value you
land on is remembered and used by the PDF export.

## Machine readability

Built for CV-parsing software and LLM screeners:

- Single-column semantic HTML — `<section>`, `<h2>`, `<article>`, `<ul>` — in
  natural reading order. Multi-column CVs are a common cause of scrambled ATS
  parses; this one has no column tricks in the DOM.
- All text is real selectable text. No images, no icon fonts, no glyph
  substitutions for words.
- Dates are unambiguous (`Feb 2024 – Present`) and generated from ISO values.
- A `schema.org/Person` JSON-LD block is generated from the same data on every
  render, giving parsers explicit `jobTitle`, `worksFor`, `alumniOf`,
  `knowsAbout`, `knowsLanguage` and `hasCredential` fields.
- No hidden keyword stuffing — the visible text and the structured data agree.

## Static export

Some application portals accept an HTML upload but do not run JavaScript. The
**Export static HTML** button writes `Ahmetcan-Aksu-CV-EN.html` (or `-TR`) with
the current language baked into the markup, all scripts stripped, and the
JSON-LD retained.

## The cover letter

`letter.html` works like `cv.html`, plus an `application` block at the top of
the data object that you edit per application:

```js
application: {
  company:   "Monzo Bank",
  role:      "Senior Backend Engineer",
  recipient: "Jane Okafor",          // "" -> "To Whom It May Concern"
  source:    "your careers page",
  custom:    { en: "...", tr: "..." }
}
```

The letter adapts to what you fill in:

- **`role` set** — opens with "I am writing to apply for the {role} position at
  {company}", and switches to an intro variant that drops the redundant "My
  name is" (the letterhead already carries it).
- **`role` empty** — falls back to the general-purpose letter.
- **`recipient` set** — "Dear {name},"; empty gives "To Whom It May Concern," /
  "İlgili Makama,".
- **`custom`** — one paragraph on why *this* company. It is the only part a
  hiring manager can't get from your CV, so it is worth writing every time.
  Leave it `""` and the paragraph is omitted.
- **`date`** — `null` renders today's date in the active language.

Measured: 10.4pt keeps the letter on one A4 page even with the application
block fully filled in and a five-line custom paragraph.

Unlike the CV, the letter shows the phone number by default, since letters
normally carry one.

## Privacy

- Phone number is off by default: set `contact.showPhone` to `true` when an
  application asks for it, export, then set it back.
- Reference contact details are deliberately not rendered. They are kept in a
  comment next to the `references` array, to be shared on request.
