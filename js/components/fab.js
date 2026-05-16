export function createFAB() {
  const btn = document.createElement('button');
  btn.className = 'fab';
  btn.title = 'Criar';

  const icon = document.createElement('span');
  icon.className = 'material-symbols-rounded';
  icon.textContent = 'add';

  btn.appendChild(icon);
  return btn;
}
