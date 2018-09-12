import {
  mainTemplate,
  adsTemplate
} from './renderer.js'
import View from './View.js';

export default class extends View {
  constructor(el) {
    super(el);
  }

  bind(cmd, ...params) {
    const commands = {
      scroll: () => {
        window.addEventListener('scroll', () => {
          if (window.scrollY + window.innerHeight >= document.body.clientHeight) {
            this.mainSection(...params);
          }
        })
      },
    }
    commands[cmd]();
    return this
  }

  render(cmd, ...params) {
    const commands = {
      mainSection: () => {
        this.mainSection(...params);
      },
      filters: () => {
        this.filterArticles(...params)
      }
    };
    commands[cmd]();
    return this;
  }


  mainSection(articles, ads) {
    this.count = 0;
    this.articlesClone = articles.list.slice();
    articles.list.forEach((el, idx) => {
      idx && !((idx + 1) % 5) &&
        this.articlesClone.splice(idx, 0, ads.list[this.count++])
    })
    this.renderMainSection(this.articlesClone);
    return this
  }

  filterArticles(articles) {
  }


  renderMainSection(lists) {
    lists.forEach((elems, idx) => {
      idx && !((idx + 1) % 5) ?
        this.el.insertAdjacentHTML('beforeend', adsTemplate(elems)) :
        this.el.insertAdjacentHTML('beforeend', mainTemplate(elems));
    })
    return this;
  }
}