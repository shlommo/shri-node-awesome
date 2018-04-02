const git = require('../../../src/server/app/git');
const {
  HASH,
  BRANCH,
  REPO_PATH,
  PATH
} = require('../support/consts');

const exec = (command) => {
  switch (command) {
    case `cd ${REPO_PATH} && git branch --list`:
      return Promise.resolve({
        stdout: 'infrastructure\n * interface\n interface2.0\n master'
      });
    case `cd ${REPO_PATH} && git log ${BRANCH} --pretty="%h|%s|%cn|%cd" --date=short`:
      return Promise.resolve({
        stdout: `e17ea61|Merge pull request #19 from szhakupbekov/interface|GitHub|2018-03-26
        ec1cfd9|добавил текста в readme|Sayan Zhakupbekov|2018-03-26`
      });
    case `cd ${REPO_PATH} && git ls-tree ${BRANCH} ${PATH}`:
      return Promise.resolve({
        stdout: '100644 blob 93f1361\t.dockerignore\n100644 blob 821fff4\t.editorconfig'
      });
    case `cd ${REPO_PATH} && git show ${HASH}`:
      return Promise.resolve({
        stdout: 'Рандомные данные файла'
      });
    default:
      return Promise.reject(new Error('Не верная команда'));
  }
};

git.exec = exec;

module.exports = git;
