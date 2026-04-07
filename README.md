# Teacher Growth Journey

Teacher Growth Journey is a small frontend prototype for a teacher development app.

The idea is simple: a teacher picks one area to work on, tries a classroom strategy, writes a short reflection, and keeps track of progress over time.

## What’s in the app

- A home page with the current focus and next step
- Focus area pages with guidance, techniques, and examples
- A reflection flow with saved drafts
- Progress and passport pages to show development over time
- Light and dark mode

## Tech stack

- React
- TypeScript
- Vite
- React Router
- Vitest
- React Testing Library

## Run it locally

Install dependencies:

```bash
npm install
```

Start the app:

```bash
npm run dev
```

Run tests:

```bash
npm test
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Main routes

- `/`
- `/focus-areas`
- `/focus-areas/:focusAreaId`
- `/reflection`
- `/progress`
- `/passport`

## Notes

- This is a frontend-only project.
- The app uses mock data.
- State is saved in `localStorage`, so progress, reflections, and theme choices stay in place between refreshes.
