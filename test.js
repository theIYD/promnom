const Promnom = require("./index");

const prom = new Promnom((resolve, reject) => {
  setTimeout(() => reject("Something went wrong"), 1000);
  throw new Error("rejected");
}).catch((err) => {
  console.log(`Got Error: ${err}`);
  return Promnom.reject("errrored again!");
});

const firstThen = prom.then((value) => {
  console.log(`Got value: ${value}`);
  return value + 1;
});

const secondThen = firstThen.then((value) => {
  console.log(`Got value: ${value}`);
  return value + 1;
});
