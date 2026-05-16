import state from './state.js';
import { createHeader }  from './components/header.js';
import { createSidebar } from './components/sidebar.js';
import { createFAB }     from './components/fab.js';
import { createGestaoMateriaisPage } from './pages/gestao-materiais.js';

const app  = document.getElementById('app');
const main = document.createElement('main');
main.className = 'main';

/* ── Page registry ──────────────────────────────────────────────────── */
const pages = {
  'Gestão de materiais': createGestaoMateriaisPage,
};

function renderPage(pageName) {
  main.innerHTML = '';
  const factory = pages[pageName];
  if (factory) main.appendChild(factory());
}

/* ── Mount ──────────────────────────────────────────────────────────── */
app.append(createHeader(), createSidebar(), main, createFAB());

state.subscribe(({ sidebarOpen, activePage }) => {
  main.classList.toggle('main--expanded', !sidebarOpen);
  renderPage(activePage);
});

renderPage(state.activePage);
