SELECT departments.dep_name, roles.title, roles.salary 
FROM departments
JOIN employees ON role_id = employees.role_id
JOIN roles ON employees.role_id = roles.id;