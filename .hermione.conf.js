module.exports = {
  baseUrl: 'http://0.0.0.0:8080',
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
