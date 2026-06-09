DROP DATABASE IF EXISTS nl_to_sql_project;
CREATE DATABASE nl_to_sql_project;
USE nl_to_sql_project;

CREATE TABLE departments (
    department_id INT AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE employees (
    employee_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    department_id INT NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (department_id) REFERENCES departments(department_id)
);

CREATE TABLE projects (
    project_id INT AUTO_INCREMENT PRIMARY KEY,
    project_name VARCHAR(150) NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES departments(department_id)
);

CREATE TABLE attendance (
    attendance_id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,
    attendance_date DATE NOT NULL,
    status ENUM('Present', 'Absent', 'Leave') NOT NULL,
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
);

CREATE TABLE employee_projects (
    employee_id INT NOT NULL,
    project_id INT NOT NULL,
    PRIMARY KEY (employee_id, project_id),
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id),
    FOREIGN KEY (project_id) REFERENCES projects(project_id)
);

INSERT INTO departments (department_name) VALUES
('Engineering'),
('Human Resources'),
('Finance'),
('Marketing'),
('Sales');

INSERT INTO employees (name, email, department_id, salary) VALUES
('Aarav Sharma', 'aarav.sharma@example.com', 1, 75000.00),
('Priya Mehta', 'priya.mehta@example.com', 1, 68000.00),
('Rohan Verma', 'rohan.verma@example.com', 2, 52000.00),
('Sneha Iyer', 'sneha.iyer@example.com', 3, 61000.00),
('Karan Malhotra', 'karan.malhotra@example.com', 4, 48000.00),
('Neha Kapoor', 'neha.kapoor@example.com', 5, 55000.00),
('Vikram Singh', 'vikram.singh@example.com', 1, 82000.00),
('Ananya Rao', 'ananya.rao@example.com', 3, 70000.00),
('Rahul Nair', 'rahul.nair@example.com', 5, 45000.00),
('Meera Joshi', 'meera.joshi@example.com', 4, 59000.00);

INSERT INTO projects (project_name, department_id) VALUES
('AI Chatbot System', 1),
('Employee Onboarding Portal', 2),
('Budget Analysis Dashboard', 3),
('Social Media Campaign', 4),
('Sales CRM System', 5),
('Database Automation Tool', 1);

INSERT INTO employee_projects (employee_id, project_id) VALUES
(1, 1),
(1, 6),
(2, 1),
(3, 2),
(4, 3),
(5, 4),
(6, 5),
(7, 1),
(7, 6),
(8, 3),
(9, 5),
(10, 4);

INSERT INTO attendance (employee_id, attendance_date, status) VALUES
(1, '2026-06-01', 'Present'),
(2, '2026-06-01', 'Present'),
(3, '2026-06-01', 'Absent'),
(4, '2026-06-01', 'Present'),
(5, '2026-06-01', 'Leave'),
(6, '2026-06-01', 'Present'),
(7, '2026-06-01', 'Present'),
(8, '2026-06-01', 'Absent'),
(9, '2026-06-01', 'Present'),
(10, '2026-06-01', 'Present'),
(1, '2026-06-02', 'Present'),
(2, '2026-06-02', 'Leave'),
(3, '2026-06-02', 'Present'),
(4, '2026-06-02', 'Present'),
(5, '2026-06-02', 'Present'),
(6, '2026-06-02', 'Absent'),
(7, '2026-06-02', 'Present'),
(8, '2026-06-02', 'Present'),
(9, '2026-06-02', 'Present'),
(10, '2026-06-02', 'Absent');
