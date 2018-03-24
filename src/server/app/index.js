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
        this.pastDir = undefined;
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

  renderDir(req, res) {
    const { value } = req.query;

    // console.log();
    this.git.getDirFiles(value)
      .then((dir) => {
        const fileStructure = dir;
        const dirsArr = fileStructure.filter(item => item.type !== 'blob');
        const filesArr = fileStructure.filter(item => item.type !== 'tree');

        return { dirsArr, filesArr };
      })
      .then(({ dirsArr, filesArr }) => {
        res.render('fileList', {
          mainTitle: 'Mega GIT: files',
          parentPath: this.pastDir,
          dirsArr,
          filesArr
        });

        if (value !== undefined) {
          this.pastDir = value;
        }
      });
  }
}

const app = new App(git);

module.exports = app;
