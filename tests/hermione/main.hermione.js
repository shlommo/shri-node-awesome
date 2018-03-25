const assert = require('assert');

describe('Главная страница', () => {
  it('Проверить title главной страницы', function () {
    return this.browser
      .url('/')
      .title()
      .then((title) => {
        assert.equal(title.value, 'Mega GIT');
      });
  });
});
