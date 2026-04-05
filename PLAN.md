# Resume Site — Build Plan

## Decisions

- **Single route** (`/`), client-side slide state with hash fragments for deep-linking
- **Full-viewport slides**, one visible at a time, transitions between them
- **Direction-aware transitions** (slide left/right based on nav direction), snappy (~200-300ms)
- **SlideLayout** — shared component: section header pinned left, body content right
- **Per-slide components** — each slide knows how to render its own data shape
- **Single data file** (`resume.ts`) with per-section TypeScript types
- **Config array** — single source of truth for slide order, components, data, and sidebar nav
- **Self-hosted fonts** — Space Grotesk (headlines), JetBrains Mono (everything else)
- **Design tokens** in `theme.css` via Tailwind v4 `@theme` directives
- **Sidebar** — fixed left column, all 5 sections listed, active slide visually indicated (line indicator + bright text, or hollow detached-corner frame)
- **No vertical decorative text** for now (out of scope)

## Project Structure

```
src/
├── lib/
│   ├── components/
│   │   ├── Sidebar.svelte
│   │   ├── SlideContainer.svelte
│   │   ├── SlideLayout.svelte
│   │   └── slides/
│   │       ├── About.svelte
│   │       ├── Experience.svelte
│   │       ├── Skills.svelte
│   │       ├── Education.svelte
│   │       └── Contact.svelte
│   ├── data/
│   │   └── resume.ts
│   └── styles/
│       └── theme.css
├── routes/
│   ├── +layout.svelte
│   └── +page.svelte
```

## Data Flow

```
resume.ts (exports typed resume object)
    ↓
+page.svelte (imports resume, owns currentSlide state)
    ├── Sidebar (receives slide list + currentSlide, emits navigation)
    └── SlideContainer (receives currentSlide + resume data)
            └── renders the matching slide component
                └── e.g. Experience (receives resume.experience as prop)
                    └── wraps itself in SlideLayout
```

## Stages

### Stage 1 — Foundation
- [x] Install `@fontsource/space-grotesk` and `@fontsource/jetbrains-mono`
- [x] Create `src/lib/styles/theme.css` with design tokens (colors, fonts, spacing)
- [x] Update `app.html` with base dark background
- [x] Update `+layout.svelte` to load fonts and global styles

### Stage 2 — Shell
- [x] `Sidebar.svelte` — fixed left column, name, nav links for all 5 sections, active indicator
- [x] `SlideContainer.svelte` — full-viewport container, renders current slide
- [x] `+page.svelte` — orchestrator, owns `currentSlide` state, wires sidebar + container
- [x] Slide config array (id, label, component, data mapping)
- [x] Placeholder content only — verify layout works

### Stage 3 — Layout & Transitions
- [ ] `SlideLayout.svelte` — shared header-left / body-right skeleton
- [ ] Direction-aware slide + fade transitions (~200-300ms)
- [ ] Keyboard navigation (arrow keys for prev/next)
- [ ] Hash fragment sync (`/#experience`)

### Stage 4 — Data & Content
- [ ] `resume.ts` — define types, add real data for About + Experience
- [ ] `About.svelte` — renders about data within SlideLayout
- [ ] `Experience.svelte` — renders experience data within SlideLayout

### Stage 5 — Polish & Remaining Slides
- [ ] `Skills.svelte` — renders skills data
- [ ] `Education.svelte` — renders education data
- [ ] `Contact.svelte` — renders contact data
- [ ] Responsive behavior (if needed)
- [ ] Fine-tune spacing, transitions, typography
