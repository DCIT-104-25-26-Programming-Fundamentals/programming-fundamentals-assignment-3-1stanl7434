// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 1
// =============================================================================
//
// TASK: Prime Number Checker
//
// Write a JavaScript program that checks whether a given number is prime.
//
// A prime number is a whole number greater than 1 that has no divisors
// other than 1 and itself (e.g., 2, 3, 5, 7, 11, 13 ...).
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// This version uses ONLY Node's built-in "readline" module, so there is
// nothing to install. Just run:
//
//     node assignment_01_prime_checker.js
//
// -----------------------------------------------------------------------------
// EXPECTED INPUT / OUTPUT EXAMPLES
// -----------------------------------------------------------------------------
//
//   Enter a number: 7
//   7 is a prime number.
//
//   Enter a number: 10
//   10 is NOT a prime number.
//
//   Enter a number: 1
//   1 is NOT a prime number.
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - You MUST implement the logic inside a function (see scaffold below).
// - Numbers less than 2 are NOT prime — handle this inside the function.
// - The main() function must call isPrime() and print the result.
//
// =============================================================================

const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

/**
 * Checks whether a given whole number is prime.
 *
 * A prime number is a whole number greater than 1 that has no divisors
 * other than 1 and itself.
 *
 * @param {number} num - The number to test.
 * @returns {boolean} true if num is prime, false otherwise.
 */
function isPrime(num) {
    // Numbers less than 2 are never prime (this covers 0, 1, and negatives).
    if (num < 2) {
        return false;
    }

    // 2 is the only even prime number.
    if (num === 2) {
        return true;
    }

    // Eliminate other even numbers quickly.
    if (num % 2 === 0) {
        return false;
    }

    // Only need to check odd divisors up to the square root of num.
    // If num has a factor larger than its square root, it must also
    // have a corresponding factor smaller than the square root.
    const limit = Math.sqrt(num);
    for (let divisor = 3; divisor <= limit; divisor += 2) {
        if (num % divisor === 0) {
            return false; // Found a divisor -> not prime.
        }
    }

    return true; // No divisors found -> prime.
}

/**
 * Main program entry point.
 * Prompts the user for a number, checks primality, and prints the result.
 */
function main() {
    rl.question("Enter a number: ", (answer) => {
        const number = parseInt(answer, 10);

        if (isPrime(number)) {
            console.log(`${number} is a prime number.`);
        } else {
            console.log(`${number} is NOT a prime number.`);
        }

        rl.close();
    });
}

main();
