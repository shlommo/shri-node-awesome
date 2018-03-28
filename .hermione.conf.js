module.exports = {
  baseUrl: 'https://shri-node-awesome-production.herokuapp.com/',
  gridUrl: 'http://0.0.0.0:4444/wd/hub',

  sets: {
    desktop: {
        files: 'tests/hermione'
    }
  },

  browsers: {
    chrome: {
      desiredCapabilities: {
        browserName: 'chrome'
      }
    },
    firefox: {
        desiredCapabilities: {
            browserName: 'firefox'
        }
    }
  }
}
