/* ================================================================
   CALCULATOR LOGIC
   1. STATE VARIABLES      — calculator memory between clicks
   2. DOM REFERENCES       — cached element pointers
   3. MATH OPERATORS       — add / subtract / multiply / divide
   4. operate()            — picks + calls the right math fn
   5. DISPLAY HELPERS      — updateDisplay(), formatNumber()
   6. INPUT HANDLERS       — one per action type
   7. KEYBOARD SUPPORT     — map keys → handlers
   8. WIRING / BOOT        — attach listeners, initial paint
   ================================================================ */

'use strict';

/* ================================================================
   1. STATE VARIABLES
   currentInput   string  "0"     — currently being typed
   previousInput  number|null     — first number after operator press
   selectedOp     string|null     — '+', '-', '*', '/'
   shouldReset    bool            — next number click replaces input
   ================================================================ */
let currentInput = '0';
let previousInput = null;
let selectedOp = null;
let shouldReset = false;

/* ================================================================
   2. DOM REFERENCES
   ================================================================ */
const displayCurrentEl = document.querySelector('.display__current');
const displayPreviousEl = document.querySelector('.display__previous');
const numberButtons = document.querySelectorAll('.btn--number');
const operatorButtons = document.querySelectorAll('.btn--operator');
const equalsButton = document.querySelector('.btn--equals');
const clearButton = document.querySelector('.btn--clear');
const backspaceButton = document.querySelector('.btn--backspace');
const decimalButton = document.querySelector('.btn--decimal');

/* ================================================================
   3. MATH OPERATORS  (pure fns — test these in console first)
   ================================================================ */

function add(a, b) {
    return a + b;
}

function subtract(a, b) {

    return a - b;
}

function multiply(a, b) {

    return a * b;

}

function divide(a, b) {
    if (b === 0) {
        console.log('divide by zero');
        return null;
    }
    return a / b;
}


/* ================================================================
   4. operate(op, a, b)   requirement b
   switch on op → call matching math fn
   round result before returning (requirement f.c)
   ================================================================ */
function operate(op, a, b) {
    let result;

    switch (op) {
        case "+":
            result = add(a, b);
            break;
        case "-":
            result = subtract(a, b);
            break;
        case "*":
            result = multiply(a, b);
            break;
        case "/":
            result = divide(a, b);
            break;
        default:
            console.log("invalid operator:", op);
            return null;
    }

    if (typeof result === 'number') {
        result = +result.toFixed(10);
    }

    console.log("operate result:", result);
    return result;
}

/* ================================================================
   5. DISPLAY HELPERS
   updateDisplay()  → push state values into DOM text
   formatNumber(s)  → clean/trim long decimals for the display
   ================================================================ */

function updateDisplay() {
    // TODO: displayCurrentEl.textContent = formatNumber(currentInput)
    // TODO: displayPreviousEl.textContent = `${previousInput} ${opSymbol}` || ''
}

function formatNumber(numStr) {
    // TODO: convert to number, round/trim, avoid 0.1 + 0.2 artifacts
}

/* ================================================================
   6. INPUT HANDLERS

   handleNumber(d)       — append digit OR replace if shouldReset
   handleOperator(op)    — if prev+op already set → operate() first,
                           then shift state (enables chaining f.a/b)
   handleEquals()        — operate(), wipe prev/op, show result
   handleClear()         — wipe ALL state  (requirement f.e)
   handleDecimal()       — ONE dot only  (requirement g)
   handleBackspace()     — pop last char  (requirement h)
   ================================================================ */

function handleNumber(digit) {
    // TODO
    // if (shouldReset) → currentInput = digit, shouldReset = false
    // else if (currentInput === '0') → currentInput = digit (no leading 0)
    // else → currentInput += digit
}

function handleOperator(op) {
    // TODO — this is where chaining happens (requirement f.a / f.b)
    //
    // if (previousInput !== null && !shouldReset) {
    //   // we already have a pair → evaluate, use result as new prev
    //   const result = operate(selectedOp, previousInput, Number(currentInput));
    //   // handle error (divide by 0) here too
    //   currentInput = String(result);
    // }
    // previousInput = Number(currentInput);
    // selectedOp = op;
    // shouldReset = true;
}

function handleEquals() {
    // TODO — requirement e + f.d + f.f
    // guard: if (previousInput == null || selectedOp == null || shouldReset) return
    // result = operate(selectedOp, previousInput, Number(currentInput))
    // if result is error → show snarky message, clear state, return
    // currentInput = String(result)
    // previousInput = null; selectedOp = null; shouldReset = true;
}

function handleClear() {
    // TODO — requirement f.e
    // reset ALL 4 state variables to defaults
}

function handleDecimal() {
    // TODO — requirement g
    // if (shouldReset) → currentInput = '0.'; shouldReset = false; return
    // if (currentInput.includes('.')) → do nothing
    // else → currentInput += '.'
}

function handleBackspace() {
    // TODO — requirement h
    // if (shouldReset) return (nothing to delete yet)
    // currentInput = currentInput.slice(0, -1)
    // if (result === '' || result === '-') → back to '0'
}

/* ================================================================
   7. KEYBOARD SUPPORT   (requirement h, last line)
   keydown → switch on e.key → call matching handler
   ================================================================ */
function setupKeyboardSupport() {
    // TODO:
    // document.addEventListener('keydown', (e) => {
    //   if (/^[0-9]$/.test(e.key))         → handleNumber(e.key)
    //   else if (['+','-','*','/','%'].includes(e.key)) → handleOperator(e.key)
    //   else if (e.key === 'Enter' || e.key === '=')    → handleEquals()
    //   else if (e.key === 'Backspace')                 → handleBackspace()
    //   else if (e.key === 'Escape' || e.key.toLowerCase() === 'c') → handleClear()
    //   else if (e.key === '.')                         → handleDecimal()
    //   then updateDisplay()
    // })
}

/* ================================================================
   8. WIRING — attach click listeners to each button group
   ================================================================ */
function setupEventListeners() {

    numberButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            // const digit = btn.dataset.number;
            // handleNumber(digit);
            // updateDisplay();
        });
    });

    operatorButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            // const op = btn.dataset.operator;
            // handleOperator(op);
            // updateDisplay();
        });
    });

    equalsButton.addEventListener('click', () => {
        // handleEquals();
        // updateDisplay();
    });

    clearButton.addEventListener('click', () => {
        // handleClear();
        // updateDisplay();
    });

    backspaceButton.addEventListener('click', () => {
        // handleBackspace();
        // updateDisplay();
    });

    decimalButton.addEventListener('click', () => {
        // handleDecimal();
        // updateDisplay();
    });
}

/* ----------------------------------------------------------------
   BOOT
   ---------------------------------------------------------------- */
setupEventListeners();
setupKeyboardSupport();
updateDisplay();
