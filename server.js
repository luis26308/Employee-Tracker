const mysql = require("mysql");
const inquirer = require("inquirer");
const { endianness } = require("os");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "employeeTracker_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    start();
});

function start() {
    inquirer.prompt({
        type: "list",
        message: "What would you like to do?",
        name: "action",
        choices: [
            "view all employees",
            "view all employees by department",
            "view all employees by manager",
            "add employee",
            "remove employee",
            "update employee",
            "update manager",
            "Done"
        ]
    })
        .then(function (answer) {
            switch (answer.action) {
                case "view all employees": allEmployees();
                    break;

                case "view all employees by department": deptEmployees();
                    break;

                case "view all employees by manager": mgrEmployees();
                    break;

                case "add employee": addEmployee();
                    break;

                case "remove employee": removeEmployee();
                    break;

                case "update employee": updateEmployee();
                    break;

                case "update manager": updateManager();
                    break;

                case "Done": connection.end();
                    break;
            }
        });
}

function allEmployees() {

}

function deptEmployees() {

}

function mgrEmployees() {

}

function addEmployee() {

}

function removeEmployee() {

}

function updateEmployee() {
    // this function will update title, role, salary, and manager for the selected employee
}

function updateManager() {
    //  this function will update title, role, salary, and employees for the selected manager
}