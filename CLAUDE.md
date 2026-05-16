# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running the project

There is no build step. The project uses native ES Modules (`type="module"`), so it **must be served over HTTP** — opening `index.html` directly via `file://` will fail with CORS errors on the imports.

Use any static file server from the project root, for example:
- VS Code **Live Server** extension (right-click `index.html` → Open with Live Server)
- `npx serve .` (requires Node.js)
- `python -m http.server`

There are no tests, no linter, and no package.json.

## Architecture

### State management — `js/state.js`

A single plain-object store with a minimal pub/sub API:

```js
state.update({ activePage: 'Resultados' }); // merges patch, notifies all subscribers
state.subscribe(snapshot => { /* { sidebarOpen, activePage } */ });
```

All components subscribe to this singleton. There is no framework — components update their own DOM nodes directly inside their subscriber callbacks.

### Component model — `js/components/`

Each file exports a single `create*()` function that builds and returns a DOM node. Components wire themselves to `state` at creation time: they call `state.subscribe()` internally and update their own elements when state changes. They do **not** re-render; they mutate specific child nodes.

### Page routing — `js/app.js`

`app.js` owns the `<main>` element and a `pages` registry map:

```js
const pages = {
  'Gestão de materiais': createGestaoMateriaisPage,
  // add new entries here, keyed by the exact sidebar label string
};
```

When `activePage` changes, `main.innerHTML = ''` and the matching factory is called. Pages with no registered factory render nothing. The sidebar item label string is the routing key — keep them in sync.

### Adding a new page

1. Create `js/pages/<name>.js` exporting `create<Name>Page()`.
2. Create `css/pages/<name>.css` with page-specific styles.
3. Add the CSS link to `index.html`.
4. Register the factory in `js/app.js`'s `pages` map using the exact sidebar label as the key.

### CSS conventions

- Global layout and shell components live in `css/styles.css`.
- Page-specific styles live in `css/pages/<page-name>.css`.
- CSS custom properties for shared values: `--header-h: 56px`, `--sidebar-w: 280px`, `--transition: 300ms ease`.
- BEM-style class names scoped per component (`.sidebar__item`, `.gm-card__footer`). Page components are prefixed with a short namespace (e.g. `gm-` for Gestão de Materiais).

### External dependencies (CDN only)

- **Inter Variable** — Google Fonts
- **Material Symbols Rounded** — Google Fonts icon font, used via `<span class="material-symbols-rounded">icon_name</span>`
- No JavaScript libraries; no bundler.
