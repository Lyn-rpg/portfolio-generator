// must have when generating new files
// inquire function
const inquirer = require('inquirer');
//new function to prompt user to answer questions + console log answers
const promptUser = () => {
return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name?'
    },

    {
        type: 'input',
        name: 'github',
        message: 'What is your Github Username'
      },

      {
        type: 'input',
        name: 'about',
        message: 'Provide some information about yourself:'
      }
  ])
};
  
// new function for starting a new project
  const promptProject =  (portfolioData) => {
     // If there's no 'projects' array property, create one
     if (!portfolioData.projects) {
        portfolioData.projects = [];
        }
    console.log(`
  =================
  Add a New Project
  =================
  `);
    return inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of your project?'
      },
      {
        type: 'input',
        name: 'description',
        message: 'Provide a description of the project (Required)'
      },
      {
        type: 'checkbox',
        name: 'languages',
        message: 'What did you build this project with? (Check all that apply)',
        choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
      },
      {
        type: 'input',
        name: 'link',
        message: 'Enter the GitHub link to your project. (Required)'
      },
      {
        type: 'confirm',
        name: 'feature',
        message: 'Would you like to feature this project?',
        default: false
      },
      {
        type: 'confirm',
        name: 'confirmAddProject',
        message: 'Would you like to enter another project?',
        default: false
      }
    ])
}
// chain together promptuser function and prompt project function + console log all answers

promptUser()
  .then(promptProject)
  .then(projectAnswers => console.log(projectAnswers))
  .then(projectData => {
      console.log(portfolioData);
      // confirm if user wants to add a project. if true, then function is called 
      if (projectData.confirmAddProject) {
          return promptProject(portfolioData);
          //otherwise portfolioData object is returned
      } else {
          return portfolioData;
      }
  });

//const fs = require('fs');

//const generatePage = require('./src/page-template.js');

//const pageHTML = generatePage(name, github);



// actually writing the new file and checking if there are errors or if written successfully
//fs.writeFile('./index.html',pageHTML, err => {
    //if (err) throw new Error(err);
   // console.log('Portfolio complete! Checkout index.html to see the output!');
//});


