const states = require("./states");

// Global class
class Promnom {
  constructor(compute) {
    this._state = states.PENDING;

    this._value = undefined;
    this._reason = undefined;

    this._thenQueue = [];
    this._finallyQueue = [];
  }

  then() {}

  catch() {}

  finally() {}

  _onFulfilled() {}

  _onRejected() {}
}

module.exports = Promnom;
