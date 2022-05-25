const db = require("./db/connection");
const inquirer = require("inquirer");
const cTable = require("console.table");

const {
  actionQuestion,
  addDepartmentData,
  addRoleData,
  addEmployeeData,
} = require("./lib/prompts");

db.connect((err) => {
  if (err) throw err;
  console.log("Database connected");
  actionPrompt();
});

const actionPrompt = () => {
  inquirer.prompt(actionQuestion).then((answers) => {
    switch (answers.action) {
      case "View all departments":
        viewDepartments();
        break;
      case "View all roles":
        viewRoles();
        break;
      case "View all employees":
        viewEmployees();
        break;
      case "Add a department":
        addDepartment();
        break;
      case "Add a role":
        addRole();
        break;
      case "Add an employee":
        addEmployee();
        break;
      case "Make updates to an employee":
        updateEmployee();
        break;
      case "Exit":
        db.end();
        break;
    }
  });
};

const viewDepartments = () => {
  const sql = "SELECT * FROM department";
  db.query(sql, (err, res) => {
    if (err) throw err;
    console.table(res);
    actionPrompt();
  });
};

const viewRoles = () => {
  const sql = "SELECT * FROM role";
  db.query(sql, (err, res) => {
    if (err) throw err;
    console.table(res);
    actionPrompt();
  });
};

const viewEmployees = () => {
  const sql = "SELECT * FROM employee";
  db.query(sql, (err, res) => {
    if (err) throw err;
    console.table(res);
    actionPrompt();
  });
};

const addDepartment = () => {
  inquirer.prompt(addDepartmentData).then((answers) => {
    const sql = "INSERT INTO department (name) VALUES (?)";
    const params = [answers.departmentName];
    db.query(sql, params, (err, res) => {
      if (err) throw err;
      console.log(`The ${answers.departmentName} department as been added.`);
      actionPrompt();
    });
  });
};

const addRole = () => {
  inquirer.prompt(addRoleData).then((answers) => {
    const sql =
      "INSERT INTO role (title, salary, department_id) VALUES (?,?,?)";
    const params = [answers.roleName, answers.salary, answers.departmentId];
    db.query(sql, params, (err, res) => {
      if (err) throw err;
      console.log(`The ${answers.roleName} has been added`);
      actionPrompt();
    });
  });
};

const addEmployee = () => {
  inquirer.prompt(addEmployeeData).then((answers) => {
    const sql =
      "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)";
    const params = [
      answers.firstName,
      answers.lastName,
      answers.id,
      answers.manager,
    ];
    db.query(sql, params, (err, res) => {
      if (err) throw err;
      console.log(`${answers.firstName} ${answers.lastName} has been added`);
      actionPrompt();
    });
  });
};

const updateEmployee = () => {
  db.query("SELECT * From role", (err, res) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          type: "input",
          name: "firstName",
          message: "What is the employee's first name?",
          answer: res.map((employee) => employee.first_name),
        },
        {
          type: "list",
          name: "role_id",
          message: "What is the employee's new role?",
          choices: res.map((role) => role.title),
        },
      ])
      .then(function (answer) {
        const roleId = res.find((role) => role.title === answer.role_id).id;
        db.query(
          "UPDATE employees SET ? WHERE ?",
          [
            {
              role_id: roleId,
            },
            {
              first_name: answer.firstName,
            },
          ],
          function (err) {
            if (err) throw err;
            console.log("Role updated!");
            actionPrompt();
          }
        );
      });
  });
};
