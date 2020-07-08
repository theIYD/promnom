const states = require("./states");

// Global class
class Promnom {
  constructor(compute) {
    this._state = states.PENDING;

    this._value = undefined;
    this._reason = undefined;

    this._thenQueue = [];
    this._finallyQueue = [];

    if (typeof compute === "function") {
      setTimeout(() => {
        try {
          compute(this._onFulfilled.bind(this), this._onRejected.bind(this));
        } catch (E) {}
      });
    }
  }

  then() {}

  catch() {}

  finally() {}

  _onFulfilled() {}

  _onRejected() {}
}

module.exports = Promnom;
