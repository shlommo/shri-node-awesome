const getRepoName = (path) => {
  const pathArr = path.split('/');

  return pathArr[pathArr.length - 1];
};

const configs = {
  repoPath: '/Users/event/Desktop/shri-node'
};

configs.repoName = getRepoName(configs.repoPath);

module.exports = configs;
