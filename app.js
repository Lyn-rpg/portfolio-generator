// must have when generating new files
const fs = require('fs');

const generatePage = require('./src/page-template.js');

//data entrypoints: a name and a username
const profileDataArgs = process.argv.slice(2);


const [name, github] =profileDataArgs;



// actually writing the new file and checking if there are errors or if written successfully
fs.writeFile('./index.html',generatePage(name, github), err => {
    if (err) throw new Error(err);
    console.log('Portfolio complete! Checkout index.html to see the output!');
});


