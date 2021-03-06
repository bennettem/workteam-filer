const { listenerCount } = require("../db/connection");

const actionQuestion = [
  {
    type: "list",
    name: "action",
    message: "What would you like to do?",
    choices: [
      "View all departments",
      "View all roles",
      "View all employees",
      "Add a department",
      "Add a role",
      "Add an employee",
      "Make updates to an employee",
      "Exit",
    ],
  },
];

const addDepartmentData = [
  {
    type: "input",
    name: "departmentName",
    message: "What department would you like to add?",
  },
];

const addRoleData = [
  {
    type: "input",
    name: "roleName",
    message: "What role would you like to add?",
  },
  {
    type: "number",
    name: "salary",
    message: "What is the salary for this role?",
  },
  {
    type: "number",
    name: "departmentId",
    message: "What is the department id number the role belongs to?",
  },
];

const addEmployeeData = [
  {
    type: "input",
    name: "firstName",
    message: "What is their first name?",
  },
  {
    type: "input",
    name: "lastName",
    message: "What is their last name?",
  },
  {
    type: "number",
    name: "employeeId",
    message: "What is the id number of the role?",
  },
  {
    type: "number",
    name: "manager",
    message: "What is the id of the manager for the new employee?",
  },
];

module.exports = {
  actionQuestion,
  addDepartmentData,
  addRoleData,
  addEmployeeData,
};
