'use strict';

//State variables
let currentInput = "0";
let previousInput = null;
let operator = null;
let isReset = false;

//DOM references
const currentDisplay = document.querySelector(".display__current");
const previousDisplay = document.querySelector(".display__previous");

const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");

const decimalButton = document.querySelector('[data-action="decimal"]');
const equalsButton = document.querySelector('[data-action="equals"]');

//Math functions (add, subtract, multiply, divide)

// TODO: operate() function

// TODO: Display helpers (updateDisplay, formatNumber)
function updateDisplay() {
    currentDisplay.textContent = currentInput;

    if (previousInput !== null && operator !== null) {
        previousDisplay.textContent =
            `${previousInput} ${operator}`;
    } else {
        previousDisplay.textContent = "";
    }
}

// TODO: Input handlers (number, operator, equals, clear, decimal, backspace)
function handleNumber(pushedNumber) {

    if (isReset === true) {
        currentInput = pushedNumber;
        isReset = false;
    } else {
        if (currentInput === "0") {
            currentInput = pushedNumber;
        } else {
        currentInput = currentInput + pushedNumber;
        }
    }
    updateDisplay();
}

function handleDecimal() {

    if (isReset === true) {
        currentInput = "0.";
        isReset = false;
    } else if (currentInput.includes(".")){
        return;
    } else {
        currentInput = currentInput + ".";
    }
    updateDisplay();
}

function handleEquals() {

    if (previousInput === null || operator === null || isReset === true){
        return;
    }
    const inputValue = Number(currentInput);

    const result = operate(operator, previousInput, inputValue);

    currentInput = String(result);
    previousInput = null;
    operator = null;
    isReset = true;

    updateDisplay();
}

function handleOperator(selectedOperator) {
    const inputValue = Number(currentInput);

    if (previousInput === null) {
        previousInput = inputValue;
    }else if (operator !== null && isReset === false){
        const result = operate(operator, previousInput, inputValue);

        currentInput = String(result);
        previousInput = result;
    }

    operator = selectedOperator;
    isReset = true;

    updateDisplay();
}


// TODO: Keyboard support

// TODO: Event listeners + boot
numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
        handleNumber(button.dataset.number);
    });
});

decimalButton.addEventListener("click", handleDecimal);
equalsButton.addEventListener("click", handleEquals);


