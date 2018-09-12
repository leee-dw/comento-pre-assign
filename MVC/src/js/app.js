import UrlList from './UrlList.js'
import Controller from './Controller.js'
import MainSectionView from './MainSectionView.js'
import ModalView from './ModalView.js'
import FilterView from './FilterView.js'

const urlList = new UrlList();
const mainSectionView = new MainSectionView('.article-section');
const filterView = new FilterView('.filter-section')
const modalView = new ModalView('.modal');

const controller = new Controller(urlList, mainSectionView, filterView, modalView)
const setView = controller.setView();

window.addEventListener('load', setView);
  

var currentValue = 0;

function handleClick(myRadio) {
  alert('Old value: ' + currentValue);
  alert('New value: ' + myRadio.value);
  currentValue = myRadio.value;
}
