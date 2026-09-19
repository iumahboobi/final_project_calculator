'use strict';

//State variables
let currentInput = "0";
let previousInput = null;
let operator = null;
let isReset = false;

//DOM references
const currentDisplay = document.querySelector(".display__current");
const previousDisplay = document.querySelector(".display__previous");
const operatorButtons = document.querySelectorAll("[data-operator]");
const decimalButton = document.querySelector('[data-action="decimal"]');
const equalsButton = document.querySelector('[data-action="equals"]');
const numberButtons = document.querySelectorAll('.btn--number[data-number]');
const clearButton = document.querySelector('[data-action="clear"]');
const backspaceButton = document.querySelector('[data-action="backspace"]');

//Helper Functions

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

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
    }

    if (typeof result === 'number') {
        return +result.toFixed(10)
    }

    return result
}

function updateDisplay() {
    currentDisplay.textContent = currentInput;

    if (previousInput !== null && operator !== null) {
        previousDisplay.textContent =
            `${previousInput} ${operator}`;
    } else {
        previousDisplay.textContent = "";
    }
}

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
}

function handleClear() {
    currentInput = "0";
    isReset = true;
    previousInput = null;
    operator = null;
}

function handleBackspace() {
    
    if (isReset)
        return

    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1)
    }
    else {
        currentInput = '0'
    }
}

function handleOperator(selectedOperator) {
    const inputValue = Number(currentInput);

    if (previousInput === null) {
        previousInput = inputValue;
    } else if (operator !== null && isReset === false) {
        const result = operate(operator, previousInput, inputValue);

        if (result === null) {
            currentInput = "O-o";
            previousInput = null;
            operator = null;
            isReset = true;
            updateDisplay()
            return
        }
        currentInput = String(result);
        previousInput = result;
    }
    operator = selectedOperator;
    isReset = true;
}

function handleEquals() {

    if (previousInput === null || operator === null || isReset === true) {
        return;
    }
    const inputValue = Number(currentInput);
    const result = operate(operator, previousInput, inputValue);

    if (result === null) {
        currentInput = "O-o";
        previousInput = null;
        operator = null;
        isReset = true;
        updateDisplay()
        return;
    }
    currentInput = String(result);
    previousInput = null;
    operator = null;
    isReset = true;
}

function handleDecimal() {

    if (isReset === true) {
        currentInput = "0.";
        isReset = false;
    } else if (currentInput.includes(".")) {
        return;
    } else {
        currentInput = currentInput + ".";
    }
}


// Main fucntion
function mainFunction() {
    //1.1 Pressing AC and make it 0
    clearButton.addEventListener('click', () => {
        handleClear()
        updateDisplay()
    })

    //1.2 Removing number digit by clicking backspace
    backspaceButton.addEventListener('click', () => {
        handleBackspace()
        updateDisplay()
    })

    //1.3 Decimal function
    operatorButtons.forEach((operatorBtn) => {
        operatorBtn.addEventListener('click', () => {
            handleOperator(operatorBtn.dataset.operator)
            updateDisplay()
        })
    })
    //1.4 Equals function
    equalsButton.addEventListener('click', () => {
        handleEquals()
        updateDisplay()
    })

    //1.5 Number buttons
    numberButtons.forEach((button) => {
        button.addEventListener("click", () => {
            handleNumber(button.dataset.number);
            updateDisplay()
        });
    });

    //1.6 Decimal function
    decimalButton.addEventListener("click", () => {
        handleDecimal();
        updateDisplay();
    });
    //2. Keyboard support
    document.addEventListener('keydown', (e) => {

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
            handleEquals()
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
