INSERT INTO departments (dep_name) 
VALUES ('production'),
('sales'),
('marketing'),
('Finance'),
('Legal');

INSERT INTO roles (dep_id,title, salary)
VALUES (1,'engineer', 44000.00 ),
       (4,'hr', 64000.00),
       (3, 'Marketing Manager', 115000.00),
       (5,'lawyer', 123000.00),
       (1,'software engineer',200000.00);


INSERT INTO employees (first_name, last_name,role_id) 
VALUES 
('coelho', 'cenoura',1 ),
('Angelina','Jolie',2),
('Kim','Kardashian',3); 
