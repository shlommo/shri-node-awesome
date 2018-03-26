/* eslint-disable func-names, no-undef */
const shouldPass = (promiseProducer, successMessage) => {
  it(`${successMessage}\n\t должен вернуть выполненный promise`, (done) => {
    promiseProducer().then(
      () => done(),
      reason => done(new Error(`Expected promise to be fulfilled but it was rejected with ${reason.stack}`))
    );
  });
};

module.exports = shouldPass;
