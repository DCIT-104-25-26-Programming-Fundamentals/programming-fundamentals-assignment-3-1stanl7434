// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 3
// =============================================================================
//
// TASK: Array Statistics Calculator
//
// Write a JavaScript program that reads a collection of numbers from the user
// and computes key statistical values using separate functions.
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// This uses only Node's built-in "readline" module — nothing to install.
//
//     node assignment_03_array_statistics.js
//
// -----------------------------------------------------------------------------
// EXPECTED INPUT / OUTPUT EXAMPLE
// -----------------------------------------------------------------------------
//
//   How many numbers? 5
//   Enter number 1: 4
//   Enter number 2: 7
//   Enter number 3: 2
//   Enter number 4: 9
//   Enter number 5: 1
//
//   Results:
//   Sum:     23
//   Average: 4.6
//   Maximum: 9
//   Minimum: 1
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - You MUST implement each calculation in its own function (see scaffold).
// - You may NOT use JavaScript's built-in array methods like reduce(),
//   Math.max(), or Math.min(). Implement the logic yourself using loops.
// - N must be a positive integer. If the user enters 0 or a negative number,
//   print an error message and stop.
//
// =============================================================================

const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

/**
 * Calculates the sum of all numbers in the array using a loop.
 * @param {number[]} numbers
 * @returns {number} the sum
 */
function calculateSum(numbers) {
    let sum = 0;
    for (let i = 0; i < numbers.length; i++) {
        sum += numbers[i];
    }
    return sum;
}

/**
 * Calculates the average of all numbers in the array.
 * @param {number[]} numbers
 * @returns {number} the average
 */
function calculateAverage(numbers) {
    const sum = calculateSum(numbers);
    return sum / numbers.length;
}

/**
 * Finds the maximum value in the array using a loop.
 * @param {number[]} numbers
 * @returns {number} the maximum value
 */
function findMax(numbers) {
    let max = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
        if (numbers[i] > max) {
            max = numbers[i];
        }
    }
    return max;
}

/**
 * Finds the minimum value in the array using a loop.
 * @param {number[]} numbers
 * @returns {number} the minimum value
 */
function findMin(numbers) {
    let min = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
        if (numbers[i] < min) {
            min = numbers[i];
        }
    }
    return min;
}

/**
 * Prints the Sum, Average, Maximum, and Minimum for the given numbers.
 * @param {number[]} numbers
 */
function printResults(numbers) {
    console.log("\nResults:");
    console.log(`Sum:     ${calculateSum(numbers)}`);
    console.log(`Average: ${calculateAverage(numbers)}`);
    console.log(`Maximum: ${findMax(numbers)}`);
    console.log(`Minimum: ${findMin(numbers)}`);
}

/**
 * Recursively prompts the user for each of the N numbers, one at a time,
 * then calls printResults() once all numbers have been collected.
 *
 * @param {number} n - total count of numbers to collect
 * @param {number} index - current number being requested (1-based)
 * @param {number[]} numbers - accumulator array of numbers entered so far
 */
function collectNumbers(n, index, numbers) {
    if (index > n) {
        printResults(numbers);
        rl.close();
        return;
    }

    rl.question(`Enter number ${index}: `, (answer) => {
        numbers.push(parseFloat(answer));
        collectNumbers(n, index + 1, numbers);
    });
}

/**
 * Main program entry point.
 * Asks how many numbers will be entered, validates it, then collects
 * each number and prints the statistics.
 */
function main() {
    rl.question("How many numbers? ", (answer) => {
        const n = parseInt(answer, 10);

        if (n <= 0) {
            console.log("Error: N must be a positive integer.");
            rl.close();
            return;
        }

        collectNumbers(n, 1, []);
    });
}

main();
