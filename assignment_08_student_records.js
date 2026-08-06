// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 8
// =============================================================================
//
// TASK: Student Record Management System
//
// Build a console-based program that stores and manages student information.
// Each student is represented as a JavaScript object containing:
//
//   - name   : the student's full name  (string)
//   - id     : a unique student ID number (number, e.g. 20240001)
//   - scores : an array of scores from multiple assessments (e.g. [75, 88, 90])
//
// Example object:
//   { name: "Alice Mensah", id: 20240001, scores: [78, 85, 90] }
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// This uses only Node's built-in "fs" module for input — nothing to install.
// Works whether you type answers interactively or redirect them from a file:
//
//     node assignment_08_student_records.js
//     node assignment_08_student_records.js < input.txt
//
// -----------------------------------------------------------------------------
// FEATURES YOUR PROGRAM MUST SUPPORT
// -----------------------------------------------------------------------------
//
//   1. Add a Student
//      - Ask the user to enter the student's name and ID.
//      - Ask how many scores to enter, then collect each score one by one.
//      - Save the student object and confirm it was added.
//
//   2. Display All Students
//      - Print a formatted table showing every student's:
//          Name, ID, individual scores, and their average score.
//      - If no students have been added yet, print a message saying so.
//
//   3. Calculate Average Score for a Specific Student
//      - Ask the user to enter a student ID.
//      - Find the student and print their average score.
//      - If the ID is not found, print an error message.
//
//   4. Quit
//
// -----------------------------------------------------------------------------
// HOW THE MENU SHOULD LOOK
// -----------------------------------------------------------------------------
//
//   ================================
//      STUDENT RECORD SYSTEM MENU
//   ================================
//   1. Add student
//   2. Display all students
//   3. Calculate average score
//   4. Quit
//   Enter your choice (1-4):
//
// -----------------------------------------------------------------------------
// EXPECTED INTERACTION EXAMPLE
// -----------------------------------------------------------------------------
//
//   Enter your choice (1-4): 1
//   Student name: Alice Mensah
//   Student ID: 20240001
//   How many scores? 3
//   Enter score 1: 78
//   Enter score 2: 85
//   Enter score 3: 90
//   Student "Alice Mensah" added successfully.
//
//   Enter your choice (1-4): 3
//   Enter student ID: 20240001
//   Alice Mensah's average score: 84.33
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Store all student records in an array of objects.
// - Average scores must be displayed to 2 decimal places (use .toFixed(2)).
// - Each feature MUST be in its own function (see scaffold below).
// - Handle invalid menu choices and missing student IDs gracefully.
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

// All student records, shared by all the functions below.
// Each entry looks like: { name: "Alice Mensah", id: 20240001, scores: [78, 85, 90] }
let students = [];

/**
 * Prints the menu header and options.
 */
function printMenu() {
    console.log("================================");
    console.log("   STUDENT RECORD SYSTEM MENU");
    console.log("================================");
    console.log("1. Add student");
    console.log("2. Display all students");
    console.log("3. Calculate average score");
    console.log("4. Quit");
}

/**
 * Calculates the average of an array of scores using a loop.
 * @param {number[]} scores
 * @returns {number} the average (0 if the array is empty)
 */
function calculateAverage(scores) {
    if (scores.length === 0) {
        return 0;
    }

    let sum = 0;
    for (let i = 0; i < scores.length; i++) {
        sum += scores[i];
    }

    return sum / scores.length;
}

/**
 * FEATURE 1: Prompts for a student's name, ID, and scores, then saves
 * the new student record.
 */
function addStudent() {
    const name = ask("Student name: ");
    const id = parseInt(ask("Student ID: "), 10);

    const scoreCount = parseInt(ask("How many scores? "), 10);
    if (!Number.isInteger(scoreCount) || scoreCount <= 0) {
        console.log("Error: number of scores must be a positive integer.");
        return;
    }

    const scores = [];
    for (let i = 0; i < scoreCount; i++) {
        const score = parseFloat(ask(`Enter score ${i + 1}: `));
        scores.push(score);
    }

    students.push({ name: name, id: id, scores: scores });
    console.log(`Student "${name}" added successfully.`);
}

/**
 * FEATURE 2: Prints a formatted table of every student's name, ID,
 * individual scores, and average. Prints a message instead if there
 * are no students yet.
 */
function displayAllStudents() {
    if (students.length === 0) {
        console.log("No students have been added yet.");
        return;
    }

    console.log("");
    for (let i = 0; i < students.length; i++) {
        const student = students[i];
        const average = calculateAverage(student.scores);

        console.log(`Name:    ${student.name}`);
        console.log(`ID:      ${student.id}`);
        console.log(`Scores:  ${student.scores.join(", ")}`);
        console.log(`Average: ${average.toFixed(2)}`);

        if (i < students.length - 1) {
            console.log("--------------------------------");
        }
    }
}

/**
 * FEATURE 3: Looks up a student by ID and prints their average score.
 * Prints an error message if no student with that ID exists.
 */
function calculateAverageForStudent() {
    const id = parseInt(ask("Enter student ID: "), 10);

    let found = null;
    for (let i = 0; i < students.length; i++) {
        if (students[i].id === id) {
            found = students[i];
            break;
        }
    }

    if (found === null) {
        console.log(`Error: no student found with ID ${id}.`);
        return;
    }

    const average = calculateAverage(found.scores);
    console.log(`${found.name}'s average score: ${average.toFixed(2)}`);
}

/**
 * Main program entry point. Displays the menu in a loop, handling one
 * choice at a time, until the user chooses to quit.
 */
function main() {
    while (true) {
        printMenu();
        const choice = ask("Enter your choice (1-4): ");

        if (choice === "1") {
            addStudent();
        } else if (choice === "2") {
            displayAllStudents();
        } else if (choice === "3") {
            calculateAverageForStudent();
        } else if (choice === "4") {
            console.log("Goodbye!");
            break;
        } else {
            console.log("Error: please enter a number from 1 to 4.");
        }

        console.log(""); // blank line for readability between menu cycles
    }
}

main();
