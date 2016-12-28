function toArray(str) {
  var temp = [];
  temp = str.split(' ,');
  return temp;
}

var movies = toArray('The Titanic, Forrest Gump, Saving Private Ryan');
var nineties = toArray('Stretch Armstrong, Nickelodeon, Salute Your Shorts');


/////////////////
/// Begin Game
/////////////////

var currentPageNum = 0;

function switchPage() {
  var currentPage = document.querySelector('.js-slider');
  var pagination = document.querySelector('.js-pagination');

  var direction = this.dataset !== undefined && this.dataset.direction === 'prev' ? -1 : 1;
  currentPageNum += direction;

  currentPage.classList.remove(`HeadsUp-page--slide${currentPageNum - direction}00`);
  currentPage.classList.add(`HeadsUp-page--slide${currentPageNum}00`);
  pagination.classList.remove(`HeadsUp-pagination--${currentPageNum - direction}`);
  pagination.classList.add(`HeadsUp-pagination--${currentPageNum}`);

  currentPageNum < 1 ? pagination.classList.remove('is-active') : pagination.classList.add('is-active');

  // disable buttons when page is not active
  var buttons = document.querySelectorAll('.js-input');
  buttons.forEach(button => {
    parseInt(button.parentNode.dataset.page) !== currentPageNum ? button.disabled = true : button.disabled = false;
  });
}

function selectGameMode() {
  return this.dataset.mode == 'quickplay' ? quickPlayMode() : competitionMode();
}

function quickPlayMode() {
  console.log('woah this is quickplay mode!');
}

function competitionMode() {
  switchPage();
}

var paginationPrev = document.querySelector('.js-pagination-prev');
paginationPrev.addEventListener('click', switchPage);

var inputs = document.querySelectorAll('.js-input');
inputs.forEach(input => input.addEventListener('click', selectGameMode));
