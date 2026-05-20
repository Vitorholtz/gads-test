# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # dev server at http://localhost:5173
npm run build    # type-check (tsc) then Vite production build
npm run preview  # serve the dist/ folder locally
```

## Stack

| Layer | Choice |
|---|---|
| Framework | React 18 |
| Language | TypeScript (strict) |
| Build | Vite 6 |
| Styles | Tailwind CSS v3 |
| State | Zustand |
| Icons | Material Symbols Rounded (Google Fonts CDN) |
| Font | Inter Variable (Google Fonts CDN) |

## Architecture

### State — `src/store/useAppStore.ts`

Single Zustand store with two pieces of state:

```ts
sidebarOpen: boolean      // drives sidebar transform + main margin-left
activePage: string        // drives page routing and header label
```

All components read from this store directly via `useAppStore()`. No prop drilling for layout state.

### Page routing — `src/App.tsx`

`App.tsx` owns a `pages` registry map:

```ts
const pages: Record<string, React.ComponentType> = {
  'Gestão de materiais': GestaoMateriais,
}
```

When `activePage` changes, the matching component renders inside `<main>`. Pages with no entry render nothing. The sidebar item label is the routing key — keep them in sync with the `NAV_GROUPS` in `Sidebar.tsx`.

### Adding a new page

1. Create `src/pages/<Name>.tsx` exporting a default React component.
2. Register it in `App.tsx`'s `pages` map using the exact sidebar label as key.
3. Add the nav item to `NAV_GROUPS` in `Sidebar.tsx`.

### Component conventions

- Icons: `<MIcon name="icon_name" size={20} />` — wraps `material-symbols-rounded`.
- All styling via Tailwind utility classes; no separate CSS files.
- Page-specific sub-components live in the same file as the page (e.g. `Subheader`, `Filters`, `CardItem` inside `GestaoMateriais.tsx`) until they need to be reused.
