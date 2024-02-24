const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreE1 = document.getElementById('score');
const timeE1 = document.getElementById('time');
const endgameE1 = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

// List of words fore game
const words = [
    'sigh',
    'tense',
    'airplane',
    'ball',
    'pies',
    'juice',
    'warlike',
    'bad',
    'norht',
    'dependent',
    'steer',
    'silver',
    'highfalutin',
    'superficial',
    'quince',
    'eight',
    'feedble',
    'admit',
    'drag',
    'loving',
    'gold',
    'cold',
    'conversation',
    'running',
    'swimming',
    'jumping'
];

// Init word
let randomWord;

// Init score
let score = 0;

// Init Time
let time = 0;

// Set difficulty to value in 1s or medium
let difficulty = 
    localStorage.getItem('difficulty') !==null
    ? localStorage.getItem('difficulty')
    : 'medium';
    
// Focus on text on start
text.focus();

// Start counting down
const timeInterval = setInterval(updateTime, 1000);

// Generate random word from array
function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

// Add word to DOM
function addWordToDOM() {
    randomWord = getRandomWord();
    word.innerHTML = randomWord;
}

// Update score
function updateScore() {
    score++;
    scoreE1.innerHTML = score;
}

// Update time
function updateTime() {
    time--;
    timeE1.innerHTML = time + 's';
     
    if (time === 0) {
        clearInterval(timeInterval);
        // end game
        gameOver();
    }
}

// Game over, show end screen
function gameOver() {
    endgameEl.innerHTML = `
      <h1>Time ran out</h1>
      <p>Your final score is ${score}</p>
      <button onclick="location.reload()">Reload</button>
    `;
  
    endgameEl.style.display = 'flex';
  }
  
  addWordToDOM();

// Event listeners

// Typing
text.addEventListener('input', e => {
    const insertedText = e.target.value;

    if(insertedText === randomWord) {
        addWordToDOM();
        updateScore();

        // Clear
        e.target.value = '';

        if(difficulty === 'hard') {
            time += 2;
        } else if (difficulty === 'medium') {
            time += 3;
        } else {
            time += 5;
        }

        updateTime();
    }
});

// Settings btn click
settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));

// Settings select
settingsForm.addEventListener('change', e => {
    difficulty = e.target.value;
    localStorage.setItem('diffculty', difficulty);
});