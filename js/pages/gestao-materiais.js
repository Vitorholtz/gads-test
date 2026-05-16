const CARDS = [
  { name: 'Nome-do-criativo-enviado-pelo-...', format: 'Billboard',            tag: 'Clube Orfeu', status: 'Aprovado',  thumb: 'dark-banner' },
  { name: 'Nome-do-criativo-enviado-pelo-...', format: 'Super Leaderboard',    tag: 'Clube Orfeu', status: 'Em análise', thumb: 'light-banner' },
  { name: 'Nome-do-criativo-enviado-pelo-...', format: 'Retângulo médio',      tag: 'Clube Orfeu', status: 'Aprovado',  thumb: 'dark-banner' },
  { name: 'Nome-do-criativo-enviado-pelo-...', format: 'Especial publicitário',tag: 'Clube Orfeu', status: 'Reprovado', thumb: 'photo' },
  { name: 'Nome-do-criativo-enviado-pelo-...', format: 'Super Leaderboard',    tag: 'Clube Orfeu', status: 'Em análise', thumb: 'light-banner' },
  { name: 'Nome-do-criativo-enviado-pelo-...', format: 'In-stream vídeo',      tag: 'Clube Orfeu', status: 'Aprovado',  thumb: 'photo',       video: '1:40' },
  { name: 'Nome-do-criativo-enviado-pelo-...', format: 'Carrosel',             tag: 'Clube Orfeu', status: 'Aprovado',  thumb: 'split' },
  { name: 'Nome-do-criativo-enviado-pelo-...', format: 'Maxiboard',            tag: 'Clube Orfeu', status: 'Aprovado',  thumb: 'light-banner' },
  { name: 'Nome-do-criativo-enviado-pelo-...', format: 'Carrosel',             tag: 'Clube Orfeu', status: 'Aprovado',  thumb: 'split' },
  { name: 'Nome-do-criativo-enviado-pelo-...', format: 'Maxiboard',            tag: 'Clube Orfeu', status: 'Aprovado',  thumb: 'light-banner' },
  { name: 'Nome-do-criativo-enviado-pelo-...', format: 'Billboard',            tag: 'Clube Orfeu', status: 'Aprovado',  thumb: 'dark-banner' },
  { name: 'Nome-do-criativo-enviado-pelo-...', format: 'In-stream vídeo',      tag: 'Clube Orfeu', status: 'Aprovado',  thumb: 'photo',       video: '1:40' },
];

/* ── Helpers ────────────────────────────────────────────────────────── */
function el(tag, cls, text) {
  const e = document.createElement(tag);
  if (cls)  e.className = cls;
  if (text) e.textContent = text;
  return e;
}

function icon(name, extraClass = '') {
  return el('span', `material-symbols-rounded ${extraClass}`.trim(), name);
}

/* ── Subheader ──────────────────────────────────────────────────────── */
function createSubheader() {
  const bar = el('div', 'gm-subheader');

  // Client info
  const client = el('div', 'gm-client');

  const nameField = el('div', 'gm-client__field');
  nameField.append(el('span', 'gm-client__label', 'Cliente'), el('span', 'gm-client__value', 'Café Orfeu'));

  const sep = el('div', 'gm-client__sep');

  const cnpjField = el('div', 'gm-client__field');
  const cnpjRow = el('div', 'gm-client__cnpj-row');
  cnpjRow.append(el('span', 'gm-client__value', '12.345.678/0001-00.'));
  const dropBtn = el('button', 'gm-client__dropdown');
  dropBtn.appendChild(icon('expand_more'));
  cnpjRow.appendChild(dropBtn);
  cnpjField.append(el('span', 'gm-client__label', 'CNPJ'), cnpjRow);

  client.append(nameField, sep, cnpjField);

  // Channel tabs
  const channels = el('div', 'gm-channels');

  const digital = el('button', 'gm-channel-btn gm-channel-btn--active');
  digital.append(icon('desktop_windows'), el('span', '', 'Digital'));

  const tv = el('button', 'gm-channel-btn');
  tv.append(icon('tv'), el('span', '', 'TV Aberta/Assinatura'));

  [digital, tv].forEach((btn, i) => {
    btn.addEventListener('click', () => {
      [digital, tv].forEach(b => b.classList.remove('gm-channel-btn--active'));
      btn.classList.add('gm-channel-btn--active');
    });
  });

  channels.append(digital, tv);

  // Actions
  const actions = el('div', 'gm-subheader-actions');

  const guiaBtn = el('button', 'gm-link', 'Conferir guia de envio');

  const novoBtn = el('button', 'gm-btn-primary');
  novoBtn.append(icon('add'), el('span', '', 'Novo Envio'));

  actions.append(guiaBtn, novoBtn);
  bar.append(client, channels, actions);
  return bar;
}

