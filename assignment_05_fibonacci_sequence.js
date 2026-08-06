// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 5
// =============================================================================
//
// TASK: Fibonacci Sequence Generator
//
// The Fibonacci sequence is a series of numbers where each number is the sum
// of the two numbers before it:
//
//   0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ...
//
// Write a JavaScript program with TWO parts, each implemented as a function.
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// This uses only Node's built-in "fs" module for input — nothing to install.
// Works whether you type answers interactively or redirect them from a file:
//
//     node assignment_05_fibonacci_sequence.js
//     node assignment_05_fibonacci_sequence.js < input.txt
//
// -----------------------------------------------------------------------------
// PART A — Print the First N Terms
// -----------------------------------------------------------------------------
// - Ask the user how many terms (N) to display.
// - Print the first N numbers of the Fibonacci sequence on one line.
//
// Example:
//   How many terms? 7
//   Fibonacci sequence: 0 1 1 2 3 5 8
//
// -----------------------------------------------------------------------------
// PART B — Check if a Number Belongs to the Sequence
// -----------------------------------------------------------------------------
// - Ask the user to enter a number.
// - Determine whether that number is a Fibonacci number.
// - Print an appropriate message.
//
// Example:
//   Enter a number to check: 13
//   13 is a Fibonacci number.
//
//   Enter a number to check: 20
//   20 is NOT a Fibonacci number.
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Use a loop (not recursion) to generate the sequence in both parts.
// - N must be a positive integer. If it is not, print an error message.
// - Each part must be implemented in its own function (see scaffold below).
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
 * PART A: Generates the first n terms of the Fibonacci sequence using a loop.
 * @param {number} n - how many terms to generate (must be a positive integer)
 * @returns {number[]} array containing the first n Fibonacci numbers
 */
function generateFibonacci(n) {
    const sequence = [];

    let previous = 0;
    let current = 1;

    for (let i = 0; i < n; i++) {
        sequence.push(previous);
        const next = previous + current;
        previous = current;
        current = next;
    }

    return sequence;
}

/**
 * PART B: Determines whether a given number appears in the Fibonacci
 * sequence, by generating terms with a loop until reaching or passing it.
 * @param {number} num - the number to check
 * @returns {boolean} true if num is a Fibonacci number, false otherwise
 */
function isFibonacci(num) {
    // Negative numbers are never part of the (non-negative) sequence.
    if (num < 0) {
        return false;
    }

    let previous = 0;
    let current = 1;

    // 0 is always the first term, so check it directly.
    if (num === previous) {
        return true;
    }

    // Keep generating terms until we reach or exceed num.
    while (current < num) {
        const next = previous + current;
        previous = current;
        current = next;
    }

    return current === num;
}

/**
 * Main program entry point. Runs Part A, then Part B.
 */
function main() {
    // ---------------------------------------------------------------
    // PART A — First N terms
    // ---------------------------------------------------------------
    const n = parseInt(ask("How many terms? "), 10);

    if (!Number.isInteger(n) || n <= 0) {
        console.log("Error: N must be a positive integer.");
        return;
    }

    const sequence = generateFibonacci(n);
    console.log(`Fibonacci sequence: ${sequence.join(" ")}`);

    // ---------------------------------------------------------------
    // PART B — Membership check
    // ---------------------------------------------------------------
    const num = parseInt(ask("Enter a number to check: "), 10);

    if (isFibonacci(num)) {
        console.log(`${num} is a Fibonacci number.`);
    } else {
        console.log(`${num} is NOT a Fibonacci number.`);
    }
}

main();
