'use strict'

const wordsToChoseFrom = ["values", "respect", "integrity", "service", "excellence", "stewardship"];
const maxAttempts = 11;
let numberOfWrongAnswers = 0;
let numberOfCorrectAnswers = 0;

function generateAlphabetic() {
  let actualCharacter;
  let arrayWithAlphabetic = [];
  for (let i = 65; 90 >= i; i++) {
    actualCharacter = String.fromCharCode(i);
    arrayWithAlphabetic.push(actualCharacter);
  }
  return arrayWithAlphabetic;
}

function generateKeyboard() {
  let keyboardLetter = generateAlphabetic();
  for (let i = 0; i < 26; i++) {
    let buttonElm = document.getElementById("keyboard");
    let newButton = document.createElement("button");
    let newContent = document.createTextNode(keyboardLetter[i]);
    newButton.appendChild(newContent);
    buttonElm.appendChild(newButton);
    newButton.setAttribute('id', `key_${i}`);
    newButton.setAttribute('onclick', 'afterClick(' + i +')');//dokončit
  }
}

let wordToArray = generateWordToGuess().split("");

const pictureChange = (attemptCounter) => {
 const hangmanStatusElement = document.getElementById('hangmanStatus');
 hangmanStatusElement.setAttribute('src', 'assets\\img\\' + attemptCounter + '.png');
};

const correctAnswer = (clickedId) => {
  let keyboardLetter = generateAlphabetic();
  for (let actualKey in wordToArray) {
    if (wordToArray[actualKey].includes(keyboardLetter[clickedId])) {
      const secretWordElm = document.getElementById(`position_${actualKey}`);
      secretWordElm.textContent = keyboardLetter[clickedId];
      numberOfCorrectAnswers += 1;
    }
  }
}

const wrongAnswer = () => {
  numberOfWrongAnswers += 1;
  let attemptCounter = maxAttempts - numberOfWrongAnswers;
  pictureChange(attemptCounter);
  if(attemptCounter === 0) {
    lostGame();
  };
}

const winGame = () => {
  alert('You win.');
  newGame();
}

const lostGame = () => {
  alert('You lost.\n Correct answer was: "' + wordToArray.join("") + '"');
  newGame();
}

const newGame = () => {
  location.reload();
}

const afterClick = (clickedId) => {
  let keyboardLetter = generateAlphabetic();
  const clickedIdElm = document.getElementById(`key_${clickedId}`);
  clickedIdElm.setAttribute('disabled', true);
  if (wordToArray.includes(keyboardLetter[clickedId])) {
    correctAnswer(clickedId);
  } else {
    wrongAnswer();
  }
  if (wordToArray.length === numberOfCorrectAnswers) {
    winGame();
  }
}

generateKeyboard();
function generateWordToGuess() {
  return wordsToChoseFrom[Math.floor(Math.random() * (wordsToChoseFrom.length))].toUpperCase();
};

const displayEmptyFields = () => {
  for (let i = 0; i < wordToArray.length; i++) {
    let secretWordElm = document.getElementById("secretWord");
    let newDiv = document.createElement("div");
    let newContent = document.createTextNode('?');
    newDiv.appendChild(newContent);
    secretWordElm.appendChild(newDiv);
    newDiv.setAttribute('id', `position_${i}`);
  }
}

displayEmptyFields();
