const git = require('./git');

class App {
  constructor(gitApp) {
    this.git = gitApp;
  }

  renderAllBranches(req, res) {
    this.git.getAllBranches()
      .then((branchArr) => {
        res.render('index', {
          branchArr
        });
      });
  }

  renderCommitsFromBranch(req, res) {
    const { branch } = req.params;

    this.git.getBranchCommits(branch)
      .then((commitsArr) => {
        res.render('commits', {
          mainTitle: 'Mega GIT: commits',
          branch,
          commitsArr
        });
      });
  }
}

const app = new App(git);

module.exports = app;
