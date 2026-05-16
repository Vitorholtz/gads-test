const state = {
  sidebarOpen: true,
  activePage: 'Vitrine',
  _listeners: [],

  subscribe(fn) {
    this._listeners.push(fn);
  },

  update(patch) {
    Object.assign(this, patch);
    const snapshot = { sidebarOpen: this.sidebarOpen, activePage: this.activePage };
    this._listeners.forEach(fn => fn(snapshot));
  },
};

export default state;
