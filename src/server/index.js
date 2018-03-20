/* eslint-disable no-console */
const express = require('express');

const path = require('path');

const app = express();

app.set('port', 4000);

app.use(express.static(path.join(__dirname, 'static')));

app.get('/', (req, res) => {
  res.send('Hello World');
});

const server = app.listen(app.get('port'), () => {
  const { port } = server.address();
  console.log(`Server started on port ${port}`);
});
