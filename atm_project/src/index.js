import inquirer from "inquirer";
const { prompt } = inquirer;
const getLoginDetails = () => {
    prompt([
        {
            name: "password",
            message: "Please Enter you secret number",
            type: "password",
        },
    ]);
};
getLoginDetails();
