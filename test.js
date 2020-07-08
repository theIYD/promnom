const Promnom = require("./index");

const fs = require("fs");
const path = require("path");

const readFile = (filename, encoding) =>
  new Promnom((resolve, reject) => {
    fs.readFile(filename, encoding, (err, value) => {
      if (err) {
        return reject(err);
      }
      resolve(value);
    });
  });

const delay = (timeInMs, value) =>
  new Promnom((resolve) => {
    setTimeout(() => {
      resolve(value);
    }, timeInMs);
  });

readFile(path.join(__dirname, "index.js"), "utf-8")
  .then((text) => {
    console.log(`${text.length} characters read`);
    return delay(2000, text.replace(/[aeiou]/g, ""));
  })
  .then((newText) => {
    console.log(newText.slice(0, 200));
  })
  .catch((err) => {
    console.log("An error occurred");
    console.error(err);
  })
  .finally(() => {
    console.log("Promise done");
  });
