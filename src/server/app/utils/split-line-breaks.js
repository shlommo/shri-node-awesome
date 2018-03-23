function splitLineBreaks(string) {
  return string.split('\n').filter(str => str !== '');
}

module.exports = splitLineBreaks;
