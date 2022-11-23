const EventEmitter = require("node:events");


class Logger extends EventEmitter {
  log(message) {
    console.log(message);
    this.emit("birnarsala", {
      id: 1,
      url: "https://musobekmadrimov.netlify.app",
    });
  }
}

module.exports = Logger;
