SELECT role_id as id,
first_name,last_name,salary
FROM employees JOIN roles ON employees.role_id = roles.id;

