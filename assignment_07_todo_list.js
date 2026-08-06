// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 7
// =============================================================================
//
// TASK: Console-Based To-Do List Application
//
// Build a simple to-do list program that runs entirely in the console and
// allows the user to manage their tasks interactively using a menu.
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// This uses only Node's built-in "fs" module for input — nothing to install.
// Works whether you type answers interactively or redirect them from a file:
//
//     node assignment_07_todo_list.js
//     node assignment_07_todo_list.js < input.txt
//
// -----------------------------------------------------------------------------
// FEATURES YOUR PROGRAM MUST SUPPORT
// -----------------------------------------------------------------------------
//
//   1. Add a Task
//      - Prompt the user to type a task description.
//      - Add it to the array and confirm it was added.
//
//   2. View All Tasks
//      - Display all tasks currently in the array, numbered from 1.
//      - If the array is empty, print a friendly message saying so.
//
//   3. Delete a Task
//      - Show the list of tasks with their numbers.
//      - Ask the user which task number they want to remove.
//      - Remove the task and confirm the deletion.
//      - If the task number is invalid, print an error message.
//
//   4. Quit
//      - End the program with a farewell message.
//
// -----------------------------------------------------------------------------
// HOW THE MENU SHOULD LOOK
// -----------------------------------------------------------------------------
//
//   ============================
//        TO-DO LIST MENU
//   ============================
//   1. Add task
//   2. View tasks
//   3. Delete task
//   4. Quit
//   Enter your choice (1-4):
//
// -----------------------------------------------------------------------------
// EXPECTED INTERACTION EXAMPLE
// -----------------------------------------------------------------------------
//
//   Enter your choice (1-4): 1
//   Enter task: Buy groceries
//   Task added: "Buy groceries"
//
//   Enter your choice (1-4): 2
//   Your Tasks:
//   1. Buy groceries
//   2. Study for exams
//
//   Enter your choice (1-4): 3
//   Enter task number to delete: 1
//   Task "Buy groceries" has been removed.
//
//   Enter your choice (1-4): 4
//   Goodbye!
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Store tasks in a JavaScript array (e.g. let tasks = []).
// - Use a loop to keep the menu running until the user chooses to quit.
// - Each feature MUST be implemented in its own function (see scaffold below).
// - Handle invalid menu choices gracefully (print an error, do not crash).
// - To remove an item from an array by index, use: tasks.splice(index, 1)
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

// The list of tasks, shared by all the functions below.
let tasks = [];

/**
 * Prints the menu header and options.
 */
function printMenu() {
    console.log("============================");
    console.log("     TO-DO LIST MENU");
    console.log("============================");
    console.log("1. Add task");
    console.log("2. View tasks");
    console.log("3. Delete task");
    console.log("4. Quit");
}

/**
 * FEATURE 1: Prompts for a task description and adds it to the tasks array.
 */
function addTask() {
    const description = ask("Enter task: ");
    tasks.push(description);
    console.log(`Task added: "${description}"`);
}

/**
 * FEATURE 2: Displays all tasks, numbered from 1. Prints a friendly
 * message instead if the list is empty.
 */
function viewTasks() {
    if (tasks.length === 0) {
        console.log("Your to-do list is empty. Add a task to get started!");
        return;
    }

    console.log("Your Tasks:");
    for (let i = 0; i < tasks.length; i++) {
        console.log(`${i + 1}. ${tasks[i]}`);
    }
}

/**
 * FEATURE 3: Shows the current tasks, asks which one to remove by number,
 * and deletes it. Prints an error if the number is invalid.
 */
function deleteTask() {
    if (tasks.length === 0) {
        console.log("There are no tasks to delete.");
        return;
    }

    viewTasks();
    const choice = parseInt(ask("Enter task number to delete: "), 10);
    const index = choice - 1; // convert 1-based display number to array index

    if (!Number.isInteger(choice) || index < 0 || index >= tasks.length) {
        console.log("Error: invalid task number.");
        return;
    }

    const removed = tasks[index];
    tasks.splice(index, 1);
    console.log(`Task "${removed}" has been removed.`);
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
            addTask();
        } else if (choice === "2") {
            viewTasks();
        } else if (choice === "3") {
            deleteTask();
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
