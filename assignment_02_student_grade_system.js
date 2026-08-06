// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 2
// =============================================================================
//
// TASK: Student Grade System
//
// Write a JavaScript program that reads a student's score and outputs the
// corresponding letter grade based on the scale below.
//
// Grading Scale:
//   Score 80 – 100  →  Grade A
//   Score 70 – 79   →  Grade B
//   Score 60 – 69   →  Grade C
//   Score 50 – 59   →  Grade D
//   Score below 50  →  Grade F
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// This uses only Node's built-in "readline" module — nothing to install.
//
//     node assignment_02_student_grade_system.js
//
// -----------------------------------------------------------------------------
// EXPECTED INPUT / OUTPUT EXAMPLES
// -----------------------------------------------------------------------------
//
//   Enter student score (0-100): 85
//   Grade: A
//
//   Enter student score (0-100): 73
//   Grade: B
//
//   Enter student score (0-100): 45
//   Grade: F
//
//   Enter student score (0-100): 110
//   Error: Score must be between 0 and 100.
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - You MUST use functions (see scaffold below).
// - Validate the score inside getGrade(). If it is out of range, return null
//   and let main() print the error message.
// - Use if / else if / else to determine the grade.
//
// =============================================================================

const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

/**
 * Determines the letter grade for a given numeric score.
 *
 * Grading Scale:
 *   80 - 100 -> A
 *   70 - 79  -> B
 *   60 - 69  -> C
 *   50 - 59  -> D
 *   below 50 -> F
 *
 * @param {number} score - The student's score (expected 0-100).
 * @returns {string|null} The letter grade, or null if score is out of range.
 */
function getGrade(score) {
    // Validate range first. Anything outside 0-100 is invalid input.
    if (score < 0 || score > 100) {
        return null;
    }

    if (score >= 80) {
        return "A";
    } else if (score >= 70) {
        return "B";
    } else if (score >= 60) {
        return "C";
    } else if (score >= 50) {
        return "D";
    } else {
        return "F";
    }
}

/**
 * Main program entry point.
 * Prompts the user for a score, gets the grade, and prints the result.
 */
function main() {
    rl.question("Enter student score (0-100): ", (answer) => {
        const score = parseInt(answer, 10);

        const grade = getGrade(score);

        if (grade === null) {
            console.log("Error: Score must be between 0 and 100.");
        } else {
            console.log(`Grade: ${grade}`);
        }

        rl.close();
    });
}

main();
