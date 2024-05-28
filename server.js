const DB = require('./db/index.js'); 
const {prompt} = require('inquirer');
const db = new DB();
console.log('\n');
console.log(`Employee Tracker, welcome to the manager page`);
console.log('\n');
function loadPrompt() {
prompt([{
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
                name:"Remove an Employee",
                value:"removeEmployee",
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
                value:"quit",
            },
          ]
      }]).then((answer) => {
        let choices = answer.choice;
          switch (choices) {
              case "viewRoles":
                  viewAllRoles();
                  break;
              case "viewEmployees":
                  viewAllEmployees();
                  break;
              case "viewDepartments":
                  viewAllDepartments();
                  break;
              case "addDepartment":
                  addaDepartment();
                  break;
              case "addRole":
                  addaRole();
                  break;
              case "addEmployee":
                  addaEmployee();
                  break;
              case "updateEmployee":
                  updateaEmployeeRole();
                  break;
              case "removeEmployee":
                  removeaEmployee();
                  break;
              case "viewbyDepartments":
                  viewEmployeesByDepartment();
                  break;
                  
            //   default:
            //       connection.end();
            //       break;
          };
      });
}

function viewAllRoles(){
    db.findAllRoles()
    .then(({rows}) => {
            let roles = rows;
            const roleChoices = roles.map(({id, title, salary}) => ({
                value:id,
                role:title,
                salary:salary,
            }))
            console.log('\n');
            console.table(roleChoices);
    })
    .then(() => loadPrompt());
};

function viewAllEmployees(){
    db.findAllEmployees()
    .then(({rows}) => {
            let employees = rows;
            const employeesChoices = employees.map(({employees_id,first_name,last_name,role_id}) => ({
                name:first_name,last_name,
                id: employees_id,
                role: role_id,
            }))
            console.log('\n');
            console.table(employeesChoices);
    })
    .then(() => loadPrompt());

}

function viewAllDepartments(){
    db.findAllDepartments()
    .then(({rows}) => {
        let departments = rows;
        const departmentsChoices = departments.map(({id,dep_name}) => ({
            department :dep_name,
            id:id,
        }))
        console.log('\n');
        console.table(departmentsChoices);
})
.then(() => loadPrompt());
};

function addaDepartment(){
    prompt([
        {
        name: 'depName',
        message:"What is the name of the department?",
    },
]).then((res) =>{
    let newDepartment = res.depName;

db.addDepartment(newDepartment);
console.log('\n');
console.log(`department added!`);
console.log('\n');
viewAllDepartments();
})
.then(() => loadPrompt());
}

function addaEmployee(){
    prompt([
        {
        name: 'firstName',
        message:"What is the employee's first name?",
    },
        {
        name: 'last_name',
        message:"What is the employee's last name?",
    },

    ]).then((answer) =>{
        let firstName = answer.firstName;
        let lastName = answer.last_name;

        db.findAllRoles().then(({ rows}) =>{
            let roles = rows;
            const roleChoices = roles.map(({id, title}) =>({
                name: title,
                value: id,
            }));

            prompt({
                type:'list',
                name:'roleId',
                message:" What is the employee's role?",
                choices: roleChoices, 
            }).then((res) => {
                let roleId = res.roleId;
                    db.addEmployee(firstName, lastName, roleId);
               
                                     
            }).then(() =>console.log(`Employee added!`))
            .then(()=> viewAllEmployees())
            .then(() => loadPrompt());
                            })
                        })
                    };
            
function addaRole(){
    prompt([
        {
        name: 'roleTitle',
        message:"What is the name of the new role?",
    },
        {
        name: 'roleSalary',
        message:"What is the role's salary?",
    },

    ]).then((answer) =>{
        let newRole = answer.roleTitle;
        let salary = answer.roleSalary;

        db.findAllDepartments()
        .then(({rows}) =>{
            console.log(rows);
            let departments = rows;
            console.log(departments);
            const departChoices = departments.map(({id, dep_name}) =>({
                name: dep_name,
                value: id,
            }));
            prompt({
                type:'list',
                name:'depId',
                message:" What is the role's department?",
                choices: departChoices, 
            }).then((res) => {
                let departmentId = res.depId;
            db.addRole(newRole,salary,departmentId);
        }).then(()=> console.log('Role added'))
        .then(()=> viewAllRoles())
        .then(() => loadPrompt());
                    })
                })
            };
    

function viewEmployeesByDepartment(){
    db.findAllDepartments()
    .then(({rows}) => {
            let departments = rows;
            const departmentChoices = departments.map(({id, dep_name}) => ({
                name:dep_name,
                value:id,
            }))
            console.log('\n');
            console.table(departmentChoices);
    })
    .then(() => loadPrompt());
}



function updateaEmployeeRole(){
    db.updateEmployeeRole()
    .then(() => loadPrompt());
};

function removeaEmployee(){
    db.findAllEmployees()
        .then(({rows}) => {
            let employees = rows;
            const employeesToRemove = employees.map(({employees_id , first_name , last_name}) => ({
                name:first_name,last_name,
                value:employees_id,
            }));
            prompt({
                type:'list',
                name:'empId',
                message:" Which employee would you like to remove?",
                choices: employeesToRemove, 
            }).then((res) => {
                let employeeId = res.empId;
                db.removeEmployee(employeeId);
      })})
      .then(() => loadPrompt());
    
};

loadPrompt();   
