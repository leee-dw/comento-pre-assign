import {
  modalTemplate
} from './renderer.js'
import {
  empty
} from './helper.js'
import View from './View.js';

export default class extends View {
  constructor(el) {
    super(el);
  }

  bind(cmd, ...params) {
    const commands = {
      click: () => {
        this.delegate('.modal', 'click', e => {});
      }
    }
    commands[cmd]();
    return this;
  }
  render(cmd, ...params) {
    const commands = {
      modal: () => {
        this.renderModal();
      },
      hide: () => {
        this.hideModal();
      },
      categories: () => {
        this.categories(...params);
      }
    }
    commands[cmd]();
    return this;
  }

  renderModal() {
    this.show();
  }

  hideModal() {
    this.hide();
  }

  categories(data) {
    this.renderCategories(data.list);
  }

  renderCategories(arr) {    
    this.modalBody = this.qs('.modal-body');
    arr.forEach(elem => {
      this.modalBody.insertAdjacentHTML('beforeend', modalTemplate(elem));
    })
  }


}