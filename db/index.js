const pool = require('./connection');

pool.connect(); 

pool.query()

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
    return this.query('SELECT employee.id,employees.first_name, employee.last_name, role.title, department.name AS department, role.salary');
  }

  findEmployeesbydepartment(){
    return this.query('SELECT * FROM employees');
  }
  findEmployeesByManager(){
    return this.query('SELECT * FROM employees');
  }
  
  findAllDepartments() {
    return this.query('SELECT * FROM departments');
  }
  findAllRoles(){
    return this.query('SELECT * FROM roles');
  }
  addDepartment(dep_name) {
    return this.query('INSERT INTO departments (dep_name) VALUES ($1)', [dep_name]);
  }

  addRole(role) {
    const{title,salary,dep_id} = role
    return this.query('INSERT INTO roles (title,salary,dep_id) VALUES ($1,$2,$3)', [title, salary, dep_id]);
  }

  addEmployee(employee) {
    const {first_name, last_name, role_id} = employee;
    return this.query(
      'INSERT INTO employees (first_name, last_name, role_id) VALUES ($1, $2, $3)',
      [first_name,last_name,role_id]
    );
  }
  updateEmployeeRole(role) {
    return this.query('UPDATE role SET title VALUES ($1)', [role]);
  }

  removeEmployee(employees_id) {
    return this.query('DELETE FROM employees WHERE id = employees_id', [employees_id]);
  }
}

module.exports = {DB};
