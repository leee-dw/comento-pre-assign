import {
  mainTemplate
} from './renderer.js'

import {
  empty
} from './helper.js'


export default class {

  constructor(urlList, mainSectionView, filterView, modalView) {
    this.urlList = urlList;
    this.mainSectionView = mainSectionView;
    this.filterView = filterView;
    this.modalView = modalView;
  }

  setView() {
    this.fetchMainSection(this.urlList.articleURL(1), this.urlList.advertisingURL());
    this.fetchModalSection(this.urlList.categoriesURL());

    this.filterView.bind('click')
      .on('click', e => this.sortArticles(e.target))
      .on('click', e => this.showModal(e.target));
    this.modalView.bind('click')
      .on('click', e => this.checkModal(e.target))
  }



  async fetchMainSection(articleUrl, advertiseUrl) {
    this.articles = await axios.get(articleUrl).then(response => response.data);
    this.ads = await axios.get(advertiseUrl).then(response => response.data);
    this.mainSectionView.render('mainSection', this.articles, this.ads, )
      .bind('scroll', this.articles, this.ads);
    this.mainSectionView.render('filters', this.articles)
  }


  async fetchModalSection(categoriesUrl) {
    this.categories = await axios.get(categoriesUrl).then(response => response.data);
    this.modalView.render('categories', this.categories).bind('click');
  }




  showModal(selector) {
    if (selector.classList.contains('filter-btn')) {
      this.modalView.render('modal');
    };
  }


  checkModal(selector) {
    if (selector.classList.contains('close')) {
      this.modalView.render('hide');
    }
    if (selector.classList.contains('btn-primary')) {
      this.modalView.render('hide');      
    }
  }


  sortArticles(selector) {
    this.filters = this.filterView.el.querySelectorAll('.sort-filter');
    this.filters.forEach(el => el.classList.remove('text-danger', 'font-weight-bold'));
    selector.classList.contains('sort-filter') && selector.classList.add('text-danger', 'font-weight-bold');

    if (selector.classList.contains('desc-sort')) {
      empty(this.mainSectionView.el);
      this.fetchMainSection(this.urlList.articleURL(1, 'desc'), this.urlList.advertisingURL());
    };

    if (selector.classList.contains('asc-sort')) {
      empty(this.mainSectionView.el);
      this.fetchMainSection(this.urlList.articleURL(1, 'asc'), this.urlList.advertisingURL());
    };
  }

}