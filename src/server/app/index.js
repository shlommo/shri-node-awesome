const makeExecCommand = require('./utils/make-exec-command');
const { repoPath } = require('./../configs');

class App {
  constructor() {
    this.makeExecCommand = makeExecCommand;
    this.repoPath = repoPath;
  }

  getAllBranches() {
    return this.makeExecCommand('git branch --list', ['', '* ']);
  }
}

module.exports = new App();
