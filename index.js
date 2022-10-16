#!/usr/bin/env node
const EventEmitter = require("events");
const eventEmitter = new EventEmitter();
const getArguments = require("./get-arguments");
const config = require("./config");
const download = require("./downloader");
const unpack = require("./un-packer");
const log = require("./logger");

module.exports = { eventEmitter };

const execute = async () => {
  try {
    eventEmitter.on("error", scratchupError);
    eventEmitter.on("un-pack", unpack);
    eventEmitter.on("extracted", () => {
      const successMessage = config.successMessage;
      log(successMessage);
    });
    eventEmitter.on("completed", () => log("Done !"));
    const args = getArguments();
    const { projectName } = args;
    if (!projectName) {
      return log(`
      ERROR : No Application name specified
      Execute command as : npx scratch-up myApp 
      `);
    }
    await download();
  } catch (error) {
    scratchupError(error);
  }
};

const scratchupError = (error) => {
  const getErrorMessage = config.getErrorMessage;
  const message = getErrorMessage();
  log({ error });
  log(message);
};

// Initiate Download & Extraction //
execute();
