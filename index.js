const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');


const writeFileAsynch = util.promisify(fs.writeFile);

function promptUser() {
    return inquirer.prompt([
        {
           type: "input",
           message: "What is your project title",
           name: "title"
        },  

        {
            type: "input",
           message: "Enter a project description",
           name: "description"
        },

        {
            type: "input",
           message: "Enter application usage",
           name: "usage"
        },

        {
            type: "input",
           message: "Enter Test Instructions",
           name: "test"
        },

        {
            type: "checkbox",
           message: "Select license",
           choices: [
               "MIT",
               "ISC",
               "Apache-2.0",
               "MS-PL"

        ],
        name: "license"
        },

        {
            type: "input",
           message: "Enter who contributed on this project",
           name: "contributing"
        },

        {
            type: "input",
           message: "Enter your github profile name",
           name: "profile"
        },

        {
            type: "input",
           message: "Enter your email address",
           name: "email"
        },

        {
            type: "input",
            message: "Enter Credit where its due",
            name: "credits"
        },

        {
            type: "input",
            message: "How do you install your application",
            name: "installation"

        },
    ]);

}
//

function generateReadme(response) {
    return `
    # ${response.title}

    # Table of Contents
    
    * [Installation](#installation)
    * [Usage](#usage)
    * [Credits](#credits)
    * [License](#license)
    
    ## Description
        ${response.description} 
    ## Installation
        ${response.installation}    
    ## Usage 
        ${response.usage}
    ## Test
        ${response.test}
    ## License
    To learn more about the license, click the link below.
    - [License](https://opensource.org/licenses${response.license})
    ## Credits
        ${response.credit}    
    ## Contribuiting
        ${response.contributing}    
    ## Questions
        If you have any questions you can go to my GitHub profile:
        -[GitHub Profile](https://github.com/${response.profile})
        My email adress is ${response.email} if you have any more questions

    ## Badges
    
    ![badmath](https://img.shields.io/github/languages/top/nielsenjared/badmath)  
    ![shields.io](https://shields.io/)`;
}
console.log(generateReadme)
// Function needed to start program

async function init() {
    try {
        const response = await promptUser();
        const readMe = generateReadme(response);

        await writeFileAsynch("README.md", readMe);
        console.log("Works");
    } catch (err){
        console.log(err);
    }
}

init();