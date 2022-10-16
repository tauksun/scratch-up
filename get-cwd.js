const fs = require("fs");
const path = require("path");
const log = require("./logger");
const getArguments = require("./get-arguments");

const getCWD = () => {
  const args = getArguments();
  const { projectName } = args;
  const pathToProject = projectName;
  createProjectDirectory(pathToProject);
  return pathToProject;
};

const createProjectDirectory = (pathToProject) => {
  // Check if directory exists //
  const isExists = fs.existsSync(pathToProject);
  if (isExists) {
    log(`${pathToProject} already exists`);
    return;
  }
  // Create Directory //
  fs.mkdirSync(pathToProject);
  log(`Created : ${pathToProject}`);
  return;
};

module.exports = getCWD;
