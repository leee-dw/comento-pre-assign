export default class {
  constructor(el) {
    if (!el) throw el;
    this.name = el.slice(1);
    this.el = document.querySelector(el);

  }

  qs(selector) {
    return this.el.querySelector(selector);
  }


  qsa(selector) {
    return this.el.querySelectorAll(selector);
  }


  on(event, handler) {
    this.el.addEventListener(event, handler);
    return this;
  }


  delegate(selector, type, callback) {
    const listenerFunc = (e) => {
      e.delegateTarget = e.target.closest(selector);
      e.delegateTarget && callback.call(this.el, e);
    };
    this.on(type, listenerFunc);
    return this;
  }


  hide() {
    this.el.style.display = 'none';
    return this;
  }


  show() {
    this.el.style.display = 'block';
    return this;
  }


}