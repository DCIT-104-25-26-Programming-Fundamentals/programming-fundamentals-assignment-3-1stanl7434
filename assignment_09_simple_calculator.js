// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 9
// =============================================================================
//
// TASK: Console-Based Simple Calculator
//
// Build a calculator program that runs in the console and performs basic
// arithmetic operations based on the user's input.
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// This uses only Node's built-in "fs" module for input — nothing to install.
// Works whether you type answers interactively or redirect them from a file:
//
//     node assignment_09_simple_calculator.js
//     node assignment_09_simple_calculator.js < input.txt
//
// -----------------------------------------------------------------------------
// OPERATIONS YOUR CALCULATOR MUST SUPPORT
// -----------------------------------------------------------------------------
//
//   1. Addition          ( + )    e.g.  10 + 3  =  13
//   2. Subtraction       ( - )    e.g.  10 - 3  =  7
//   3. Multiplication    ( * )    e.g.  10 * 3  =  30
//   4. Division          ( / )    e.g.  10 / 3  =  3.33
//   5. Modulus           ( % )    e.g.  10 % 3  =  1  (remainder)
//   6. Exponentiation    ( ** )   e.g.  2 ** 8  =  256
//   7. Quit
//
// -----------------------------------------------------------------------------
// HOW THE MENU SHOULD LOOK
// -----------------------------------------------------------------------------
//
//   ============================
//        SIMPLE CALCULATOR
//   ============================
//   1. Addition
//   2. Subtraction
//   3. Multiplication
//   4. Division
//   5. Modulus
//   6. Exponentiation
//   7. Quit
//   Select an operation (1-7):
//
// -----------------------------------------------------------------------------
// EXPECTED INTERACTION EXAMPLE
// -----------------------------------------------------------------------------
//
//   Select an operation (1-7): 4
//   Enter first number : 10
//   Enter second number: 3
//   Result: 10 / 3 = 3.33
//
//   Select an operation (1-7): 4
//   Enter first number : 5
//   Enter second number: 0
//   Error: Cannot divide by zero.
//
//   Select an operation (1-7): 7
//   Goodbye!
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Each arithmetic operation MUST be written as its own function.
// - Use a loop so the calculator keeps running until the user selects Quit.
// - Division by zero must be caught and handled with a clear error message
//   (do NOT let the program crash).
// - Display results to 2 decimal places using .toFixed(2).
// - Handle invalid menu choices gracefully.
//
// =============================================================================

const fs = require("fs");

// ---------------------------------------------------------------------------
// Synchronous line-by-line input reading (built-in only, no readline-sync).
// Reads one line at a time straight off file descriptor 0, so it behaves
// the same whether you type answers in or redirect them from a file
// (node script.js < input.txt).
// ---------------------------------------------------------------------------

/**
 * Reads a single line of text from standard input, blocking until Enter
 * (or EOF) is reached.
 * @returns {string} the line, without its trailing newline
 */
function readLineSync() {
    const buffer = Buffer.alloc(1);
    let line = "";

    while (true) {
        let bytesRead;
        try {
            bytesRead = fs.readSync(0, buffer, 0, 1, null);
        } catch (err) {
            if (err.code === "EAGAIN") {
                continue; // stdin not ready yet, try again
            }
            break; // e.g. EOF reached
        }

        if (bytesRead === 0) {
            break; // end of input
        }

        const char = buffer.toString("utf8");
        if (char === "\n") {
            break;
        }
        line += char;
    }

    return line.replace(/\r$/, ""); // strip trailing \r if input has CRLF endings
}

/**
 * Prints a prompt (no newline) and reads back one line of input.
 * @param {string} prompt
 * @returns {string} the entered line
 */
function ask(prompt) {
    process.stdout.write(prompt);
    return readLineSync();
}

/**
 * Prints the menu header and options.
 */
function printMenu() {
    console.log("============================");
    console.log("     SIMPLE CALCULATOR");
    console.log("============================");
    console.log("1. Addition");
    console.log("2. Subtraction");
    console.log("3. Multiplication");
    console.log("4. Division");
    console.log("5. Modulus");
    console.log("6. Exponentiation");
    console.log("7. Quit");
}

/** Adds two numbers. */
function add(a, b) {
    return a + b;
}

/** Subtracts b from a. */
function subtract(a, b) {
    return a - b;
}

/** Multiplies two numbers. */
function multiply(a, b) {
    return a * b;
}

/**
 * Divides a by b. Throws an Error if b is zero, so the caller can
 * catch it and print a clean message instead of crashing.
 */
function divide(a, b) {
    if (b === 0) {
        throw new Error("Cannot divide by zero.");
    }
    return a / b;
}

/**
 * Returns the remainder of a divided by b. Throws an Error if b is zero,
 * for the same reason as divide().
 */
function modulus(a, b) {
    if (b === 0) {
        throw new Error("Cannot divide by zero.");
    }
    return a % b;
}

/** Raises a to the power of b. */
function exponentiate(a, b) {
    return a ** b;
}

/**
 * Prompts for two numbers, and returns them as an array [first, second].
 * @returns {number[]}
 */
function readTwoNumbers() {
    const first = parseFloat(ask("Enter first number : "));
    const second = parseFloat(ask("Enter second number: "));
    return [first, second];
}

/**
 * Runs the operation matching the user's menu choice: reads the two
 * operands, computes the result, and prints it (or a clear error message
 * if something goes wrong, such as division by zero).
 * @param {string} choice - the menu option selected ("1" through "6")
 */
function performOperation(choice) {
    const [a, b] = readTwoNumbers();

    const operations = {
        "1": { symbol: "+", fn: add },
        "2": { symbol: "-", fn: subtract },
        "3": { symbol: "*", fn: multiply },
        "4": { symbol: "/", fn: divide },
        "5": { symbol: "%", fn: modulus },
        "6": { symbol: "**", fn: exponentiate }
    };

    const operation = operations[choice];

    try {
        const result = operation.fn(a, b);
        console.log(`Result: ${a} ${operation.symbol} ${b} = ${result.toFixed(2)}`);
    } catch (err) {
        console.log(`Error: ${err.message}`);
    }
}

/**
 * Main program entry point. Displays the menu in a loop, handling one
 * choice at a time, until the user chooses to quit.
 */
function main() {
    while (true) {
        printMenu();
        const choice = ask("Select an operation (1-7): ");

        if (choice === "7") {
            console.log("Goodbye!");
            break;
        } else if (["1", "2", "3", "4", "5", "6"].includes(choice)) {
            performOperation(choice);
        } else {
            console.log("Error: please enter a number from 1 to 7.");
        }

        console.log(""); // blank line for readability between menu cycles
    }
}

main();
