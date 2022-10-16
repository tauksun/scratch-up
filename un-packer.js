const path = require("path");
const tar = require("tar");
const config = require("./config");
const getCWD = require("./get-cwd");
const fileDelete = require("./file-deleter");
const log = require("./logger");

const unpack = async () => {
  // Get eventEmitter instance //
  // Requiring instance here, prevents circular dependency & global scope //
  const { eventEmitter } = require("./index");
  let emitter = eventEmitter;

  const downloadFile = config.downloadFile;
  try {
    const pathToFile = path.join(__dirname, downloadFile);
    const cwd = getCWD();
    await tar.x({
      file: pathToFile,
      cwd,
    });
    log(`Successfully un-packed at ${cwd}`);
    emitter.emit("extracted");
  } catch (error) {
    log("Error occured while un-packing : ", error);
    emitter.emit("error", error);
  } finally {
    // Delete Archive //
    fileDelete(downloadFile);
  }
};

module.exports = unpack;
