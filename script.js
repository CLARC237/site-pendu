const words = ['ordinateur', 'programmeur', 'javascript', 'html', 'css', 'nodejs'];
const vowels = ['a', 'e', 'i', 'o', 'u'];

let word = words[Math.floor(Math.random() * words.length)];
word = word.toUpperCase();

const wordContainer = document.querySelector('.word');
const guessesContainer = document.querySelector('.guesses');
const guessedLettersContainer = document.querySelector('.guessed-letters');
const letters = document.querySelectorAll('.letters button');
const hangmanParts = document.querySelectorAll('.hangman > *');
const message = document.querySelector('.message');

let guesses = 6;
let guessedLetters = [];

function displayWord() {
  for (let i = 0; i < word.length; i++) {
    const span = document.createElement('span');
    if (word[i] === ' ') {
      span.textContent = '\u00A0';
    } else if (vowels.includes(word[i])) {
      span.classList.add('vowel');
      span.textContent = '_';
    } else {
      span.classList.add('consonant');
      span.textContent = '_';
    }
    wordContainer.appendChild(span);
  }
}

displayWord();

function updateGuesses() {
  guessesContainer.textContent = guesses;
}

function updateGuessedLetters() {
  guessedLettersContainer.textContent = guessedLetters.join(', ');
}

function checkWin() {
  return [...wordContainer.querySelectorAll('span')].every(span => {
    return span.textContent !== '_';
  });
}

function endGame(win) {
  letters.forEach(letter => {
    letter.disabled = true;
  });
  if (win) {
    message.textContent = 'Vous avez gagné!';
    message.classList.add('win');
  } else {
    message.textContent = 'Vous avez perdu!';
    message.classList.add('loss');
    hangmanParts.forEach(part => {
      part.classList.add('show');
    });
    wordContainer.classList.add('show-word');
  }
}

function handleGuess(letter) {
  if (guesses > 0 && !guessedLetters.includes(letter)) {
    guessedLetters.push(letter);
    updateGuessedLetters();
    if (word.includes(letter)) {
      const spans = [...wordContainer.querySelectorAll('span')];
      for (let i = 0; i < word.length; i++) {
        if (word[i] === letter) {
          spans[i].textContent = letter;
        }
      }
      if (checkWin()) {
        endGame(true);
      }
    } else {
      guesses--;
      updateGuesses();
      if (guesses === 0) {
        endGame(false);
      }
    }
  }
}

letters.forEach(letter => {
  letter.addEventListener('click', () => {
    handleGuess(letter.textContent);
    letter.disabled = true;
  });
});