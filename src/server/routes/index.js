const express = require('express');
const app = require('./../app');

const router = express.Router();

router.get('/', (req, res, next) => {
  app.renderAllBranches(req, res, next);
});

router.get('/commits/:branch', (req, res, next) => {
  app.renderCommitsFromBranch(req, res, next);
});

router.get(['/tree/:branch', '/tree/:branch/:commit'], (req, res, next) => {
  app.renderDir(req, res, next);
});

module.exports = router;
