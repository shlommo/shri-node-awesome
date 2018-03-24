const express = require('express');
const app = require('./../app');

const router = express.Router();

router.get('/', (req, res) => {
  app.renderAllBranches(req, res);
});

router.get('/commits/:branch', (req, res) => {
  app.renderCommitsFromBranch(req, res);
});

module.exports = router;
