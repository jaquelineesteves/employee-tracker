const pool = require('./connection');

class DB {
  constructor() {}

  async query(sql, args = []) {
    const client = await pool.connect();
    try {
      const result = await client.query(sql, args);
      return result;
    } catch (err) {
      console.error(err);
    } finally {
      client.release();
    }
  }

  findAllEmployees(){
    return this.query(`SELECT role_id as id,employees_id,
    first_name, last_name, salary
    FROM employees JOIN roles ON employees.role_id = roles.id
    `);
  };
  findEmployeesbydepartment(){
    return this.query('SELECT * FROM employees');
  };
  findAllDepartments() {
    return this.query('SELECT * FROM departments');
  };

  findAllRoles(){
    return this.query('SELECT * FROM roles');
  };
  addDepartment(dep_name) {
    return this.query('INSERT INTO departments (dep_name) VALUES ($1)', [dep_name]);
  };
  addRole(title, salary, dep_id) {
    return this.query(
      'INSERT INTO roles (title,salary,dep_id) VALUES ($1, $2, $3)', 
    [title, salary, dep_id]);
  };
  addEmployee(firstName, lastName, roleId) {
    return this.query(
      'INSERT INTO employees (first_name, last_name, role_id) VALUES ($1, $2, $3)',
      [firstName,lastName,roleId]
    );
  };
  updateEmployeeRole(id) {
    return this.query('UPDATE employees SET role_id $1 WHERE id = $2', [title,id]);
  };

  removeEmployee(employees_id) {
    return this.query('DELETE FROM employees WHERE id = $1', [employees_id]);
  };

}



  // function findAllEmployees(){
  //   connect();
  //   return this.query('SELECT employees.id,employees.first_name, employees.last_name, role.title, department.name AS department, role.salary');
  // };

  // function findEmployeesbydepartment(){
  //   connect();
  //   return this.query('SELECT * FROM employees');
  // };
  // function findAllDepartments() {
  //   connect();
  //   return this.query('SELECT * FROM departments');
  // };

  // function findAllRoles(){
  //  connect();
  //   return pool.query('SELECT * FROM roles');
    
  // };
  // function addDepartment(dep_name) {
  //   connect();
  //   return this.query('INSERT INTO departments (dep_name) VALUES ($1)', [dep_name]);
  // };

  // function addRole(role) {
  //   connect();
  //   const{title,salary,dep_id} = role
  //   return this.query('INSERT INTO roles (title,salary,dep_id) VALUES ($1,$2,$3)', [title, salary, dep_id]);
  // };

  // function addEmployee(employee) {
  //   connect();
  //   const {first_name, last_name, role_id} = employee;
  //   return this.query(
  //     'INSERT INTO employees (first_name, last_name, role_id) VALUES ($1, $2, $3)',
  //     [first_name,last_name,role_id]
  //   );
  // }
  // function updateEmployeeRole(title,id) {
  //   connect();
  //   return this.query('UPDATE roles SET title $1 WHERE id = $2', [title,id]);
  // }

  // function removeEmployee(employees_id) {
  //   connect();
  //   return this.query('DELETE FROM employees WHERE id = $1', [employees_id]);
  // }


  module.exports = DB;