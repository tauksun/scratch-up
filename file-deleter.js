const fs = require("fs");
const path = require("path");
const log = require("./logger");

const fileDelete = (file) => {
  // Get eventEmitter instance //
  // Requiring instance here, prevents circular dependency & global scope //
  const { eventEmitter } = require("./index");
  let emitter = eventEmitter;
  try {
    const pathToFile = path.join(__dirname, file);
    fs.rmSync(pathToFile);
    log("Removed Archive");
    emitter.emit("completed");
  } catch (error) {
    // Don't throw error //
    log("Error while removing archive : ", error);
  }
};

module.exports = fileDelete;
