const Promnom = require("./index");

const prom = new Promnom((resolve, reject) => {
  setTimeout(() => resolve(50), 1000);
});
