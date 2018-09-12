export const adsTemplate = (elems) => {
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


export const mainTemplate = (elem) => {
  return `
    <div class="row mb-4 main-template">
      <div class="col-md-8">
        <div class="card flex-md-row mb-4 shadow-sm h-md-250">
          <div class="card-body d-flex flex-column align-items-start">
          <div class="text-right" style="width: 100%">
            <strong class="d-inline-block mb-2 text-success">카테고리: ${elem.category_no}</strong>
            <span class="badge badge-secondary">글 번호: ${elem.no}</span>
          </div>
            <div class="mb-1 text-muted"><span>${elem.email}</span><span>  |  </span><span>${elem.updated_at}</span></div>
            <h4 class="justify-content-between align-items-center"><span class="text-muted btn-toolbar">${elem.title}</span></h4>
            <p class="card-text mb-auto">${elem.contents}</p>
          </div>
        </div>
      </div>
    </div>
    `
}



export const modalTemplate = (data) => {
  return `
    <div class="custom-control custom-radio custom-control-inline">
      <input type="radio" id="customRadioInline${data.no}" name="customRadioInline1" class="custom-control-input" onclick="console.log(this)">
      <label class="custom-control-label" for="customRadioInline${data.no}">${data.no}. ${data.name}</label>
    </div>
    `
}