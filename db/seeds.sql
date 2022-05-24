USE employee_file;

INSERT INTO department (name)
VALUES 
("Engineering"),
("Legal"),
("Finance"),
("Sales");

INSERT INTO role (title, salary, department_id)
VALUES 
("Salesperson", 80000, 4),
("Lead Engineer", 150000, 1),
("Software Engineer", 120000, 1),
("Account Manager", 160000, 3),
("Accountant", 125000, 3),
("Legal Team Lead", 250000, 2),
("Lawyer", 190000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
("Dill", "Pickles", 1, 2),
("Johnny", "Bravo", 2, 4),
("Sammy", "Witchel", 3, 3),
("Jeremy", "Vaxel", 4, 1),
("John", "Doe", 5, 1),
("Jane", "Doe", 6, 3),
("Louie", "Douglas", 7, 2);

