<p align="center"><img src="assets/omnom.png" height=100 /></p>

## promnom
[![HitCount](http://hits.dwyl.com/theIYD/promnom.svg)](http://hits.dwyl.com/theIYD/promnom)
[![GitHub license](https://img.shields.io/github/license/theIYD/promnom)](https://github.com/theIYD/promnom/blob/master/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/theIYD/promnom)](https://gitHub.com/theIYD/promnom/stargazers/)

A custom implementation of Javascript promises from scratch. The purpose of this implementation was to deeply understand how promises allow asynchronous operations using `setTimeout()` Web API & how a data structure like a queue is maintained.

### Background
A promise represents the eventual result of an asynchronous operation. The primary way of interacting with a promise is through its `then` method, which registers callbacks to receive either a promise’s eventual value or the reason why the promise cannot be fulfilled.

### Usage
```js
const Promnom = require("./index");
const fs = require("fs");
const path = require("path");

const readFile = (filename, enc) =>
  new Promnom((resolve, reject) => {
    fs.readFile(filename, enc, (err, value) => {
      if (err) {
        return reject(err);
      }
      resolve(value);
    });
  });

const delay = (time, value) =>
  new Promnom((resolve) => {
    setTimeout(() => {
      resolve(value);
    }, time);
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

/*
Output:
3472 characters read
cnst stts = rqr("./stts");

// Chck f  prms hs  thn mthd
cnst sThnbl = (mybPrms) =>
  mybPrms && typf mybPrms.thn === "fnctn";

// Glbl clss
clss Prmnm {
  cnstrctr(cmpt) {
    ths._stt = stts.PENDING
Promise done
*/
```

### License
<a href="https://github.com/theIYD/promnom/LICENSE">MIT</a>
