import chalk from "chalk";
import inquirer from "inquirer";
const log = console.log;
log(chalk.bold.green("Hi User!") +
    "\n" +
    chalk.bold.bgBlueBright("Love to see you!"));
const isNumber = (n) => {
    return !isNaN(parseFloat(n)) && !isNaN(n - 0);
};
const runOperation = (fd, sd, opt, defaulfAnswer = 0) => {
    fd = Number(fd);
    sd = Number(sd);
    let answer = defaulfAnswer;
    switch (opt) {
        case "+":
            answer = (fd || answer) + sd;
            break;
        case "-":
            answer = (fd || answer) - sd;
            break;
        case "*":
            answer = (fd || answer) * sd;
            break;
        case "/":
            answer = (fd || answer) / sd;
            break;
        case "%":
            answer = (fd || answer) % sd;
            break;
        default:
            break;
    }
    return answer;
};
const getInput = async (haveFD) => {
    return await inquirer.prompt([
        {
            type: "input",
            message: "Please Enter the first number =",
            default: 5,
            name: "fd",
            when: () => {
                return !haveFD;
            },
            validate: (input) => {
                if (isNaN(input)) {
                    return "Please enter a valid number";
                }
                else {
                    return true;
                }
            },
        },
        {
            type: "rawlist",
            message: "Please select the operator",
            default: "+",
            name: "opt",
            choices: ["+", "-", "*", "/", "%", "="],
        },
        {
            type: "input",
            message: "Please Enter the Second number =",
            default: 5,
            name: "sd",
            when: (answers) => {
                return answers.opt !== "=";
            },
            validate: (input) => {
                if (isNaN(input)) {
                    return "Please enter a valid number";
                }
                else {
                    return true;
                }
            },
        },
    ]);
};
const calculate = async () => {
    let operator = null;
    let history = [];
    let answer;
    do {
        const answers = await getInput(isNumber(answer));
        operator = answers?.opt;
        if (operator === "=") {
            break;
        }
        else {
            history.push(`${answers.fd || answer} ${answers.opt} ${answers.sd} = ${runOperation(answers?.fd, answers?.sd, answers?.opt, answer)}`);
        }
        answer = runOperation(answers?.fd, answers?.sd, answers?.opt, answer);
        log(chalk.bgGreen("Your answer is", answer));
    } while (!operator || operator !== "=");
    log(chalk.bgRed("History"));
    history.forEach((record) => {
        log(chalk.bgRedBright(record));
    });
    log(chalk.bgBlue("Your final answer is", answer));
};
calculate();
