const DB = require('./db'); 
const {prompt} = require('inquirer');

function loadPrompt() {
prompt({
          type: "list",
          name: "choice",
          message: "What would you like to do?",
          choices: [
              
            {
                name:"View all employees",
                value:"viewEmployees",
            },
            {
                name:"View all roles",
                value:"viewRoles",
            },
            {
                name:"View all departments",
                value:"viewDepartments",
            },
            {
                name:"Add a department",
                value:"addDepartment",
            },
            {
                name:"Add a role",
                value:"addRoles",
            },
            {
                name:"Add an employee",
                value:"addEmployee",
            },
            {
                name:"Update an employee role",
                value:"updateEmployee",
            },
            {
                name:"View Employees by Department",
                value:"viewbyDepartments",
            },
            {
                name:"quit",
                value:"Quit",
            },
          ]
      }).then((answer) => {
        let choices = answer.choice;
          switch (choices) {
              case "viewRoles":
                  viewAllRoles();
                  break;
              case "viewEmployees":
                  viewAllEmployees();
                  break;
              case "ViewDepartments":
                  viewAllDepartments();
                  break;
              case "addDepartment":
                  addDepartment();
                  break;
              case "addRole":
                  addRole();
                  break;
              case "addEmployee":
                  addEmployee();
                  break;
              case "updateEmployee":
                  updateEmployeeRole();
                  break;
              case "viewbyDepartments":
                  viewEmployeesByDepartment();
                  break;
              default: 
                  quit();
                  connection.end();
                  break;
          }
      });
}

loadPrompt();


// function addEmployee(){};

// function updateEmployeeRole(){};

// function viewEmployeesByManager(){};

// function viewEmployeesByDepartment(){};

// function quit(){};
              

// function getClient(username, password) {
//   const pool = new Pool({
//     // TODO: Enter PostgreSQL username
//     user: username,
//     // TODO: Enter PostgreSQL password
//     password: password,
//     host: 'localhost',
//     database: 'books_db',
//   });
//   return pool;
// }

// function addBook(book) {
//   return new Promise((resolve, reject) => {
//     pool.query(
//       'INSERT INTO favorite_books (book_name) VALUES ($1)',
//       [book.title],
//       function (err, { rows }) {
//         if (err) {
//           console.error(err);
//           return reject(err);
//         }
//         console.log(rows);
//         resolve(rows);
//       }
//     );
//   });
// }

// function deleteBook(id) {
//   return new Promise((resolve, reject) => {
//     pool.query(
//       'DELETE FROM favorite_books WHERE id = $1',
//       [id],
//       function (err, { rows }) {
//         if (err) {
//           console.error(err);
//           return reject(err);
//         }
//         console.log(rows);
//         resolve(rows);
//       }
//     );
//   });
// }

// function getBooks() {
//   return new Promise((resolve, reject) => {
//     pool.query('SELECT * FROM favorite_books', function (err, { rows }) {
//       if (err) {
//         console.error(err);
//         return reject(err);
//       }
//       console.log(rows);
//       resolve(rows);
//     });
//   });
// }

// const pool = getClient('postgres', 'postgres');
// pool.connect().then(() => {
//   console.log('Connected to the database');
//   app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//   });
// });