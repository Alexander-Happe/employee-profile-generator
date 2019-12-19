const inquirer = require('inquirer')
const Engineer = require("./lib/Engineer");
const Manager = require("./lib/Manager");
const Intern = require("./lib/Intern");
const fs = require('fs')

const Managers = []
const Engineers = []
const Interns = []

const basehtml =`
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" 
    integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <title>Team Profile Generator</title>
</head>
<body style="background-color: darkgrey;">
    <h1 class="col-12 py-4 display-4 text-center my-4" style= "background-color:black; color: white";>My Team</h1>
    <div class="row px-5 mx-5 justify-content-center">    
    `;
fs.writeFile('./output/index.html', basehtml, (err) => {
    if (err) throw err;
  });

const promtInfo = function(){
    
    inquirer
    .prompt([
        {
            type: 'list',
            message: "What is the employee's role",
            choices: ['Manager', 'Engineer', 'Intern'],
            name: 'position'
        },
        {
            type: 'input',
            message: "What is the emplyee's name",
            name: 'name'
        },
        {
            type: 'input',
            message: "What is your employee's ID?",
            name: "ID"
        },
        {
            type: 'input',
            message: "What is your emplyee's email?",
            name: 'email'
        },
        {
            type: 'input',
            message: "What is your employee's office number",
            name: 'officeNumber',
            when: answers => answers.position === "Manager"
        },
        {
            type: 'input',
            message: "What is your employee's GitHub?",
            name: 'GitHub',
            when: answers => answers.position === "Engineer"
        },
        {
            type: 'input',
            message: "What is your employee's school?",
            name: 'school',
            when: answers => answers.position === "Intern"
        }
    ]).then(function(answers){
        if (answers.position === 'Manager'){
            const employee = new Manager(answers.name, answers.ID, answers.email, answers.officeNumber);
            Managers.push(employee)
            console.log("sucsessfully added manager")
            closePrompt()
            
        }
        else if(answers.position === 'Engineer'){
            const employee = new Engineer(answers.name, answers.ID, answers.email, answers.GitHub);
            Engineers.push(employee)
            console.log("Sucsessfully added engineer")
            closePrompt()

        }
        else {
            const employee = new Intern(answers.name, answers.ID, answers.email, answers.school);
            Interns.push(employee)
            console.log("Sucsessfully added intern")
            closePrompt()
        }
    })
}
promtInfo()

function closePrompt(){
    inquirer.prompt([
        {
            type: 'list',
            message: 'Add another employee?',
            choices: ['Yes', 'No'],
            name: 'continue'
        }
    ]).then(function(answers){
        if (answers.continue === 'Yes'){
            promtInfo();
        }
        else{
            for (i = 0; i < Managers.length; i++) {
                var newcard = `
                <div class="card col-3 mx-3 my-3" style="width: 18rem;">
                    <div class="card-body" style= "background-color:black; color: white">
                        <h5 class="card-title text-center">${Managers[i].name}</h5>
                        <p class="card-text text-center">${Managers[i].getRole()}</p>
                </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">ID: ${Managers[i].id}</li>
                        <li class="list-group-item">EMAIL: ${Managers[i].email}</li>
                        <li class="list-group-item">OFFICE NUMBER: ${Managers[i].officeNumber}</li>
                    </ul>
                </div>`
                fs.appendFile('./output/index.html', newcard, (err) => {
                    if (err) throw err;
                    console.log('Manager card was appended to html document.');
                  });
            }
            for (i = 0; i < Engineers.length; i++) {
                var newcard = `
                <div class="card col-3 mx-3 my-3" style="width: 18rem;">
                    <div class="card-body" style= "background-color:black; color: white">
                        <h5 class="card-title text-center">${Engineers[i].name}</h5>
                        <p class="card-text text-center">${Engineers[i].getRole()}</p>
                </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">ID: ${Engineers[i].id}</li>
                        <li class="list-group-item">EMAIL: ${Engineers[i].email}</li>
                        <li class="list-group-item">GITHUB PROFILE: ${Engineers[i].github}</li>
                    </ul>
                </div>`
                fs.appendFile('./output/index.html', newcard, (err) => {
                    if (err) throw err;
                    console.log('Engineer card was appended to html document.');
                  });
            }
            for (i = 0; i < Interns.length; i++) {
                var newcard = `
                <div class="card col-3 mx-3 my-3" style="width: 18rem;">
                    <div class="card-body" style= "background-color:black; color: white">
                        <h5 class="card-title text-center">${Interns[i].name}</h5>
                        <p class="card-text text-center">${Interns[i].getRole()}</p>
                </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">ID: ${Interns[i].id}</li>
                        <li class="list-group-item">EMAIL: ${Interns[i].email}</li>
                        <li class="list-group-item">SCHOOL: ${Interns[i].school}</li>
                    </ul>
                </div>`
                fs.appendFile('./output/index.html', newcard, (err) => {
                    if (err) throw err;
                    console.log('Intern card was appended to html document.');
                  });
            }
            var htmlend = `</div>  
            </body>
            </html>`
            fs.appendFile('./output/index.html', htmlend, (err) => {
                if (err) throw err;
                console.log("Empolyee submissions entered. HTML document complete.")
              });
        }
    });
};


