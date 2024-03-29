const states = require("./states");

// Check if a promise has a then method
const isThenable = (maybePromise) =>
  maybePromise && typeof maybePromise.then === "function";

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
        } catch (E) {
          this._onRejected(E);
        }
      });
    }
  }

  then(fulfilledFunction, catchFunction) {
    const controlled = new Promnom();
    this._thenQueue.push([controlled, fulfilledFunction, catchFunction]);

    if (this._state === states.FULFILLED) {
      this._propogateFulfilled();
    } else if (this._state === states.REJECTED) {
      this._propogateRejected();
    }

    return controlled;
  }

  catch(catchFunction) {
    return this.then(undefined, catchFunction);
  }

  finally(sideEffectFunction) {
    if (this._state !== states.PENDING) {
      sideEffectFunction();

      return this._state === states.FULFILLED
        ? Promnom.resolve(this._value)
        : Promnom.reject(this._reason);
    }

    const controlled = new Promnom();
    this._finallyQueue.push([controlled, sideEffectFunction]);

    return controlled;
  }

  _propogateFulfilled() {
    this._thenQueue.forEach(([controlled, fulfilledFunction]) => {
      if (typeof fulfilledFunction === "function") {
        const valueOrProm = fulfilledFunction(this._value);

        if (isThenable(valueOrProm)) {
          valueOrProm.then(
            (value) => controlled._onFulfilled(value),
            (reason) => controlled._onRejected(reason)
          );
        } else {
          controlled._onFulfilled(valueOrProm);
        }
      } else {
        return controlled._onFulfilled(this._value);
      }
    });

    this._finallyQueue.forEach(([controlled, sideEffectFunction]) => {
      sideEffectFunction();
      controlled._onFulfilled(this._value);
    });

    this._thenQueue = [];
    this._finallyQueue = [];
  }

  _propogateRejected() {
    this._thenQueue.forEach(([controlled, _, catchFunction]) => {
      if (typeof catchFunction === "function") {
        const valueOrProm = catchFunction(this._reason);

        if (isThenable(valueOrProm)) {
          valueOrProm.then(
            (value) => controlled._onFulfilled(value),
            (reason) => controlled._onRejected(reason)
          );
        } else {
          controlled._onFulfilled(valueOrProm);
        }
      } else {
        return controlled._onRejected(this._reason);
      }
    });

    this._finallyQueue.forEach(([controlled, sideEffectFunction]) => {
      sideEffectFunction();
      controlled._onFulfilled(this._value);
    });

    this._thenQueue = [];
    this._finallyQueue = [];
  }

  _onFulfilled(value) {
    if (this._state === states.PENDING) {
      this._state = states.FULFILLED;
      this._value = value;
      this._propogateFulfilled();
    }
  }

  _onRejected(reason) {
    if (this._state === states.PENDING) {
      this._state = states.FULFILLED;
      this._reason = reason;
      this._propogateRejected();
    }
  }
}

Promnom.resolve = (value) => new Promnom((resolve) => resolve(value));
Promnom.reject = (value) => new Promnom((_, reject) => reject(value));

module.exports = Promnom;
