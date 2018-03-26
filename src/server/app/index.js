const git = require('./git');

class App {
  constructor(gitApp) {
    this.git = gitApp;
    this.path = `./${process.env.REPO}`;
  }

  renderAllBranches(req, res) {
    this.git.getAllBranches(this.path)
      .then((branchArr) => {
        res.render('index', {
          branchArr
        });
        this.pastDir = undefined;
      });
  }

  renderCommitsFromBranch(req, res) {
    const { branch } = req.params;

    this.git.getBranchCommits(this.path, branch)
      .then((commitsArr) => {
        res.render('commits', {
          mainTitle: 'Mega GIT: commits',
          branch,
          commitsArr
        });
      });
  }

  renderDir(req, res) {
    const { value } = req.query;

    this.git.getDirFiles(this.path, value)
      .then((dir) => {
        const dirsArr = dir.filter(item => item.type !== 'blob');
        const filesArr = dir.filter(item => item.type !== 'tree');

        res.render('file-list', {
          mainTitle: 'Mega GIT: files-list',
          parentPath: this.pastDir,
          branch: value,
          dirsArr,
          filesArr
        });

        if (value !== undefined) {
          this.pastDir = value;
        }
      });
  }

  renderFile(req, res) {
    const { hash, parent } = req.query;

    this.git.getFile(this.path, hash)
      .then((fileData) => {
        res.render('file', {
          mainTitle: 'Mega GIT: files',
          fileData,
          parent
        });
      });
  }
}

const app = new App(git);

module.exports = app;
