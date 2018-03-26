/* eslint-disable func-names, no-undef */
const assert = require('assert');

describe('Страница с коммитами', () => {
  beforeEach(function () {
    return this.browser
      .url('/')
      .click('.branch-list__links a');
  });

  it('Должен отображать список файлов для выбранного комита', function () {
    return this.browser
      .isExisting('.item-list')
      .then((e) => {
        assert.equal(e, true);
      });
  });

  it('Должен переходить на список веток из списка файлов выбранного комита', function () {
    return this.browser
      .click('.app__trees a')
      .title()
      .then((title) => {
        assert.equal(title.value, 'Mega GIT');
      });
  });

  it('Должна грузиться страница с дирректорией.', function () {
    return this.browser
      .click('.item-list__row:last-child .item-list__cell:first-child a')
      .title()
      .then((title) => {
        assert.equal(title.value, 'Mega GIT: files-list');
      });
  });

  it('Должен загрузиться файл при переходе из дерева коммитов.', function () {
    return this.browser
      .click('.item-list__row:last-child .item-list__cell:first-child a')
      .click('.item-list__row:last-child a')
      .title()
      .then((title) => {
        assert.equal(title.value, 'Mega GIT: files');
      });
  });
});
