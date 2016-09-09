import PubSub from 'pubsub-js';
require('./index.scss');

let initialize = false;
const MULTIPLE_INITIALIZE = '重复初始化';

const sidebar = {
  el: null,
};

function init() {
  if (!initialize) {
    initialize = true;
    PubSub.subscribe('onBodyClick', (eventStr, data) => {
      sidebar.el.classList.remove('sidebar--open');
    });
    PubSub.subscribe('onMenuBtnClick', (eventStr, data) => {
      sidebar.el.classList.add('sidebar--open');
    });
  } else {
    _warmMultipleInitalize();
  }
}

function makeSidebar() {
  if (!sidebar.el) {
    const el = document.createElement('aside');
    el.className = 'sidebar';
    el.innerHTML = ``;
    el.addEventListener('click', function (ev) {
      ev.stopPropagation();
    });
    sidebar.el = el;
    return el;
  } else {
    return sidebar.el;
  }
}

function _warmMultipleInitalize() {
  throw new Error(MULTIPLE_INITIALIZE);
}

export default {
  init,
  makeSidebar,
};
