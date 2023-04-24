const display = document.querySelector(".display");
let currentNumber = "";
let previousNumber = "";
let operator = "";

const getNumbers = (number) => {
  if (number === "." && currentNumber.includes(".")) {
    return;
  }
  display.textContent += number;
  currentNumber += number;
};

const getOperations = (selectedOperator) => {
  if (operator && currentNumber !== "") {
    previousNumber = doCalculations(operator, previousNumber, currentNumber);
    display.textContent = previousNumber;
    currentNumber = "";
  }

  operator = selectedOperator;
  previousNumber = currentNumber;
  currentNumber = "";
  display.textContent = currentNumber;
};

const doCalculations = (operator, previousNumber, currentNumber) => {
  if (previousNumber === undefined) {
    previousNumber = 0;
  }

  let displayOperation;

  if (previousNumber !== "") {
    switch (operator) {
      case "+":
        displayOperation =
          parseFloat(previousNumber) + parseFloat(currentNumber);
        break;

      case "-":
        displayOperation =
          parseFloat(previousNumber) - parseFloat(currentNumber);
        break;

      case "÷":
        displayOperation =
          parseFloat(previousNumber) / parseFloat(currentNumber);
        break;

      case "x":
        displayOperation =
          parseFloat(previousNumber) * parseFloat(currentNumber);
        break;

      default:
        break;
    }

    if (
      Number.isNaN(displayOperation) ||
      displayOperation === Infinity ||
      displayOperation === -Infinity
    ) {
      return (display.textContent = "Error");
    }
  }

  previousNumber = displayOperation;
  currentNumber = "";

  return previousNumber;
};

const getPercent = () => {
  const percent = parseFloat(currentNumber) / 100;
  display.textContent = percent;
  currentNumber = percent;
};

const getSquareRoot = () => {
  const squareRoot = parseFloat(Math.sqrt(currentNumber));
  display.textContent = squareRoot;
  currentNumber = squareRoot;
};

const deleteAll = () => {
  currentNumber = "";
  previousNumber = "";
  operator = "";
  display.textContent = "";
};

const registerEventListeners = () => {
  const numberButtons = document.querySelectorAll(".number");
  numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const number = button.textContent;
      getNumbers(number);
    });
  });

  const operatorButtons = document.querySelectorAll(
    ".operation.divide, .operation.multiply, .operation.subtract, .operation.add"
  );
  operatorButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedOperator = button.textContent;
      getOperations(selectedOperator);
      display.textContent = "";
    });
  });

  const percentButton = document.querySelector(".operation.percent");
  percentButton.addEventListener("click", () => {
    getPercent();
  });

  const squareRootButton = document.querySelector(".operation.squareroot");
  squareRootButton.addEventListener("click", () => {
    getSquareRoot();
  });

  const deleteButton = document.querySelector(".operation.delete");
  deleteButton.addEventListener("click", () => {
    deleteAll();
  });

  const equalButton = document.querySelector(".operation.equal");
  equalButton.addEventListener("click", () => {
    if (operator) {
      previousNumber = doCalculations(operator, previousNumber, currentNumber);
      display.textContent = previousNumber;
      currentNumber = previousNumber;
      operator = "";
    }
  });
};

registerEventListeners();
