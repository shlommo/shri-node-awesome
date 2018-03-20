/* eslint-disable no-console */
const express = require('express');

const path = require('path');

const app = express();

app.set('port', 4000);

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, '../../dist')));

app.get('/', (req, res) => {
  res.render('index', { title: 'Mega git', message: 'Hello there!' });
});

const server = app.listen(app.get('port'), () => {
  const { port } = server.address();
  console.log(`Server started on port ${port}`);
});
