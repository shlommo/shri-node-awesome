const { exec: execViaCallbacks } = require('child_process');
const exec = require('util').promisify(execViaCallbacks);
const splitLineBreaks = require('./utils/split-line-breaks');
const _ = require('lodash');

class Git {
  constructor(execPromise) {
    this.exec = execPromise;
  }

  parseBranches(data) {
    this.branches = splitLineBreaks(data);

    return this.branches.map((item) => {
      const branch = _.trim(item, '*');
      return _.trim(branch);
    });
  }

  parseCommits(data) {
    this.commits = splitLineBreaks(data);
    return this.commits.map((item) => {
      const commit = item.split('|');
      return {
        hash: commit[0],
        message: commit[1],
        author: commit[2],
        date: commit[3]
      };
    });
  }

  parseDir(data) {
    this.dir = data.split('\n').map(item => item.split('\t'));
    const filteredDir = this.dir.filter(item => item.length > 1);

    return filteredDir.map((item) => {
      const [, type, hash] = item[0].split(' ');
      const name = item[1];
      return {
        type,
        hash,
        name
      };
    });
  }

  getAllBranches(path) {
    return new Promise((resolve, reject) => {
      this.exec(`cd ${path} && git branch --list`)
        .then((res) => {
          this.branches = this.parseBranches(res.stdout);
          resolve(this.branches);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  getBranchCommits(path, branch) {
    return new Promise((resolve, reject) => {
      this.exec(`cd ${path} && git log ${branch} --pretty="%h|%s|%cn|%cd" --date=short`)
        .then((res) => {
          const commits = this.parseCommits(res.stdout);
          resolve(commits);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  getDirFiles(repoPath, root, path) {
    const pathValue = `${path}/`;
    return new Promise((resolve, reject) => {
      this.exec(`cd ${repoPath} && git ls-tree ${root} ${pathValue}`)
        .then((res) => {
          const dir = this.parseDir(res.stdout);

          resolve(dir);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  getFile(path, hash) {
    return new Promise((resolve, reject) => {
      this.exec(`cd ${path} && git show ${hash}`)
        .then((res) => {
          resolve(res.stdout);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

module.exports = new Git(exec);
