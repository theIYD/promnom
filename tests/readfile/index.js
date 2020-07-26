const fs = require('fs');
const Promnom = require('../../index');

module.exports = (filename, encoding) =>
  new Promnom((resolve, reject) => {
    fs.readFile(filename, encoding, (err, value) => {
      if (err) {
        return reject(err);
      }
      resolve(value);
    });
  });
