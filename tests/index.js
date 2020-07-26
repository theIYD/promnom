const chai = require('chai');
const path = require('path');
const expect = chai.expect;

const Promnom = require('../index');
const readFile = require('./readfile');

it('should pass with the string `resolved`', (done) => {
  const prom = new Promnom((resolve, _reject) => {
    resolve('resolved');
  });

  prom.then((data) => {
    expect(data).to.equal('resolved');
    done();
  });
});

it('should fail with the string `rejected`', (done) => {
  const prom = new Promnom((_resolve, reject) => {
    reject('resolved');
  });

  prom
    .then(() => {})
    .catch((err) => {
      expect(err).to.equal('resolved');
      done();
    });
});

it('should read the sample.txt file & return PROMNOM', (done) => {
  readFile(path.join(__dirname, 'sample.txt'), 'utf-8').then((value) => {
    expect(value).to.equal('PROMNOM');
    done();
  });
});

it('should throw ENOENT error', (done) => {
  readFile(path.join(__dirname, 'sample1.txt'), 'utf-8')
    .then(() => {})
    .catch((err) => {
      expect(err.code).to.equal('ENOENT');
      done();
    });
});

it('should get into the finally block irrespective of where promise resolves or rejects', (done) => {
  const executed = true;
  readFile(path.join(__dirname, 'sample.txt'), 'utf-8')
    .then((value) => {
      expect(value).to.equal('PROMNOM');
    })
    .finally(() => {
      expect(executed).to.be.true;
      done();
    });
});
