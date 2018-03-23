/* eslint-disable no-console */
const express = require('express');
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfigFunc = require('./../../webpack.config.js');
const indexRoute = require('./routes/index');

const app = express();
const PORT = process.env.PORT || 8080;
const isDevelopment = process.env.NODE_ENV !== 'production';

app.set('port', PORT);

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

if (isDevelopment) {
  const webpackConfig = webpackConfigFunc(null, 'development');
  const compiler = webpack(webpackConfig);

  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath
  }));
} else {
  app.use(express.static(path.join(__dirname, '../../dist')));
}

app.use('/', indexRoute);

app.use((req, res) => {
  res.status(404).render('404', { mainTitle: 'Mega GIT is not found' });
});

app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.send('error');
});

const server = app.listen(app.get('port'), () => {
  const { port } = server.address();
  console.log(`Server started on port ${port}`);
});
