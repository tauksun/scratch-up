const logger = true;
const downloadFile = "scratchup";
const url = "https://github.com/tauksun/scratch-up-base/blob/main/scratch-up-1.0.0.tar?raw=true";

const getErrorMessage = () => {
  const message = `Error occured while setting up Scratch-Up, please try again.
    If the issue persists, please write to us or raise issue at github repository.`;
  return message;
};

const successMessage = `Successfully set up : Scratch-Up`;

module.exports = {
  logger,
  url,
  downloadFile,
  getErrorMessage,
  successMessage,
};
