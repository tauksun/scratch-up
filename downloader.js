const fs = require("fs");
const axios = require("axios");
const config = require("./config");
const log = require("./logger");
const path = require("path");

// Configuration //
const url = config.url;
const downloadFile = config.downloadFile;
const pathToDownloadFile = path.join(__dirname, downloadFile);

// Writable Stream //
let emitter;
const writeStream = fs.createWriteStream(pathToDownloadFile);
writeStream.on("close", () => {
  log("Write Stream closed");
  // Initiate un-packing //
  emitter.emit("un-pack");
});

writeStream.on("finish", () => {
  log("Finished Writing To File System");
  writeStream.close();
});

writeStream.on("error", (error) => {
  log("Error occured while writing to file system : ", error);
  if (emitter) {
    emitter.emit("error", error);
  } else {
    throw error;
  }
});

const download = async () => {
  // Get eventEmitter instance //
  // Requiring instance here, prevents circular dependency & global scope //
  const { eventEmitter } = require("./index");
  emitter = eventEmitter;

  // Download Archive //
  try {
    log("Downloading ...");
    const response = await axios.get(url, {
      responseType: "stream",
    });
    // Write to file system //
    const data = response.data;
    data.pipe(writeStream);
  } catch (error) {
    log("Error occured while downloading : ", error);
    if (emitter) {
      emitter.emit("error", error);
    } else {
      throw error;
    }
  }
};

module.exports = download;
