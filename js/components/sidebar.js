import state from '../state.js';

const NAV_GROUPS = [
  {
    label: 'Favoritos',
    items: [
      { icon: 'storefront',    label: 'Vitrine' },
      { icon: 'dashboard',     label: 'Painel' },
      { icon: 'shopping_bag',  label: 'Meus pedidos' },
      { icon: 'photo_library', label: 'Gestão de materiais' },
    ],
  },
  {
    label: 'Menu',
    items: [
      { icon: 'event_available', label: 'Consulta de disponibilidade' },
      { icon: 'palette',         label: 'Envio de criativo' },
      { icon: 'bar_chart',       label: 'Resultados' },
      { icon: 'payments',        label: 'Financeiro' },
      { icon: 'hub',             label: 'Conexão de dados' },
      { icon: 'table_chart',     label: 'Planejador de mídia', external: true },
      { icon: 'language',        label: 'Portal',              external: true },
    ],
  },
];

const BOTTOM_ITEMS = [
  { icon: 'help',     label: 'Ajuda' },
  { icon: 'settings', label: 'Configurações' },
];

function createNavItem({ icon, label, external = false }) {
  const btn = document.createElement('button');
  btn.className = 'sidebar__item';
  btn.dataset.label = label;

  const left = document.createElement('span');
  left.className = 'sidebar__item-left';

  const iconEl = document.createElement('span');
  iconEl.className = 'material-symbols-rounded sidebar__item-icon';
  iconEl.textContent = icon;

  const labelEl = document.createElement('span');
  labelEl.textContent = label;

  left.append(iconEl, labelEl);
  btn.appendChild(left);

  if (external) {
    const extIcon = document.createElement('span');
    extIcon.className = 'material-symbols-rounded sidebar__item-external';
    extIcon.textContent = 'open_in_new';
    btn.appendChild(extIcon);
  } else {
    btn.addEventListener('click', () => state.update({ activePage: label }));
  }

  return btn;
}

export function createSidebar() {
  const aside = document.createElement('aside');
  aside.className = 'sidebar';

  /* ── Scrollable nav ───────────────────────────────────────────── */
  const nav = document.createElement('nav');
  nav.className = 'sidebar__nav';

  NAV_GROUPS.forEach(({ label, items }) => {
    const sectionLabel = document.createElement('p');
    sectionLabel.className = 'sidebar__section-label';
    sectionLabel.textContent = label;
    nav.appendChild(sectionLabel);

    const group = document.createElement('div');
    group.className = 'sidebar__group';
    items.forEach(item => group.appendChild(createNavItem(item)));
    nav.appendChild(group);
  });

  aside.appendChild(nav);

  /* ── Bottom actions ───────────────────────────────────────────── */
  const bottom = document.createElement('div');
  bottom.className = 'sidebar__bottom';
  BOTTOM_ITEMS.forEach(item => bottom.appendChild(createNavItem(item)));
  aside.appendChild(bottom);

  /* ── Sync with state ──────────────────────────────────────────── */
  function syncActive(activePage) {
    aside.querySelectorAll('.sidebar__item').forEach(btn => {
      btn.classList.toggle('sidebar__item--active', btn.dataset.label === activePage);
    });
  }

  syncActive(state.activePage);

  state.subscribe(({ sidebarOpen, activePage }) => {
    aside.classList.toggle('sidebar--closed', !sidebarOpen);
    syncActive(activePage);
  });

  return aside;
}
