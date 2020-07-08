const Promnom = require("./index");

const prom = new Promnom((resolve, reject) => {
  setTimeout(() => resolve(50), 1000);
});

const firstThen = prom.then((value) => {
  console.log(`Got value: ${value}`);
  return value + 1;
});

const secondThen = firstThen.then((value) => {
  console.log(`Got value: ${value}`);
  return value + 1;
});