/* ── Inner tabs ─────────────────────────────────────────────────────── */
function createTabs(activeTab, onChange) {
  const tabs = el('div', 'gm-tabs');

  const items = [
    { id: 'envios',    icon: 'send',   label: 'Envios' },
    { id: 'criativos', icon: 'layers', label: 'Criativos' },
  ];

  items.forEach(({ id, icon: ic, label }) => {
    const btn = el('button', `gm-tab${id === activeTab ? ' gm-tab--active' : ''}`);
    btn.dataset.tab = id;
    btn.append(icon(ic), el('span', '', label));
    btn.addEventListener('click', () => {
      tabs.querySelectorAll('.gm-tab').forEach(t => t.classList.remove('gm-tab--active'));
      btn.classList.add('gm-tab--active');
      onChange(id);
    });
    tabs.appendChild(btn);
  });

  return tabs;
}

/* ── Filter bar ─────────────────────────────────────────────────────── */
function createFilters() {
  const bar = el('div', 'gm-filters');

  const left = el('div', 'gm-filters__left');
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'gm-checkbox-all';
  checkbox.title = 'Selecionar todos';
  left.appendChild(checkbox);

  ['Referência', 'Tag', 'Formato', 'Status'].forEach(label => {
    const btn = el('button', 'gm-filter-btn');
    btn.append(el('span', '', label), icon('expand_more'));
    left.appendChild(btn);
  });

  const right = el('div', 'gm-filters__right');

  // Search
  const search = el('div', 'gm-search');
  search.appendChild(icon('search', 'gm-search__icon'));
  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'gm-search__input';
  input.placeholder = 'Procurar';
  search.appendChild(input);

  // View toggle
  const viewToggle = el('div', 'gm-view-toggle');
  const gridBtn = el('button', 'gm-view-btn gm-view-btn--active');
  gridBtn.appendChild(icon('grid_view'));
  const listBtn = el('button', 'gm-view-btn');
  listBtn.appendChild(icon('view_list'));
  [gridBtn, listBtn].forEach(btn => {
    btn.addEventListener('click', () => {
      [gridBtn, listBtn].forEach(b => b.classList.remove('gm-view-btn--active'));
      btn.classList.add('gm-view-btn--active');
    });
  });
  viewToggle.append(gridBtn, listBtn);

  right.append(search, viewToggle);
  bar.append(left, right);
  return bar;
}

/* ── Card ────────────────────────────────────────────────────────────── */
function createCard({ name, format, tag, status, thumb, video }) {
  const card = el('div', 'gm-card');

  // Header row
  const header = el('div', 'gm-card__header');
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'gm-card__checkbox';
  const nameEl = el('span', 'gm-card__name', name);
  const menu = el('button', 'gm-card__menu');
  menu.appendChild(icon('more_vert'));
  header.append(checkbox, nameEl, menu);

  // Thumbnail
  const thumbWrap = el('div', `gm-card__thumb gm-thumb--${thumb}`);
  const thumbInner = el('div', 'gm-card__thumb-inner');
  thumbWrap.appendChild(thumbInner);

  if (video) {
    const videoBadge = el('div', 'gm-card__video');
    videoBadge.append(icon('play_arrow'), el('span', '', video));
    thumbWrap.appendChild(videoBadge);
  }

  const formatBadge = el('span', 'gm-card__format', format);
  thumbWrap.appendChild(formatBadge);

  // Footer
  const footer = el('div', 'gm-card__footer');

  const tagEl = el('div', 'gm-card__tag');
  tagEl.append(icon('sell'), el('span', '', tag));

  const statusEl = el('div', 'gm-card__status');
  if (status === 'Aprovado') {
    statusEl.classList.add('gm-status--aprovado');
    statusEl.textContent = 'Aprovado';
  } else if (status === 'Em análise') {
    statusEl.classList.add('gm-status--analise');
    statusEl.textContent = 'Em análise';
  } else if (status === 'Reprovado') {
    const row = el('span', '');
    row.append(
      Object.assign(el('span', 'gm-status--reprovado'), { textContent: 'Reprovado ' }),
      el('button', 'gm-card__details-link', 'Ver detalhes'),
    );
    statusEl.appendChild(row);
  }

  footer.append(tagEl, statusEl);
  card.append(header, thumbWrap, footer);
  return card;
}

/* ── Grid ────────────────────────────────────────────────────────────── */
function createGrid(cards) {
  const grid = el('div', 'gm-grid');
  cards.forEach(c => grid.appendChild(createCard(c)));
  return grid;
}

/* ── Page entry point ────────────────────────────────────────────────── */
export function createGestaoMateriaisPage() {
  const page = el('div', 'gm-page');

  page.appendChild(createSubheader());
  page.appendChild(createTabs('criativos', () => {}));
  page.appendChild(createFilters());
  page.appendChild(createGrid(CARDS));

  const loadMore = el('div', 'gm-load-more');
  const loadBtn = el('button', 'gm-load-more__btn', 'Carregar mais');
  loadMore.appendChild(loadBtn);
  page.appendChild(loadMore);

  return page;
}
