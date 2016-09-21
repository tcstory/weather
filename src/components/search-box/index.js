import _Hammer from 'hammerjs';
import propagating from 'propagating-hammerjs';
import PubSub from 'pubsub-js';
import store from '../store';

import {setProto} from '../utils';

const Hammer = propagating(_Hammer);

require('./index.scss');

function SearchBox() {
  const el = document.createElement('section');
  el.className = 'search-box';
  el.innerHTML = `
    <div class="search-box__box">
      <header class="search-box__header"><input type="text" class="search-box__input" maxlength="5"></header>
      <ul class="search-box__list"></ul>
    </div>`;
  this._el = el;
  this._state = {
    open: false,
    list: []
  };
  this._bindEvents();
  this._listen();
}

setProto(SearchBox, {
  _bindEvents() {
    this._el.querySelector('.search-box__input').addEventListener('input', (ev) => {
      let val = ev.target.value;
      if (/^[\u4E00-\u9FA5]+$/.test(val)) {
        this._render(val);
      }
    });
  },
  _listen() {
    PubSub.subscribe('store-change', () => {
      this._state.list = store.getCityList();
    });
  },
  getDom() {
    return this._el;
  },
  open() {
    this._state.open = true;
  },
  close() {
    this._state.open = false;
  },
  addList(list) {
    this._state.list = list;
  },
  _render(val) {
    let result = [];
    let list = this._state.list;
    let reg = new RegExp(`^${val}`);
    for (let i = 0, len = list.length; i < len; i++) {
      if (reg.exec(list[i].city)) {
        result.push(list[i]);
      }
    }
    this._el.querySelector('.search-box__list').innerHTML = '';
    let fragment = document.createDocumentFragment();
    result.forEach((item) => {
      let liDom = document.createElement('li');
      liDom.className = 'search-box__list-item';
      let nameDom = document.createElement('span');
      nameDom.className = 'search-box__list-item-name';
      nameDom.textContent = item.city;
      liDom.appendChild(nameDom);
      let iconDom = document.createElement('span');
      iconDom.className = 'search-box__list-item-icon';
      liDom.appendChild(iconDom);
      fragment.appendChild(liDom);
    });
    this._el.querySelector('.search-box__list').appendChild(fragment);
  }
});

export default SearchBox;