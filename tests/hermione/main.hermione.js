/* eslint-disable func-names, no-undef */
const assert = require('assert');

describe('Главная', () => {
  it('Должен загрузить главную страницу. Проверка по title', function () {
    return this.browser
      .url('/')
      .title()
      .then((title) => {
        assert.equal(title.value, 'Mega GIT');
      });
  });

  it('Должен отображать список веток', function () {
    return this.browser
      .url('/')
      .isExisting('.branch-list')
      .then((e) => {
        assert.equal(e, true);
      });
  });

  it('Проверить загрузку страницы коммитов. Проверка по title', function () {
    return this.browser
      .url('/')
      .click('.branch-list__links a')
      .title()
      .then((title) => {
        assert.equal(title.value, 'Mega GIT: commits');
      });
  });

  it('Проверить загрузку страницы дирректории ветки. Проверка по title', function () {
    return this.browser
      .url('/')
      .click('.branch-list__links a:nth-child(3)')
      .title()
      .then((title) => {
        assert.equal(title.value, 'Mega GIT: files-list');
      });
  });
});
