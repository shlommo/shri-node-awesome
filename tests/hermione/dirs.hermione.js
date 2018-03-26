/* eslint-disable func-names, no-undef */
const assert = require('assert');

describe('Страница с коммитами', () => {
  beforeEach(function () {
    return this.browser
      .url('/')
      .click('.branch-list__links a:nth-child(3)');
  });

  it('Должен отображать список файлов для выбранного ветки', function () {
    return this.browser
      .isExisting('.item-list')
      .then((e) => {
        assert.equal(e, true);
      });
  });

  it('Проверить возможность ходить в глубь дирректорий.', function () {
    return this.browser
      .click('.item-list__row:first-child a')
      .title()
      .then((title) => {
        assert.equal(title.value, 'Mega GIT: files-list');
      });
  });

  it('Проверить загрузку страницы c файлом.', function () {
    return this.browser
      .click('.item-list__row:last-child a')
      .isExisting('.app__content pre')
      .then((e) => {
        assert.equal(e, true);
      });
  });
});
