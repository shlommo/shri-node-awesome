const express = require('express');
const app = require('./../app');

const router = express.Router();

router.get('/', (req, res) => {
  app.renderAllBranches(req, res);
});

router.get('/commits/:branch', (req, res) => {
  app.renderCommitsFromBranch(req, res);
});

router.get(['/tree/:branch', '/tree/:branch/:commit'], (req, res) => {
  app.renderDir(req, res);
});

module.exports = router;
