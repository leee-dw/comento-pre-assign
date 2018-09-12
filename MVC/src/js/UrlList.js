export default class {
  constructor() {
    this.url = {
      article: 'http://comento.cafe24.com/request.php?',
      detail: 'http://comento.cafe24.com/detail.php?',
      ads: 'http://comento.cafe24.com/ads.php?',
      categories: 'http://comento.cafe24.com/category.php'
    }

    this.state = {
      article: {
        page: 1,
        ord: 'asc',
      },
      detail: {
        req_no: 0,
      },
      ad: {
        page: 1,
        limit: 10,
      }
    };
  }


  _getParam(info) {
    this.params = '';
    for (let prop in info) {
      if (info.hasOwnProperty(prop)) {
        this.params += `${prop}=${info[prop]}&`
      };
    }
    return this.params.substring(0, this.params.length - 1);
  }



  articleURL(page, order) {
    this.state.article.page = page || this.state.article.page++;
    this.state.article.ord = order || this.state.article.ord;
    return this.url.article + this._getParam(this.state.article);
  }


  detailURL(req_no) {
    if (!req_no) return;
    this.state.detail.req_no = req_no;
    return this.url.detail + this._getParam(this.state.detail);
  }


  advertisingURL(page, limit) {
    this.state.ad.page = page || this.state.ad.page++;
    this.state.ad.limit = limit || this.state.ad.limit;
    return this.url.ads + this._getParam(this.state.ad);
  }


  categoriesURL() {
    return this.url.categories;
  }

}
