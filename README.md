# Teacher Growth Journey

Teacher Growth Journey is a frontend product prototype for a teacher development workflow. The idea is simple: help a teacher choose one area of practice, try a specific classroom move, reflect on what happened, and keep track of progress over time without turning the experience into a heavy admin tool.

This project is built as a realistic product UI rather than a marketing page or a generic dashboard. It is designed around a practical teaching loop:

1. choose a focus area
2. review evidence and suggested techniques
3. try something in class
4. write a short reflection
5. turn that reflection into an insight and next goal

## What the product includes

- A focused homepage that surfaces the current priority, progress, saved draft continuity, and next best action.
- Focus area pages with evidence summaries, recommended techniques, classroom examples, and linked resources.
- A stronger end-to-end reflection workflow with autosaved local drafts, evidence prompts, previous reflection context, and a clear next-step handoff.
- Progress and passport screens that show development over time instead of just static cards.
- Local persistence with `localStorage`, so the app feels like a working product rather than a reset-on-refresh demo.
- Light and dark mode with persisted theme preference.

## Why I built it this way

A lot of education product demos either become overly decorative or collapse into a plain admin dashboard. I wanted this to sit somewhere more believable: product-led, visually polished, but still grounded in an actual user workflow.

The UI is intentionally built around teacher time and attention:

- short reflection prompts instead of long forms
- one recommended next move instead of many competing actions
- realistic progress signals based on trying, reflecting, and refining
- calmer layouts that avoid overusing nested cards

## Tech stack

- React
- TypeScript
- Vite
- React Router
- Context API
- CSS Modules
- Vitest
- React Testing Library

## Running the project

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Run tests:

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test:watch
```

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Project structure

```text
src/
  app/        app shell, global styles, providers, router
  features/   reusable product-level features
  pages/      route-level screens
  shared/     UI primitives, types, mocks, utilities, config
  test/       shared test setup and helpers
```

The main route surfaces are:

- `/` overview/home
- `/focus-areas`
- `/focus-areas/:focusAreaId`
- `/reflection`
- `/progress`
- `/passport`

## Architecture notes

This project uses a small mock service layer instead of hardcoded page state. That means actions like saving a reflection, marking a technique as tried, changing the current focus, or promoting an insight into a goal all update the shared journey state and reflow the UI.

State is seeded from mock data and persisted locally, which makes the product much more believable during demos and interviews. Reflection drafts are also stored locally, so a teacher can leave the page and come back to continue where they left off.

## Product decisions

### Reflection is the core workflow

The reflection experience is the strongest end-to-end flow in the project right now. It includes:

- selected focus and technique context
- evidence-aware prompts
- confidence rating
- draft persistence
- history, insights, and goals in the same workflow

Saving a reflection also feeds the wider journey by creating a new insight and updating the development record.

### Progress is based on practice, not content completion

Progress is derived from signals such as:

- techniques tried
- reflections logged
- confidence in recent use

That gives the product a more realistic sense of growth than a generic “percent complete” bar tied only to reading resources.

### The interface is intentionally calmer

I spent time reducing unnecessary card density, improving spacing rhythm, and making page hierarchy more consistent. The goal was to make it feel closer to a real product and less like a UI showcase.

## Accessibility and UX work included

- semantic headings and form structure
- visible keyboard focus states
- improved small-screen behavior
- reduced visual clutter in dense areas
- persistent state for theme and journey data
- lighter motion with reduced-motion support

## Testing

There are targeted tests around the key workflows, including:

- homepage rendering
- focus area detail interactions
- reflection saving
- reflection draft restore behavior

## If you are using this in an interview

This project is best presented as a product-thinking frontend case study, not just a visual demo.

Good things to highlight:

- the app is built around a realistic user loop
- state changes persist locally
- the reflection flow is designed as a complete interaction, not just a form
- the codebase is structured to scale beyond a single-page prototype
- design decisions were made to reduce cognitive load and make the product feel more credible

If I were taking it further, the next steps would be:

- full mobile and tablet pass across every page
- accessibility audit and refinement
- richer filtering and search
- exportable CPD/passport summaries
- backend integration instead of local mock persistence

