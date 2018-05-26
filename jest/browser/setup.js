const fs = require("fs");
const path = require("path");
const mkdirp = require("mkdirp");
const readline = require("readline");
const puppeteer = require("puppeteer");
const { TMPDIR } = require("./common");
const { exec } = require("child_process");
const Socket = require("net").Socket;

const isPortTaken = (port, host = "127.0.0.1", timeout = 1000) => {
  return new Promise((resolve, reject) => {
    const socket = new Socket();

    socket.setTimeout(timeout);

    socket.on("connect", () => {
      socket.destroy();
      resolve(true);
    });

    socket.on("timeout", () => {
      socket.destroy();
      reject(Error("Timeout..."));
    });

    socket.on("error", err => {
      socket.destroy();
      if (err.code !== "ECONNREFUSED") return reject(err);
      resolve(false);
    });

    socket.connect(port, host);
  });
};

const startCosmos = () =>
  new Promise((resolve, reject) => {
    const proc = exec("yarn cosmos");
    const rl = readline.createInterface({ input: proc.stdout });

    proc.on("error", error => {
      rl.close();
      reject(error);
    });

    // Hacky? Yes. But we need to know when the application has been served.
    const done = /http:\/\/localhost:\d{4}/;

    rl.on("line", input => {
      console.log(input);
      if (!done.test(input)) return;
      rl.close();
      resolve(proc);
    });
  });

module.exports = async () => {
  const taken = await isPortTaken(8989);
  if (!taken) {
    global.__SERVER_PROCESS__ = await startCosmos();
  }
  global.__BROWSER__ = await puppeteer.launch({});
  mkdirp.sync(TMPDIR);
  fs.writeFileSync(
    path.join(TMPDIR, "wsEndpoint"),
    global.__BROWSER__.wsEndpoint()
  );
};
