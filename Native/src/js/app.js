let count = 2;
let ord = {
  'asc': 'asc',
  'desc': 'desc'
}


const url = {
  article: `http://comento.cafe24.com/request.php?ord=asc&page=`,
  detail: `http://comento.cafe24.com/detail.php?req_no=12`,
  ads: `http://comento.cafe24.com/ads.php?page=1&limit=10`,
  categories: 'http://comento.cafe24.com/category.php'
}


const mainView = document.querySelector('.main-view');
const articleSection = document.querySelector('.article-section')
const ascSort = document.querySelector('.asc-sort');
const descSort = document.querySelector('.desc-sort');
const filterBtn = document.querySelector('.filter-btn');
const modal = document.querySelector('.modal');
const modalBody = document.querySelector('.modal-body');
const closBtn = document.querySelector('.close-btn');
const saveBtn = document.querySelector('.save-btn');
const inputs = document.querySelector('.custom-control-input');
const categoriesSort = document.querySelectorAll('.categories-sort');


const renderData = async (nums, sort) => {
  let adCount = 1;
  let articles = await axios.get(`http://comento.cafe24.com/request.php?page=${nums}&ord=${sort}`).then(res => {
    return res.data.list;
  })

  let ads = await axios.get(url.ads).then(res => {
    return res.data.list;
  })


  let articleClone = articles.slice();
  articleClone.forEach((el, idx) => idx && !((idx + 1) % 5) && articleClone.splice(idx, 0, ads[adCount++]))
  articleClone.forEach((elems, idx) => {
    idx && !((idx + 1) % 5) ?
      articleSection.insertAdjacentHTML('beforeend', adsTemplate(elems)) :
      articleSection.insertAdjacentHTML('beforeend', mainTemplate(elems));
  })
}



const renderModal = async () => {

  let modalConts = await axios.get(url.categories).then(res => {
    return res.data.list
  })


  modalConts.forEach(el => {
    modalBody.insertAdjacentHTML('beforeend', modalTemplate(el));
  })
};


const empty = (target) => {
  while (target.hasChildNodes()) {
    target.removeChild(target.firstChild);
  };
}

const scrolling = (sort) => {
  let nums = 2;
  window.addEventListener('scroll', () => {
    if (window.scrollY + window.innerHeight >= document.body.clientHeight) {
      renderData(nums++, sort);
    }
  })
}


ascSort.addEventListener('click', function (e) {
  e.target.classList.add('text-danger', 'font-weight-bold');
  descSort.classList.contains('text-danger', 'font-weight-bold') && descSort.classList.remove('text-danger', 'font-weight-bold');
  empty(articleSection);
  renderData(1, 'asc');
  scrolling('asc');
})

descSort.addEventListener('click', function (e) {
  e.target.classList.add('text-danger', 'font-weight-bold');
  ascSort.classList.contains('text-danger', 'font-weight-bold') && ascSort.classList.remove('text-danger', 'font-weight-bold');
  empty(articleSection);
  renderData(1, 'desc');
  scrolling('desc');

})




filterBtn.addEventListener('click', function (e) {
  modal.style.display = 'block';
})


closBtn.addEventListener('click', function (e) {
  modal.style.display = 'none';
})




const checkInput = async (selector, ...params) => {
  let articles = await axios.get(`http://comento.cafe24.com/request.php?page=1&ord=asc`).then(res => {
    return res.data
  })

  saveBtn.addEventListener('click', function (e) {
    modal.style.display = 'none';
    empty(articleSection);
    articles.list.forEach(el => {
      if (el.category_no === selector.dataset.id) {
        articleSection.insertAdjacentHTML('beforeend', mainTemplate(el));
      }
    })
  })
}




const mainTemplate = (elem) => {
  return `
    <div class="row mb-4 main-template">
      <div class="col-md-8">
        <div class="card flex-md-row mb-4 shadow-sm h-md-250">
          <div class="card-body d-flex flex-column align-items-start">
          <div class="text-right" style="width: 100%">
            <strong class="categories-sort d-inline-block mb-2 text-success" data-num=${elem.category_no}>카테고리: ${elem.category_no}</strong>
            <span class="badge badge-secondary">글 번호: ${elem.no}</span>
          </div>
            <div class="mb-1 text-muted"><span>${elem.email}</span><span>  |  </span><span>${elem.updated_at}</span></div>
            <h4 class="justify-content-between align-items-center"><span class="text-muted btn-toolbar">${elem.title}</span></h4>
            <p class="contents card-text mb-auto">${elem.contents}</p>
          </div>
        </div>
      </div>
    </div>

  `
}



const adsTemplate = (elems) => {
  return `
    <div class="row mb-4">
      <div class="col-md-8">
        <div class="card flex-md-row mb-4 shadow-sm h-md-250">
          <div class="card-body d-flex flex-column">
            <img class="card-img-top" style="height: 130px; background: #888" src="${elems.img}" alt="">
            <span>${elems.img}</span>
            </div>
            <div class="card-text">
              <h4>${elems.title}</h4>
              <p>${elems.contents}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
}


const modalTemplate = (data) => {
  return `
    <div class="custom-control custom-radio custom-control-inline">
      <input type="radio" id="customRadioInline${data.no}" name="customRadioInline1" class="custom-control-input" onclick="checkInput(this)" data-id="${data.no}">
      <label class="custom-control-label" for="customRadioInline${data.no}">${data.no}. ${data.name}</label>
    </div>
    `
}






const init = (() => {
  renderData(1, 'asc');
  renderModal();
})();