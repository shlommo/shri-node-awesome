const express = require('express');
const App = require('./../app');
const appConfigs = require('./../configs');

const router = express.Router();

router.get('/', (req, res, next) => {
  App.getAllBranches()
    .then((data) => {
      res.render('index', {
        mainTitle: 'Mega GIT',
        pageTitle: 'The Modern Digital IT Product',
        repoName: appConfigs.repoName,
        branchArr: data
      });
    })
    .catch((error) => { next(error); });
});

module.exports = router;
