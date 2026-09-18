'use strict';

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
================================================================ */


//Helper Functions
// add function
function add(num1, num2) {
    return num1 + num2;
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

    //1.1 Number buttons function here

    

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