const mysql = require("mysql");
const inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "employeeTracker_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    start();
});

function start() {
    inquirer.prompt([
        {
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
        }
    ])
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

                default: connection.end();
            }
        });
}

function allEmployees() {
    connection.query("SELECT * FROM employee", function (err, data) {
        if (err) throw err;
        console.table(data);
        start();
    })
}

function deptEmployees() {

}

function mgrEmployees() {


}

function addEmployee() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the new employees first name?",
            name: "first_name"
        },

        {
            type: "input",
            message: "What is the new employees last name?",
            name: "last_name"
        },

        {
            type: "input",
            message: "What is the new employees role?",
            name: "role_id"
        },

        {
            type: "input",
            message: "Who is the new employees manager?",
            name: "manager_id"
        }
    ])

        .then(function (answer) {
            const queryString = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
            connection.query(queryString, [answer.first_name, answer.last_name, answer.role_id, answer.manager_id], function (err, res) {
                if (err) throw err;
                console.table(res);
                start();
            })
        })
}

function removeEmployee() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the employees first name?",
            name: "first_name"
        },

        {
            type: "input",
            message: "What is the employees last name",
            name: "last_name"
        }
    ])
        .then(function (answer) {
            const queryString = "DELETE FROM employee WHERE first_name = ? AND last_name = ?";
            connection.query(queryString, [answer.first_name, answer.last_name], function (err, res) {
                if (err) throw err;
                console.table(res);
                start();
            })
        })
}

function updateEmployee() {
    // this function will update title, role, salary, and manager for the selected employee


}

function updateManager() {
    //  this function will update title, role, salary, and employees for the selected manager


}