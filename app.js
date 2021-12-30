const {writeFile, copyFile} = require('./utils/generate-site.js');
// inquire function
const inquirer = require('inquirer');

// must have when generating new files
const generatePage = require('./src/page-template');


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
        when: ({ confirmAbout }) => confirmAbout 
      }
            
  ]);
};
  
// new function for starting a new project
  const promptProject =  (portfolioData) => {
    console.log(`
  =================
  Add a New Project
  =================
  `);

  // If there's no 'projects' array property, create one
  if (!portfolioData.projects) {
    portfolioData.projects = [];
    }
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
                console.log('Please enter a project description');
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
    .then(projectData => {
        portfolioData.projects.push(projectData);
        if (projectData.confirmAddProject) {
          return promptProject(portfolioData);
        } else {
          return portfolioData;
        }
      });
};
//begin promptUser function to ask qustions
promptUser()
//take data and turn it into its own project
.then(promptProject)
//that data is taken and generates a page full of user data
.then(portfolioData => {
    return generatePage(portfolioData);
})
//page if user data is organized on an html page
.then(pageHTML => {
    return writeFile(pageHTML);
})
//write the new files html and css and return a copy
.then(writeFileResponse => {
    console.log(writeFileResponse);
    return copyFile();
})
//return the new copy of the file
.then(copyFileResponse => {
    console.log(copyFileResponse);
})
//catch and log any error so we know where things went wrong
.catch(err => {
    console.log(err);
});