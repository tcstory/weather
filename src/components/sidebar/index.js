import { setProto } from '../utils';

require('./index.scss');

function Sidebar() {
  const el = document.createElement('aside');
  el.className = 'sidebar';
  el.innerHTML = ``;
  el.addEventListener('click', function (ev) {
    ev.stopPropagation();
  });
  this._el = el;
  this._state = {
    open: false,
  };
}

setProto(Sidebar, {
  openSidebar() {
    this._state.open = true;
    this._el.classList.add('sidebar--open');
  },
  closeSidebar() {
    this._state.open = false;
    this._el.classList.remove('sidebar--open');
  },
  getDom() {
    return this._el;
  },
});

export default Sidebar;
