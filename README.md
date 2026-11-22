# FocusBoard

Responsive single-user task dashboard built with **React 18 + Vite** (JavaScript, plain CSS).

- **Live URL:** https://YOUR-APP.vercel.app  <!-- fill in -->
- **GitHub:** https://github.com/YOUR-USERNAME/focusboard  <!-- fill in -->

## Setup
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Features
Create / edit / delete (with confirmation) tasks, status updates via circle or row menu, case-insensitive title search + status tabs + priority filter (combined), stats derived from data, 3-slide Focus Notes carousel, localStorage persistence, responsive at 390 / 768 / 1440 px, keyboard-accessible modal forms.

## Pages
- **Overview:** banner carousel, stats, filtered task list.
- **My tasks:** full task list with search, status tabs and priority filter.
- **Calendar:** month view of due dates; click a day to see and edit its tasks.
- **Settings:** reset to sample data or delete all tasks (both confirmed).

## State management choice
`useReducer` in a `useTasks` hook. The task array is the single source of truth; add / update / status / delete are pure reducer actions that return new arrays (no mutation). Search, tabs, priority filters, stats and the visible list are **derived** (`useMemo` / inline) and never stored. This app is small and single-user, so a state library would be unnecessary overhead. Carousel index is local state in `Carousel`.

## Persistence
Tasks save to `localStorage` (`focusboard.tasks.v1`) on every change, wrapped in `try/catch`. Sample data loads only when no valid saved array exists, so it never overwrites user work (even an intentionally empty list).

## Figma notes and limitations
- Sample data mirrors the Figma frames: 12 tasks = 5 in progress + 7 completed, so **To do starts empty** (create a task or use the row menu to move one there).
- The Figma create form has no category field, so new tasks get the category `General`; edits keep the existing category.
- A derived completion percentage chip was added to the Completed card (not in Figma) to satisfy the "completion percentage" requirement.
- On mobile the In progress stat card is hidden, as in the mobile frame.
- Sidebar / bottom-nav are real pages (Overview, My tasks, Calendar, Settings) routed through the URL hash (`#tasks`, `#calendar`, ...), so refresh and the back button work.
- The avatar menu (top right) opens a dropdown with links to My tasks, Calendar and Settings; the display name is editable in Settings and saved in localStorage. There is no login (not required), so there is no sign-out.
- Only the Focus Notes floating card is a visual element without behaviour.
- The row `...` menu holds Move to (status), Edit and Delete; the circle toggles Completed.
- Fonts load from Google Fonts (Inter); falls back to system fonts offline.

## Screenshots
See `screenshots/desktop.png` and `screenshots/mobile.png`.
