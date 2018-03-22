const { exec } = require('child_process');
const stringToArray = require('./string-to-array');

const makeExecCommand = (command, chars) => new Promise((resolve, reject) => {
  exec(
    command,
    (code, stdout, stderr) => {
      if (code) {
        reject(stderr);
      }

      resolve(stringToArray(stdout, chars));
    },
  );
});

module.exports = makeExecCommand;
