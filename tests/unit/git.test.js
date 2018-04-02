const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const git = require('./stubs/git-stub');
const shouldPass = require('./support/should-pass');
const {
  HASH,
  BRANCH,
  REPO_PATH,
  PATH
} = require('./support/consts');

const { expect } = chai;
chai.should();
chai.use(chaiAsPromised);

describe('GIT', () => {
  describe('parseBranches', () => {
    it('Возвращает массив веток', () => {
      const initialStr = 'infrastructure\n * interface\n interface2.0\n master';
      const result = git.parseBranches(initialStr);
      const expectedResult = ['infrastructure', 'interface', 'interface2.0', 'master'];

      expect(result).to.deep.equal(expectedResult);
    });
  });

  describe('parseCommits', () => {
    it('Возвращает массив объектов комитов. С ключами {hash, message, author, date}', () => {
      const initialStr = `e17ea61|Merge pull request #19 from szhakupbekov/interface|GitHub|2018-03-26
      ec1cfd9|добавил текста в readme|Sayan Zhakupbekov|2018-03-26`;
      const result = git.parseCommits(initialStr);
      const expectedResult = [
        {
          hash: 'e17ea61',
          message: 'Merge pull request #19 from szhakupbekov/interface',
          author: 'GitHub',
          date: '2018-03-26'
        },
        {
          hash: 'ec1cfd9',
          message: 'добавил текста в readme',
          author: 'Sayan Zhakupbekov',
          date: '2018-03-26'
        }];

      expect(result).to.deep.equal(expectedResult);
    });
  });

  describe('parseDir', () => {
    it('Возвращает массив объектов файлов директории. С ключами {type, hash, name}', () => {
      const initialStr = '100644 blob 93f1361\t.dockerignore\n100644 blob 821fff4\t.editorconfig';
      const result = git.parseDir(initialStr);
      const expectedResult = [
        {
          type: 'blob',
          hash: '93f1361',
          name: '.dockerignore'
        },
        {
          type: 'blob',
          hash: '821fff4',
          name: '.editorconfig'
        }];

      expect(result).to.deep.equal(expectedResult);
    });
  });

  describe('Методы должны выполниться', () => {
    shouldPass(() => git.getAllBranches(REPO_PATH)
      .should.eventually.be.an.instanceOf(Array), 'должен вернуть массив');

    shouldPass(() => git.getBranchCommits(REPO_PATH, BRANCH)
      .should.eventually.be.an.instanceOf(Array), 'должен вернуть массив');

    shouldPass(() => git.getDirFiles(REPO_PATH, BRANCH, PATH)
      .should.eventually.be.an.instanceOf(Array), 'должен вернуть массив сущностей дирректории');

    shouldPass(() => git.getFile(REPO_PATH, HASH)
      .should.eventually.be.a('string'), 'должен вернуть строку');
  });

  describe(('Методы должны валиться'), () => {
    it('getAllBranches', (done) => {
      git.getAllBranches(13).catch().should.be.rejected.and.notify(done);
    });
    it('getBranchCommits', (done) => {
      git.getBranchCommits('REPO_PATH', BRANCH).catch().should.be.rejected.and.notify(done);
    });
    it('getDirFiles', (done) => {
      git.getDirFiles(REPO_PATH, 'BRANCH').catch().should.be.rejected.and.notify(done);
    });
    it('getFile', (done) => {
      git.getFile('REPO_PATH', 'BRANCH').catch().should.be.rejected.and.notify(done);
    });
  });
});
