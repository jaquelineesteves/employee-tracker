
    SELECT
    d.dep_name AS department,
    e.first_name,
    e.last_name,
    r.title AS role,
    r.salary
FROM
    employees e
JOIN
    roles r ON e.role_id = r.id
JOIN
    departments d ON r.dep_id = d.id
WHERE
    d.id = <your_department_id>
