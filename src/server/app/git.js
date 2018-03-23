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
}

module.exports = new Git(exec);