const makeExecCommand = require('./utils/make-exec-command');
const appConfigs = require('./../configs');

class App {
  constructor() {
    this.makeExecCommand = makeExecCommand;
    this.repoPath = '';
  }

  set path(path) {
    this.repoPath = path;
  }

  getAllBranches() {
    return this.makeExecCommand(`cd ${appConfigs.repoPath} && git branch --list`, ['', '*']);
  }
}

module.exports = new App();
