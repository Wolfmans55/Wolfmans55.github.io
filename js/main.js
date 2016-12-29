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
var teams = []; // array of teams created in competition mode
var roundCount = null;

function switchPage() {
  var currentPage = document.querySelector('.js-slider');

  var direction = this.dataset !== undefined && this.dataset.direction === 'prev' ? -1 : 1;
  currentPageNum += direction;

  // Show/Hide the pagination
  showPagination(direction);

  // Slide animation and pagination updates
  currentPage.classList.remove(`HeadsUp-page--slide${currentPageNum - direction}00`);
  currentPage.classList.add(`HeadsUp-page--slide${currentPageNum}00`);

  // Disable buttons when page is not active
  var buttons = document.querySelectorAll('.js-input');
  buttons.forEach(button => {
    parseInt(button.parentNode.dataset.page) !== currentPageNum ? button.disabled = true : button.disabled = false;
  });
}

function showPagination(direction) {
  var pagination = document.querySelector('.js-pagination');

  pagination.classList.remove(`HeadsUp-pagination--${currentPageNum - direction}`);
  pagination.classList.add(`HeadsUp-pagination--${currentPageNum}`);

  // Logic to show the pagination
  currentPageNum < 1 ? pagination.classList.remove('is-active') : pagination.classList.add('is-active');
}

function selectGameMode(e) {
  return this.dataset.mode == 'quickplay' ? quickPlayMode() : competitionMode(e);
}

function quickPlayMode() {

  // Keep an array of the team names if they were created in competitionMode
  var finalTeamNames = document.querySelectorAll('.js-team-name[name="team_name"]');
  if (finalTeamNames.length > 0) {
    finalTeamNames.forEach(finalTeamName => {
      teams.push(finalTeamName.value);
    });
    console.log(teams);
  }

  showCategories();
}

function competitionMode(e) {
  switchPage();

  if (e.target.name === 'team_count') {
    var teamNames = document.querySelector('.js-team-names');
    var numOfTeams = document.querySelector('.js-input[name="team_count"]:checked').value;

    // Delete any existing teams
    teamNames.innerHTML = '';

    // Loop through # of Teams and create an input for each
    for (var i=0; i<numOfTeams; i++) {
      var newInput = document.createElement('input');
      newInput.placeholder = 'Team ' + (i + 1);
      newInput.value = 'Team ' + (i + 1);
      newInput.classList.add('HeadsUp-input');
      newInput.classList.add('js-team-name');
      newInput.name = 'team_name';
      newInput.type = 'text';
      newInput.required = true;
      newInput.id = 'round_two';
      teamNames.appendChild(newInput);
    }
  } else if (e.target.name === 'round_count') {
    roundCount = document.querySelector('.js-input[name="round_count"]:checked').value;
  }
}

function showCategories() {
  switchPage();


}

function selectACategory(e) {
    var cards = document.querySelectorAll('.js-card');
    cards.forEach(card => {
      if (card !== event.currentTarget) {
        card.classList.remove('is-hovered');
        card.removeAttribute('style');
      }
    })

    var windowWidth = window.outerWidth;
    var windowHeight = window.outerHeight;
    var windowTop = document.querySelector('body').scrollTop;
    var cardWidth = windowWidth / 2;
    var cardHeight = 200;
    const bodyPadding = 8;
    var x = (windowWidth / 2) - (cardWidth / 2) - bodyPadding;
    var y = (windowHeight / 2) + windowTop - (cardHeight / 2) - 100;

    if (!e.currentTarget.classList.contains('is-hovered')) {
      e.currentTarget.style.transform = 'translate3d(' + x + 'px, ' + y + 'px, 0) scale(2)';
    } else {
      e.currentTarget.removeAttribute('style');
    }
    e.currentTarget.classList.toggle('is-hovered');
    e.currentTarget.style.zIndex = 2;
}

var paginationPrev = document.querySelector('.js-pagination-prev');
paginationPrev.addEventListener('click', switchPage);

var inputs = document.querySelectorAll('.js-input');
inputs.forEach(input => input.addEventListener('click', selectGameMode));

var submitTeams = document.querySelector('.js-submit-teams');
submitTeams.addEventListener('click', quickPlayMode);

var cards = document.querySelectorAll('.js-card');
cards.forEach(card => card.addEventListener('click', selectACategory));
