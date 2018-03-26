function splitLineBreaks(string) {
  return string.split('\n')
    .map(str => str.trim())
    .filter(str => str !== '');
}

module.exports = splitLineBreaks;
