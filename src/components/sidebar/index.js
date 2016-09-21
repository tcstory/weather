import _Hammer from 'hammerjs';
import propagating from 'propagating-hammerjs';

const Hammer = propagating(_Hammer);

import { setProto } from '../utils';

require('./index.scss');

function Sidebar() {
  const el = document.createElement('aside');
  el.className = 'sidebar';
  el.innerHTML = ``;
  const mc = new Hammer.Manager(el);
  mc.add(new Hammer.Tap());
  mc.on('tap', (ev) => {
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
