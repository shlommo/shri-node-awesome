function getBreacrumbs(path) {
  let breadCrumbs = path.split('/').filter(item => item.length !== 0);

  if (breadCrumbs.length === 1) {
    breadCrumbs = [];
  }

  return breadCrumbs;
}

module.exports = getBreacrumbs;
