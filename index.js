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
    const params = [answer.deparmentName];
    db.query(sql, params, (err, res) => {
      if (err) throw err;
      console.log(`The ${answers.deparmentName} department as been added.`);
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
  const employeeChoices = [];
  const roleChoices = [];
  const employeeSql = `SELECT CONCAT (employee.first_name, " ", employee.last_name)`;
  const roleSql = `SELECT title FROM role`;
  db.query(employeeSql, (err, res) => {
    if (err) throw err;
    for (let i = 0; i < res.length; i++) {
      employeeChoices.push(res[i].employee);
    }
    db.query(roleSql, (err, res) => {
      if (err) throw err;
      for (let i = 0; i < res.length; i++) {
        roleChoices.push(res[i].title);
      }
      inquirer
        .prompt([
          {
            type: "list",
            name: "employeeData",
            message: "Which employee would you like to update?",
            choices: employeeChoices,
          },
          {
            type: "list",
            name: "roleData",
            message: "What is the new role?",
            choices: roleChoices,
          },
        ])
        .then((answers) => {
          let employeeRole;
          let employeeName = answers.employeeData.split(" ");
          const idRole = `SELECT id FROM role WHERE title = "${answers.roleData}"`;
          db.query(idRole, (err, res) => {
            if (err) throw err;
            employeeRole = res[0].id;
            const updateSql = `UPDATE employee SET role_id = ${employeeRole} WHERE first_name = "${employeeName[0]}" AND last_name = "${employeeName[1]}"`;
            db.query(updateSql, (err, res) => {
              if (err) throw err;
              console.log(
                `${employeeName[0]} ${employeeName[1]}'s role has been updated`
              );
              actionPrompt();
            });
          });
        });
    });
  });
};
