const git = require('./git');

class App {
  constructor(gitApp) {
    this.git = gitApp;
  }

  renderAllBranches(req, res) {
    this.git.getAllBranches()
      .then((branchArr) => {
        res.render('index', {
          mainTitle: 'Mega GIT',
          pageTitle: 'The Modern Digital IT Product',
          repoName: process.env.REPO,
          branchArr
        });
      });
  }
}
const app = new App(git);

module.exports = app;
