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
    return this.exec(`cd ${path} && git branch --list`)
      .then((res) => {
        this.branches = this.parseBranches(res.stdout);
        return this.branches;
      });
  }

  getBranchCommits(path, branch) {
    return this.exec(`cd ${path} && git log ${branch} --pretty="%h|%s|%cn|%cd" --date=short`)
      .then((res) => {
        const commits = this.parseCommits(res.stdout);
        return commits;
      });
  }

  getDirFiles(repoPath, root, path) {
    return this.exec(`cd ${repoPath} && git ls-tree ${root} ${path}`)
      .then((res) => {
        const dir = this.parseDir(res.stdout);

        return dir;
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
