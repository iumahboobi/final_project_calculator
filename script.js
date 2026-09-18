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
let currentInput = '0';
let previousInput = null;
let selectedOp = null;
let shouldReset = false;

const displayCurrentEl = document.querySelector('.display__current');
const displayPreviousEl = document.querySelector('.display__previous');
const numberButtons = document.querySelectorAll('.btn--number[data-number]');
const operatorButtons = document.querySelectorAll('.btn--operator');
const equalsButton = document.querySelector('[data-action="equals"]');
const clearButton = document.querySelector('[data-action="clear"]');
const backspaceButton = document.querySelector('[data-action="backspace"]');
const decimalButton = document.querySelector('[data-action="decimal"]');
/* ================================================================
JAVASCRIPT PROJECT - CALCULATOR   


//Helper Functions
// add function
function add(num1, num2) {
    return num1 + num2;
}

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

// subtract function
function subtract(num1, num2) {
    return num1 - num2;
}
// multiply function
function multiply(num1, num2) {
    return num1 * num2;
}
// divide function
function divide(num1, num2) {
    if (num2 === 0) {
        return null;
    }
    return num1 / num2;
}

function operate(op, num1, num2) {

    let result
    switch (op) {
        case "+":
            result = add(num1, num2)
            break;
        case "-":
            result = subtract(num1, num2)
            break;
        case "*":
            result = multiply(num1, num2)
            break;
        case "/":
            result = divide(num1, num2)
            break;
        default:
            return null;

// TODO: Event listeners + boot
numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
        handleNumber(button.dataset.number);
    });
});

decimalButton.addEventListener("click", handleDecimal);
equalsButton.addEventListener("click", handleEquals);


    }
    if (typeof result === 'number') {
        return +result.toFixed(10)
    }

    return result
}

function handleClear() {
    currentInput = "0";
    shouldReset = true;
    previousInput = null;
    selectedOp = null;
}

function handleBackspace() {

    if (shouldReset)
        return

    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1)
    }

    else {
        currentInput = '0'
    }
}


function handleOperator(op) {
    previousInput = Number(currentInput);
    shouldReset = true;
    selectedOp = op;
}

function handleEqual() {

    if (previousInput === null || shouldReset) {
        return
    }

    //previous input, extrac op , Number(currentInput)
    const num1 = previousInput;
    const num2 = Number(currentInput);
    const result = operate(selectedOp, num1, num2)

    if (result === null) {
        currentInput = "O-o"
    }

    else {
        currentInput = String(result);
    }
    previousInput = null;
    selectedOp = null
    shouldReset = true;
}

// 1. Number buttons
function mainFunction() {
    //1.2 Pressing AC and make it 0
    clearButton.addEventListener('click', () => {
        handleClear()
        updateDisplay()
    })

    //1.3 Removing number digit by clicking backspace
    backspaceButton.addEventListener('click', () => {
        handleBackspace()
        updateDisplay()
    })


    //1.4 Decimal function


    //1.5 Operator function
    operatorButtons.forEach((operatorBtn) => {

        operatorBtn.addEventListener('click', () => {
            handleOperator(operatorBtn.dataset.operator)
            updateDisplay()
        })
    })
    //6. Equals function
    equalsButton.addEventListener('click', () => {
        handleEqual()
        updateDisplay()
    })

    //6. Keyboard support
    document.addEventListener('keydown', (e) => {

        console.log(e)
        if (e.key === 'Backspace') {
            e.preventDefault() //in Firefox backspace will go back to previous page so use e.preventDefault()here
            handleBackspace()
            updateDisplay()
        }
        else if (e.key === '.') {
            handleDecimal()
            updateDisplay()
        }
        else if (e.key === 'Enter' || e.key === '=') {
            e.preventDefault()
            handleEqual()
            updateDisplay()
        }
        else if (e.key === '+') {
            handleOperator('+')
            updateDisplay()
        }
        else if (e.key === '-') {
            handleOperator('-')
            updateDisplay()
        }
        else if (e.key === '*') {
            handleOperator('*')
            updateDisplay()
        }
        else if (e.key === '/') {
            e.preventDefault()
            handleOperator('/')
            updateDisplay()
        }
        else if (/^[0-9]$/.test(e.key)) {
            handleNumber(e.key)
            updateDisplay()
        }
        else if (e.key.toLowerCase() === 'c' || e.key === 'Escape') {
            handleClear()
            updateDisplay()
        }
    })
}
mainFunction()
