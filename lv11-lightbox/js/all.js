const imgRow = document.querySelector('main');
const popUpZone = document.querySelector('.lightboxZone');
const popupBox = document.querySelector('.popupBox');
const popup = document.querySelectorAll('.lightbox');
const close = document.querySelector('.close');
const imgPageTarget = document.querySelector('.img-page-target');
const imgPages = document.querySelector('.img-pages');
const arrowLeft = document.querySelector('.toLeft');
const arrowRight = document.querySelector('.toRight');

imgRow.addEventListener('click', popUpShow, false);
close.addEventListener('click', toClose, false);
arrowLeft.addEventListener('click', toPrev, false);
arrowRight.addEventListener('click', toNext, false);

let targetIndex = 1;

function popUpShow(e) {
  e.preventDefault();
  if (e.target.nodeName.toLowerCase() !== 'img') return;
  popUpZone.classList.remove('hide');
  popUpZone.classList.add('show');
  targetIndex = parseInt(e.target.parentNode.dataset.num);
  popUpUpdate(targetIndex);
}
function toPrev(e) {
  e.preventDefault();
  if (targetIndex === 1) {
    targetIndex = 6;
  } else {
    targetIndex -= 1;
  }

  popUpUpdate(targetIndex);
}
function toNext(e) {
  e.preventDefault();
  if (targetIndex === 6) {
    targetIndex = 1;
  } else {
    targetIndex += 1;
  }

  popUpUpdate(targetIndex);
}

// 最後都會跑到這 修改index
function popUpUpdate(index) {
  getScrollTop();
  for (let i = 0; i < popup.length; i++) {
    popup[i].classList.remove('show');
    popup[i].classList.add('hide');
  }
  imgPageTarget.textContent = index;
  imgPages.textContent = `/${popup.length}`;

  let targetNum = `#lg_${index}`;
  const targetPopUp = document.querySelector(targetNum);
  targetPopUp.classList.remove('hide');
  targetPopUp.classList.add('show');
}

function toClose(e) {
  e.preventDefault();
  popUpHide();
}

window.addEventListener('load', function(e) {
  showH();
});
window.addEventListener('resize', function(e) {
  showH();
});
function showH() {
  let docScrH = document.body.scrollHeight;
  popUpZone.style.height = docScrH + 'px';
}

function getScrollTop() {
  let bodyTop = 0;
  if (typeof window.pageYOffset != 'undefined') {
    bodyTop = window.pageYOffset;
  } else if (
    typeof document.compatMode != 'undefined' &&
    document.compatMode != 'BackCompat'
  ) {
    bodyTop = document.documentElement.scrollTop;
  } else if (typeof document.body != 'undefined') {
    bodyTop = document.body.scrollTop;
  }
  popupBox.style.top = `${bodyTop}px`;
}

// 預設開啟網頁就先隱藏 popup
function popUpHide() {
  popUpZone.classList.remove('show');
  popUpZone.classList.add('hide');
}
popUpHide();
