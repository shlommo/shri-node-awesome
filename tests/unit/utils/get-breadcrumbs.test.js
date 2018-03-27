const { expect } = require('chai');
const faker = require('faker');
const getBreadcrumbs = require('../../../src/server/app/utils/get-breacrumbs');

describe('getBreadcrumbs', () => {
  it('Должен возвращать массив строк', () => {
    const char = '/';
    const count = 3;
    const string = `${faker.random.word()}${char}`;
    let randomStrings;

    for (let j = 0; j < count; j++) {
      randomStrings += string;
    }

    const expectedResult = randomStrings.split(char).filter(str => str !== '');
    const result = getBreadcrumbs(randomStrings);

    expect(result).to.deep.equal(expectedResult);

    for (let i = 0; i < count; i++) {
      expect(result[i]).to.be.a('string');
    }
  });
});
