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
  getInfo();
});
function showH() {
  let h = document.body.scrollHeight;
  h += 200;
  popUpZone.style.height = h + 'px';
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

function getInfo() {
  var s = '';
  s += ' 網頁可見區域寬：' + document.body.clientWidth;
  s += ' 網頁可見區域高：' + document.body.clientHeight;
  s +=
    ' 網頁可見區域寬：' + document.body.offsetWidth + ' (包括邊線和捲軸的寬)';
  s += ' 網頁可見區域高：' + document.body.offsetHeight + ' (包括邊線的寬)';
  s += ' 網頁正文全文寬：' + document.body.scrollWidth;
  s += ' 網頁正文全文高：' + document.body.scrollHeight;
  s += ' 網頁被卷去的高(ff)：' + document.body.scrollTop;
  s += ' 網頁被卷去的高(ie)：' + document.documentElement.scrollTop;
  s += ' 網頁被卷去的左：' + document.body.scrollLeft;
  s += ' 網頁正文部分上：' + window.screenTop;
  s += ' 網頁正文部分左：' + window.screenLeft;
  s += ' 螢幕解析度的高：' + window.screen.height;
  s += ' 螢幕解析度的寬：' + window.screen.width;
  s += ' 螢幕可用工作區高度：' + window.screen.availHeight;
  s += ' 螢幕可用工作區寬度：' + window.screen.availWidth;
  s += ' 你的螢幕設置是 ' + window.screen.colorDepth + ' 位彩色';
  s += ' 你的螢幕設置 ' + window.screen.deviceXDPI + ' 像素/英寸';
  console.log(s);
}
