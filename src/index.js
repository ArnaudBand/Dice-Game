import './style.css';

const btnRoll = document.querySelector('.btn-roll');
const btnHold = document.querySelector('.btn-hold');
const diceEl = document.querySelector('.dice');

let currentPlayer;
let currentScore;
let score;
let gamePlayingState;

// switch player function

function switchPlayer() {
  currentScore = 0;
  currentPlayer = currentPlayer === 0 ? 1 : 0;
  document.querySelector('.player-0').classList.toggle('active-player');
  document.querySelector('.player-1').classList.toggle('active-player');

  document.querySelector('.current-0').textContent = 0;
  document.querySelector('.current-1').textContent = 0;
}

function startGame() {
  if (gamePlayingState === true) {
    // generate random numbers between 1 and 6
    const randNum = 1 + Math.round(Math.random() * 5);

    // display the correct dice
    diceEl.src = `images/dice-${randNum}.png`;
    diceEl.style.display = 'block';

    // check whether the number is not 1

    if (randNum !== 1) {
      currentScore += randNum;
      document.querySelector(`.current-${currentPlayer}`).textContent = currentScore;
    } else {
    // switch player

      switchPlayer();
    }
  }
}

btnRoll.addEventListener('click', startGame);

// hold button on click

btnHold.addEventListener('click', () => {
  if (gamePlayingState === true) {
    score[currentPlayer] += currentScore;
    document.querySelector(`.score-${currentPlayer}`).textContent = score[currentPlayer];

    if (score[currentPlayer] >= 20) {
      // Game Over
      gamePlayingState = false;
      document.querySelector(`.player-${currentPlayer}`).classList.add('winner');
      document.querySelector(`.name-${currentPlayer}`).textContent = 'ALPHA WON Well done!!🤑';
    } else {
      // Switch Player
      switchPlayer();
    }
  }
});

function init() {
  currentPlayer = 0;
  currentScore = 0;
  score = [0, 0];
  gamePlayingState = true;

  diceEl.style.display = 'none';

  document.querySelector('.player-0').classList.remove('winner');
  document.querySelector('.player-1').classList.remove('winner');

  document.querySelector('.player-0').classList.remove('active-player');
  document.querySelector('.player-1').classList.remove('active-player');

  document.querySelector('.player-0').classList.add('active-player');

  document.querySelector('.name-0').textContent = 'Player-1';
  document.querySelector('.name-1').textContent = 'Player-2';

  document.querySelector('.current-0').textContent = '0';
  document.querySelector('.current-1').textContent = '0';

  document.querySelector('.score-0').textContent = '0';
  document.querySelector('.score-1').textContent = '0';
}

document.querySelector('.btn-new').addEventListener('click', init);

init();
