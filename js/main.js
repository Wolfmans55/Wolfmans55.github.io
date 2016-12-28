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

  // Slide animation and pagination updates
  currentPage.classList.remove(`HeadsUp-page--slide${currentPageNum - direction}00`);
  currentPage.classList.add(`HeadsUp-page--slide${currentPageNum}00`);
  pagination.classList.remove(`HeadsUp-pagination--${currentPageNum - direction}`);
  pagination.classList.add(`HeadsUp-pagination--${currentPageNum}`);

  // Logic to show the pagination
  currentPageNum < 1 ? pagination.classList.remove('is-active') : pagination.classList.add('is-active');

  // Disable buttons when page is not active
  var buttons = document.querySelectorAll('.js-input');
  buttons.forEach(button => {
    parseInt(button.parentNode.dataset.page) !== currentPageNum ? button.disabled = true : button.disabled = false;
  });
}

function selectGameMode(e) {
  return this.dataset.mode == 'quickplay' ? quickPlayMode() : competitionMode(e);
}

function quickPlayMode() {
  console.log('woah this is quickplay mode!');
}

function competitionMode(e) {
  switchPage();

  if (e.target.name === 'team_count') {
    var teamNames = document.querySelector('.js-team-names');
    var numOfTeams = document.querySelector('.js-input[name="team_count"]:checked').value;

    // Loop through # of Teams and create an input for each
    for (var i=0; i<numOfTeams; i++) {
      console.log(i);
      var newInput = document.createElement('input');
      newInput.placeholder = 'Team ' + (i + 1);
      newInput.classList.add('HeadsUp-input');
      newInput.name = 'team_name';
      newInput.type = 'text';
      newInput.id = 'round_two';
      teamNames.appendChild(newInput);
    }
  }
}

var paginationPrev = document.querySelector('.js-pagination-prev');
paginationPrev.addEventListener('click', switchPage);

var inputs = document.querySelectorAll('.js-input');
inputs.forEach(input => input.addEventListener('click', selectGameMode));

var submitTeams = document.querySelector('.js-submit-teams');
submitTeams.addEventListener('click', quickPlayMode);
