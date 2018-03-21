/* eslint-disable no-console */
const express = require('express');

const path = require('path');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const configFunc = require('./../../webpack.config.js');

const app = express();
const PORT = process.env.PORT || 3000;
const isDevelopment = process.env.NODE_ENV !== 'production';

app.set('port', PORT);

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

if (isDevelopment) {
  const config = configFunc(null, 'development');
  const compiler = webpack(config);

  app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
  }));
} else {
  app.use(express.static(path.join(__dirname, '../../dist')));
}

app.get('/', (req, res) => {
  res.render('index', { mainTitle: 'Mega git', pageTitle: 'The Modern Digital IT Product' });
});

const server = app.listen(app.get('port'), () => {
  const { port } = server.address();
  console.log(`Server started on port ${port}`);
});
