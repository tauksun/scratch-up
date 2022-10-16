const arguments = process.argv;

const getArguments = () => {
  const args = {
    executablePath: arguments[0],
    currentFilePath: arguments[1],
    projectName: arguments[2],
  };
  return args;
};

module.exports = getArguments;
