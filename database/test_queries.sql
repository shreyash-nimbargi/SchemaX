USE nl_to_sql_project;

-- Basic SELECT test
SELECT * FROM employees;

-- Basic WHERE test
SELECT name, salary
FROM employees
WHERE salary > 50000
ORDER BY salary DESC;

-- Complex join 1: employees with departments and projects
SELECT
    e.name,
    d.department_name,
    p.project_name
FROM employees e
JOIN departments d
ON e.department_id = d.department_id
JOIN employee_projects ep
ON e.employee_id = ep.employee_id
JOIN projects p
ON ep.project_id = p.project_id
ORDER BY e.name;

-- Complex join 2: attendance with employee and department
SELECT
    e.name,
    d.department_name,
    a.attendance_date,
    a.status
FROM attendance a
JOIN employees e
ON a.employee_id = e.employee_id
JOIN departments d
ON e.department_id = d.department_id
ORDER BY a.attendance_date, e.name;

-- Complex join 3: department-wise employee and project count
SELECT
    d.department_name,
    COUNT(DISTINCT e.employee_id) AS total_employees,
    COUNT(DISTINCT p.project_id) AS total_projects
FROM departments d
LEFT JOIN employees e
ON d.department_id = e.department_id
LEFT JOIN projects p
ON d.department_id = p.department_id
GROUP BY d.department_name
ORDER BY d.department_name;

-- Complex join 4: employee-wise project count
SELECT
    e.name,
    d.department_name,
    COUNT(p.project_id) AS total_projects
FROM employees e
JOIN departments d
ON e.department_id = d.department_id
LEFT JOIN employee_projects ep
ON e.employee_id = ep.employee_id
LEFT JOIN projects p
ON ep.project_id = p.project_id
GROUP BY e.employee_id, e.name, d.department_name
ORDER BY total_projects DESC;

-- Complex join 5: average, total, and count salary analysis by department
SELECT
    d.department_name,
    AVG(e.salary) AS average_salary,
    SUM(e.salary) AS total_salary,
    COUNT(e.employee_id) AS total_employees
FROM departments d
JOIN employees e
ON d.department_id = e.department_id
GROUP BY d.department_name
ORDER BY average_salary DESC;

-- Complex join 6: attendance summary by employee
SELECT
    e.name,
    d.department_name,
    COUNT(CASE WHEN a.status = 'Present' THEN 1 END) AS present_days,
    COUNT(CASE WHEN a.status = 'Absent' THEN 1 END) AS absent_days,
    COUNT(CASE WHEN a.status = 'Leave' THEN 1 END) AS leave_days
FROM employees e
JOIN departments d
ON e.department_id = d.department_id
LEFT JOIN attendance a
ON e.employee_id = a.employee_id
GROUP BY e.employee_id, e.name, d.department_name
ORDER BY e.name;
