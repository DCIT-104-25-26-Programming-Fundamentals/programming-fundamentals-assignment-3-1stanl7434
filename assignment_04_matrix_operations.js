// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 4
// =============================================================================
//
// TASK: Matrix Operations
//
// Write a JavaScript program that performs three operations on matrices
// (2D arrays), each implemented in its own function.
//
// In JavaScript, a matrix is represented as an array of arrays:
//   let matrix = [[1, 2, 3], [4, 5, 6]];   // 2 rows, 3 columns
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// This uses only Node's built-in "fs" module for input — nothing to install.
// Works whether you type answers interactively or redirect them from a file:
//
//     node assignment_04_matrix_operations.js
//     node assignment_04_matrix_operations.js < input.txt
//
// -----------------------------------------------------------------------------
// PART A — Transpose a Matrix
// -----------------------------------------------------------------------------
// - Read an M x N matrix from the user.
// - Compute and display its transpose (rows become columns, columns become rows).
//
// Example (2 x 3 input):
//
//   Original Matrix:      Transposed Matrix:
//   1  2  3                1  4
//   4  5  6                2  5
//                          3  6
//
// -----------------------------------------------------------------------------
// PART B — Add Two Matrices
// -----------------------------------------------------------------------------
// - Read two matrices of exactly the same size (M x N).
// - Compute their element-wise sum and display the result.
//
// -----------------------------------------------------------------------------
// PART C — Multiply Two Matrices
// -----------------------------------------------------------------------------
// - Read matrix A of size M x N and matrix B of size N x P.
//   (Number of COLUMNS in A must equal number of ROWS in B.)
// - Compute and display the matrix product A x B (result is M x P).
//
// -----------------------------------------------------------------------------
// EXPECTED INPUT FORMAT
// -----------------------------------------------------------------------------
// When entering a row, the user types all values on one line separated by spaces:
//
//   Enter number of rows: 2
//   Enter number of columns: 3
//   Enter row 1: 1 2 3
//   Enter row 2: 4 5 6
//
// Hint: split each line on whitespace and convert to numbers.
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Use nested loops for all operations (no external libraries).
// - Each operation must be in its own function (see scaffold below).
// - Display each matrix in a neat, aligned grid format.
// - Tip: Complete Part A first, then Parts B and C.
//
// =============================================================================

const fs = require("fs");

// ---------------------------------------------------------------------------
// Synchronous line-by-line input reading (built-in only, no readline-sync).
//
// Node's async "readline" module can silently drop prompts when many lines
// of input arrive at once (e.g. `node script.js < input.txt`), because the
// buffered lines get consumed faster than the async callbacks re-register.
// Reading one line at a time straight off file descriptor 0 avoids that
// problem entirely and behaves the same whether input is typed or piped.
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
 * Reads a matrix of the given size from the user, one row per line.
 * @param {number} rows
 * @param {number} cols
 * @returns {number[][]}
 */
function readMatrix(rows, cols) {
    const matrix = [];
    for (let i = 0; i < rows; i++) {
        const line = ask(`Enter row ${i + 1} (${cols} numbers): `);
        const rowValues = line.trim().split(/\s+/).map(Number);
        matrix.push(rowValues);
    }
    return matrix;
}

/**
 * PART A: Computes the transpose of a matrix (rows become columns).
 * @param {number[][]} matrix
 * @returns {number[][]} the transposed matrix
 */
function transpose(matrix) {
    const rows = matrix.length;
    const cols = matrix[0].length;
    const result = [];

    for (let j = 0; j < cols; j++) {
        const newRow = [];
        for (let i = 0; i < rows; i++) {
            newRow.push(matrix[i][j]);
        }
        result.push(newRow);
    }

    return result;
}

/**
 * PART B: Adds two matrices of the same size, element by element.
 * @param {number[][]} a
 * @param {number[][]} b
 * @returns {number[][]} the sum matrix
 */
function addMatrices(a, b) {
    const rows = a.length;
    const cols = a[0].length;
    const result = [];

    for (let i = 0; i < rows; i++) {
        const newRow = [];
        for (let j = 0; j < cols; j++) {
            newRow.push(a[i][j] + b[i][j]);
        }
        result.push(newRow);
    }

    return result;
}

/**
 * PART C: Multiplies matrix A (M x N) by matrix B (N x P), producing an
 * M x P result. For each output cell, sums the products of the matching
 * row of A and column of B.
 * @param {number[][]} a
 * @param {number[][]} b
 * @returns {number[][]} the product matrix
 */
function multiplyMatrices(a, b) {
    const rowsA = a.length;
    const colsA = a[0].length; // must equal rows of b
    const colsB = b[0].length;
    const result = [];

    for (let i = 0; i < rowsA; i++) {
        const newRow = [];
        for (let j = 0; j < colsB; j++) {
            let sum = 0;
            for (let k = 0; k < colsA; k++) {
                sum += a[i][k] * b[k][j];
            }
            newRow.push(sum);
        }
        result.push(newRow);
    }

    return result;
}

/**
 * Prints a matrix in a neat, aligned grid, with every column padded to
 * the width of its widest value.
 * @param {string} label - heading to print above the matrix
 * @param {number[][]} matrix
 */
function printMatrix(label, matrix) {
    console.log(label);

    let width = 0;
    for (const row of matrix) {
        for (const value of row) {
            width = Math.max(width, String(value).length);
        }
    }

    for (const row of matrix) {
        const line = row.map((value) => String(value).padStart(width)).join("  ");
        console.log(line);
    }
}

/**
 * Main program entry point. Runs Part A, then Part B, then Part C in order,
 * prompting for whatever matrices each part needs.
 */
function main() {
    // ---------------------------------------------------------------
    // PART A — Transpose
    // ---------------------------------------------------------------
    console.log("=== PART A: Transpose a Matrix ===");
    const rowsA = parseInt(ask("Enter number of rows: "), 10);
    const colsA = parseInt(ask("Enter number of columns: "), 10);
    const matrixA = readMatrix(rowsA, colsA);

    printMatrix("\nOriginal Matrix:", matrixA);
    printMatrix("\nTransposed Matrix:", transpose(matrixA));

    // ---------------------------------------------------------------
    // PART B — Addition
    // ---------------------------------------------------------------
    console.log("\n=== PART B: Add Two Matrices ===");
    const rowsB = parseInt(ask("Enter number of rows: "), 10);
    const colsB = parseInt(ask("Enter number of columns: "), 10);

    console.log("Matrix 1:");
    const matrixB1 = readMatrix(rowsB, colsB);
    console.log("Matrix 2:");
    const matrixB2 = readMatrix(rowsB, colsB);

    printMatrix("\nSum Matrix:", addMatrices(matrixB1, matrixB2));

    // ---------------------------------------------------------------
    // PART C — Multiplication
    // ---------------------------------------------------------------
    console.log("\n=== PART C: Multiply Two Matrices ===");
    const rowsC1 = parseInt(ask("Enter rows of Matrix A: "), 10);
    const colsC1 = parseInt(ask("Enter columns of Matrix A (= rows of Matrix B): "), 10);
    console.log("Matrix A:");
    const matrixC1 = readMatrix(rowsC1, colsC1);

    const colsC2 = parseInt(ask("Enter columns of Matrix B: "), 10);
    console.log("Matrix B:");
    const matrixC2 = readMatrix(colsC1, colsC2);

    printMatrix("\nProduct Matrix (A x B):", multiplyMatrices(matrixC1, matrixC2));
}

main();
