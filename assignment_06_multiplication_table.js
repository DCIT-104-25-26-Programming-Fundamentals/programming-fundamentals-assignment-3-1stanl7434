// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 6
// =============================================================================
//
// TASK: Multiplication Table Generator
//
// Write a JavaScript program that generates multiplication tables using loops
// and functions.
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// This uses only Node's built-in "fs" module for input — nothing to install.
// Works whether you type answers interactively or redirect them from a file:
//
//     node assignment_06_multiplication_table.js
//     node assignment_06_multiplication_table.js < input.txt
//
// -----------------------------------------------------------------------------
// PART A — Single Table
// -----------------------------------------------------------------------------
// - Ask the user to enter a number.
// - Print the multiplication table for that number from 1 to 12.
//
// Expected output (if user enters 5):
//
//   Multiplication Table for 5:
//   5  x  1  =  5
//   5  x  2  =  10
//   5  x  3  =  15
//   ...
//   5  x  12 =  60
//
// -----------------------------------------------------------------------------
// PART B — Bonus: Tables from 1 to N
// -----------------------------------------------------------------------------
// - Ask the user to enter a number N.
// - Print the full multiplication table for every number from 1 to N.
// - Add a separator line (e.g. "---") between each table.
//
// Expected output (if user enters 3):
//
//   Multiplication Table for 1:
//   1  x  1  =  1
//   ...
//   1  x  12 =  12
//   ---------------------------
//   Multiplication Table for 2:
//   2  x  1  =  2
//   ...
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - N must be a positive integer. If the user enters an invalid value,
//   print an error message and stop.
// - Each part must be in its own function (see scaffold below).
// - Complete Part A before attempting Part B.
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
 * PART A: Prints the multiplication table for a single number, from 1 to 12.
 * Each line is aligned so the "x" and "=" columns line up neatly.
 * @param {number} num - the number to build the table for
 */
function printTable(num) {
    console.log(`Multiplication Table for ${num}:`);

    for (let i = 1; i <= 12; i++) {
        const product = num * i;
        const factor = String(i).padStart(2);   // "1" -> " 1", "12" -> "12"
        const result = String(product).padStart(3);
        console.log(`${num}  x  ${factor}  =  ${result}`);
    }
}

/**
 * PART B: Prints the multiplication tables for every number from 1 to n,
 * separating each table with a line of dashes.
 * @param {number} n - the highest number to build a table for
 */
function printTablesUpTo(n) {
    const separator = "-".repeat(29);

    for (let num = 1; num <= n; num++) {
        printTable(num);
        if (num < n) {
            console.log(separator);
        }
    }
}

/**
 * Main program entry point. Runs Part A, then Part B.
 */
function main() {
    // ---------------------------------------------------------------
    // PART A — Single table
    // ---------------------------------------------------------------
    const singleNum = parseInt(ask("Enter a number: "), 10);

    if (!Number.isInteger(singleNum) || singleNum <= 0) {
        console.log("Error: number must be a positive integer.");
        return;
    }

    printTable(singleNum);

    // ---------------------------------------------------------------
    // PART B — Bonus: tables from 1 to N
    // ---------------------------------------------------------------
    console.log("");
    const n = parseInt(ask("Enter N (print tables from 1 to N): "), 10);

    if (!Number.isInteger(n) || n <= 0) {
        console.log("Error: N must be a positive integer.");
        return;
    }

    printTablesUpTo(n);
}

main();
