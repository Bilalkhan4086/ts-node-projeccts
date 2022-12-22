#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
const log = console.log;
const logsForLevel = (gameData, runFirstTime = true) => {
  if (runFirstTime) {
    log(chalk.bgGreenBright(`Level ${gameData.level}`));
    log(
      chalk.bgBlueBright(
        `Guess the number in between 0 and ${gameData.level - 1}9`
      )
    );
    log(
      chalk.bgYellowBright(chalk.red(`Enter number in minus to exit e.g(-1)`))
    );
  }
  log(chalk.bgYellowBright(chalk.red(`Remaining tries ${gameData.tries}`)));
};
const guessNow = async () => {
  const guessedNumber = await inquirer.prompt([
    {
      name: "guess",
      message: "Guess the number",
      default: 0,
      type: "input",
      validate: (input) => {
        return !isNaN(input);
      },
    },
  ]);
  return Number(guessedNumber.guess);
};
const main = async () => {
  let gameData = { level: 1, score: 0, tries: 3 };
  let userInput = -1;
  let runFirstTime = true;
  while (true) {
    logsForLevel(gameData, runFirstTime);
    let genNumber = Math.round(Math.random() * 10 * gameData.level);
    if (gameData.tries !== 0) {
      userInput = await guessNow();
      log(chalk.green(`Generate Number is`, genNumber));
    } else {
      log(chalk.bgRed(`Your tries ran out`));
      log(
        chalk.bgMagentaBright(
          `You passed ${gameData.level - 1} level(s) and you earned ${
            gameData.score >= 0 ? gameData.score : 0
          } score`
        )
      );
      break;
    }
    if (userInput === genNumber) {
      gameData = {
        ...gameData,
        score: gameData.score + 10,
        level: gameData.level + 1,
        tries: 3,
      };
      log(
        chalk.bgGreenBright(
          `Congratulations you have passed level ${
            gameData.level - 1
          } Now you proceed to level ${gameData.level}`
        )
      );
      runFirstTime = true;
    } else {
      if (userInput < 0) {
        log(
          chalk.bgMagentaBright(
            `You passed ${gameData.level - 1} and you earned ${
              gameData.score >= 0 ? gameData.score : 0
            }`
          )
        );
        break;
      } else {
        runFirstTime = false;
        gameData = {
          ...gameData,
          tries: gameData.tries - 1,
          score: gameData.score - 2,
        };
        log(chalk.bgMagentaBright("Hard Luck Better try next time"));
      }
    }
  }
};
main();
