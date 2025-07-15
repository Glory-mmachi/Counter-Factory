/**
 * This application uses the command line interface to perform some arithimetic operations
 * It uses readline to interact with the command line
 */

const readline = require("node:readline");

const { stdin: input, stdout: output } = require("node:process");

const functionMap = { "+": add, "-": subtract, "*": multiply, "/": divide };
const operation = {
  1: "+",
  2: "-",
  3: "*",
  4: "/",
  5: "exit",
};

/**Logs a welcome message immediately the application starts */
function welcome() {
  console.log(`👋 Welcome to Node.js Calculator!`);
}

/**
 * Logs the availabe operations eg: add,subtact,multiply,divide and exit */
function showAvailableOperations() {
  console.log(`  Select operation:`);
  console.log(`  1. Add`);
  console.log(`  2. Subtract`);
  console.log(`  3. Multiply`);
  console.log(`  4. Divide`);
  console.log(`  5. Exit`);
  console.log(`  Enter choice (1-5):\n`);
}

const rl = readline.createInterface({ input, output });
welcome();
showAvailableOperations();
execute();
/**
 * Main execution function that:
 * - Prompts the user to select an arithmetic operation
 * - Handles invalid or empty selections with retry
 * - Exits gracefully if the user selects "exit"
 * - Prompts the user for two numbers to perform the selected operation
 * - Catches and handles any unexpected or input-related errors
 */

function execute() {
  rl.question("What operation do you want to perform: ", (answer) => {
    try {
      if (answer.trim().length === 0 || !operation[answer]) {
        console.error(`❌ invalid number, please choose from 1-5\n`);
        return execute();
      }

      if (operation[answer].toLowerCase() === "exit") {
        console.log(`👋👋 EXiting Application...`);
        return rl.close();
      }

      rl.question("ℹ️ℹ Please input in this format:5+2 or 3-8 \n ", (input) => {
        try {
          validateInput(input, answer);
          askToContinue();
        } catch (error) {
          console.error(`❌ Error processing input: ${error.message}`);
          execute();
        }
      });
    } catch (error) {
      console.error(`💣 Unexpected error: ${error.message}`);
      rl.close();
    }
  });
}
/**
 * Validates and processes the user's arithmetic input.
 *
 * - Trims input and checks for empty string
 * - Detects the delimiter (e.g., comma) separating the numbers
 * - Splits input into two values and checks if both are valid numbers
 * - Maps the selected operation to the corresponding function and executes it
 *
 * @param {string} input - The user's input string containing two numbers (e.g. "5,2" or "3.4:7.1")
 * @param {string} answer - The numeric choice made by the user (e.g. 1 for "add")
 *
 * @throws Will throw an error if:
 *  - The input is empty
 *  - The input format is incorrect
 *  - The values are not valid numbers
 *  - The operation is unknown
 *
 
 */
function validateInput(input, answer) {
  const trimmed = input.trim();
  if (trimmed.length === 0) throw new Error(`❗Input cannot be empty!`);

  const delimiter = trimmed.match(/[+\-*/]/)?.[0];

  if (!delimiter) {
    throw new Error("❗Invalid format. Use something like 5+2 or 3.4-5.1");
  }

  const main = trimmed.split(delimiter);

  if (isNaN(main[0]) || isNaN(main[1]))
    throw new Error(`❗Please input a valid number eg: 9*7`);

  let num = parseInt(answer);

  let op = operation[num];
  let fn = functionMap[op.toLowerCase()];
  if (!fn) throw new Error(`❗Unknown operation!`);

  console.log(fn(...main));
}
/**
 * Prompts the user to confirm if they want to perform another operation.
 * - If the user responds with "yes", the calculator restarts.
 * - If the user responds with "no", the program exits.
 * - If the input is invalid, the prompt repeats.
 *
 */
function askToContinue() {
  try {
    rl.question(
      "Do you want to perform another operation? YES/NO ",
      (answer) => {
        if (answer.trim().toLowerCase() === "no") {
          rl.close();
        } else if (answer.trim().toLowerCase() === "yes") {
          showAvailableOperations();
          execute();
        } else {
          console.error(`❓ Please type YES or NO.\n`);
          return askToContinue();
        }
      }
    );
  } catch (error) {
    console.error(`❌ Unknown operation: ${error.message}`);
  }
}

/**
 *Receives two parameters as a string and returns the sum as a string

 * @param {string}  a -First parameter as string (e.g: "5")
 * @param {string}  b -Second parameter as string (e.g:"2.3")
 *
 * @returns {string}  the sum of "a" and "b" which is formatted into a nice string (e.g: "Ans: 7.3")
 *
 * NOTE: "parseFloat" converts a and b to a number that can have decimal in it
 */
function add(a, b) {
  // Implementation

  const newA = parseFloat(a);
  const newB = parseFloat(b);
  return ` Ans: ${newA + newB}`;
}
/**
 * Receives two parameters as a string and returns the difference as a string
 *
 * @param {string}  a -First parameter as string (e.g: "5")
 * @param {string}  b -Second parameter as string (e.g:"2.3")
 *
 * @returns {string} the difference between "a" and "b" which is formatted into a nice string (e.g: "Ans: 3.3")
 */
function subtract(a, b) {
  // Implementation
  return ` Ans: ${a - b}`;
}

/**
 * Receives two parameters as a string and returns the multiplication as a string
 *
 * @param {string}  a -First parameter as string (e.g: "5")
 * @param {string} b -Second parameter as string (e.g:"2.3")
 *
 * @returns {string} the multiplication between "a" and "b" which is formatted into a nice string (e.g: "Ans: 11.5")
 */
function multiply(a, b) {
  // Implementation
  return ` Ans: ${a * b}`;
}

/**
 * Divides two values and returns the result as a formatted string.
 *
 * @param {string} a - The numerator as a string (e.g. "10")
 * @param {string} b - The denominator as a string (e.g. "2.5")
 * @returns {string} The result of a divided by b, formatted as "Ans: result"
 *
 * Note: If b is 0, the function returns "Ans: 1" to avoid division by zero.
 *       The denominator is converted to a float to support decimal values.
 */
function divide(a, b) {
  // Implementation
  const newB = parseFloat(b);
  return newB === 0 ? ` Ans: ${1}` : ` Ans: ${a / newB}`;
}
