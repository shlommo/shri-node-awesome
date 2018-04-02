const git = require('./git');
const getBreacrumbs = require('./utils/get-breacrumbs');
const _ = require('lodash');

class App {
  constructor(gitApp) {
    this.git = gitApp;
    this.path = `./${process.env.REPO}`;
  }

  renderAllBranches(req, res, next) {
    return this.git.getAllBranches(this.path)
      .then((branchArr) => {
        res.render('index', {
          branchArr
        });
      })
      .catch((error) => {
        next(error);
      });
  }

  renderCommitsFromBranch(req, res, next) {
    const { branch } = req.params;

    return this.git.getBranchCommits(this.path, branch)
      .then((commitsArr) => {
        res.render('commits', {
          mainTitle: 'Mega GIT: commits',
          branch,
          commitsArr
        });
      })
      .catch((error) => {
        next(error);
      });
  }

  renderDir(req, res, next) {
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
        })
        .catch((error) => {
          next(error);
        });
    }

    return this.git.getDirFiles(this.path, root, pathValue)
      .then((dirArr) => {
        const sortedDirs = _.orderBy(dirArr, ['type'], ['desc']);

        res.render('file-list', {
          mainTitle: 'Mega GIT: files-list',
          commit,
          parentPath: path,
          branch,
          dirArr: sortedDirs,
          breadCrumbs
        });
      })
      .catch((error) => {
        next(error);
      });
  }
}

const app = new App(git);

module.exports = app;
