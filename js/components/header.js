import state from '../state.js';

function iconBtn(name, extraClass = '') {
  const btn = document.createElement('button');
  btn.className = `header__icon-btn ${extraClass}`.trim();
  const ic = document.createElement('span');
  ic.className = 'material-symbols-rounded';
  ic.textContent = name;
  btn.appendChild(ic);
  return btn;
}

export function createHeader() {
  const header = document.createElement('header');
  header.className = 'header';

  /* ── Left ─────────────────────────────────────────────────────── */
  const left = document.createElement('div');
  left.className = 'header__left';

  // Toggle button
  const toggleBtn = document.createElement('button');
  toggleBtn.className = 'header__toggle';
  const toggleIcon = document.createElement('span');
  toggleIcon.className = 'material-symbols-rounded';
  toggleIcon.textContent = 'left_panel_close';
  toggleBtn.appendChild(toggleIcon);
  toggleBtn.addEventListener('click', () => {
    state.update({ sidebarOpen: !state.sidebarOpen });
  });

  // Logo
  const logo = document.createElement('img');
  logo.src = 'assets/globo-ads-logo.svg';
  logo.alt = 'Globo Ads';
  logo.className = 'header__logo';

  // Separator
  const sep = document.createElement('span');
  sep.className = 'header__separator';
  sep.textContent = '|';

  // Page name
  const pageName = document.createElement('span');
  pageName.className = 'header__page-name';
  pageName.textContent = state.activePage;

  left.append(toggleBtn, logo, sep, pageName);

  /* ── Right ────────────────────────────────────────────────────── */
  const right = document.createElement('div');
  right.className = 'header__right';

  right.appendChild(iconBtn('shopping_cart'));
  right.appendChild(iconBtn('notifications'));
  right.appendChild(iconBtn('settings'));

  // Criar button
  const criarBtn = document.createElement('button');
  criarBtn.className = 'header__criar-btn';
  const criarIcon = document.createElement('span');
  criarIcon.className = 'material-symbols-rounded';
  criarIcon.textContent = 'add';
  criarBtn.append(criarIcon, 'Criar');
  right.appendChild(criarBtn);

  // Client info
  const clientWrapper = document.createElement('div');
  clientWrapper.className = 'header__client-wrapper';

  const clientInfo = document.createElement('div');
  clientInfo.className = 'header__client-info';

  const clientName = document.createElement('div');
  clientName.className = 'header__client-name';
  const nameSpan = document.createElement('span');
  nameSpan.textContent = 'Cliente';
  const chevron = document.createElement('span');
  chevron.className = 'material-symbols-rounded';
  chevron.textContent = 'expand_more';
  clientName.append(nameSpan, chevron);

  const cnpj = document.createElement('div');
  cnpj.className = 'header__cnpj';
  cnpj.textContent = 'CNPJ 1234567890';

  clientInfo.append(clientName, cnpj);

  const avatar = document.createElement('div');
  avatar.className = 'header__avatar';
  avatar.textContent = 'A';

  clientWrapper.append(clientInfo, avatar);
  right.appendChild(clientWrapper);

  header.append(left, right);

  /* ── React to state changes ───────────────────────────────────── */
  state.subscribe(({ activePage, sidebarOpen }) => {
    pageName.textContent = activePage;
    toggleIcon.textContent = sidebarOpen ? 'left_panel_close' : 'left_panel_open';
  });

  return header;
}
