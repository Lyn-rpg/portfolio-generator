// must have when generating new files
// inquire function
const inquirer = require('inquirer');
//new function to prompt user to answer questions + console log answers
const promptUser = () => {
return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name? (Required)',
      // validate input and return string if empty value is entered
      validate: nameInput => {
          if (nameInput) {
              return true;
          } else {
              console.log('Please enter your name!');
              return false;
          }
      }
    },

    {
        type: 'input',
        name: 'github',
        message: 'What is your Github Username (Required)',
        //validate input
        validate: gitInput => {
            if (gitInput) {
                return true;
            } else {
                console.log('Please enter your github username');
                return false;
            }
        }
      },
         // check if user wants to include about section
      {
          type: 'confirm',
          name: 'confirmAbout',
          message: 'Would you like to enter some information about yourself for an "About" section?',
          default: true
      },

      {
        type: 'input',
        name: 'about',
        message: 'Provide some information about yourself:',
        // about section begins once user confirms (confirmAbout) section
        when: ({ confirmAbout }) => {
            if (confirmAbout) {
                return true;
            } else {
                return false
            }
        }
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
        message: 'What is the name of your project? (Required)',
       validate: projectName => {
           if (projectName) {
               return true;
           } else {
               console.log('Please enter your project name!');
               return false;
           }
       }
      },
      {
        type: 'input',
        name: 'description',
        message: 'Provide a description of the project (Required)',
        validate: projectDesc => {
            if (projectDesc) {
                return true;
            } else {
                console.log('Please enter a description of your project');
                return false;
            }
        }
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
        message: 'Enter the GitHub link to your project. (Required)',
        validate: gitLink => {
            if (gitLink) {
                return true;
            } else {
                console.log('Please link your github project!');
                return false;
            }
        }
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


