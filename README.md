# Teacher Growth Journey

A production-quality React + TypeScript prototype for an internal teacher development product. It models a realistic improvement loop for busy teachers: choose a focus area, learn evidence-informed techniques, try one in class, reflect briefly, and track progress over time.

## Why this maps to a real EdTech product

This is intentionally not a dashboard or marketing site. The product slice is designed around daily teacher behaviour:

- A small overview page that surfaces the current focus, recent reflection, progress this week, and the single most useful next action.
- Focus area detail pages that translate evidence into plain language and then into practical techniques with classroom examples.
- A short reflection workflow that respects teacher time while still producing usable progress signals.
- Progress tracking based on classroom action and reflection, not passive content consumption.

## High-impact product features included

- Recommended next step logic based on current focus progress, recent technique use, and reflection history.
- Progress visualisation through rings and bars at both overview and focus-area level.
- Bookmarkable techniques so teachers can save ideas before trying them.
- Light and dark mode with persisted preference.
- Local persistence via `localStorage` so the prototype behaves more like a real working product.

## Tech stack

- React
- TypeScript
- Vite
- React Router
- Context API for app state
- CSS Modules for styling
- React Testing Library + Vitest

## Folder structure

```text
teacher-growth-journey/
├── .gitignore
├── index.html
├── package.json
├── README.md
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── src
    ├── app
    │   ├── App.tsx
    │   ├── global.css
    │   ├── providers
    │   │   ├── AppProviders.tsx
    │   │   ├── JourneyProvider.tsx
    │   │   └── index.ts
    │   └── router
    │       ├── AppRouter.tsx
    │       └── index.ts
    ├── features
    │   └── focus-area-techniques
    │   │   ├── TechniqueCard.module.css
    │   │   └── TechniqueCard.tsx
    ├── pages
    │   ├── focus-areas
    │   │   ├── FocusAreaDetailPage.module.css
    │   │   ├── FocusAreaDetailPage.test.tsx
    │   │   ├── FocusAreaDetailPage.tsx
    │   │   ├── FocusAreasPage.module.css
    │   │   ├── FocusAreasPage.test.tsx
    │   │   └── FocusAreasPage.tsx
    │   ├── home
    │   │   ├── HomePage.module.css
    │   │   └── HomePage.tsx
    │   ├── passport
    │   │   ├── PassportPage.module.css
    │   │   ├── PassportPage.test.tsx
    │   │   └── PassportPage.tsx
    │   ├── progress
    │   │   ├── ProgressPage.module.css
    │   │   └── ProgressPage.tsx
    │   └── reflection
    │       ├── ReflectionPage.module.css
    │       ├── ReflectionPage.test.tsx
    │       └── ReflectionPage.tsx
    ├── shared
    │   ├── api
    │   │   └── mockApi.ts
    │   ├── config
    │   │   └── routes.ts
    │   ├── lib
    │   │   ├── colorTokens.ts
    │   │   ├── development.ts
    │   │   ├── passport.ts
    │   │   ├── progress.ts
    │   │   └── recommendations.ts
    │   ├── mocks
    │   │   └── mockData.ts
    │   ├── types
    │   │   └── index.ts
    │   └── ui
    │       ├── Button.tsx
    │       ├── Card.tsx
    │       ├── Layout.tsx
    │       └── index.ts
    ├── test
    │   ├── renderApp.tsx
    │   └── setup.ts
    └── vite-env.d.ts
```

## Architecture direction

The codebase now follows a more product-team-friendly structure:

- `app/` holds composition and bootstrap concerns such as providers and the router.
- `pages/` contains route-level screens. These are the entry points a user can navigate to directly.
- `features/` contains reusable product behaviour that can appear inside multiple pages. Right now `TechniqueCard` is a true feature-level slice.
- `shared/` contains cross-cutting building blocks: UI primitives, domain utilities, route config, mock API, seed data, and shared types.
- `test/` keeps common test wiring out of page files.

This is closer to how many companies separate application shell, routed surfaces, reusable product slices, and shared infrastructure. It also makes it easier to grow the app without turning every new screen into a catch-all `components` folder.

## Key implementation choices

### 1. Product logic over static UI

The app uses a small mock service layer with async behaviour and local persistence. Actions such as changing the current focus, bookmarking a technique, logging a technique as tried, and saving reflections all update the underlying state and reflow the UI.

### 2. Progress that reflects practice

Progress is derived from:

- techniques tried
- number of reflections
- most recent confidence rating

That gives a more realistic signal than a generic completion bar.

### 3. Calm teacher-friendly interface

The visual system is designed to reduce cognitive load:

- restrained colours and high-contrast text
- spacious card layouts
- plain-language evidence summaries
- one primary action per key area
- accessible forms and clear focus states

### 4. Scalable frontend structure

The project now uses clearer architectural boundaries:

- shared UI primitives live in `src/shared/ui`
- route screens live in `src/pages`
- reusable product slices live in `src/features`
- app shell concerns live in `src/app`
- route definitions are centralised in `src/shared/config/routes.ts`
- imports use the `@/` alias to avoid brittle `../../..` paths

That is a much closer fit for a real frontend codebase where teams need consistent ownership and predictable scaling.

## Accessibility notes

- Semantic page structure with headings, form labels, fieldsets, legends, and progress roles.
- Keyboard accessible controls and visible focus treatment.
- Strong contrast in both light and dark themes.
- Loading, empty, and error states included for key flows.

## Tests included

- Rendering the seeded focus areas on the focus area page.
- Marking a technique as tried on the focus detail page.
- Saving a reflection and seeing it appear in history.

## How to run

1. Install dependencies:

```bash
npm install
```

2. Start the dev server:

```bash
npm run dev
```

3. Run tests:

```bash
npm test
```

4. Build for production:

```bash
npm run build
```

## Notes for interview presentation

This prototype is strongest when presented as a deliberate product slice:

- It solves a specific workflow rather than trying to show every possible module.
- It demonstrates judgement about teacher time, not just visual polish.
- It keeps the engineering structure ready for scale while staying appropriately lightweight for a prototype.
