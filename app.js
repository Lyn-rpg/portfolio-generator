// must have when generating new files

const inquirer = require('inquirer');
inquirer
  .prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name?'
    }
  ])
  .then(answers => console.log(answers));

//const fs = require('fs');

//const generatePage = require('./src/page-template.js');

//const pageHTML = generatePage(name, github);



// actually writing the new file and checking if there are errors or if written successfully
//fs.writeFile('./index.html',pageHTML, err => {
    //if (err) throw new Error(err);
   // console.log('Portfolio complete! Checkout index.html to see the output!');
//});


