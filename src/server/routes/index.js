// const app = require('../src/App.js');
const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', { mainTitle: 'Mega GIT', pageTitle: 'The Modern Digital IT Product' });
});

module.exports = router;
