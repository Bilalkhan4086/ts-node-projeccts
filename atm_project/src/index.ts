import inquirer from "inquirer";
const { prompt } = inquirer;

type DataBaseType = {
  userName: string;
  password: string;
  currentAccountBalance: number;
  savingAccountBalance: number;
  otherAccountBalance: number;
};

const getLoginDetails = () => {
  prompt([
    {
      name: "password",
      message: "Please Enter you secret number",
      type: "password",
    },
  ]);
};
const getQuestionsAfterLogin = (
  db: DataBaseType[],
  loggedUserIndex: number
) => {
  prompt([
    {
      name: "accountType",
      message: "Please select you account type",
      type: "list",
      choices: ["Current", "Saving", "Other"],
    },
  ]).then((answer) => {
    if (answer.accounType === "Current") {
    } else if (answer.accounType === "Current") {
      prompt([
        {
          name: "actionType",
          message: "Please select transaction you want to make.",
          type: "list",
          choices: ["Withdrawal", "Transfer"],
        },
      ]).then((answer) => {
        if (answer?.actionType === "Withdrawal") {
          prompt([
            {
              name: "moneyWithdrawal",
              message:
                "Please select the ammount you want to withdrawal. Should multiple of 500 Rupee",
              type: "number",
              default: 0,
              validate(answers) {
                if (answers % 500 !== 0) {
                  return "Please Enter a valid number";
                }
                return true;
              },
            },
          ]).then((answer) => {
            db[loggedUserIndex].currentAccountBalance =
              db[loggedUserIndex].currentAccountBalance -
              answer.moneyWithdrawal;
          });
        } else {
          prompt([
            {
              name: "moneyTransfer",
              message:
                "Please select the ammount you want to transfer. Should multiple of 500 Rupee",
              type: "number",
              default: 0,
              validate(answers) {
                if (answers % 500 !== 0) {
                  return "Please Enter a valid number";
                }
                return true;
              },
            },
          ]).then((answer) => {
            db[loggedUserIndex].currentAccountBalance =
              db[loggedUserIndex].currentAccountBalance -
              answer.moneyWithdrawal;
          });
        }
      });
    } else {
    }
  });
};
const DataBase: DataBaseType[] = [
  {
    userName: "Abc",
    password: "1234",
    currentAccountBalance: 1000,
    savingAccountBalance: 1000,
    otherAccountBalance: 1000,
  },
  {
    userName: "Xyz",
    password: "7890",
    currentAccountBalance: 1000,
    savingAccountBalance: 1000,
    otherAccountBalance: 1000,
  },
];
let loggedUserIndex = 0;
console.log("Thanks for inserting the card");
console.log("Your transaction is processing");
getLoginDetails();
console.log("Please Wait!. Your transaction is processing");
getQuestionsAfterLogin(DataBase, loggedUserIndex);
