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
    PubSub.subscribe('closeSidebar', () => {
      sidebar.el.classList.remove('sidebar--open');
    });
    PubSub.subscribe('openSidebar', () => {
      sidebar.el.classList.add('sidebar--open');
    });
  } else {
    _warmMultipleInitialize();
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

function _warmMultipleInitialize() {
  throw new Error(MULTIPLE_INITIALIZE);
}

export default {
  init,
  makeSidebar,
};
