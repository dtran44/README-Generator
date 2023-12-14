const inquirer = require('inquirer');
const fs = require('fs');

const prompt = inquirer.createPromptModule();

// Array of questions
const questions = [
  {
    type: 'input',
    name: 'projectTitle',
    message: 'What is your project title?',
  },
  {
    type: 'input',
    name: 'description',
    message: 'Enter a description of your project:',
  },
  {
    type: 'input',
    name: 'installation',
    message: 'Enter installation instructions:',
  },
  {
    type: 'input',
    name: 'usage',
    message: 'Enter usage information:',
  },
  {
    type: 'input',
    name: 'contributing',
    message: 'Enter contribution guidelines:',
  },
  {
    type: 'input',
    name: 'tests',
    message: 'Enter test instructions:',
  },
  {
    type: 'list',
    name: 'license',
    message: 'Choose a license for your application:',
    choices: ['MIT', 'Apache 2.0', 'GPL 3.0', 'BSD 3-Clause', 'None'],
  },
  {
    type: 'input',
    name: 'githubUsername',
    message: 'Enter your GitHub username:',
  },
  {
    type: 'input',
    name: 'email',
    message: 'Enter your email address:',
  },
];

// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {
  if(license !== 'None') {
    return `[!GitHub licence]
    (https://img.shields.io/badge/license-${license}-blue})`
  }
}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {
  if(license !== 'None') {
    return ''
  }
}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {
  if(license !== 'None') {
    return `## License
    This project is licensed under ${license}`}
}

// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
  return `# ${data.title}

`;
}


// Function to generate the README content based on user input
function generateREADME(answers) {

  const licenseBadge = renderLicenseBadge(answers.license);
  const licenseLink = renderLicenseLink(answers.license);
  const licenseSection = renderLicenseSection(answers.license);
 
  return `
# ${answers.projectTitle}


## Description
${answers.description}

## Table of Contents
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation
${answers.installation}

## Usage
${answers.usage}

${licenseSection} 

${licenseBadge} 

${licenseLink}

## Contributing
${answers.contributing}

## Tests
${answers.tests}

## Questions
For questions about this project, please reach out to [${answers.githubUsername}](https://github.com/${answers.githubUsername}) or email at ${answers.email}.
`;

}


// Function to write to the README file
function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`File ${fileName} has been created successfully.`);
  });
}

// Function to initialise the application
function init() {
  prompt(questions).then((answers) => {
    const readmeContent = generateREADME(answers);
    writeToFile('README.md', readmeContent);
  });
}

// Initialise the application
init();