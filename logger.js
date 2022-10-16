const config = require("./config");
const logger = config.logger;

const log = (...params) => {
  if (!logger) {
    return;
  }
  console.log(...params);
};

module.exports = log;
