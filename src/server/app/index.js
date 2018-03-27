const git = require('./git');
const getBreacrumbs = require('./utils/get-breacrumbs');

class App {
  constructor(gitApp) {
    this.git = gitApp;
    this.path = `./${process.env.REPO}`;
  }

  renderAllBranches(req, res) {
    return this.git.getAllBranches(this.path)
      .then((branchArr) => {
        res.render('index', {
          branchArr
        });
      });
  }

  renderCommitsFromBranch(req, res) {
    const { branch } = req.params;

    return this.git.getBranchCommits(this.path, branch)
      .then((commitsArr) => {
        res.render('commits', {
          mainTitle: 'Mega GIT: commits',
          branch,
          commitsArr
        });
      });
  }

  renderDir(req, res) {
    const { branch, commit } = req.params;
    const { path, fileHash } = req.query;
    const root = commit || branch;
    const pathValue = path || './';
    const breadCrumbs = getBreacrumbs(pathValue);

    if (fileHash !== undefined) {
      return this.git.getFile(this.path, fileHash)
        .then((fileData) => {
          res.render('file', {
            mainTitle: 'Mega GIT: files',
            fileData,
            branch,
            commit,
            breadCrumbs
          });
        });
    }

    return this.git.getDirFiles(this.path, root, pathValue)
      .then((dirArr) => {
        const sortedDirs = dirArr.sort((a, b) => {
          if (a.type > b.type) {
            return -1;
          }
          return 1;
        });

        res.render('file-list', {
          mainTitle: 'Mega GIT: files-list',
          commit,
          parentPath: path,
          branch,
          dirArr: sortedDirs,
          breadCrumbs
        });
      });
  }
}

const app = new App(git);

module.exports = app;
