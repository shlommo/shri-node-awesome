const { exec: execViaCallbacks } = require('child_process');
const exec = require('util').promisify(execViaCallbacks);
const splitLineBreaks = require('./utils/split-line-breaks');
const _ = require('lodash');

class Git {
  constructor(execPromise) {
    this.exec = execPromise;
    this.path = `./${process.env.REPO}`;
  }

  parseBranches(data) {
    this.branches = splitLineBreaks(data);

    return this.branches.map((item) => {
      const branch = _.trim(item, '*');
      return _.trim(branch);
    });
  }

  parceCommits(data) {
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

  getAllBranches() {
    return new Promise((resolve, reject) => {
      this.exec(`cd ${this.path} && git branch --list`)
        .then((res) => {
          this.branches = this.parseBranches(res.stdout);
          resolve(this.branches);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  getBranchCommits(branch) {
    return new Promise((resolve, reject) => {
      this.exec(`cd ${this.path} && git log ${branch} --pretty="%h|%s|%cn|%cd" --date=short`)
        .then((res) => {
          const commits = this.parceCommits(res.stdout);
          resolve(commits);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

module.exports = new Git(exec);
