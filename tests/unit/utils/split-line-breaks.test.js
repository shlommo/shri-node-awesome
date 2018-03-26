const { expect } = require('chai');
const faker = require('faker');
const splitLineBreaks = require('../../../src/server/app/utils/split-line-breaks');

describe('splitLineBreaks', () => {
  it('Должен возвращать массив строк', () => {
    const char = '\n';
    const count = 3;
    const string = `${faker.random.word()}${char}`;
    let randomStrings;

    for (let j = 0; j < count; j++) {
      randomStrings += string;
    }

    const expectedResult = randomStrings.split(char).filter(str => str !== '');
    const result = splitLineBreaks(randomStrings);

    expect(result).to.deep.equal(expectedResult);

    for (let i = 0; i < count; i++) {
      expect(result[i]).to.be.a('string');
    }
  });
});
