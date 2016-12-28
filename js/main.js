function toArray(str) {
  var temp = [];
  temp = str.split(' ,');
  return temp;
}

var movies = toArray('The Titanic, Forrest Gump, Saving Private Ryan');
var nineties = toArray('Stretch Armstrong, Nickelodeon, Salute Your Shorts');

console.log(movies);

function nextPage() {
  var currentPage = document.querySelector('.js-slider');
  var currentPageNum = parseInt(currentPage.dataset.currentpage);
  currentPage.classList.remove(`HeadsUp-page--slide${currentPageNum}00`);

  currentPageNum += 1;
  currentPage.dataset.currentpage = currentPageNum;
  currentPage.classList.add(`HeadsUp-page--slide${currentPageNum}00`);
}

function selectGameMode() {
  return this.dataset.mode == 'quickplay' ? quickPlayMode() : competitionMode();
}

function quickPlayMode() {
  console.log('woah this is quickplay mode!');
}

function competitionMode() {
  console.log('woah this is COMPETITION mode!');
  nextPage();
}

var inputs = document.querySelectorAll('.js-input');
inputs.forEach(input => input.addEventListener('click', selectGameMode));
