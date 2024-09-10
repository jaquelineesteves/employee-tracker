DROP DATABASE IF EXISTS employeetracker_db;

CREATE DATABASE employeetracker_db;

\c employeetracker_db;

CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    dep_name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) UNIQUE NOT NULL,
    salary DECIMAL NOT NULL,
    dep_id INTEGER,
    FOREIGN KEY (dep_id) REFERENCES departments(id)
);

CREATE TABLE employees (
    employees_id SERIAL PRIMARY KEY NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL ,
    role_id INTEGER,
    manager_id INTEGER,
    FOREIGN KEY (role_id) REFERENCES roles(id)
    ON DELETE CASCADE

    
);