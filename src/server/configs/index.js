class Configs {
  constructor() {
    this.inputRepoPath = '';
    this.inputRepoName = '';
  }

  set repoPath(path) {
    this.inputRepoPath = path;
    // this.inputRepoPath = '/Users/event/Desktop/shri-node/src/server/';
  }

  get repoPath() {
    return this.inputRepoPath;
  }

  set repoName(path) {
    const pathArr = path.split('/');

    this.inputRepoName = pathArr[pathArr.length - 1];
  }

  get repoName() {
    return this.inputRepoName;
  }
}

const configs = new Configs();

module.exports = configs;
