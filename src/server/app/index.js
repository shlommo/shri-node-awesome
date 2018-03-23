const appConfigs = require('./../configs');
const git = require('./git');

class App {
  constructor(gitApp) {
    this.git = gitApp;
  }

  renderAllBranches(req, res) {
    this.git.getAllBranches(appConfigs.repoPath)
      .then((branchArr) => {
        res.render('index', {
          mainTitle: 'Mega GIT',
          pageTitle: 'The Modern Digital IT Product',
          repoName: this.repoName,
          branchArr
        });
      });
  }
}
const app = new App(git);

module.exports = app;
