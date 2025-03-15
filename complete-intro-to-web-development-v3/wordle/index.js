const ENDPOINTS = {
  word: "https://words.dev-apis.com/word-of-the-day",
  validate: "https://words.dev-apis.com/validate-word"
};
const ALPHABET = "abcdefghijklmnopqrstuvwxyz";

const INVALID_WORD = "Invalid word";
const GAME_OVER = "Game over";
const YOU_WIN = "You win";

const INPUTS_PER_ROW = 5;
const LAST_ROW = 5;

const inputs = document.querySelectorAll(".guesses__guess__input");
const warning = document.querySelector(".guesses__warning");
const loading = document.querySelector(".loading");

let currentRow = 0;
let gameFinished = false;

const partialClass = "guesses__guess__input--partial";
const correctClass = "guesses__guess__input--correct";
const wrongClass = "guesses__guess__input--wrong";

let answer = {};

inputs.forEach((input, index) => {
  input.addEventListener("keydown", (event) => onKeyDown(event, input, index));
});

updateInputs();

fetch(ENDPOINTS.word).then(async (response) => {
  const res = await response.json();
  answer.word = res.word;

  await processAnswer();
});

async function onKeyDown(event, input, index) {
  const code = event.keyCode;
  const key = event.key;

  const isRowFirstInput = index % INPUTS_PER_ROW === 0;
  const isRowLastInput = index % INPUTS_PER_ROW === INPUTS_PER_ROW - 1;
  const isInputEmpty = input.value === "";

  if (isValid(code)) {
    if (isBackspace(code)) {
      handleBackspace();
    }

    if (isLetter(code)) {
      handleLetter();
    }
  } else {
    event.preventDefault();
  }

  if (isRowLastInput) {
    if (isBackspace(code)) return;

    disableInput();

    const word = getWord();

    const success = await checkAnswer(word);

    if (gameFinished) {
      disableAllInputs();
      return;
    }

    if (success) {
      goToNextRow();

      if (currentRow > LAST_ROW) {
        setWarning(GAME_OVER);
      } else {
        updateInputs();
        goToNextRowInput();
      }
    } else {
      enableInput();
      goToLastRowInput();
    }
  }

  function handleBackspace() {
    if (!isInputEmpty) {
      event.preventDefault();
    }

    if (!isRowFirstInput) {
      goToPreviousInput();
    }

    clearInput();
  }

  function handleLetter() {
    fillInput(key);
    event.preventDefault();

    if (!isRowLastInput) {
      goToNextInput();
    }
  }

  function goToPreviousInput() {
    inputs[index - 1].focus();
  }

  function goToNextInput() {
    inputs[index + 1].focus();
  }

  function clearInput() {
    fillInput("");
  }

  function fillInput(value) {
    input.value = value;
  }

  function disableInput() {
    input.disabled = true;
  }

  function enableInput() {
    input.disabled = false;
  }

  function goToNextRow() {
    currentRow++;
  }

  function goToNextRowInput() {
    inputs[currentRow * INPUTS_PER_ROW].focus();
  }

  function getWord() {
    const rowInputs = Object.values(inputs).slice(currentRow * INPUTS_PER_ROW, (currentRow + 1) * INPUTS_PER_ROW);
    const characters = [...rowInputs.map((input) => input.value)];
    return characters.join('');
  }
}

function isValid(code) {
  return isLetter(code) || isBackspace(code) || isTab(code);
}

function isLetter(code) {
  return (code >= 65 && code <= 90) || (code >= 97 && code <= 122);
}

function isBackspace(code) {
  return code === 8;
}

function isTab(code) {
  return code === 9;
}

function processAnswer() {
  processAnswerCharacters();
  processAnswerFrequency();
}

function processAnswerCharacters() {
  answer.characters = answer.word.split('');
}

function processAnswerFrequency() {
  answer.frequency = {};
  ALPHABET.split('').forEach((character) => answer.frequency[character] = 0)
  answer.characters.forEach((character) => answer.frequency[character]++);
}

async function checkAnswer(word) {
  const characters = word.split('');

  const someCharacterIsNotLetter = characters.some((character) => !/^[a-zA-Z]$/.test(character));
  const wordIsComplete = characters.length === INPUTS_PER_ROW;
  if (someCharacterIsNotLetter || !wordIsComplete) {
    return;
  }

  startLoading();

  const isValidWord = (await fetch(ENDPOINTS.validate, {
    method: 'POST',
    body: JSON.stringify({ word })
  }).then((response) => response.json())).validWord;

  if (!isValidWord) {
    setWarning(INVALID_WORD);

    finishLoading();
    return;
  }

  frequency = { ...answer.frequency };
  let correctCharacters = 0;

  characters.forEach((character, index) => {
    const isCorrectLetter = frequency[character];
    const inputIndex = currentRow * INPUTS_PER_ROW + index;

    if (isCorrectLetter) {
      const isCorrectPosition = answer.word[index] === character;

      setInputClass(partialClass);

      if (isCorrectPosition) {
        setInputClass(correctClass);
        correctCharacters++;
      }

      frequency[character]--;
    } else {
      setInputClass(wrongClass);
    }
 
    function setInputClass(className) {
      inputs[inputIndex].classList.add(className);
    }
  });

  clearWarning();

  if (correctCharacters === INPUTS_PER_ROW) {
    setWarning(YOU_WIN);
    gameFinished = true;
  }

  finishLoading();
  return true;
}

function startLoading() {
  loading.style.display = "flex";
}

function finishLoading() {
  loading.style.display = "none";
}

function updateInputs() {
  disableAllInputs();
  enableAppropriateInputs();
}

function disableAllInputs() {
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].disabled = true;
  }
}

function enableAppropriateInputs() {
  for (let i = currentRow * INPUTS_PER_ROW; i < (currentRow + 1) * INPUTS_PER_ROW; i++) {
    inputs[i].disabled = false;
  }
}

function clearWarning() {
  setWarning("");
}

function setWarning(value) {
  warning.innerHTML = value;
}

function goToLastRowInput() {
  inputs[currentRow * INPUTS_PER_ROW + INPUTS_PER_ROW - 1].focus();
}