const clearButton = document.querySelector("#clear");
const eraseButton = document.querySelector("#erase");
const divideButton = document.querySelector("#divide");
const sevenButton = document.querySelector("#seven");
const eightButton = document.querySelector("#eight");
const nineButton = document.querySelector("#nine");
const multiplyButton = document.querySelector("#multiply");
const fourButton = document.querySelector("#four");
const fiveButton = document.querySelector("#five");
const sixButton = document.querySelector("#six");
const subtractButton = document.querySelector("#subtract");
const oneButton = document.querySelector("#one");
const twoButton = document.querySelector("#two");
const threeButton = document.querySelector("#three");
const sumButton = document.querySelector("#sum");
const zeroButton = document.querySelector("#zero");
const equalButton = document.querySelector("#equal");

const resultElement = document.querySelector(".calculator__result");

let numbersQueue = [];
let operationsQueue = [];

clearButton.addEventListener('click', () => {
  resultElement.innerHTML = 0;
  numbers = [];
});

eraseButton.addEventListener('click', () => {
  let result = resultElement.innerHTML;

  if (result === "0") return;

  result = result.substring(0, result.length - 1);

  resultElement.innerHTML = result || "0";
});

const numberButtons = [zeroButton, oneButton, twoButton, threeButton, fourButton, fiveButton, sixButton, sevenButton, eightButton, nineButton];

numberButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    let result = resultElement.innerHTML;
  
    if (result === "0") result = "";
  
    resultElement.innerHTML = result + index.toString();
  });
});

const operationButtons = [divideButton, multiplyButton, subtractButton, sumButton];
const operations = [(a, b) => a/b, (a, b) => a*b, (a, b) => a-b, (a, b) => a+b];

operationButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    let result = resultElement.innerHTML;

    numbersQueue.push(parseInt(result));
    operationsQueue.push(operations[index]);

    resultElement.innerHTML = "0";
  });
});

equalButton.addEventListener('click', () => {
  numbersQueue.push(parseInt(resultElement.innerHTML));

  const operationsAndNumbersMismatch = operationsQueue.length !== numbersQueue.length - 1;
  const insufficientNumbers = numbersQueue.length < 2;
  const insufficientOperations = operationsQueue.length < 1;
  const error = operationsAndNumbersMismatch || insufficientNumbers || insufficientOperations;

  if (error) {
    numbersQueue.pop();
    return;
  }
  
  const numbersAmount = numbersQueue.length;

  for (let i = 0; i < numbersAmount - 1; i++) {
    const operation = operationsQueue[i];

    const a = numbersQueue.shift();
    const b = numbersQueue.shift();

    numbersQueue.unshift(operation(a, b));
  }

  const result = numbersQueue[0];
  numbersQueue = [];
  operationsQueue = [];

  resultElement.innerHTML = result.toString();
});